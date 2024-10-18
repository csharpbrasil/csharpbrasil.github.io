---
title: 'Como proteger dados sensíveis em C# usando a biblioteca Maskify'
date: Fri, 18 Oct 2024 13:00:00 +0000
draft: false
tags: ['proteger', 'CSharp', 'C#','dados', 'biblioteca', 'maskify', 'sensiveis', 'NET 8']
---


No mundo do desenvolvimento de software, a segurança dos dados é uma preocupação constante. Uma das práticas recomendadas é a proteção de informações sensíveis, como números de cartão de crédito, senhas e dados pessoais. Neste artigo, vamos explorar a biblioteca Maskify, uma ferramenta útil para mascarar dados sensíveis em aplicações C#. Vamos entender como ela funciona, suas principais funcionalidades e como integrá-la em seus projetos.

### O que é a biblioteca Maskify?

Maskify é uma biblioteca desenvolvida e mantida por [Daniel Jesus](https://github.com/djesusnet), um dos membros da nossa comunidade. A biblioteca tem como objetivo facilitar o mascaramento de dados sensíveis. Com ela, você pode ocultar partes de uma string, mantendo apenas as informações necessárias visíveis. Por exemplo, ao lidar com números de cartão de crédito, você pode exibir apenas os últimos quatro dígitos, enquanto o restante é substituído por caracteres de máscara, como asteriscos.

### Instalação

Para começar a usar a biblioteca Maskify em seu projeto C#, você precisa instalá-la. Abra o Gerenciador de Pacotes da sua IDE ou acesse o terminal para executar o seguinte comando na raiz do seu projeto:


```shell
dotnet add package Maskify.Core
```

Após a instalação, você deverá fazer referência no seu código para usar a biblioteca e assim estará pronto para utilizar as funcionalidades da biblioteca em seu código. Caso esteja usando o NET 8, poderá adicionar na referência global do seu projeto.

```csharp
using Maskify.Core;
```

### Como usar a biblioteca

A utilização da biblioteca Maskify é bastante simples. A seguir, apresentamos alguns exemplos básicos de como mascarar número de cartão de crédito, e-mail, cpf, cnpj e até mesmo textos.

#### Exemplo 1 — Máscara de cartão de crédito

```csharp
using Maskify.Core;

string dados = "1234 5678 1234 5678";
string dadosMascarado = Masker.MaskCreditCard(dados);
Console.WriteLine($"| Original: {dados}");
Console.WriteLine($"| Mascarado: {dadosMascarado}");

// Output: **** **** **** 5678
```

Neste exemplo, a função `Masker` da biblioteca Maskify é utilizada para mascarar o número do cartão de crédito. O resultado será algo como semelhante a `**** **** **** 5678`, onde apenas os últimos quatro dígitos são exibidos.

#### Exemplo 2 — Máscara de e-mail

```csharp
using Maskify.Core;

string dados = "nome.sobrenome@servidor.com.br";
string dadosMascarado = Masker.MaskEmail(dados);
Console.WriteLine($"| Original: {dados}");
Console.WriteLine($"| Mascarado: {dadosMascarado}");

// Output: n************e@servidor.com.br
```
No mascaramento de e-mail, a Maskify preserva as partes essenciais, como o domínio, mas ocultando outras informações sensíveis, como o nome do usuário.

#### Exemplo 3 — Máscara de CPF

```csharp
using Maskify.Core;

string dados = "123.456.789-00";
string dadosMascarado = Masker.MaskCPF(dados);
Console.WriteLine($"| Original: {dados}");
Console.WriteLine($"| Mascarado: {dadosMascarado}");

// Output: 123.***.**9-00
```

No mascaramento do CPF, o Maskify realizar a ocultação parcial dos dados, deixando somente o começo e o fim além de preservar as pontuações dos números.

#### Exemplo 4 — Máscara de CNPJ

```csharp
using Maskify.Core;

string dados = "12.345.678/0001-00";
string dadosMascarado = Masker.MaskCNPJ(dados);
Console.WriteLine($"| Original: {dados}");
Console.WriteLine($"| Mascarado: {dadosMascarado}");

// Output: 12.***.***/**01-00
```

No mascaramento do CNPJ, a Maskify realizar oa mesma ação que realiza para o CPF, ocultação parcial dos dados, deixando somente o começo e o fim além de preservar as pontuações dos números.

#### Exemplo 5- personalizando a máscara

A biblioteca Maskify também permite personalizar a máscara utilizada. Você pode definir quantos caracteres devem ser mantidos visíveis e qual caractere deve ser usado para a máscara. Veja um exemplo:

```csharp
using Maskify.Core;

string dados = "Meus dados são confidenciais";
string dadosMascarado = Masker.Mask(dados, 5, 9, '#');
Console.WriteLine($"| Original: {dados}");
Console.WriteLine($"| Mascarado: {dadosMascarado}");

// Output: Meus ######### confidenciais
```

Neste caso, a saída será `Meus ######### confidenciais`, onde o caractere `#` é utilizado para mascarar os números.

Podemos mascarar também por exemplo número de telefone usando a opção genérica como no exemplo anterior. Nesse caso optei por mascarar parcialmente o número, preservando o DDD e os quatro últimos números.

```csharp
using Maskify.Core;

string dados = "(11) 12345-1234";
string dadosMascarado = Masker.Mask(dados, 5, 8, '#');
Console.WriteLine($"| Original: {dados}");
Console.WriteLine($"| Mascarado: {dadosMascarado}");

// Output: (11) ########34
```

### Conclusão

Neste artigo, exploramos a biblioteca Maskify e como ela pode ser utilizada para proteger dados sensíveis em suas aplicações C#. A capacidade de mascarar informações é uma ferramenta valiosa para garantir a segurança e a privacidade dos usuários. Com a Maskify, você pode facilmente implementar essa funcionalidade em seus projetos, tornando seu código mais seguro e confiável.

No próximo artigo, continuaremos a explorar mais bibliotecas e ferramentas que podem ajudar a melhorar a segurança e a eficiência de suas aplicações em C#. 

Participe da nossa comunidade no [WhastApp](https://chat.whatsapp.com/CYW7HUiK70xAmPpFx9mVMR): 

Bons estudos e mãos à obra!

#### Referências

- [Exemplos do artigo](https://github.com/csharpbrasil/exemplo-usando-maskify)
- [Documentação da biblioteca Maskify](https://github.com/djesusnet/Maskify.Core.Libray)


