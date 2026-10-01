---
title: 'Harness engineering em .NET: o compilador como seu melhor sensor - Parte 1'
date: Wed, 30 Sep 2026 23:00:00 +0000
draft: false
tags: ['C#', '.NET 10', 'Harness Engineering', 'Agentes de Codificação', 'Roslyn', 'Analyzers', 'AnalysisMode', 'TreatWarningsAsErrors', 'BannedApiAnalyzers', 'EditorConfig', 'SARIF', 'AGENTS.md', 'GitHub Actions', 'Segurança']
---

Como de costume, estou trazendo mais uma série de artigos e dessa vez falaremos sobre como preparar uma solução .NET para trabalhar com agentes de codificação, como o Claude Code, o Codex, o Cursor ou o OpenCode. Esses agentes já fazem parte do dia a dia de muitos times, e o que vem chamando a minha atenção é que a qualidade do que eles entregam depende muito menos do modelo escolhido do que daquilo que existe ao redor dele no repositório.

Para que você entenda o problema, imagine que um agente recebeu a tarefa de criar uma consulta e entregou o código abaixo.

```csharp
command.CommandText = "SELECT * FROM expenses WHERE owner = '" + userInput + "'";
// ...
public byte[] Hash(byte[] data) => MD5.HashData(data);
```

Temos aí uma consulta SQL montada com entrada do usuário e um hash calculado com MD5. Em uma solução criada com os templates padrão do .NET 10, esse código compila. O build termina com sucesso, com dois avisos, e nenhum deles fala do MD5. Para o agente, que normalmente considera a tarefa concluída quando o build passa, está tudo pronto.

Nesse artigo iremos ver o que precisa existir ao redor do agente para que esse código não seja aceito. A boa notícia é que quase tudo o que é necessário já vem no SDK do .NET, só não está conectado a uma condição de falha. O artigo é prático: partiremos de um repositório no estado zero e adicionaremos, passo a passo, cada peça, compilando a cada etapa para ver o efeito.

Esse artigo é para todos aqueles que já desenvolvem em C# e já usam, ou pretendem usar, um agente de codificação. Não é preciso conhecer MSBuild a fundo, mas ajuda saber o que são o `.csproj` e o `dotnet build`.

Então vamos ao que interessa.

## O que é harness?

Um agente de codificação é composto por um modelo e por tudo o que existe ao redor dele: o system prompt, as ferramentas que ele pode usar, os arquivos de regras do projeto, as skills, os hooks, a memória e o ambiente onde ele executa comandos. Tudo aquilo que não é o modelo é chamado de **harness**, e harness engineering é a prática de configurar esse conjunto.

Cada peça do harness tem um de dois papéis:

- **Guide:** atua antes da ação do agente, orientando o que ele deve fazer. Um arquivo `AGENTS.md` com as convenções do projeto é um guide;
- **Sensor:** atua depois da ação, verificando se o resultado está correto. Um build, um analyzer ou uma suíte de testes é um sensor.

Para ficar mais concreto, pense em como um desenvolvedor novo entra no time. No primeiro dia, alguém mostra o README, explica as convenções e diz quais comandos rodar antes de abrir um pull request. Isso é o guide. Quando ele abre o primeiro pull request, o pipeline de CI barra o merge porque um teste quebrou. Isso é o sensor. Com um agente acontece exatamente o mesmo, com a diferença de que o agente faz esse ciclo dezenas de vezes por tarefa.

### Por que o sensor precisa falhar

O ciclo de trabalho de um agente é basicamente analisar, agir e observar o resultado. O ponto fraco está na observação: sem um critério externo, quem avalia se o trabalho ficou bom é o próprio modelo. Um sensor troca essa autoavaliação por um sinal objetivo, e quando o sinal é negativo o agente precisa corrigir antes de seguir. Esse efeito é chamado de **back pressure**.

Repare que existe uma condição para isso funcionar: o sensor precisa falhar. Agentes, hooks e pipelines olham para o exit code dos comandos. Um aviso de compilação não altera o exit code, e quando os avisos se acumulam eles viram ruído, tanto para o agente quanto para quem revisa o código. Esse é o ponto central desse artigo.

## Configurando o nosso ambiente

Para acompanhar o artigo, você vai precisar de:

- 🛠️ **.NET SDK 10** (o repositório fixa a versão no `global.json`);
- 🛠️ **Git**;
- 🤖 **Um agente de codificação** (opcional, usado só na seção "Testando o harness com um agente").

Não é necessário banco de dados, porque nenhum passo executa a aplicação.

## Informações sobre o projeto

O repositório de apoio da série é uma API de reembolso de despesas em ASP.NET Core, organizada em camadas. Cada artigo da série tem uma tag no repositório, e o nosso ponto de partida é a tag `v0-baseline`, que contém apenas o esqueleto da solução.

```powershell
git clone https://github.com/ferronicardoso/harness-engineering-dotnet.git
cd harness-engineering-dotnet
git switch -c meu-harness v0-baseline
dotnet build Reimbursements.slnx
```

O build deve terminar com sucesso, com 0 avisos e 0 erros. Analisando a estrutura, temos:

```
src/
  Reimbursements.Domain/
  Reimbursements.Application/
  Reimbursements.Infrastructure/   # EF Core + PostgreSQL
  Reimbursements.Api/              # Minimal API
tests/
  Reimbursements.UnitTests/
```

Nessa primeira parte não teremos nenhuma regra de negócio implementada, porque o foco aqui é o que existe ao redor do código. Também não existe nenhum harness configurado: não há `AGENTS.md`, `.editorconfig`, `Directory.Build.props` nem analyzer além dos que o SDK habilita por padrão.

## Iniciando o desenvolvimento

### 1️⃣ Medir o que já existe

Antes de adicionar qualquer coisa, sugiro olhar o que o SDK já está fazendo por nós. O comando abaixo mostra o valor efetivo de algumas propriedades do build.

```powershell
dotnet msbuild src/Reimbursements.Api/Reimbursements.Api.csproj `
  -getProperty:EnableNETAnalyzers -getProperty:AnalysisLevel -getProperty:AnalysisMode `
  -getProperty:EnforceCodeStyleInBuild -getProperty:TreatWarningsAsErrors `
  -getProperty:WarningsAsErrors -getProperty:Nullable -getProperty:NuGetAudit
```

Com o SDK 10.0.401, o resultado foi:

| Propriedade | Valor |
| --- | --- |
| `EnableNETAnalyzers` | `true` |
| `AnalysisLevel` | `latest` |
| `AnalysisMode` | vazio (modo padrão) |
| `EnforceCodeStyleInBuild` | `false` |
| `TreatWarningsAsErrors` | `false` |
| `WarningsAsErrors` | `NU1605;SYSLIB0011` |
| `Nullable` | `enable` |
| `NuGetAudit` | `true` |

Se classificarmos o que existe no repositório pelos papéis que vimos, teremos:

| Elemento | Papel | Estado | Faz o build falhar? |
| --- | --- | --- | --- |
| Compilador C# | Sensor | ativo | sim, para erros de compilação |
| Nullable | Sensor | habilitado | não, só gera avisos |
| Analyzers do SDK | Sensor | modo padrão | não, e as regras de segurança relevantes estão desligadas |
| Estilo de código no build | Sensor | desligado | não |
| NuGet Audit | Sensor | ligado | não, só gera avisos no restore |
| Testes | Sensor | projeto sem testes | não |
| `AGENTS.md` | Guide | não existe | — |

Como pode perceber, o repositório não está desprotegido por falta de ferramenta. Os sensores estão lá, mas não estão ligados a uma condição de falha, e não existe nenhum guide dizendo ao agente qual é o critério para considerar uma tarefa pronta.

### 2️⃣ Introduzir o código-problema

Para ver os sensores funcionando, vamos criar um arquivo que reúne os problemas que queremos detectar. Crie o arquivo `src/Reimbursements.Infrastructure/HarnessProbe.cs` com o código abaixo. Ele será removido mais adiante.

> ⚠️ **Atenção**: esse código é propositalmente inseguro. Ele concatena entrada do usuário em SQL e usa MD5 para hash. Use-o apenas para acompanhar o artigo e não aproveite nenhum trecho dele em código real.

```csharp
using System.Data.Common;
using System.Security.Cryptography;

using Microsoft.EntityFrameworkCore;

using Reimbursements.Infrastructure.Persistence;

namespace Reimbursements.Infrastructure
{
    public class HarnessProbe
    {
        public void Query(DbConnection connection, string userInput)
        {
            using var command = connection.CreateCommand();
            command.CommandText = "SELECT * FROM expenses WHERE owner = '" + userInput + "'";
            command.ExecuteNonQuery();
        }

        public void Raw(ReimbursementsDbContext db, string userInput) =>
            db.Database.ExecuteSqlRaw("DELETE FROM expenses WHERE owner = '" + userInput + "'");

        public byte[] Hash(byte[] data) => MD5.HashData(data);

        public DateTime Today() => DateTime.UtcNow;

        public int Length(string? value)
        {
            if (value is null) return 0;
            return value.Length;
        }

        public int UnsafeLength(string? value) => value.Length;
    }
}
```

Feito isso, vamos compilar.

```powershell
dotnet build Reimbursements.slnx --no-incremental
```

O build termina com sucesso e com **2 avisos**:

| Diagnóstico | Problema | Origem |
| --- | --- | --- |
| `CS8602` | desreferência de `string?` | compilador (nullable) |
| `EF1003` | concatenação em `ExecuteSqlRaw` | analyzer do EF Core |

> ⚠️ **Atenção**: se nesse passo o seu build falhar com 8 erros, você está em uma branch que já possui o harness completo, como a `main`. Volte à seção anterior e crie a sua branch a partir da tag `v0-baseline`.

Repare em duas coisas. A primeira é que o `EF1003` vem do próprio Entity Framework Core, ou seja, parte dos sensores chega junto com as bibliotecas sem nenhuma configuração. A segunda é que a concatenação em `DbCommand.CommandText` e o uso do MD5 não geraram diagnóstico nenhum. As regras que detectam esses problemas existem no SDK, mas estão desligadas no modo padrão.

> 💡 **Dica**: as mensagens dos diagnósticos aparecem no idioma do SDK instalado. Os códigos (`CS8602`, `EF1003` e os demais) são os mesmos em qualquer idioma.

### 3️⃣ Ativar as regras de segurança

Na raiz do repositório, crie o arquivo `Directory.Build.props`. O MSBuild importa esse arquivo automaticamente em todos os projetos abaixo dele, o que nos permite centralizar a configuração em um único lugar.

```xml
<Project>
  <PropertyGroup>
    <AnalysisLevel>latest</AnalysisLevel>
    <AnalysisModeSecurity>All</AnalysisModeSecurity>
  </PropertyGroup>
</Project>
```

O `AnalysisModeSecurity` ativa todas as regras da categoria de segurança, sem mexer nas demais categorias. Existe também a opção `AnalysisMode` com o valor `All`, que ativa todas as categorias de uma vez, mas eu prefiro começar pela segurança. Ligar tudo de uma vez costuma gerar uma quantidade de diagnósticos que leva o time a suprimir regras em vez de corrigir o código.

```powershell
dotnet build Reimbursements.slnx --no-incremental
```

O build continua passando, agora com **4 avisos**. Aos dois anteriores somam-se:

| Diagnóstico | Problema |
| --- | --- |
| `CA2100` | consulta SQL montada com entrada externa |
| `CA5351` | uso de algoritmo de hash quebrado (MD5) |

Os problemas ficaram visíveis, mas o exit code continua 0. Esse é o estado em que muitos repositórios ficam: o sensor detecta, mas não impede nada.

### 4️⃣ Converter aviso em falha

Vamos adicionar o `TreatWarningsAsErrors` ao nosso `Directory.Build.props`.

```xml
<Project>
  <PropertyGroup>
    <AnalysisLevel>latest</AnalysisLevel>
    <AnalysisModeSecurity>All</AnalysisModeSecurity>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>
</Project>
```

```powershell
dotnet build Reimbursements.slnx --no-incremental
```

Agora o build falha com **4 erros** e exit code 1. São os mesmos quatro diagnósticos, só que tratados como erro.

Essa é a mudança que faz o sensor realmente funcionar, e ela traz duas consequências que vale conhecer:

- **Toda regra ativa passa a bloquear o build.** Por isso a escolha das regras precisa ser feita com critério, e as exceções precisam ser documentadas. Uma configuração com muito ruído empurra pessoas e agentes para a supressão de diagnósticos;
- **O NuGet Audit também passa a bloquear.** Pacotes com vulnerabilidade conhecida geram avisos no restore, e esses avisos viram erro. Uma vulnerabilidade publicada amanhã pode quebrar um build que passa hoje, sem nenhuma alteração no código. É o comportamento que queremos de um sensor, mas o time precisa saber que ele existe.

Se você preferir uma abordagem mais conservadora, o `WarningsAsErrors` permite informar uma lista de códigos e converter somente os diagnósticos escolhidos.

### 5️⃣ Proibir APIs com o BannedApiAnalyzers

Alguns problemas não são detectados por nenhuma regra porque não são erros em si, são decisões do projeto. No nosso caso, teremos duas:

- datas devem vir do `TimeProvider`, e não de `DateTime.Now` ou `DateTime.UtcNow`, para que as regras que dependem de data possam ser testadas;
- comandos SQL devem usar as variantes interpoladas do EF Core (`ExecuteSql` e `FromSql`), que parametrizam a entrada, e não as variantes terminadas em `Raw`.

Para isso utilizaremos o pacote `Microsoft.CodeAnalysis.BannedApiAnalyzers`, mantido pelo time do .NET junto com o compilador Roslyn. Ele transforma uma lista de símbolos proibidos em diagnóstico. Vamos adicioná-lo ao `Directory.Build.props`.

```xml
<Project>
  <PropertyGroup>
    <AnalysisLevel>latest</AnalysisLevel>
    <AnalysisModeSecurity>All</AnalysisModeSecurity>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.CodeAnalysis.BannedApiAnalyzers" Version="5.6.0" PrivateAssets="all" IncludeAssets="runtime; build; native; contentfiles; analyzers" />
    <AdditionalFiles Include="$(MSBuildThisFileDirectory)BannedSymbols.txt" Link="BannedSymbols.txt" />
  </ItemGroup>
</Project>
```

E criaremos o arquivo `BannedSymbols.txt` na raiz do repositório.

```text
// Relógio do sistema: use TimeProvider para manter regras dependentes de data testáveis.
P:System.DateTime.Now;Use TimeProvider.GetLocalNow()
P:System.DateTime.UtcNow;Use TimeProvider.GetUtcNow()
P:System.DateTimeOffset.Now;Use TimeProvider.GetLocalNow()
P:System.DateTimeOffset.UtcNow;Use TimeProvider.GetUtcNow()

// SQL bruto: use as variantes interpoladas (ExecuteSql/FromSql), que parametrizam a entrada.
M:Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSqlRaw(Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade,System.String,System.Object[]);Use ExecuteSql com string interpolada
M:Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSqlRaw(Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade,System.String,System.Collections.Generic.IEnumerable{System.Object});Use ExecuteSql com string interpolada
M:Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSqlRawAsync(Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade,System.String,System.Object[]);Use ExecuteSqlAsync com string interpolada
M:Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSqlRawAsync(Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade,System.String,System.Threading.CancellationToken);Use ExecuteSqlAsync com string interpolada
M:Microsoft.EntityFrameworkCore.RelationalDatabaseFacadeExtensions.ExecuteSqlRawAsync(Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade,System.String,System.Collections.Generic.IEnumerable{System.Object},System.Threading.CancellationToken);Use ExecuteSqlAsync com string interpolada
M:Microsoft.EntityFrameworkCore.RelationalQueryableExtensions.FromSqlRaw``1(Microsoft.EntityFrameworkCore.DbSet{``0},System.String,System.Object[]);Use FromSql com string interpolada
```

Cada linha usa o identificador de documentação do símbolo, e o texto depois do `;` aparece na mensagem do diagnóstico. É ali que a política explica qual é a alternativa, e é essa mensagem que o agente vai ler quando o build falhar.

```powershell
dotnet build Reimbursements.slnx --no-incremental
```

O build falha agora com **6 erros**. Aos quatro anteriores somam-se dois `RS0030`, um para o `DateTime.UtcNow` e outro para o `ExecuteSqlRaw`.

> ⚠️ **Atenção**: o `BannedSymbols.txt` não aceita curinga para sobrecargas de método. Cada assinatura precisa de uma linha, e é por isso que o `ExecuteSqlRaw` aparece seis vezes. Uma linha com a assinatura errada não gera erro nenhum, ela simplesmente não bane nada. Por isso, valide cada entrada compilando um uso real do método.

Repare que no caso do `ExecuteSqlRaw` com concatenação temos o `EF1003` e o `RS0030` apontando para a mesma linha. Eles cobrem coisas diferentes: o `EF1003` detecta a concatenação, enquanto o banimento proíbe a API mesmo quando o uso é seguro, como uma política do projeto.

### 6️⃣ Verificar o estilo de código no build

Convenções de estilo podem parecer um detalhe, mas para um agente elas fazem parte do critério de aceite. Código fora do padrão gera diffs maiores e uma revisão mais lenta. O SDK verifica o estilo durante o build quando o `EnforceCodeStyleInBuild` está ligado e as regras têm severidade definida no `.editorconfig`.

Vamos adicionar a propriedade ao `PropertyGroup` do `Directory.Build.props`.

```xml
<EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
```

E criar o `.editorconfig` na raiz do repositório.

```ini
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true

[*.{csproj,props,targets,slnx,xml,json,yaml,yml}]
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[*.cs]

# Organização de usings
dotnet_sort_system_directives_first = true
dotnet_separate_import_directive_groups = true

# Estilo verificado no build (EnforceCodeStyleInBuild)
csharp_style_namespace_declarations = file_scoped:warning
dotnet_diagnostic.IDE0161.severity = warning

csharp_prefer_braces = true:warning
dotnet_diagnostic.IDE0011.severity = warning

dotnet_style_readonly_field = true:warning
dotnet_diagnostic.IDE0044.severity = warning

# Políticas de BannedSymbols.txt
dotnet_diagnostic.RS0030.severity = error
```

```powershell
dotnet build Reimbursements.slnx --no-incremental
```

Ao compilar, teremos agora **8 erros**. Somam-se o `IDE0161`, porque o nosso arquivo usa namespace com bloco em vez de namespace com escopo de arquivo, e o `IDE0011`, por causa do `if` sem chaves.

Deixei o conjunto de regras propositalmente pequeno. Cada regra ativada como erro precisa valer o custo de bloquear o build, e sugiro que você vá incluindo novas regras aos poucos, conforme o time sentir necessidade.

### 7️⃣ Voltar ao verde

Com todos os sensores funcionando, vamos remover o arquivo de teste.

```powershell
Remove-Item src/Reimbursements.Infrastructure/HarnessProbe.cs
dotnet build Reimbursements.slnx --no-incremental
dotnet format Reimbursements.slnx --verify-no-changes
```

Se estiver no Linux ou no macOS, troque o `Remove-Item` por `rm`.

O build volta a terminar com 0 avisos e 0 erros, e o `dotnet format` termina com exit code 0. Isso mostra que o código do baseline já atende às regras que configuramos.

O `dotnet format --verify-no-changes` é um sensor complementar: ele verifica formatação e estilo sem alterar nenhum arquivo e falha se houver algo para corrigir.

### 8️⃣ Gerar evidência em SARIF

Um sensor que roda no CI deve deixar registro do que verificou. O compilador grava os diagnósticos no formato SARIF quando a propriedade `ErrorLog` está definida. Vamos adicioná-la ao `Directory.Build.props`.

```xml
<PropertyGroup>
  <ErrorLog>$(MSBuildThisFileDirectory)artifacts/sarif/$(MSBuildProjectName).sarif,version=2.1</ErrorLog>
</PropertyGroup>
```

> ⚠️ **Atenção**: se você compilar agora, o build vai falhar com o erro `CS0016`, porque o compilador não cria o diretório de destino do arquivo.

Para resolver, crie o arquivo `Directory.Build.targets` na raiz do repositório.

```xml
<Project>

  <!-- O compilador não cria o diretório de destino do ErrorLog. -->
  <Target Name="CreateSarifDirectory" BeforeTargets="CoreCompile">
    <MakeDir Directories="$(MSBuildThisFileDirectory)artifacts/sarif" />
  </Target>

</Project>
```

```powershell
dotnet build Reimbursements.slnx --no-incremental
Get-ChildItem artifacts/sarif
```

Ao executar, teremos um arquivo `.sarif` para cada projeto da solução. O diretório `artifacts/` já está no `.gitignore` gerado pelo `dotnet new gitignore`, então esses arquivos não vão para o repositório.

Com isso, o nosso `Directory.Build.props` completo fica assim:

```xml
<Project>

  <!-- Sensores: analyzers e regras que falham o build. -->
  <PropertyGroup>
    <AnalysisLevel>latest</AnalysisLevel>
    <AnalysisModeSecurity>All</AnalysisModeSecurity>
    <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
    <TreatWarningsAsErrors>true</TreatWarningsAsErrors>
  </PropertyGroup>

  <!-- Evidência: diagnósticos de cada projeto em SARIF 2.1. -->
  <PropertyGroup>
    <ErrorLog>$(MSBuildThisFileDirectory)artifacts/sarif/$(MSBuildProjectName).sarif,version=2.1</ErrorLog>
  </PropertyGroup>

  <!-- Políticas do tipo "não usar X". -->
  <ItemGroup>
    <PackageReference Include="Microsoft.CodeAnalysis.BannedApiAnalyzers" Version="5.6.0" PrivateAssets="all" IncludeAssets="runtime; build; native; contentfiles; analyzers" />
    <AdditionalFiles Include="$(MSBuildThisFileDirectory)BannedSymbols.txt" Link="BannedSymbols.txt" />
  </ItemGroup>

</Project>
```

### 9️⃣ Escrever o guide: o AGENTS.md

Até aqui o nosso harness tem sensores. Falta o guide que diz ao agente que esses sensores existem e como usá-los. Sem ele, o agente descobre as regras por tentativa e erro. Com ele, a primeira tentativa já parte do critério certo.

O `AGENTS.md` é um formato reconhecido por vários agentes de codificação. Crie o arquivo na raiz do repositório.

````markdown
# AGENTS.md

## Projeto

API de reembolso de despesas em ASP.NET Core (.NET 10), organizada em camadas. Repositório de referência da série de artigos "Harness Engineering para .NET".

## Estrutura e regra de dependência

```
src/Reimbursements.Domain          # entidades e regras de negócio; não depende de nenhum outro projeto
src/Reimbursements.Application     # casos de uso; depende apenas de Domain
src/Reimbursements.Infrastructure  # EF Core + PostgreSQL; depende de Application e Domain
src/Reimbursements.Api             # Minimal API; depende de Application e Infrastructure
tests/Reimbursements.UnitTests     # testes de Domain e Application
```

- Não adicione referências que invertam essa direção (por exemplo, Domain referenciando Infrastructure).
- Tipos do EF Core ficam restritos a Infrastructure.
- Regras de negócio ficam em Domain/Application, não em endpoints.

## Critério de pronto

Uma tarefa só está concluída quando os três comandos abaixo terminam com sucesso (exit code 0):

```powershell
dotnet build Reimbursements.slnx
dotnet test Reimbursements.slnx
dotnet format Reimbursements.slnx --verify-no-changes
```

O build trata avisos como erro (`Directory.Build.props`). Um build com falha indica que a alteração ainda não atende às regras do projeto.

## Convenções

- Identificadores de código em inglês; documentação (README, PRD, ADR) em português.
- Namespaces com escopo de arquivo.
- Use `TimeProvider` em vez de `DateTime.Now`/`UtcNow`.
- Acesso a SQL apenas via LINQ ou `ExecuteSql`/`FromSql` com string interpolada; nunca `*Raw` com concatenação.

## Restrições

- Não suprima diagnósticos (`#pragma warning disable`, `[SuppressMessage]`, `NoWarn`, severidade `none` no `.editorconfig`) para fazer o build passar. Se uma regra parecer inadequada, pare e explique o motivo.
- Não altere `Directory.Build.props`, `.editorconfig` ou `BannedSymbols.txt` para relaxar regras sem solicitação explícita.
- Não adicione credenciais a arquivos versionados. As credenciais de `compose.yaml` e `appsettings.Development.json` são exclusivas do banco local em container.
- Não execute migrations ou comandos de banco contra ambientes que não sejam o container local.
````

Analisando o arquivo, temos três decisões que vale destacar:

- **O critério de pronto é executável.** Em vez de pedir ao agente que "garanta a qualidade do código", o arquivo lista os comandos e a condição para considerar a tarefa concluída. O guide aponta diretamente para os sensores;
- **As convenções repetem as políticas do `BannedSymbols.txt`.** O sensor bloqueia o código errado, e o guide evita que o agente precise ser bloqueado;
- **A restrição sobre supressões fecha a brecha mais óbvia.** Um agente que precisa fazer o build passar pode simplesmente suprimir o diagnóstico em vez de corrigir o código. O guide proíbe isso, mas proibir não é o mesmo que verificar.

Para o Claude Code, que lê o arquivo `CLAUDE.md`, crie esse arquivo com uma única linha importando o `AGENTS.md`.

```markdown
@AGENTS.md
```

Dessa forma mantemos um único guide, independente da ferramenta que o time utiliza.

## Testando o harness com um agente

Diferente dos passos anteriores, aqui não existe um resultado esperado fixo. O comportamento de um agente varia entre ferramentas, modelos e até entre execuções. O objetivo é observar o ciclo funcionando.

Com o harness completo, peça ao seu agente:

> Crie um endpoint `GET /diagnostics/database` que verifica a conexão com o banco executando `SELECT 1` e retorna o resultado junto com o horário atual do servidor.

Escolhi essa tarefa de propósito: o caminho mais curto para resolvê-la passa justamente pelo `ExecuteSqlRaw` e pelo `DateTime.UtcNow`.

Durante a execução, observe:

1. O agente leu o `AGENTS.md` antes de implementar?
2. A primeira versão já usou `TimeProvider` e `ExecuteSql`/`SqlQuery`, ou usou as APIs banidas?
3. O agente executou os comandos do critério de pronto antes de dizer que terminou?
4. Se o build falhou, a correção foi feita no código ou houve tentativa de suprimir o diagnóstico?
5. O endpoint ficou na camada correta, ou o acesso a dados foi parar no `Program.cs`?

Para comparar, repita o mesmo pedido em uma cópia do repositório na tag `v0-baseline`, sem harness nenhum. A diferença entre as duas execuções dá uma ideia do efeito do harness, mas é bom deixar claro que uma execução de cada não é uma medição. Medir isso com método exige várias execuções e critérios de avaliação definidos antes.

Ao terminar, descarte as alterações feitas pelo agente para manter o repositório no estado do passo 9.

## Levando para o CI

O harness local depende de alguém, pessoa ou agente, executar os comandos. O CI garante que eles rodem em todo push. Vamos criar o arquivo `.github/workflows/ci.yml`.

```yaml
name: ci

on:
  push:
  workflow_dispatch:

permissions:
  contents: read

jobs:
  build:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v7

      - uses: actions/setup-dotnet@v6
        with:
          global-json-file: global.json

      - name: Restore
        run: dotnet restore Reimbursements.slnx

      - name: Build
        run: dotnet build Reimbursements.slnx --no-restore --configuration Release

      - name: Test
        run: dotnet test Reimbursements.slnx --no-build --configuration Release

      - name: Format
        run: dotnet format Reimbursements.slnx --verify-no-changes --no-restore

      - name: Publicar SARIF
        if: always()
        uses: actions/upload-artifact@v7
        with:
          name: sarif
          path: artifacts/sarif/
          if-no-files-found: warn
          retention-days: 7
```

Algumas escolhas do workflow que vale explicar:

- **`permissions: contents: read`** restringe o token do workflow ao mínimo necessário;
- **`ubuntu-24.04`** em vez de `ubuntu-latest` mantém o ambiente reproduzível, então quem executar a tag no futuro terá o mesmo runner;
- **`if: always()`** publica o SARIF mesmo quando o build falha, que é justamente quando a evidência mais importa;
- **`retention-days: 7`** evita acumular artefatos na cota de armazenamento da conta. No meu caso, a cota já estava esgotada por artefatos de outros repositórios e o primeiro upload falhou, então vale ficar atento;
- **O SARIF é publicado como artefato.** O GitHub também aceita SARIF no code scanning, mas em repositório privado isso depende do GitHub Advanced Security.

As actions estão referenciadas por tag de versão. Fixá-las pelo SHA do commit é mais seguro, porque uma tag pode ser movida. Não me preocupei com isso nesse momento.

O estado final desse passo corresponde à tag `artigo-01` do repositório.

## Resumo do percurso

| Etapa | Build | Diagnósticos |
| --- | --- | --- |
| Baseline | sucesso | nenhum |
| 2️⃣ Código-problema | sucesso | 2 avisos (`CS8602`, `EF1003`) |
| 3️⃣ Regras de segurança | sucesso | 4 avisos (+ `CA2100`, `CA5351`) |
| 4️⃣ Avisos como erro | falha | 4 erros |
| 5️⃣ APIs banidas | falha | 6 erros (+ 2× `RS0030`) |
| 6️⃣ Estilo no build | falha | 8 erros (+ `IDE0161`, `IDE0011`) |
| 7️⃣ Sem o código-problema | sucesso | nenhum |

## Controle e evidência de codificação segura

Os passos 3 a 8 têm uma leitura adicional, que interessa a quem trabalha em ambientes sujeitos a normas como a ISO/IEC 27001. Normas desse tipo não dizem qual ferramenta usar. Elas exigem que existam controles de desenvolvimento seguro e que haja registro de que esses controles estão funcionando.

Um analyzer configurado como erro no build atende às duas coisas ao mesmo tempo. Ele é o **controle**, porque bloqueia o código fora da política antes do merge, e gera a **evidência**, porque o log do pipeline e o SARIF registram que a verificação aconteceu e o que ela encontrou.

E existe um detalhe que fica mais importante à medida que agentes escrevem mais código: o controle não distingue se o código foi escrito por uma pessoa ou por um agente. Se a política de codificação segura está no build, o código gerado por IA passa pelo mesmo controle, sem depender de revisão humana para isso. Na minha opinião, o `BannedSymbols.txt` é o recurso mais direto para esse fim, porque transforma políticas internas do tipo "não usar X" em regras verificáveis, com a justificativa dentro da própria mensagem do diagnóstico.

## O que o compilador não vê

É importante deixar claro que o que fizemos aqui é uma camada, e não uma estratégia completa:

- **Arquitetura:** nada impede que um agente adicione uma referência do Domain para a Infrastructure. A regra está escrita no `AGENTS.md`, mas não existe sensor para ela;
- **Regras de negócio:** nenhum analyzer sabe que um reembolso acima do limite precisa de aprovação. Isso fica a cargo de especificações e testes;
- **Segurança além da análise local:** analyzers têm cobertura limitada de fluxo de dados entre métodos e assemblies. Eles não substituem uma ferramenta de SAST dedicada, a auditoria de dependências nem os testes dinâmicos;
- **Supressões:** um `#pragma warning disable` desliga qualquer regra desse artigo. O `AGENTS.md` proíbe, mas proibir não é verificar.

## Conclusão

Até aqui você aprendeu como o SDK do .NET já entrega sensores que normalmente ficam desligados ou só geram avisos, e como conectá-los a uma condição de falha usando `AnalysisModeSecurity`, `TreatWarningsAsErrors`, o `BannedApiAnalyzers` e o `EnforceCodeStyleInBuild`. Também vimos como gerar evidência em SARIF, como escrever um `AGENTS.md` que diz ao agente qual é o critério de pronto e como levar tudo isso para o CI. O código inseguro do início, que compilava com o build verde, agora falha com oito erros, cada um com uma mensagem explicando o problema.

Procure exercitar incluindo novas entradas no `BannedSymbols.txt` com políticas do seu próprio time, e execute o teste com o agente nas duas versões do repositório. O que não mostrei aqui é que isso melhora o trabalho do agente de forma mensurável, porque essa afirmação depende de medição.

No próximo artigo, daremos continuidade à série.

Fonte do projeto: [Github](https://github.com/ferronicardoso/harness-engineering-dotnet).

Participe da nossa comunidade no [WhatsApp](https://chat.whatsapp.com/CYW7HUiK70xAmPpFx9mVMR).

Bons estudos e mãos à obra!

#### Referências

- [Visão geral da análise de código no .NET](https://learn.microsoft.com/dotnet/fundamentals/code-analysis/overview)
- [CA2100: Revisar consultas SQL em busca de vulnerabilidades de segurança](https://learn.microsoft.com/dotnet/fundamentals/code-analysis/quality-rules/ca2100)
- [CA5351: Não usar algoritmos criptográficos desfeitos](https://learn.microsoft.com/dotnet/fundamentals/code-analysis/quality-rules/ca5351)
- [IDE0161: Usar namespace com escopo de arquivo](https://learn.microsoft.com/dotnet/fundamentals/code-analysis/style-rules/ide0161)
- [IDE0011: Adicionar chaves](https://learn.microsoft.com/dotnet/fundamentals/code-analysis/style-rules/ide0011)
- [BannedApiAnalyzers](https://github.com/dotnet/roslyn/blob/main/src/RoslynAnalyzers/Microsoft.CodeAnalysis.BannedApiAnalyzers/BannedApiAnalyzers.Help.md)
- [AGENTS.md](https://agents.md)
