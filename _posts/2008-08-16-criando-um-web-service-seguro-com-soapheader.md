---
title: 'Criando um Web Service seguro com SoapHeader'
date: Sat, 16 Aug 2008 00:00:05 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'C#', 'SoapHeader', 'SqlAdapter', 'SqlClient', 'SqlCommand', 'SqlConnection', 'Visual Studio', 'Visual Studio', 'WebMethod', 'WebService']
---

Olá pessoa, como meu primeiro artigo vou iniciar uma breve explicação de como criar um WebService seguro utilizando o SoapHeader e como acessar os seus métodos utilizando o ObjectDataSource com GridView. Apesar de o artigo estar com exemplos em C-Sharp, você poderá tranquilamente aplicá-lo em VB.NET, basta um pouco de vontade.  
  
Não irei entrar em detalhes de como criar uma conexão passo a passo, vou levar em consideração que você já sabe como fazer e esta a procura de como adicionar mais segurança a seu Web Service, mais prometo criar um artigo especialmente com esse assunto.  
  
**1- Criando o WebService**  
Crie um novo Web Service, onde inicialmente seu código será como esse:

\[sourcecode language='csharp'\] /// /// Summary description for MeuWebService /// \[WebService(Namespace = "http://tempuri.org/")\] \[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1\_1)\] public class MeuWebService : System.Web.Services.WebService { public MeuWebService() { //Uncomment the following line if using designed components //InitializeComponent(); } \[WebMethod\] public string HelloWorld() { return "Hello World"; } } \[/sourcecode\]

**2- Adicionando um novo método**  
Crie um método onde esse retorne um DataSet para mais tarde ser consumido por uma aplicação, que no nosso caso será um WebForm:

\[sourcecode language='csharp'\] \[WebMethod(Description = "Retorna todos os clientes cadastrados")\] public DataSet getClientes() { DataSet dsClientes = null; string connectionString = "Data Source=seu\_servidor\_sql;User Id=seu\_usuario;Password=sua\_senha;Initial Catalog=seu\_bd;"; StringBuilder sqlString = new StringBuilder(); sqlString.Append(" SELECT \* FROM CLIENTES "); using (System.Data.SqlClient.SqlConnection connection = new System.Data.SqlClient.SqlConnection(connectionString)) { connection.Open(); using (System.Data.SqlClient.SqlCommand command = new System.Data.SqlClient.SqlCommand()) { command.Connection = connection; command.CommandText = sqlString.ToString(); using (System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(command)) { adapter.Fill(dsClientes); } } } return dsClientes; } \[/sourcecode\]

Pronto, já possuímos um Web Service capaz de retornar um DataSet contendo as informações que desejamos, porem esse poderá ser consumido por qualquer aplicação uma vez que for publicada na internet. Então imagine o seguinte cenário, seu Web Service possui tambem um método capaz de excluir todos os seu cliente cadastrado. Isso seria catastrófico. Com essa dica abaixo será possível proteger facilmente o Web Service impedindo que outras aplicações, por mais que estejam acessando o Web Service, não sejam capaz de executar os métodos sem autenticação.  
  
**3- Criando a classe de segurança**  
Crie uma nova classe herdando a classe SoapHeader como no exemplo abaixo:

\[sourcecode language='csharp'\] public class SegurancaClientes : SoapHeader { public string Usuario; public string Senha; } \[/sourcecode\]

Você poderá adiciona-lo logo abaixo da declaração dos Namespaces ou criar um novo arquivo de Classe.  
Agora dentro do Web Service você deverá estanciar essa nova classe:

\[sourcecode language='csharp'\] public SegurancaClientes Credencial = new SegurancaClientes(); \[/sourcecode\]

Agora atribua o seguinte código antes da declaração do WebMethod.

\[sourcecode language='csharp'\] \[SoapHeader("Credencial")\] \[WebMethod(... \[/sourcecode\]

Apesar de termos criado o Cabeçalho de autenticação do nosso Web Service utilizando o SoapHeader, não quer dizer que ele está protegido.  
  
**4- Como autenticar o WebService**  
Será necessário criar um novo método, só que esse não irá conter a declaração de \[WebMethod\], será do tipo private e não precisaremos passar nenhum argumento. Crie um método simples que retorne o Tipo Boolean ou bool e dentro dele crie seu esquema de autenticação utilizando os parâmetros do SoapHeader como no exemplo abaixo.

\[sourcecode language='csharp'\] private Boolean Autenticou() { Boolean Autenticou = false; string Usuario = "admin"; string Senha = "123456"; if (Credencial.Usuario == Usuario && Credencial.Senha == Senha) { Autenticou = true; } return Autenticou; } \[/sourcecode\]

A Credencial.Usuario e Credencial.Senha são as informação que virão de fora do Web Service pela classe de segurança.  
  
Feito tudo isso nosso método de retorno de clientes ficara assim:

\[sourcecode language='csharp'\] \[SoapHeader("Credencial")\] \[WebMethod(Description = "Retorna todos os clientes cadastrados")\] public DataSet getClientes() { if (!Autenticou()) { throw new Exception("Erro: Usuário não autenticado."); } DataSet dsClientes = null; string connectionString = "sua\_connection\_string"; StringBuilder sqlString = new StringBuilder(); sqlString.Append(" SELECT \* FROM CLIENTES "); using (System.Data.SqlClient.SqlConnection connection = new System.Data.SqlClient.SqlConnection(connectionString)) { connection.Open(); using (System.Data.SqlClient.SqlCommand command = new System.Data.SqlClient.SqlCommand()) { command.Connection = connection; command.CommandText = sqlString.ToString(); using (System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(command)) { adapter.Fill(dsClientes); } } } return dsClientes; } \[/sourcecode\]

Quando nosso método for invocado de uma aplicação e ele não tiver passado antes a autenticação, ou seja se retornar false, será gerando um Exception para a aplicação e a chamada será interrompida. Abaixo o retorno do erro:  
  
[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/soapheader01-1.jpg "soapheader01")](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/soapheader01-1.jpg)  
  
**5- Consumindo o Web Service e Autenticando um ObjectDataSource**  
  
Adicione em seu WebForm um GridView, um ObjectDataSource e faça as devidas configurações para que ele acesse o WebService e o método desejado.  
Feito isso, atribua o evento ObjectCreating ao ObjectDataSource que será onde passaremos nossa autenticação da aplicação como no exemplo abaixo:

\[sourcecode language='csharp'\] protected void objClientes\_ObjectCreating(object sender, ObjectDataSourceEventArgs e) { SegurancaClientes Credencial = new SegurancaClientes(); Credencial.Usuario = "admin"; Credencial.Senha = "123456"; Clientes clientes = new Clientes(); clientes.SegurancaClientesValue = Credencial; e.ObjectInstance = clientes; } \[/sourcecode\]

O que ocorrerá acima? Quando o ObjectDataSource for criado no momento que a pagina for carregada (no caso dos WebForms) será realizado a criação do Cabeçalho com a autenticação e enviado para o ObjectDataSource para que ele possa utilizá-lo para autenticar quando os nossos outros métodos forem invocados. Se falhar a autenticação, será gerado um Exception com a mensagem de erro.  
  
[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/soapheader01-1.jpg "soapheader01")](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/soapheader01-1.jpg)  
  
Basicamente é isso. Mesmo que você não utilize o ObjectDataSource para consumir seus métodos do Web Service, você poderá chamar seu método informando qual a classe de segurança.  
Espero que esse artigo tenha sido de grande utilidade e caso tenham duvida deixem seus comentários.  
  
Abraço e sucesso!!!