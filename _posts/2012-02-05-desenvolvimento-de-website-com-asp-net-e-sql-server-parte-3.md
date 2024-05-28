---
title: 'Desenvolvimento de Website com ASP.NET e SQL Server - Parte 3'
date: Sun, 05 Feb 2012 10:30:26 +0000
draft: false
tags: ['.NET', 'acesso a dados', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'CMS', 'Content Management Systems', 'CSS', 'Desenvolver website', 'Desenvolvimento de Website', 'N-Camadas', 'N-Tier', 'Sistema de gerenciamento de conteúdo', 'Sql Server', 'SQL Server', 'System.Data.OleDb', 'System.Data.SqlClient', 'Visual Studio', 'Visual Studio']
---

Olá caro leitor!

Dando continuidade aos artigos [anterior](https://raphaelcardoso.com.br/tags/desenvolvimento-de-website/) sobre desenvolvimento de website com ASP.NET e SQL Server. Se você ainda não acompanhou essa série de artigos sobre o desenvolvimento de website com ASP.NET e SQL Server acesse:

*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 1](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-1/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 1")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 2](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-2/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 2")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 3](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-3/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 3")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 4](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-4/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 4")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 5](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-5/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 5")

Hoje iremos iniciar o desenvolvimento do painel de controle do nosso website.

A intensão é possibilitar ao usuário uma livre administração do website com criação das páginas e seus respectivos conteúdos. O que estamos fazendo nada mais é que um _CMS (Content Management Systems)_ ou _Sistema de gerenciamento de conteúdo_.

Alguns exemplos de CMS:

*   Wordpress
*   BlogEngine.NET
*   Joomla
*   Drupal

Tudo bem que o nosso humilde website não se compara aos citados, mais o conceito é o mesmo, gerenciar conteúdos. Mais nada impede que possa criar algo semelhante e criar funcionalidades adicionais, pois esse é o caminho. Então vamos ao que interessa.

Para iniciarmos, faça o download do fonte do projeto disponibilizado no [Github](https://github.com/csharpbrasil/projeto-website-aspnet).

Abra o projeto e para iniciar, vamos criar uma pasta chamada _painel_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image001-300x162.jpg "image001")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image001.jpg)

Essa será a pasta que conterá todas as páginas que irá gerenciar nosso website.

Dentro dela iremos criar a página de login. Então clique com o botão direito sobre a pasta painel e clique em _Add New Item_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image002-300x162.jpg "image002")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image002.jpg)

Em seguida defina o nome para a página. O nome será _login.aspx_. Essa página será a responsável por autenticar o usuário.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image003-300x185.jpg "image003")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image003.jpg)

Agora criaremos uma nova pasta para incluirmos o CSS da página de login. Definiremos o nome dá pasta como _css_. Criei também dentro da pasta css um novo arquivo de folha de estilo clicando com o botão direito sobre a pasta css e em seguida _Add New Item_ para criar o arquivo _login.css_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image004-300x162.jpg "image004")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image004.jpg) [![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image005-300x185.jpg "image005")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image005.jpg)

Inclua o CSS abaixo.

\[sourcecode language='css'\] html, body, form { height: 100%; } body { font-family: Tahoma, Verdana, Arial, Sans-Serif, Times New Roman; padding: 0; margin: 0; } #geral { position: relative; min-height: 100%; background-color: #f09942; } \* html #geral { height: 100%; } fieldset { position:absolute; left: 50%; top: 50%; width: 300px; height: 220px; padding: 25px; margin: -135px 0 0 -175px; background-color: #fff; border: 1px solid #fff; -moz-box-shadow: 0 0 15px #2c2d30; -webkit-box-shadow: 0 0 15px #2c2d30; -msie-border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; } fieldset h2 { margin: 0; padding: 0; } fieldset #content\_login { margin: 20px 0; } fieldset label { display: block; padding: 10px 0 0 0; } fieldset input\[type=text\], fieldset input\[type=password\] { width: 100%; } fieldset input\[type=button\], fieldset input\[type=submit\] { background-color: #f09942; padding: 10px; border: 1px solid #f09942; -msie-border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; font-weight: bold; } \[/sourcecode\]

Abra a pagina _login.aspx_ para incluirmos o HTML abaixo.

\[sourcecode language='html'\] <%@ Page Language="C#" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="painel\_login" %> @import url('css/login.css');

Painel de controle
------------------

Usuário Senha  
  

\[/sourcecode\]

Já estamos com nossa página de login definida e agora vamos implementa-la, mais antes precisaremos fazer algumas alterações no banco de dados, na camada de entidade e na camada de negocio.

Para o banco criaremos uma nova tabela chamada _USUARIOS_. Essa tabela será para armazenar os usuários do painel de controle. Abra o _SQL Server Manager_ e execute o script abaixo.

\[sourcecode language='sql'\] CREATE TABLE USUARIOS ( ID\_USUARIO INT IDENTITY(1, 1) NOT NULL, NOME\_USUARIO VARCHAR(40) NOT NULL, EMAIL\_USUARIO VARCHAR(100) NOT NULL, LOGIN\_USUARIO VARCHAR(20) NOT NULL, SENHA\_USUARIO VARCHAR(32) NOT NULL, ATIVO\_USUARIO INT, PRIMARY KEY(ID\_USUARIO) ) \[/sourcecode\]

E agora incluiremos nosso usuário padrão.

\[sourcecode language='sql'\] INSERT INTO USUARIOS(NOME\_USUARIO, EMAIL\_USUARIO, LOGIN\_USUARIO, SENHA\_USUARIO, ATIVO\_USUARIO) VALUES('Administrador', 'admin@admin', 'admin', '21232f297a57a5a743894a0e4a801fc3', 1) \[/sourcecode\]

Teremos então os seguintes dados para acesso ao painel de controle.

*   **Usuario:** _admin_
*   **Senha:** _admin_ (Convertido para MD5)

Já temos nossa tabela de usuários, porem precisaremos cria-la na nossa classe de entidades. Abra-o para incluir uma nova classe. Clique com o botão direito sobre o projeto _WebSite.Entities_ e crie um novo item.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image006-300x162.jpg "image006")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image006.jpg)

Defina o nome como _Usuarios.cs_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image007-300x185.jpg "image007")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image007.jpg)

Vamos definir as propriedades da Classe.

\[sourcecode language='csharp'\] using System; namespace WebSite.Entities { public class Usuarios { public int Id { get; set; } public string Nome { get; set; } public string Email { get; set; } public string Login { get; set; } public string Senha { get; set; } public bool Ativo { get; set; } public Usuarios() { } public Usuarios(int Id) { this.Id = Id; } public Usuarios(string Login) { this.Login = Login; } public Usuarios(string Login, string Senha) { this.Login = Login; this.Senha = Senha; } public Usuarios(int Id, string Nome, string Email, string Login, string Senha, bool Ativo) { this.Id = Id; this.Nome = Nome; this.Email = Email; this.Login = Login; this.Senha = Senha; this.Ativo = Ativo; } } } \[/sourcecode\]

Já temos definido como será nossa entidade. Agora podemos partir para a atualização da camada de negocio. Abra o projeto _WebSite.Business_ e crie uma nova classe chamado de _Usuario.cs_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image008-300x162.jpg "image008")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image008.jpg) [![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image007-300x185.jpg "image007")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image007.jpg)

Implemente-a conforme o código abaixo.

\[sourcecode language='csharp'\] using System; using System.Collections.Generic; using System.Text; using System.Configuration; using System.Data; using System.Linq; namespace WebSite.Business { public class Usuarios { private string ConnectionString = ConfigurationManager.ConnectionStrings\["DBConnection"\].ConnectionString; public bool Erro { get; set; } public string MensagemErro { get; set; } public Usuarios() { this.Erro = false; this.MensagemErro = string.Empty; } public Entities.Usuarios AutenticaUsuario(string Login, string Senha) { Entities.Usuarios\[\] usuarios = ListaUsuarios(new Entities.Usuarios(Login, Senha)); Entities.Usuarios usuario = usuarios.FirstOrDefault(); if (usuario == null) { this.Erro = true; this.MensagemErro = "Usuário ou senha inválido"; } return usuario; } public bool LoginCadastrado(string Login) { Entities.Usuarios\[\] usuarios = ListaUsuarios(new Entities.Usuarios(Login)); Entities.Usuarios usuario = usuarios.FirstOrDefault(); bool existe = usuario != null &amp;&amp; usuario.Id > 0; return existe; } public Entities.Usuarios\[\] ListaUsuarios() { return ListaUsuarios(null); } public Entities.Usuarios\[\] ListaUsuarios(Entities.Usuarios usuario) { List lstUsuarios = new List(); Data.Connection connection = new Data.Connection(this.ConnectionString); connection.AbrirConexao(); StringBuilder sqlString = new StringBuilder(); sqlString.AppendLine("select \* from usuarios"); if (usuario != null) { sqlString.AppendLine("where 1 = 1"); if (usuario.Id > 0) { sqlString.AppendLine("and id\_usuario = " + usuario.Id + ""); } if (!string.IsNullOrEmpty(usuario.Login) &amp;&amp; usuario.Login.Length > 0) { sqlString.AppendLine("and login\_usuario like '" + usuario.Login.Replace("'", "''") + "'"); } if (!string.IsNullOrEmpty(usuario.Senha) &amp;&amp; usuario.Senha.Length > 0) { sqlString.AppendLine("and senha\_usuario = '" + usuario.Senha + "'"); } } IDataReader reader = connection.RetornaDados(sqlString.ToString()); int idxId = reader.GetOrdinal("ID\_USUARIO"); int idxNome = reader.GetOrdinal("NOME\_USUARIO"); int idxEmail = reader.GetOrdinal("EMAIL\_USUARIO"); int idxLogin = reader.GetOrdinal("LOGIN\_USUARIO"); int idxSenha = reader.GetOrdinal("SENHA\_USUARIO"); int idxAtivo = reader.GetOrdinal("ATIVO\_USUARIO"); while (reader.Read()) { Entities.Usuarios \_Usuario = new Entities.Usuarios(); \_Usuario.Id = reader.GetInt32(idxId); \_Usuario.Nome = reader.GetString(idxNome); \_Usuario.Email = reader.GetString(idxEmail); \_Usuario.Login = reader.GetString(idxLogin); \_Usuario.Senha = reader.GetString(idxSenha); \_Usuario.Ativo = reader.GetInt32(idxAtivo) == 1; lstUsuarios.Add(\_Usuario); } connection.FechaConexao(); return lstUsuarios.ToArray(); } public bool SalvaUsuario(Entities.Usuarios usuario) { bool salvou = false; if (usuario != null) { Data.Connection connection = new Data.Connection(this.ConnectionString); connection.AbrirConexao(); StringBuilder sqlString = new StringBuilder(); if (usuario.Id > 0) { sqlString.AppendLine("update usuarios set"); sqlString.AppendLine("nome\_usuario = '" + usuario.Nome.Replace("'", "''") + "',"); sqlString.AppendLine("email\_usuario = '" + usuario.Email.Replace("'", "''") + "',"); sqlString.AppendLine("login\_usuario = '" + usuario.Login.Replace("'", "''") + "',"); sqlString.AppendLine("ativo\_usuario = " + (usuario.Ativo ? 1 : 0) + " "); sqlString.AppendLine("where id\_usuario = " + usuario.Id + ""); } else { if (!LoginCadastrado(usuario.Login)) { sqlString.AppendLine("insert into usuarios(nome\_usuario, email\_usuario, login\_usuario, senha\_usuario, ativo\_usuario)"); sqlString.AppendLine("values('" + usuario.Nome.Replace("'", "''") + "', '" + usuario.Email.Replace("'", "''") + "', '" + usuario.Login.Replace("'", "''") + "', '" + usuario.Senha.Replace("'", "''") + "', " + (usuario.Ativo ? 1 : 0) + ")"); } else { this.Erro = true; this.MensagemErro = "Login já está sendo utilizado."; } } int i = connection.ExecutaComando(sqlString.ToString()); salvou = i > 0; connection.FechaConexao(); } return salvou; } public bool SalvaUsuario(int Id, string Nome, string Email, string Login, string Senha, bool Ativo) { return SalvaUsuario(new Entities.Usuarios(Id, Nome, Email, Login, Senha, Ativo)); } public bool ExcluiUsuario(Entities.Usuarios usuario) { bool salvou = false; if (usuario != null &amp;&amp; usuario.Id > 0) { Data.Connection connection = new Data.Connection(this.ConnectionString); connection.AbrirConexao(); StringBuilder sqlString = new StringBuilder(); sqlString.AppendLine("delete from usuarios"); sqlString.AppendLine("where id\_usuario = " + usuario.Id + ""); int i = connection.ExecutaComando(sqlString.ToString()); connection.FechaConexao(); } return salvou; } public bool ExcluiUsuario(int Id) { return ExcluiUsuario(new Entities.Usuarios(Id)); } } } \[/sourcecode\]

Pronto! Temos nossa nova tabela criada, camada de entidades e camada de negócios atualizada.

Como pode ver, a nossa classe _Usuarios_ da camada de negocio em partes possui as mesmas funcionalidades que a classe Paginas. O seu único diferencia é os métodos para verificar se o login do usuário já esta cadastrado e o método para autenticar o usuário.

Outro detalhe é as propriedades criadas para retorno de mensagem de erro caso ocorra. No caso de utilizarmos o método _LoginCadastrado_ para verificar se um determinado login está em uso e esse esteja poderemos retornar uma mensagem por meio da propriedade _MensagemErro_.

Vamos implementar agora a página _login.aspx_. Para isso abra a página de login para adicionarmos evento ao botão de autenticação. De duplo clique sobre ele e vamos adicionar o código do evento _btnAutenticar\_Click_.

\[sourcecode language='csharp'\] protected void btnAutenticar\_Click(object sender, EventArgs e) { string Login = txtUsuario.Text; string Senha = txtSenha.Text; Senha = FormsAuthentication.HashPasswordForStoringInConfigFile(Senha, "MD5"); WebSite.Business.Usuarios usuariosBO = new WebSite.Business.Usuarios(); WebSite.Entities.Usuarios usuario = usuariosBO.AutenticaUsuario(Login, Senha); if (!usuariosBO.Erro &amp;&amp; usuario.Id > 0) { Response.Redirect("default.aspx"); } else { ScriptManager.RegisterClientScriptBlock(this, typeof(Page), "msgbox", "alert('" + usuariosBO.MensagemErro + "')", true); } } \[/sourcecode\]

No evento do botão iremos recuperar os dados digitados pelo usuário nos TextBox. No caso da senha, iremos converte-lo para _MD5_ e instanciar nossa camada de negocio para autenticar o usuário e redireciona-lo para a página principal e caso ele não tenha fornecido sua credencial corretamente será notificado.

Veja como ficou minha tela de login do painel de controle.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image009-300x184.jpg "image009")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image009.jpg)

No próximo artigo iremos criar as páginas internas, controle de sessão e segurança do nosso painel de controle. Veja alguns dos tópicos que abordaremos no próximo artigo.

*   Controle de sessão
*   Criação das telas de gerenciamento de usuário

Fonte do projeto: [Github](https://github.com/csharpbrasil/projeto-website-aspnet)

Não deixe de participar do fórum. Siga o C# Brasil no Twitter e Facebook.

Até o próximo artigo e bons estudos!