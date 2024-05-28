---
title: 'Desenvolvimento de Website com ASP.NET e SQL Server - Parte 4'
date: Mon, 20 Feb 2012 21:02:37 +0000
draft: false
tags: ['.NET', 'acesso a dados', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'CMS', 'Content Management Systems', 'CSS', 'Desenvolver website', 'Desenvolvimento de Website', 'N-Camadas', 'N-Tier', 'Sistema de gerenciamento de conteúdo', 'Sql Server', 'SQL Server', 'System.Data.OleDb', 'System.Data.SqlClient', 'Visual Studio', 'Visual Studio']
---

Olá caro leitor!

Em continuidade aos artigos anteriores sobre desenvolvimento de website com ASP.NET e SQL Server. Se você não acompanhou esse série desde o início acesse:

*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 1](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-1/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 1")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 2](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-2/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 2")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 3](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-3/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 3")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 4](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-4/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 4")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 5](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-5/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 5")

Hoje iremos realizar o desenvolvimento das funcionalidades internas do nosso painel de controle. Nele iremos abordar os seguintes tópicos:

*   Controle de sessão
*   Criação das telas de gerenciamento de usuário

Para iniciarmos, faça o download do fonte do projeto disponibilizado no [Github](https://github.com/csharpbrasil/projeto-website-aspnet).

Abra o projeto e iremos definir a _MasterPage_ do nosso painel de controle. Para facilitar um pouco nosso projeto, vamos utilizar a mesma _MasterPage_ e o mesmo CSS que criamos para o site. Faremos isso também para agilizar e focarmos no que é mais importante. Sendo assim, copie o arquivo _MasterPage_ e a pasta do _CSS_ para a pasta painel.

Feito isso, vamos alterar a nossa _MasterPage_ removendo a referencia ao MenuControl utilizando no site e alterar o menu.

Remova a referência ao MenuControl do código HTML. Ele é utilizado somente no site.

\[sourcecode language='html'\] <%-- Aqui ficou a referencia ao MenuControl.ascx --%> <%@ Register src="MenuControl.ascx" tagname="MenuControl" tagprefix="uc1" %> \[/sourcecode\]

E remova o menu. No caso do painel de controle nosso menu será fixo.

\[sourcecode language='html'\] <%-- Aqui ficou o nosso MenuControl.ascx --%> \[/sourcecode\]

Feito isso, vamos definir nosso novo menu que ficará da seguinte forma.

\[sourcecode language='html'\]

*   Gerenciar páginas
*   Gerenciar usuários
*   Sair

\[/sourcecode\]

Nossa MasterPage ficará assim.

\[sourcecode language='html'\] <%@ Master Language="C#" AutoEventWireup="true" CodeFile="MasterPage.master.cs" Inherits="MasterPage" %> @import url('css/default.css');

Painel de Controle :: Projeto WebSite .NET
==========================================

*   Gerenciar páginas
*   Gerenciar usuários
*   Sair

&amp;copy; 2012. Projeto WebSite .NET by [C# Brasil](http://raphaelcardoso.com.br)

\[/sourcecode\]

Agora criaremos a página _Default.aspx_, é para ela que o usuário será direcionado após realizar a autenticação.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0011-300x162.jpg "image001")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0011.jpg) [![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0021-300x185.jpg "image002")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0021.jpg)

Agora definiremos a MasterPage para a página default.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0031-300x183.jpg "image003")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0031.jpg)

Iniciaremos a criação das demais páginas.

Teremos 3 opções no menu do nosso painel de controle onde em cada um deles poderemos criar, modificar e excluir páginas e usuários.

Vamos iniciar a criação da página de gerencia de usuários. Conforme foi mostrado algumas vezes anteriormente, crie a página _gerenciar\_usuario.aspx_ e defina a MasterPage para ela.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0041-300x185.jpg "image004")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0041.jpg)

Essa página conterá um GridView para listar os usuários. Para preencher esse GridView utilizaremos um ObjectDataSource. Então, adicione um GridView e um ObjectDataSource.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0051-300x161.jpg "image005")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0051.jpg)

Clique em cima do ObjectDataSource, e clique na seta para selecionar a opção _Configure Data Source_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image006-300x97.png "image006")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image006.png)

Na janela de configuração selecione o nosso objeto _WebSite.Business.Usuarios_ pois é nele que contem nossas regras de negocio.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0071-300x241.jpg "image007")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0071.jpg)

Selecionaremos a opção para _ListaUsuarios_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0081-300x240.jpg "image008")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0081.jpg)

Antes de concluir, clique na aba _DELETE_ e selecione a o método _ExcluiUsuario_ e em seguida clique no botão _Finish_ para concluirmos.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0091-300x240.jpg "image009")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image0091.jpg)

Agora que temos definido a opção de excluir e listar os usuários, vamos configurar nosso GridView. Para isso associaremos no GridView o ObjectDataSource. Clique no GridView e na seta que aparece no canto superior direito clique e seleciona o ObjectDataSource na opção _Choose Data Source_. Aproveite e selecione as opções _Enable Paging_ e _Enable Deleting_. Essas opções irão habilitar a paginação e o link para excluir registro.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image010-300x190.jpg "image010")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image010.jpg)

Vamos definir no GridView qual é o _DataKeyNames_. No nosso caso informaremos DataKeysName igual Id. Assim sendo, estamos informando ao GridView que a chave de cada registro será o _Id_ e essa será utilizada quando formos excluir algum registro. Para definir o _DataKeyNames_, clique no GridView e vá em _properties_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image011-156x300.png "image011")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image011.png)

É possível definir mais de um, mais nesse caso não será necessário.

Agora defina um estilo para o GridView.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image012-300x109.jpg "image012")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image012.jpg)

Agora já temos nosso resultado.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image013-300x194.jpg "image013")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image013.jpg)

Se você clicar no link Excluir, vai ver que o registro será realmente excluído.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image014-300x194.jpg "image014")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image014.jpg)

Agora vamos criar nossa página para cadastrar novos usuários.

Adiciona acima da GridView um Button e defina o Text para "Novo usuário" e renomeie para btnNovoUsuario. Ele irá nos redirecionar para outra pagina que nos permitirá adicionar novos usuários. Para isso, de duplo clique sobre o botão e defina o código abaixo.

\[sourcecode language='csharp'\] protected void btnNovoUsuario\_Click(object sender, EventArgs e) { Response.Redirect("editar\_usuario.aspx"); } \[/sourcecode\]

Agora vamos cria a página que nos permitira criar um novo usuário ou editar os existentes. Então clique com o botão direito sobre a pasta painel e clique _Add New Item_. Não esqueça de definir a MasterPage do painel de controle.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image015-300x162.jpg "image015")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image015.jpg) [![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image016-300x185.jpg "image016")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image016.jpg) [![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image017-300x183.jpg "image017")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image017.jpg)

Antes de continuarmos, precisamos definir o CSS para os formulários. Então criaremos um novo arquivo CSS. Clique com o botão direito sobre a pasta css e clique em _Add New Item_. Defina o nome como form.css

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image018-300x162.jpg "image018")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image018.jpg) [![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image019-300x185.jpg "image019")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image019.jpg)

Abra o arquivo _default.css_ da pasta _css_ do painel e referencie o arquivo _form.css_ conforme abaixo.

\[sourcecode language='css'\] @import url('form.css'); \[/sourcecode\]

Vamos incluir o código css abaixo dentro do arquivo _form.css_.

\[sourcecode language='css'\] div.form { margin: 0 auto; padding: 20px; width: 600px; } div.form .label { display: block; } div.form input\[type=text\], div.form input\[type=password\] { width: 100%; } div.form .command { text-align: right; } \[/sourcecode\]

Agora abra a página _editar\_usuario.aspx_ para adicionarmos os campos necessários para a edição do usuário. Inclua 1 _HiddenField_, 5 _TextBox_, 1 _CheckBox_ e 2 _Button_ conforme o código abaixo.

\[sourcecode language='html'\]

### Novo usuários

  
Nome  
E-mail  
Login Senha  
Confirma senha  
  

  
\[/sourcecode\]

Vamos definir nosso código? No CodeBehind da página, adiciona referencia a nossa classe de negocio e de entidades.

\[sourcecode language='csharp'\] using UsuariosBO = WebSite.Business.Usuarios; using Usuarios = WebSite.Entities.Usuarios; \[/sourcecode\]

Para que entenda o código acima, fiz referencia as namespaces da biblioteca de entidade e de negócios, porem no caso da classe _Usuarios_ ela existe nas duas bibliotecas, o que fiz foi criar um alias para elas.

Agora daremos um duplo clique no botão Salvar para implementarmos o código que salvará os dados do usuário. O código do botão ficara assim.

\[sourcecode language='csharp'\] protected void btnSalvar\_Click(object sender, EventArgs e) { int Id; int.TryParse(hdfId.Value, out Id); string Nome = txtNome.Text; string Email = txtEmail.Text; string Login = txtLogin.Text; string Senha = txtSenha.Text; bool Ativo = chkAtivo.Checked; Usuarios usuario = new Usuarios(); usuario.Id = Id; usuario.Nome = Nome; usuario.Email = Email; usuario.Login = Login; usuario.Senha = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(Senha, "MD5"); usuario.Ativo = Ativo; UsuariosBO usuariosBO = new UsuariosBO(); bool Salvou = usuariosBO.SalvaUsuario(usuario); if (Salvou) { Response.Redirect("gerenciar\_usuario.aspx"); } } \[/sourcecode\]

No código estamos recebendo todos os dados e os atribuindo na classe Usuarios para posteriormente salva-lo. Após ser salvo, seremos redirecionado para a página de lista de usuários.

Existe na página o botão cancelar, vamos atribuir código a ele para que quando o usuário não queira fazer alteração, possa cancelar e volta a página anterior. De duplo clique sobre o botão Cancelar.

\[sourcecode language='csharp'\] protected void btnCancelar\_Click(object sender, EventArgs e) { Response.Redirect("gerenciar\_usuario.aspx"); } \[/sourcecode\]

O código HTML da nossa página ficou assim.

\[sourcecode language='csharp'\] <%@ Page Title="" Language="C#" MasterPageFile="~/painel/MasterPage.master" AutoEventWireup="true" CodeFile="editar\_usuario.aspx.cs" Inherits="painel\_editar\_usuario" %>

### Novo usuários

  
Nome  
E-mail  
Login  
Senha  
Confirma senha  
  

  
\[/sourcecode\]

E o código CodeBehind ficou assim.

\[sourcecode language='csharp'\] using System; using System.Collections.Generic; using System.Linq; using System.Web; using System.Web.UI; using System.Web.UI.WebControls; using UsuariosBO = WebSite.Business.Usuarios; using Usuarios = WebSite.Entities.Usuarios; public partial class painel\_editar\_usuario : System.Web.UI.Page { protected void Page\_Load(object sender, EventArgs e) { } protected void btnSalvar\_Click(object sender, EventArgs e) { int Id; int.TryParse(hdfId.Value, out Id); string Nome = txtNome.Text; string Email = txtEmail.Text; string Login = txtLogin.Text; string Senha = txtSenha.Text; bool Ativo = chkAtivo.Checked; Usuarios usuario = new Usuarios(); usuario.Id = Id; usuario.Nome = Nome; usuario.Email = Email; usuario.Login = Login; usuario.Senha = System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(Senha, "MD5"); usuario.Ativo = Ativo; UsuariosBO usuariosBO = new UsuariosBO(); bool Salvou = usuariosBO.SalvaUsuario(usuario); if (Salvou) { Response.Redirect("gerenciar\_usuario.aspx"); } } protected void btnCancelar\_Click(object sender, EventArgs e) { Response.Redirect("gerenciar\_usuario.aspx"); } } \[/sourcecode\]

Assim temos nosso cadastro de usuário pronto. Mais e para editar os existes? Vamos até a pagina que lista os usuários para adicionar um link ao GridView que nos direcionará a página para editar o usuário. Clique sobre o GridView e clique na seta no canto superior direito em seguinda clique no link Edit Column.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image020-300x173.jpg "image020")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image020.jpg)

Selecione um _HyperLinkField_ e adicione. Mova até o inicio da lista. Selecione o HyperLinkField adicionado e defina o _Text_, _DataNavigationUrlFields_ e _DataNavigationUrlFormat_ e em seguida clique no botão OK. Teste a página.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image021-300x230.jpg "image021")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image021.jpg)

Veja o que acontece quando clicamos no link adicionado no GridView. Você será redirecionado para a página _editar\_usuario.aspx_ passando como QueryString o Id do usuário. Na página _editar\_usuario.aspx_ iremos utilizar o _Id_ recebido por QueryString para buscar os dados do usuário, atribuir os dados nos campos do formulário. Iremos fazer isso no Page\_Load da página. Vamos ao código.

\[sourcecode language='csharp'\] protected void Page\_Load(object sender, EventArgs e) { if (!IsPostBack) { if (Request.QueryString\["id"\] != null) { int Id; int.TryParse(Request.QueryString\["id"\], out Id); UsuariosBO usuariosBO = new UsuariosBO(); Usuarios usuario = usuariosBO.ListaUsuarios(new Usuarios(Id)).FirstOrDefault(); hdfId.Value = usuario.Id.ToString(); txtNome.Text = usuario.Nome; txtEmail.Text = usuario.Email; txtLogin.Text = usuario.Login; txtSenha.Text = usuario.Senha; txtConfirmaSenha.Text = usuario.Senha; chkAtivo.Checked = usuario.Ativo; txtLogin.Enabled = false; txtSenha.Enabled = false; txtConfirmaSenha.Enabled = false; } } } \[/sourcecode\]

Esse será executado somente quando a página for carregada pela primeira vez, ou seja, somente quando não for um PostBack. Receberemos o Id por QueryString, atribuiremos a uma variável e a utilizaremos para retornar os dados do usuário populando os campos.

Pode testar que sua página está funcionando.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image022-300x161.jpg "image022")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image022.jpg) [![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image023-300x161.jpg "image023")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image023.jpg)

Até aqui temos nossa gerencia de usuários o que nos possibilita listar os cadastrados, cadastrar novo, excluir e editar os existentes.

Agora vamos atribuir segurança ao painel, pois mesmo o usuário não autenticando ele está tendo acesso às páginas.

Primeiro abra a página _login.aspx_ e atribua a linha do código abaixo após o usuário ter sido autenticado e antes de ser redirecionado para o painel.

\[sourcecode language='csharp'\] Session.Add("PainelAutenticado", true); Session.Add("Usuario", usuario); \[/sourcecode\]

Assim estamos criando um Session para que possamos verificar se o usuário está logado toda vez que uma nova página for aberta e os dados do usuário caso necessitemos recupera-lo sem precisar consultar o banco. Essas informações estarão ativas até que o usuário feche o browser.

Para fazer a verificação, abra o CodeBehind da MasterPage do painel e atribua a linha abaixo no Page\_Load.

\[sourcecode language='csharp'\] protected void Page\_Load(object sender, EventArgs e) { if (Session\["PainelAutenticado"\] == null || !Convert.ToBoolean(Session\["PainelAutenticado"\])) { Response.Redirect("login.aspx"); } } \[/sourcecode\]

No código estamos verificando se o usuário autenticou, caso contrario ele é redirecionado para a página de login forçando assim que o usuário esteja autenticado para ter acesso as páginas.

Como pode perceber, na lista de usuários irá aparece todos os usuários e teremos a opção de exclui-los, mais não seria nada interessante excluirmos acidentalmente qualquer usuário. Então vamos atribuir uma notificação e confirmação antes de exclui-lo. Abra a página _gerenciar\_usuario.aspx_ e vamos editar o link Excluir. Clique sobre o GridView e clique na seta no canto superior direito em seguinda clique no link _Edit Column_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image024-300x173.jpg "image024")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image024.jpg) [![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image025-300x230.jpg "image025")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image025.jpg)

Agora vamos converter o Field referente ao link Excluir, para um _TemplateField_. Quando convertido para _TemplateField_, teremos a possibilidade de customizar nosso link e é o que faremos. Clique sobre o GridView e clique na seta no canto superior direito em seguinda clique no link _Edit Template_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image026-300x158.jpg "image026")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image026.jpg)

Agora é só editar o link.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image027-300x139.png "image027")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image027.png)

Clique sobre o link e vamos mudar as propriedades Text e _OnClientClick_. O Text definiremos como Excluir e o _OnClientClick_ definiremos uma linha em JavaScript para exibir um alerta ao usuário quando o link for clicado. Essa propriedade _OnClientClick_ é executado do lado Client, ou seja, é executada no browser do usuário e deverá ser JavaScript. Segue o JavaScript.

\[sourcecode language='javascript'\] if(confirm('Deseja excluir esse usuário?')){ return true; }else{ return false; } \[/sourcecode\]

Salve seu projeto e agora podemos testar.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image028-300x211.jpg "image028")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image028.jpg)

Cuidado! Não exclua o usuário que você está logado. Não seria nada agradável acontecer isso. Então vamos incluir um bloqueio para isso? Como? No evento _RowDataBound_ do GridView. Isso, vamos adicionar um evento para ele. Selecione o GridView na tab Properties selecione os eventos.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image029-300x161.jpg "image029")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image029.jpg)

De duplo clique no evento _RowDataBound_ e vamos incluir o código de bloqueio. Lembra-se que na parte de autenticar criamos uma Session para armazenar os dados usuário e que poderíamos utilizar a qualquer momento e sem a necessidade de consultar o banco de dados? Vamos utiliza-lo agora. Segue o código.

\[sourcecode language='csharp'\] protected void GridView1\_RowDataBound(object sender, GridViewRowEventArgs e) { // Se for uma linha de registro if (e.Row.RowType == DataControlRowType.DataRow) { // Pega o Id do usuário na linha atual int IdRegistro; // Converte o registro atual para Integer int.TryParse(DataBinder.Eval(e.Row.DataItem, "Id", "{0}"), out IdRegistro); // Verifica se a sessão nap expirou if (Session\["Usuario"\] != null) { // Converte a sessão para a nossa classe Usuario WebSite.Entities.Usuarios usuario = (WebSite.Entities.Usuarios)Session\["Usuario"\]; // Pega o Id do usuário logado e com o registro atual if (usuario.Id == IdRegistro) { // Pesquisa o link excluir e converte para LinkButton LinkButton lnkExcluir = (LinkButton)e.Row.FindControl("LinkButton1"); // Oculta o link lnkExcluir.Visible = false; } } } } \[/sourcecode\]

Essa implementação nos garantirá que não seja excluído acidentalmente nosso usuário.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image030-300x211.jpg "image030")](https://raphaelcardoso.com.br/wp-content/uploads/2012/02/image030.jpg)

Nesse artigo foi possível aprendermos a criação das funcionalidades básicas para gerenciar os usuários e controlas a sessão do nosso painel de controle para dar mais segurança.

Fique atento ao próximo artigo que iremos concluir a série com o gerenciamento das páginas do nosso site.

Fonte do projeto: [Github](https://github.com/csharpbrasil/projeto-website-aspnet)

Não deixe de participar do fórum. Siga o C# Brasil no Twitter e Facebook.

Até o próximo artigo e bons estudos!