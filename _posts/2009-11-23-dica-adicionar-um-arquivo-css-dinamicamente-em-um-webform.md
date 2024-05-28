---
title: 'Dica - Adicionar um arquivo CSS dinamicamente em um WebForm'
date: Mon, 23 Nov 2009 12:00:55 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'CSS', 'Dicas', 'Framework', 'VB.NET', 'VB.NET', 'Visual Studio', 'WebForm']
---

Se você desejar criar um estilo especifico para cada cliente ou deixo escolher um de uma lista, uma dica interessante para fazer isso é altera-lo via codigo dinamicamente.

Basta criar um botão em nosso WebForm e incluir o código abaixo.

\[sourcecode language='csharp'\] System.Web.UI.HtmlControls.HtmlHead header = (System.Web.UI.HtmlControls.HtmlHead)Page.Header; System.Web.UI.HtmlControls.HtmlLink link = new System.Web.UI.HtmlControls.HtmlLink(); link.Attributes.Add("href", Page.ResolveClientUrl("~/css/estilo.css")); link.Attributes.Add("type", "text/css"); link.Attributes.Add("rel", "stylesheet"); header.Controls.Add(link); \[/sourcecode\]

Aproveitem a dica.

Abraço e até a próxima.