---
title: 'Como alterar uma classe Css via C#'
date: Mon, 12 Mar 2012 23:45:41 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'Attributes', 'C#', 'C#', 'class', 'CSS', 'CSS', 'Dicas']
---

Olá caro leitor!

Quando se trata de CSS, muitos desenvolvedores sofrem por não terem muita prática e criativadade com manipulação de design.

A alteração de uma classe de css pode ser feita atraves do código c# e é um procedimento muito simples. Primeiramente em uma pagina aspx,temos o seguinte código css:

\[sourcecode language="css"\] .mainCss { background-color:red; } .otherCss { background-color:Yellow; } \[/sourcecode\] No container da página definimos a seguinte estrutura: \[sourcecode language="html"\]

\[/sourcecode\]

Temos uma div com o ID="divPrincipal" pertencente a classe mainCss, dentro da div há um botao e um evento,esse evento será acionado ao clique do botao.

Dentro desse evento há a alteração da classe:

\[sourcecode language="csharp"\] protected void btnOk\_Click(object sender, EventArgs e) { divPrincipal.Attributes\["class"\] = "otherCss"; } \[/sourcecode\]

Espero ter sido claro e não ter deixado nenhuma dúvida,mas se houverem dúvidas:

Twitter: [http://twitter.com/jucinei](http://twitter.com/jucinei)

Acesse tambem: [http://jucinei.wordpress.com/](http://jucinei.wordpress.com/)