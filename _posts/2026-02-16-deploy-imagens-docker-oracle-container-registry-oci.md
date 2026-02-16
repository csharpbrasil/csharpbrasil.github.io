---
title: 'Deploy de Imagens Docker para Oracle Container Registry: Do Zero ao Push'
date: Mon, 16 Feb 2026 18:00:00 +0000
draft: false
tags: ['Docker', 'Container', 'Registry', 'OCI', 'DevOps', 'Cloud', 'CI/CD']
---

Imagine que você desenvolveu uma aplicação, empacotou tudo certinho em um container Docker e agora precisa colocar essa imagem em algum lugar seguro, acessível e confiável. Deixar a imagem só na sua máquina é como guardar o único backup de um projeto no desktop — funciona até o dia que não funciona mais.

É aí que entra o **Container Registry**. E se a sua infraestrutura já roda na Oracle Cloud, usar o **Oracle Container Registry (OCIR)** é o caminho natural. Neste artigo, você vai aprender desde os conceitos básicos até o push da sua primeira imagem, passando por boas práticas de versionamento que vão te poupar dores de cabeça lá na frente.

Sem rodeios: ao final deste artigo, você vai ter uma imagem Docker rodando no registry da OCI, pronta para ser consumida por qualquer serviço — seja um Docker Compose, um cluster Kubernetes ou uma pipeline de CI/CD.

## O Que é um Container Registry?

Um Container Registry é, na essência, um **repositório centralizado para armazenar e distribuir imagens Docker**. Pense nele como um "Git para containers" — você faz push de imagens, versiona, controla acesso e faz pull de qualquer lugar.

### Docker Hub vs Registries Privados

O **Docker Hub** é o registry público mais conhecido. Funciona bem para imagens open-source e projetos pessoais, mas tem limitações sérias para uso corporativo:

- ❌ Imagens públicas por padrão (na versão gratuita)
- ❌ Rate limits que podem travar sua pipeline no pior momento
- ❌ Sem controle granular de acesso
- ❌ Sem integração nativa com sua cloud

Um **registry privado** resolve tudo isso:

- ✅ Imagens acessíveis apenas para quem você autorizar
- ✅ Sem limites de pull que atrapalhem deploys
- ✅ Controle de acesso via IAM da própria cloud
- ✅ Proximidade física dos servidores que vão consumir as imagens

### Quando Usar um Registry Privado?

A resposta curta: **sempre que sua aplicação for para produção**. Se você está construindo algo que vai rodar em servidores, que tem dados sensíveis no build ou que faz parte de uma pipeline automatizada, um registry privado não é luxo — é necessidade.

## Oracle Container Registry (OCIR)

O OCIR é o serviço de Container Registry nativo da Oracle Cloud Infrastructure. Ele se integra diretamente com o ecossistema OCI, o que significa que suas imagens ficam no mesmo "teto" que seus servidores, bancos de dados e redes.

### Vantagens do OCIR

- 🔒 **Segurança integrada**: controle de acesso via políticas IAM da OCI
- 🌎 **Regionalizado**: imagens armazenadas na região que você escolher (São Paulo, por exemplo)
- ⚡ **Baixa latência**: pull rápido quando seus serviços OCI consomem as imagens
- 💰 **Custo**: incluído no Free Tier da OCI para uso básico
- 🔗 **Integração nativa**: funciona direto com OKE (Kubernetes), Functions e Container Instances

### Integração com Outros Serviços OCI

O OCIR não vive isolado. Ele se conecta naturalmente com:

- **OKE (Oracle Kubernetes Engine)**: seus pods puxam imagens direto do OCIR
- **Container Instances**: execução serverless de containers usando imagens do registry
- **DevOps Service**: pipelines de CI/CD que fazem build e push automaticamente
- **Functions**: deploy de funções serverless a partir de imagens Docker

## Pré-requisitos

Antes de colocar a mão na massa, garanta que você tem:

- 🐳 **Docker instalado e funcionando** na sua máquina
- ☁️ **Conta ativa na OCI** (o Free Tier já serve)
- 👤 **Usuário com permissões adequadas** (vamos configurar isso)
- 📝 **Conhecimento básico de Docker** (build, tag, run)

Se você já sabe fazer `docker build` e `docker run`, está pronto.

## Configuração Passo a Passo

### 1️⃣ Criar Usuário e Configurar Permissões IAM

Primeiro, o usuário que vai fazer o push precisa existir e ter as permissões corretas na OCI.

**Navegação no console:**

1. Acesse o console da OCI
2. Vá em **Identity & Security** > **Users**
3. Crie ou selecione o usuário que fará o push

**Políticas IAM necessárias:**

O administrador da tenancy precisa criar uma política que permita o acesso ao registry. Existem dois níveis:

```
# Acesso completo (push e pull)
Allow group <nome-grupo> to manage repos in tenancy
```

```
# Acesso restrito (apenas push)
Allow group <nome-grupo> to use repos in tenancy where request.permission='REPOSITORY_PUSH'
```

Para usuários que vêm do **Oracle Identity Cloud Service (IDCS)**, o formato muda:

```
Allow group 'OracleIdentityCloudService'/<nome-grupo> to manage repos in tenancy
```

> 💡 **Dica prática**: crie um grupo específico para CI/CD (ex: `container-pushers`) e adicione apenas os usuários ou service accounts que realmente precisam fazer push. Princípio do menor privilégio sempre.

### 2️⃣ Gerar Auth Token

O Auth Token é a "senha" que o Docker vai usar para se autenticar no registry. Ele substitui a senha do usuário OCI.

**Passo a passo:**

1. No console OCI, vá em **Identity & Security** > **Users**
2. Selecione o usuário desejado
3. No menu lateral esquerdo, clique em **Auth Tokens**
4. Clique em **Generate Token**
5. Dê uma descrição (ex: "Docker Registry Push")
6. **Copie o token imediatamente** — ele será exibido apenas uma vez

> ⚠️ **Atenção**: se você perder o token, não tem como recuperar. Vai precisar gerar outro. Guarde em um gerenciador de senhas ou em um vault seguro.

### 3️⃣ Autenticação no Registry

Com o token em mãos, hora de fazer login. O endpoint do registry segue o padrão `<region-key>.ocir.io`. Para São Paulo:

```bash
docker login gru.ocir.io
```

Ou usando o nome completo da região:

```bash
docker login sa-saopaulo-1.ocir.io
```

**Credenciais que serão solicitadas:**

O formato do username depende do tipo de usuário:

```bash
# Usuário IAM nativo
Username: <namespace-tenancy>/<nome-usuario>
Password: <auth-token>

# Exemplo:
Username: meunamespace/joao.silva
Password: abc123...token...xyz
```

```bash
# Usuário IDCS (Oracle Identity Cloud Service)
Username: <namespace-tenancy>/oracleidentitycloudservice/<nome-usuario>
Password: <auth-token>

# Exemplo:
Username: meunamespace/oracleidentitycloudservice/joao.silva
Password: abc123...token...xyz
```

> 💡 **Onde encontrar o namespace da tenancy?** No console OCI, clique no ícone do seu perfil (canto superior direito) > **Tenancy**. O namespace aparece logo no topo.

Se tudo der certo, você verá:

```
Login Succeeded
```

### 4️⃣ Preparar e Taguear a Imagem

Antes do push, a imagem precisa ser tagueada com o endereço completo do registry. A anatomia de uma tag do OCIR é:

```
<region-key>.ocir.io/<namespace-tenancy>/<nome-repositorio>:<tag>
```

Cada parte tem seu papel:

- **`gru.ocir.io`**: endpoint do registry na região de São Paulo (`gru` é o código da região)
- **`namespace-tenancy`**: identificador único da sua tenancy
- **`nome-repositorio`**: nome que você escolhe para o repositório (pode ter `/` para organizar)
- **`tag`**: versão da imagem

**Exemplos práticos:**

```bash
# Tag simples
docker tag minha-app:latest gru.ocir.io/meunamespace/minha-app:1.0.0

# Organizando por projeto
docker tag minha-app:latest gru.ocir.io/meunamespace/projeto-x/api:1.0.0

# Tag com SHA do commit (ótimo para rastreabilidade)
docker tag minha-app:latest gru.ocir.io/meunamespace/minha-app:a1b2c3d
```

### 5️⃣ Push da Imagem

Agora o momento da verdade — enviar a imagem para o registry:

```bash
docker push gru.ocir.io/meunamespace/minha-app:1.0.0
```

O Docker vai enviar cada **layer** da imagem separadamente. Algo assim aparece no terminal:

```
The push refers to repository [gru.ocir.io/meunamespace/minha-app]
5f70bf18a086: Pushed
a3ed95caeb02: Pushed
8d3ac3489996: Pushed
1.0.0: digest: sha256:abc123... size: 1234
```

> 💡 **Por que layers?** Imagens Docker são compostas por camadas. Se duas imagens compartilham a mesma base (ex: `mcr.microsoft.com/dotnet/aspnet:9.0`), as layers em comum são enviadas uma única vez. Isso economiza tempo e banda — especialmente quando você está fazendo deploys frequentes.

O tempo de push depende do tamanho da imagem e da sua conexão. Uma imagem .NET típica de ~200MB leva algo entre 1 e 5 minutos.

### 6️⃣ Verificação

Depois do push, confirme que a imagem chegou:

1. No console OCI, vá em **Developer Services** > **Container Registry**
2. Selecione a região correta (São Paulo)
3. Procure seu repositório na lista
4. Clique nele para ver as tags disponíveis

Se a imagem aparece lá com a tag correta, missão cumprida.

## Boas Práticas de Versionamento de Imagens

Taguear imagens corretamente é uma daquelas coisas que parece detalhe, mas separa um ambiente organizado de um caos total. Vamos às práticas que funcionam no mundo real.

### Estratégias de Tags

**❌ O que evitar:**

```bash
# Usar apenas "latest" — um convite para problemas
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:latest
```

O `latest` não significa "última versão estável". Significa "a última imagem que recebeu essa tag". Se alguém faz push de uma versão quebrada como `latest`, todo mundo que fizer pull vai receber o problema. Sem rastreabilidade, sem rollback fácil.

**✅ Versionamento Semântico (SemVer):**

O padrão `MAJOR.MINOR.PATCH` dá clareza sobre o que mudou:

- **MAJOR** (1.0.0 → 2.0.0): mudanças que quebram compatibilidade
- **MINOR** (1.0.0 → 1.1.0): novas funcionalidades, sem quebrar nada
- **PATCH** (1.0.0 → 1.0.1): correções de bugs

**✅ Tags com SHA do commit:**

```bash
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:a1b2c3d
```

Perfeito para rastreabilidade. Se algo der errado em produção, você sabe exatamente qual commit gerou aquela imagem.

**✅ Tags com ambiente:**

```bash
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:staging
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:prod
```

**✅ Tags com data (quando relevante):**

```bash
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:2026-02-16
```

### Multi-Tag: A Estratégia Completa

Na prática, a melhor abordagem é aplicar **múltiplas tags** na mesma imagem:

```bash
# Uma imagem, quatro tags — cada uma com seu propósito
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:1.0.0
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:1.0
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:latest
docker tag minha-app:latest gru.ocir.io/namespace/minha-app:a1b2c3d
```

- **`1.0.0`**: versão exata, imutável — usada em produção
- **`1.0`**: aponta para o último patch da minor — útil para staging
- **`latest`**: última versão disponível — só para desenvolvimento
- **`a1b2c3d`**: SHA do commit — rastreabilidade total

### Tags Imutáveis vs Mutáveis

| Tipo         | Exemplo                    | Comportamento                                 | Uso                      |
| ------------ | -------------------------- | --------------------------------------------- | ------------------------ |
| **Imutável** | `1.0.0`, `a1b2c3d`         | Nunca muda. Sempre aponta para a mesma imagem | Produção, rollback       |
| **Mutável**  | `latest`, `staging`, `1.0` | Pode ser reatribuída a uma nova imagem        | Desenvolvimento, staging |

**Regra de ouro**: em produção, **sempre** use tags imutáveis. Você precisa ter certeza de que um `kubectl rollout undo` vai voltar exatamente para a versão anterior, sem surpresas.

## Fluxo Completo

![](/images/2026-02-16-deploy-imagens-docker-oracle-container-registry-oci/image0001.png)

## Utilizando a Imagem

Depois que a imagem está no registry, qualquer serviço autenticado pode consumi-la.

### Pull da Imagem

Qualquer máquina que precise da imagem deve primeiro fazer login no registry (mesmo processo do passo 3) e depois:

```bash
docker pull gru.ocir.io/meunamespace/minha-app:1.0.0
```

### Uso em Docker Compose

```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    image: gru.ocir.io/meunamespace/minha-app:1.0.0
    ports:
      - "8080:8080"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
    restart: unless-stopped
```

> 💡 **Nota**: para que o `docker compose up` funcione, a máquina precisa estar autenticada no registry (`docker login gru.ocir.io`).

### Uso em Kubernetes (OKE)

Para que o Kubernetes consiga puxar imagens de um registry privado, você precisa criar um **Image Pull Secret**:

```bash
kubectl create secret docker-registry ocir-secret \
  --docker-server=gru.ocir.io \
  --docker-username='<namespace>/oracleidentitycloudservice/<usuario>' \
  --docker-password='<auth-token>' \
  --docker-email='<email>'
```

E referenciar no Deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: minha-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: minha-app
  template:
    metadata:
      labels:
        app: minha-app
    spec:
      containers:
        - name: api
          image: gru.ocir.io/meunamespace/minha-app:1.0.0
          ports:
            - containerPort: 8080
      imagePullSecrets:
        - name: ocir-secret
```

## Troubleshooting

### Erro de Autenticação

Se o `docker login` falhar, verifique:

- 🔑 **Auth Token correto**: copie novamente, sem espaços extras
- 👤 **Formato do username**: `namespace/usuario` (IAM) ou `namespace/oracleidentitycloudservice/usuario` (IDCS)
- ⏰ **Token expirado**: Auth Tokens não expiram automaticamente, mas podem ser revogados
- 📋 **Espaços invisíveis**: cuidado ao copiar/colar — editores de texto podem adicionar caracteres invisíveis

### Erro de Permissão

```
denied: Anonymous users are only allowed read access on public repos
```

Isso significa que:

- A política IAM não foi aplicada corretamente
- O usuário não está no grupo certo
- O repositório não existe e o usuário não tem permissão para criá-lo automaticamente

Revise as políticas IAM e confirme que o grupo está correto. Para IDCS, lembre-se do formato `'OracleIdentityCloudService'/<nome-grupo>`.

### Erro de Conectividade

```
Error response from daemon: Get "https://gru.ocir.io/v2/": dial tcp: lookup gru.ocir.io: no such host
```

- 🌐 Verifique sua conexão com a internet
- 🔒 Confirme se não há firewall ou proxy bloqueando `gru.ocir.io` na porta 443
- 🖥️ Teste com `ping gru.ocir.io` ou `curl https://gru.ocir.io/v2/`

## Dicas Avançadas

### Limpeza de Imagens Antigas

Com o tempo, o registry acumula imagens que ninguém mais usa. O console da OCI permite excluir tags manualmente, mas o ideal é automatizar:

- Configure **políticas de retenção** no repositório para remover imagens com mais de X dias
- Em pipelines CI/CD, adicione um step que limpa tags antigas após um deploy bem-sucedido
- Mantenha pelo menos as últimas 5 versões para facilitar rollbacks

### Scan de Vulnerabilidades

O OCIR oferece **scanning de imagens** integrado. Quando habilitado, ele analisa as layers da sua imagem em busca de vulnerabilidades conhecidas (CVEs). Vale a pena ativar, especialmente para imagens que vão para produção.

### Integração com CI/CD

Embora este artigo foque no processo manual, tudo o que fizemos aqui pode (e deve) ser automatizado em uma pipeline. Ferramentas como **OCI DevOps**, **Azure DevOps**, **GitHub Actions** e **GitLab CI** suportam push para o OCIR. O fluxo é o mesmo: login, tag, push — só que executado automaticamente a cada commit ou merge.

## Benefícios do OCIR

### Para Desenvolvedores

- ✅ **Push simples**: mesmo workflow do Docker Hub, sem ferramentas extras
- ✅ **Versionamento**: tags organizadas facilitam rollback
- ✅ **Integração local**: `docker pull` funciona de qualquer lugar autenticado

### Para DevOps/SREs

- ✅ **Segurança**: controle de acesso via IAM, sem credenciais compartilhadas
- ✅ **Automação**: integração nativa com pipelines OCI DevOps
- ✅ **Observabilidade**: logs de acesso e auditoria disponíveis

### Para a Organização

- ✅ **Conformidade**: imagens centralizadas, auditáveis e rastreáveis
- ✅ **Custo**: incluído na infraestrutura OCI, sem custos adicionais significativos
- ✅ **Governança**: políticas de retenção e scanning de vulnerabilidades

## Conclusão

Deploy de imagens para o Oracle Container Registry não é nenhum bicho de sete cabeças. O processo se resume a: **autenticar, taguear e enviar**. Três passos que, uma vez entendidos, se tornam parte natural do seu fluxo de trabalho.

**Principais takeaways:**

1. 🐳 **Container Registries** centralizam e protegem suas imagens
2. 🔐 **Auth Tokens** são a chave de acesso — guarde-os bem
3. 🏷️ **Tags imutáveis** em produção, sempre
4. 📋 **Versionamento semântico** + SHA do commit = rastreabilidade total
5. 🔒 **Políticas IAM** controlam quem pode fazer o quê
6. 🧹 **Limpeza periódica** evita acúmulo de imagens obsoletas
7. 🔄 **Automatize** o processo em pipelines CI/CD o quanto antes

**Próximos passos:**

- Experimente o fluxo completo com uma imagem simples (um Nginx, por exemplo)
- Configure um pipeline de CI/CD que faça o push automaticamente
- Explore o **OKE** para orquestrar seus containers na OCI
- Ative o **scanning de vulnerabilidades** no seu repositório

---

**Referências:**

- [Oracle Container Registry Documentation](https://docs.oracle.com/en-us/iaas/Content/Registry/home.htm)
- [Docker Documentation - docker push](https://docs.docker.com/engine/reference/commandline/push/)
- [OCI IAM Policies](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/policygetstarted.htm)
- [Semantic Versioning 2.0.0](https://semver.org/lang/pt-BR/)
- [OKE - Oracle Kubernetes Engine](https://docs.oracle.com/en-us/iaas/Content/ContEng/home.htm)

---

Centralizar suas imagens num registry privado é o primeiro passo para um fluxo de deploy maduro. Comece simples, automatize aos poucos e evolua. Seu futuro eu agradece.

**Happy Pushing! 🐳🚀**
