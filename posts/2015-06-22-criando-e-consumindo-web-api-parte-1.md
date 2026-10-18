---
title: 'Criando e consumindo Web API - Parte 1'
date: Mon, 22 Jun 2015 10:30:05 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET Web API', 'C#', 'Controller', 'Cors', 'Desenvolvimento web', 'Desenvolvimento Web API', 'Dicas', 'HttpGet', 'HttpPost', 'JSON', 'Microsoft.AspNet.Cors', 'Microsoft.Owin', 'Postman', 'Unity', 'Web API', 'Web API']
---

Antes de iniciar o desenvolvimento de uma Web API é importante entender o que é, qual a sua finalidade e a forma como ela funciona.

Para quem não conhece, uma Web API é um conjunto definido de mensagens de requisição e resposta HTTP, geralmente expressado nos formatos XML ou JSON.

Todos nós já tivemos contato de alguma forma com um serviço desse tipo, seja algum site que utilize no dia-a-dia, ou em um dos nossos aplicativos favoritos instalados no smartphone ou tablet. Um exemplo desses aplicativos são o Facebook, Twitter, Linkedin e até jogos utilizam-se de Web API. Então, se está planejando criar algum projeto novo, talvez esse seja um caminho a se analisar.

Para que você entenda melhor o funcionamento de uma Web API, vamos descrever de forma simples um cenário de funcionamento de Web API, como por exemplo a utilizada pelo seu aplicativo do Facebook. Considerando que ele está instalado em seu smartphone:

*   Você informa seus dados de login
    
*   O aplicativo grava localmente os dados e envia-os a um servidor de autenticação para geração do Token
*   Caso os dados sejam validos, é retornado o token para o aplicativo
*   Para realizar a consulta dos post de sua linha, o aplicativo requisita as informações ao servidor utilizando o token para validação

Veja abaixo de forma ilustrada como funciona basicamente a requisição, a autenticação e retorno dos dados para o usuário.

![Autenticaçãoo Web API](/contents/2015/06/autenticacao_web_api.png)

Para conhecer mais sobre o detalhes do funcionamento do Web API, indico o [e-Book do Israel Aece](http://israelaece.com/post/e-Book-Introducao-ao-ASPNET-Web-API.aspx) que alem de gratuito possui um excelente conteúdo para aprendizado.

Iniciaremos então a criação de um novo projeto, para isso, indico o uso do [Visual Studio Community 2013](https://www.visualstudio.com/) que alem de completo também é gratuito.

Primeiramente, abra o Visual Studio e clique nome menu _File > New > Project_ e crie um novo projeto web utilizando o template **ASP.NET Web Application** e utilizando o **.NET Framework 4.5**. Defina um nome e caminho para ele. No meu caso, simplesmente se chamara **ProjetoAspNetWebApi**.

![criando_e_consumindo_webapi_001](/contents/2015/06/criando_e_consumindo_webapi_001.png)

Após clicar em OK para confirmar, uma nova janela é exibida para selecionar detalhes de nosso ASP.NET Web Application. Nele é possível definirmos templates do tipo WebForms, MVC, Web API, Single Page Application, Azure Mobile Service e Empty. No nosso caso selecionaremos o template Empty para que possamos adicionar somente as bibliotecas e estrutura que são realmente necessários para nosso projeto.

![criando_e_consumindo_webapi_002](/contents/2015/06/criando_e_consumindo_webapi_002.png)

Feito isso, agora vamos a lista de bibliotecas necessárias:

*   **[DotNetZip](https://www.nuget.org/packages/DotNetZip/):** Biblioteca de compressão;
*   **[Microsoft.AspNet.Cors](https://www.nuget.org/packages/Microsoft.AspNet.Cors/):** Biblioteca que permitir Cross-Origin Resource Sharing (CORS) em ASP.NET;
*   **[Microsoft.AspNet.WebApi.Client](https://www.nuget.org/packages/Microsoft.AspNet.WebApi.Client/):** Biblioteca que adiciona suporte para formatação de conteúdo para System.Net.Http incluindo suporte para JSON e XML;
*   **[Microsoft.AspNet.WebApi.Core](https://www.nuget.org/packages/Microsoft.AspNet.WebApi.Core/):** Biblioteca que contém o core para ASP.NET API Web;
*   **[Microsoft.AspNet.WebApi.Owin](https://www.nuget.org/packages/Microsoft.AspNet.WebApi.Owin/):** Biblioteca que permite a hospedagem de ASP.NET Web API dentro de um servidor Owin e fornece acesso a recursos adicionais.
*   **[Microsoft.Bcl](https://www.nuget.org/packages/Microsoft.Bcl/):** Biblioteca com componentes adicionais;
*   **[Microsoft.Bcl.Build](https://www.nuget.org/packages/Microsoft.Bcl.Build/):** Biblioteca com componentes adicionais;
*   **[Microsoft.Bcl.Compression](https://www.nuget.org/packages/Microsoft.Bcl.Compression/):** Biblioteca que permite a projetos voltados diretamente para Windows Phone Silverligth 8 ou usando bibliotecas portaveis usem as classes ZipArchive, GZipStream e DeflateStream;
*   **[Microsoft.Net.Http](https://www.nuget.org/packages/Microsoft.Net.Http):** Biblioteca que inclui HttpClient para envio de pedidos através de HTTP, bem como HttpRequestMessage e HttpResponseMessage para o processamento de mensagens HTTP;
*   **[Microsoft.Owin](https://www.nuget.org/packages/Microsoft.Owin/):** Biblioteca que fornece um conjunto de componentes para auxiliar e simplificar a criação de componentes Owin;
*   **[Microsoft.Owin.Cors](https://www.nuget.org/packages/Microsoft.Owin.Cors/):** Biblioteca que contém os componentes para habilitar o Cross-Origin Resource Sharing (CORS);
*   **[Microsoft.Owin.Host.SystemWeb](https://www.nuget.org/packages/Microsoft.Owin.Host.SystemWeb/):** Biblioteca do servidor Owin que permite que aplicativos baseados em Owin sejam executados no IIS usando o pipeline de solicitação do ASP.NET;
*   **[Microsoft.Owin.Security](https://www.nuget.org/packages/Microsoft.Owin.Security/):** Biblioteca que contem tipos comuns relacionados a autenticação;
*   **[Microsoft.Owin.Security.OAuth](https://www.nuget.org/packages/Microsoft.Owin.Security.OAuth):** Biblioteca que contem tipos comuns relacionados a autenticação OAuth;
*   **[Newtonsoft.Json](https://www.nuget.org/packages/newtonsoft.json/):** Biblioteca JSON de alta performance;
*   **[Owin](https://www.nuget.org/packages/Owin/):** Biblioteca de interface de inicialização;
*   **[Strathweb.CacheOutput.WebApi2](https://www.nuget.org/packages/Strathweb.CacheOutput.WebApi2/):** Biblioteca que cuida do cache do lado do servidor semelhante ao OutputCache do MVC;
*   **[Unity](https://www.nuget.org/packages/Unity/):** Biblioteca de injeção de dependências.

Agora que você conheceu um pouco de cada uma das biliotecas, vamos iniciar a instalação em nosso projeto. Será necessário utilizar o Nuget no Visual Studio para inclusão das bibliotecas.

Existem 2 formar de incluir as bibliotecas pelo Nuget. Uma é usando o **Package Manager Console** e a outra é o **Manage Nuget Package for Solution**. Eu prefiro o segundo, porem como forma de aprendizado e para agilizar, vou fazer da primeira forma pois assim passo as linhas de comando para incluir as biblioteca.

![criando_e_consumindo_webapi_003](/contents/2015/06/criando_e_consumindo_webapi_003.png)

Abra o **Package Manager Console** e digite as linhas abaixo ou simplesmente copie e cole.

[code='powershell'] Install-Package DotNetZip Install-Package Microsoft.AspNet.Cors Install-Package Microsoft.AspNet.WebApi.Client Install-Package Microsoft.AspNet.WebApi.Core Install-Package Microsoft.AspNet.WebApi.Owin Install-Package Microsoft.Bcl Install-Package Microsoft.Bcl.Build Install-Package Microsoft.Bcl.Compression Install-Package Microsoft.Net.Http Install-Package Microsoft.Owin Install-Package Microsoft.Owin.Cors Install-Package Microsoft.Owin.Host.SystemWeb Install-Package Microsoft.Owin.Security Install-Package Microsoft.Owin.Security.OAuth Install-Package Newtonsoft.Json Install-Package Owin Install-Package Strathweb.CacheOutput.WebApi2 Install-Package Unity ```

Após copiar as linhas acima e colocar teremos todas as bibliotecas e suas dependências adicionas.

![criando_e_consumindo_webapi_004](/contents/2015/06/criando_e_consumindo_webapi_004.png)

Para que possamos começar a utilizar nosso ASP.NEt Web API e começar implementar as rotas, é preciso criar a classe de Startup que será responsável por inicializar as configurações da API. Na raiz do nosso projeto, crie uma nova classe chamada **Startup.cs**. Para isso clique com o botão direto em cima do Projeto e clique em _Add > Class_.

![criando_e_consumindo_webapi_005](/contents/2015/06/criando_e_consumindo_webapi_005.png)

A classe criada terá o código abaixo:

```csharp 
using Newtonsoft.Json; using Newtonsoft.Json.Serialization; using Owin; using System.Web.Http; ```
```csharp 
public class Startup { public void Configuration(IAppBuilder app) { HttpConfiguration config = new HttpConfiguration(); var formatters = config.Formatters; formatters.Remove(formatters.XmlFormatter); var jsonSettings = formatters.JsonFormatter.SerializerSettings; jsonSettings.Formatting = Formatting.Indented; jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver(); formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects; config.MapHttpAttributeRoutes(); config.Routes.MapHttpRoute( name: "DefaultRoute", routeTemplate: "api/{controller}/{id}", defaults: new { id = RouteParameter.Optional } ); app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll); app.UseWebApi(config); } } ```

O que esse código faz é, remover o formato XML e adicionar o formato JSON alem de definir nossa mapa da rota.

Crie uma nova pasta na raiz do projeto com o nome de **Controllers**. É nessa pasta que adicionaremos nossos controllers.

Clique com o botão direito em cima da pasta criada e clique em _Add > Controller_.

![criando_e_consumindo_webapi_006](/contents/2015/06/criando_e_consumindo_webapi_006.png)

Na nova janela, escolha o Scaffold **Web API 2 Controller - Empty**.

![criando_e_consumindo_webapi_007](/contents/2015/06/criando_e_consumindo_webapi_007.png)

Defina um nome para o seu controller. Sugiro colocar o nome como _DefaultController_.

![criando_e_consumindo_webapi_008](/contents/2015/06/criando_e_consumindo_webapi_008.png)

Com o controller criado, criaremos então alguns métodos para nosso controller e definiremos as rotas.

Defina o RoutePrefix para o Controller, ficando conforme código abaixo.

```csharp 
[RoutePrefix("api/meuprojeto")] public class DefaultController : ApiController { } ```

O exemplo acima estabelecemos que quando for chamado a url com o prefixo **api/meuprojeto**, será direcionado para esse controller que acabamos de criar.

Agora crie o método abaixo dentro do controller.

```csharp 
[RoutePrefix("api/meuprojeto")] public class DefaultController : ApiController { [HttpGet] [Route("datahora/consulta")] public HttpResponseMessage GetDataHoraServidor() { try { var dataHora = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"); return Request.CreateResponse(HttpStatusCode.OK, dataHora); } catch (Exception ex) { return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); } } } ```

Como pode ver no exemplo, criamos um método do tipo _HttpGet_ com a rota _datahora/consulta_ que no final, quando formos chamar-la no browser, chamaremos pela url _http://{servidor}/api/meuprojeto/datahora/consulta_.

![criando_e_consumindo_webapi_009](/contents/2015/06/criando_e_consumindo_webapi_009.png)

Podemos também criar um método utilizando-se do uso de parâmetros para consulta.

```csharp 
[HttpGet] [Route("consulta/cliente/{id:int}")] public HttpResponseMessage GetClientePorId(int id) { try { var clientes = new[] { new { Id = 1, Nome = "Pedro", DataNascimento = new DateTime(1954, 2, 1) }, new { Id = 2, Nome = "Paulo", DataNascimento = new DateTime(1944, 4, 12) }, new { Id = 3, Nome = "Fernando", DataNascimento = new DateTime(1963, 5, 9) }, new { Id = 4, Nome = "Maria", DataNascimento = new DateTime(1984, 4, 30) }, new { Id = 5, Nome = "João", DataNascimento = new DateTime(1990, 3, 14) }, new { Id = 6, Nome = "Joana", DataNascimento = new DateTime(1974, 6, 19) } }; var cliente = clientes.Where(x => x.Id == id).FirstOrDefault(); if (cliente == null) throw new Exception("Cliente não encontrado"); return Request.CreateResponse(HttpStatusCode.OK, cliente); } catch (Exception ex) { return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); } } ```

No exemplo criamos um novo método que recebe um parâmetro do tipo _int_, que é do tipo _HttpGet_ que possui a rota _consulta/cliente/{id:int}_. Quando for chamar no browser essa url, chamaremos pela url _http://{servidor}/api/meuprojeto/consulta/cliente/{id}_, onde {id} é o id que queremos consultar.

![criando_e_consumindo_webapi_010](/contents/2015/06/criando_e_consumindo_webapi_010.png)

Ainda no exemplo, caso passemos um id que não existe, iremos acionar um Exception que por sua vez cairá na tratativa do _try catch_ e retornará um _BadRequest_.

![criando_e_consumindo_webapi_011](/contents/2015/06/criando_e_consumindo_webapi_0111.png)

Até aqui fizemos alguns exemplos de _HttpGet_, agora vou exemplificar como fazer uso do _HttpPost_ para submeter objetivos mais complexos.

Primeiro criaremos a classe _Cliente_.

```csharp 
public class Cliente { public string Nome { get; set; } } ```

E agora criaremos o nosso método de _HttpPost_.

```csharp 
[HttpPost] [Route("cadastrar")] public HttpResponseMessage PostCadastro(Cliente cliente) { try { return Request.CreateResponse(HttpStatusCode.OK, "Cadastro do usuário " + cliente.Nome + " realizado."); } catch (Exception ex) { return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); } } ```

No exemplo criamos um novo método que não recebe nenhum parâmetro pela url como ocorre com os HttpGet. Nesse caso, os dados precisam ser submetidos para a url e nesse caso vou testar usando o aplicativo [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) para o Google Chrome.

Para testar, abra o Postman e selecione o tipo de requisição. No caso usaremos o _Post_. Informe a url, selecione o formato _raw_ e o tipo de dados a ser submetido como _JSON (application/json)_ e informe o JSON.

[code='javascript'] { "Nome":"Raphael Cardoso" }
 ``` 
![criando_e_consumindo_webapi_012](/contents/2015/06/criando_e_consumindo_webapi_012.png)

Você aprendeu de forma simples a criação de uma Web API. Poderá tranquilamente explorar o que foi passado criando novos métodos que recebam parametros diferentes ou até mesmo que utilize de objetos mais complexos ao realizar um HttpPost.

Na próxima parte, veremos como utilizar de conexão com banco de dados em nossa Web API e possibilitar realização de CRUD (Create, Read, Update, Delete).

Em caso de dúvida, utilize os comentários ou publique sua dúvida no fórum.

Fonte do projeto: [Github](https://github.com/csharpbrasil/AspNetWebApi).

Abraço e até a próxima!