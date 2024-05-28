---
title: 'Criando eventos personalizados em UserControl no ASP.NET'
date: Mon, 14 Feb 2011 10:30:32 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'delegate', 'Dicas', 'Dicas', 'events', 'UserControl', 'Visual Studio', 'Visual Studio']
---

Nem sempre os componentes atuais do ASP.NET atendem por completo as nossas necessidades. Com isso muitas vezes precisamos implementar funcionalidades e que também na maioria das vezes necessitam ser reutilizadas. O funcionalidade de um UserControl, é essa, criar controles personalizados que possam ser reutilizados.

É esse o objetivo desse artigo de hoje, criar um UserControl que possua funcionalidade que possam ser reutilizadas como se fosse um componente.

Para dar inicio, abra o Visual Studio, crie um novo WebSite. No Meu caso estou usando o Visual Studio 2010, mais pode ser qualquer versão.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2011/02/criando_eventos_usercontrol001-1-300x185.jpg "criando_eventos_usercontrol001")](https://raphaelcardoso.com.br/wp-content/uploads/2011/02/criando_eventos_usercontrol001-1.jpg)

Como exemplo, vou criar um UserControl que tem como funcionalidade autenticar e receber o login e a senha do usuário. Nele incluirei 2 Labels, 2 TextBox, 1 LinkButton e 2 Button. E ficará da seguinte formar.

\[sourcecode language='csharp'\]  
  
  
  
  
  
  
\[/sourcecode\]

Com esse código já temos a tela de login, porem não o mais importante que são os eventos. Para que ele seja funcional, iremos atribuir eventos aos Botões e possibilitar que um WebForm recupere a ação do usuário por meio do evento acionado. Para iniciar criamos o evento Click dos botões e do LinkButon.

\[sourcecode language='csharp'\]  
  
  
  
  
  
  
\[/sourcecode\] \[sourcecode language='csharp'\] protected void btnAutenticar\_Click(object sender, EventArgs e) { } protected void lnkLembrarSenha\_Click(object sender, EventArgs e) { } protected void btnCadastrar\_Click(object sender, EventArgs e) { } \[/sourcecode\]

Se você tentar recuperar o evento do botão Autenticar por exemplo vai ver que não será possível, para isso vamos criar agora os eventos necessários.

\[sourcecode language='csharp'\] // Delegate public delegate void AutenticarEventHandler(object sender, System.EventArgs e); public delegate void LembrarSenhaEventHandler(object sender, System.EventArgs e); public delegate void CadastrarEventHandler(object sender, System.EventArgs e); // Event public event AutenticarEventHandler Autenticar; public event LembrarSenhaEventHandler LembrarSenha; public event CadastrarEventHandler Cadastrar; \[/sourcecode\]

Criamos um Event e um Delegate para cada Button e LinkButton e é por meio do evento Click deles que faremos a chamada desses Eventos personalizados.

\[sourcecode language='csharp'\] protected void btnAutenticar\_Click(object sender, EventArgs e) { if (Autenticar != null) Autenticar(sender, e); } protected void lnkLembrarSenha\_Click(object sender, EventArgs e) { if (LembrarSenha != null) LembrarSenha(sender, e); } protected void btnCadastrar\_Click(object sender, EventArgs e) { if (Cadastrar != null) Cadastrar(sender, e); } \[/sourcecode\]

Agora que temos nosso UserControl, abra o Default.aspx em modo designer e arraste o UserControl para ele e adicione um Label.

\[sourcecode language='html'\] <%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="\_Default" %> <%@ Register src="LoginControl.ascx" tagname="LoginControl" tagprefix="uc1" %>

  

\[/sourcecode\]

Para finalizar, vamos criar os eventos necessarios no CodeBehind do Default.aspx para que nosso exemplo funcione.

\[sourcecode language='csharp'\] protected void Page\_Load(object sender, EventArgs e) { LoginControl1.Autenticar += new LoginControl.AutenticarEventHandler(LoginControl1\_Autenticar); LoginControl1.LembrarSenha += new LoginControl.LembrarSenhaEventHandler(LoginControl1\_LembrarSenha); LoginControl1.Cadastrar += new LoginControl.CadastrarEventHandler(LoginControl1\_Cadastrar); } // Evento Autenticar protected void LoginControl1\_Autenticar(object sender, EventArgs e) { lblResultado.Text = "Evento \[AUTENTICAR\]"; } // Evento Lembrar Senha protected void LoginControl1\_LembrarSenha(object sender, EventArgs e) { lblResultado.Text = "Evento \[LEMBRAR SENHA\]"; } // Evento Cadastrar protected void LoginControl1\_Cadastrar(object sender, EventArgs e) { lblResultado.Text = "Evento \[CADASTRAR\]"; } \[/sourcecode\]

Assim, temos o resultado abaixo.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2011/02/criando_eventos_usercontrol003-1.jpg "criando_eventos_usercontrol003")](https://raphaelcardoso.com.br/wp-content/uploads/2011/02/criando_eventos_usercontrol003-1.jpg)

Muito pode ser feito com o uso de Eventos e UserControl e alem do mais, podemos reutilizar e compartilhar os códigos criados.

Deixarei para download o projeto criado: \[download id="6" format="2"\].

Abraço e até a próxima.