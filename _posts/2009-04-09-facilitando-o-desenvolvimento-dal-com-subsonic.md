---
title: 'Facilitando o desenvolvimento DAL com SubSonic'
date: Thu, 09 Apr 2009 20:44:34 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'DAL', 'MySql', 'Oracle', 'Sql Server', 'SubSonic', 'SubSonic', 'VB.NET', 'VB.NET', 'Visual Studio', 'Visual Studio']
---

O SubSonic é uma tecnologia open source que cria toda a camada de acesso a dados (DAL - Data Access Layer) de nosso projeto em .NET e que tem como líder Rob Conery.

Ele cria toda nossa camada de acesso a dados (DAL) em tempo de compilação, ficando somente em nossa responsabilidade utilizá-lo.

Atualmente ele suporta quase todos os bancos de dados do mercado como:

*   SQL Server 2000 or 2005
*   MySQL
*   Oracle

Para utiliza-lo em nossos projetos, basta acessar o link e fazer o download:

*   [Download do SubSonic 2.1](http://code.google.com/p/subsonicproject/downloads/list)

Sempre que um novo objeto é adicionado ou excluído é necessário recompilar nossa aplicação para ter acesso a ele no código fonte.

Para que você entenda bem seu funcionamento, vamos a prática.

Inicie um novo projeto ASP.NET Web Site.

 [![usandosubsonic01](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic01-1-300x195.jpg "usandosubsonic01")](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic01-1.jpg) 

Adicione a referência ao SubSonic que se encontra no diretório da _C:\\Program Files\\SubSonic\\SubSonic 2.1 Final (no meu caso a versão do SubSonic é 2.1 Final)_.

Foi criado em nosso projeto do diretório Bin (diretório das Referencias adicionadas ao projeto) com o SubSonic e todas as demais referencias que ele precisa. Veja a imagem abaixo:

 [![usandosubsonic02](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic02-1-300x279.jpg "usandosubsonic02")](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic02-1.jpg) 

Agora criaremos o diretório App\_Code e adicionaremos um arquivo com extensão abp no mesmo com o nome de subsonic.abp.

 [![usandosubsonic03](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic03-1-191x300.jpg "usandosubsonic03")](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic03-1.jpg) [ ![usandosubsonic04](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic04-1-244x300.jpg "usandosubsonic04") ](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic04-1.jpg) [![usandosubsonic05](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic05-1-300x198.jpg "usandosubsonic05")](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/usandosubsonic05-1.jpg) 

Esse arquivo será utilizado pelo SubSonic como arquivo temporário para gerar o código DAL no momento da compilação.

Abra o Web.config para realizarmos a configuração necessárias.

Adicionaremos o configSections...

\[sourcecode language='xml'\]

\[/sourcecode\]

... a ConnectionString ...

\[sourcecode language='xml'\] \[/sourcecode\]

... adicione também o Provider do SubSonic, no meu caso utilizarei o SubSonic.MySqlDataProvider para utilizar o banco de dados MySql, caso queira utilizar SQL Server use o SubSonic.SqlDataProvider...

\[sourcecode language='xml'\] \[/sourcecode\]

... e por fim o BuildProvider.

\[sourcecode language='xml'\] \[/sourcecode\]

Seu Web.Config deverá ficar parecido com o meu.

\[sourcecode language='xml'\] < ?xml version="1.0"?>

\[/sourcecode\]

Se quiser, pode configurar um banco de dados que você já tenha criado, acredito que será muito mais interessante e assim poderá fazer um comparativo do tempo de desenvolvimento.

Até aqui não gastamos muito tempo para configurar e isso não será diferente para desenvolver.

Antes de começarmos a codificar, vamos dar um Build em nosso projeto apertando _F6_ para que o SubSonic crie a DAL do nosso projeto e agora sim criaremos nosso SELECT e preencher o GridView com as informações.

Adicione a namespace de referencia ao SubSonic e a nossa DAL no CodeBehind

\[sourcecode language='csharp'\] using ArtigoSubSonic; using SubSonic; using System.Data; \[/sourcecode\]

ArtigoSubSonic é o nome da namespace que definimos no nosso Web.Config

Em nossa página Default.aspx adicione um GridView e vá ao fonte para adicionar um código no Page\_Load.

Abaixo temos o código para retornar os dados da tabela _Clientes_

\[sourcecode language='csharp'\] // Retorna os Clientes GridView1.DataSource = Cliente.FetchAll(); GridView1.DataBind(); \[/sourcecode\]

Adicionar...

\[sourcecode language='csharp'\] // Adiciona Cliente Cliente cliente = new Cliente(); cliente.Nome = "Marcos"; cliente.Sobrenome = "Prado"; cliente.Cidade = "Belo Horizonte"; cliente.Telefone = "34-4125-4711"; cliente.Save(); \[/sourcecode\]

Atualizar...

\[sourcecode language='csharp'\] // Atualizar Cliente Cliente cliente = new Cliente(4); cliente.Nome = "Marcos"; cliente.Sobrenome = "Prado Silva"; cliente.Cidade = "Belo Horizonte"; cliente.Telefone = "34-4125-4711"; cliente.Save(); \[/sourcecode\]

Apagar...

\[sourcecode language='csharp'\] // Apaga Cliente informando o ID Cliente.Delete(5); \[/sourcecode\]

Simples? Imagine se tivessemos que criar a conexão com o banco, montar toda a nossa DAL manualmente?

Acesse também o site oficial: http://subsonicproject.com/

Agora basta explorar as funcionalidades e facilidade do SubSonic.

E Apesar de nosso foco ser sempre C# o mesmo pode ser veito em VB.NET

Abraço e sucesso!!!