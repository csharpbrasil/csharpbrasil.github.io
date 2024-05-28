---
title: 'Utilizando MasterPage em aplicações ASP.NET'
date: Sun, 22 Nov 2009 21:03:46 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'Framework', 'VB.NET', 'VB.NET', 'Visual Studio', 'Visual Studio', 'WebForm']
---

Sem sombra de dúvida qualquer desenvolvedor deseja criar aplicações web com maior facilidade e rapidez e é isso que a MasterPage do ASP.NET promete e cumpri.

Desde quando comecei a aprender ASP.NET até hoje utilizo em minhas aplicações web essa funcionalidade. Para isso, antes de iniciar qualquer projeto, eu desenho todo o site utilizando a minha aplicação gráfica favorita para em seguida montá-lo em uma MasterPage no Visual Studio.

Pois bem, é isso que iremos ver hoje. Como utilizar a potencialidade da MasterPage em nossas aplicações web em ASP.NET.

Abra o Visual Studio e clique no menu File > New > Web site...

[![imagem041](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem041-1-300x195.jpg "imagem041")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem041-1.jpg)

Por padrão, o Visual Studio irá criar uma página Default.aspx, porem não iremos utiliza-la e podemos exclui-la.

Agora clique com o botão direito em cima do nosso projeto para adicionarmos um novo item.

[![imagem042](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem042-1-300x246.jpg "imagem042")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem042-1.jpg)

Adicionaremos então a nossa MasterPage

[![imagem043](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem043-1-300x200.jpg "imagem043")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem043-1.jpg)

Seu HTML deverá ser algo parecido com isso:

\[sourcecode language='csharp'\] <%@ Master Language="C#" AutoEventWireup="true" CodeFile="MasterPage.master.cs" Inherits="MasterPage" %>

\[/sourcecode\]

Após a nossa MasterPage adicionada iremos criar o layout dela. Com isso também abordarei um pouco de HTML e CSS por mais que esse não seja o foco. É importante que você tenha pelo menos uma noção HTML e CSS para seguir em diante.

Se no seu caso você não tiver conhecimento ou tiver pouco conhecimento de HTML e CSS, sugiro que visite alguns sites na qual deixarei os link no final desse artigo. São excelente fontes de consulta e lá poderá encontrar diversos artigos de excelente qualidade.

Vamos ao que interessa. No HTML da MasterPage iremos adicionar algumas DIVs para definir as areas do nosso site. Iremos criar o cabeçalho, menu, corpo do site e o rodapé.

Vale lembrar que na MasterPage criada existe alguns objetos chamados ContentPlaceHolder que são é áreas atualizaveis, ou seja, quando formos criar uma nova página baseada em nossa MasterPage, essas areas serão os únicos lugares possíveis de ser editados. Com isso deveremos mante-los em nosso código ou até mesmo adicionar mais se for necessário. No nosso caso iremos manter o padrão mesmo.

Veja como ficará nosso HTML:

\[sourcecode language='csharp'\] <%@ Master Language="C#" AutoEventWireup="true" CodeFile="MasterPage.master.cs" Inherits="MasterPage" %>

© 2009 BUSINESS.COM - Todos os direito reservados.

\[/sourcecode\]

Agora iremos ao nosso CSS para definir o layout do nosso HTML. Para isso criaremos um novo arquivo. O processo é o mesmo da inclusão da nossa MasterPage. Clique com o botão direito em nosso projeto para adicionar um novo item.

[![imagem044](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem044-1-300x200.jpg "imagem044")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem044-1.jpg)

No arquivo criado, iremos adicionar o estilo abaixo.

\[sourcecode language='css'\] /\* CONFIGURACOES GERAL \*/ body { font: 74.3% Verdana, Arial, Helvetica, sans-serif; padding: 0; margin: 0; background-color: #eee; } #geral { border: 1px solid #ccc; margin: 10px auto; width: 800px; } /\* CABECALHO \*/ #cabecalho { min-height: 100px; line-height: 100px; padding: 0 30px; background-color: #fff; } #cabecalho h1 { padding: 0; margin: 0; } #cabecalho h1 a { color: #000; display: block; text-transform: uppercase; text-decoration: none; } /\* MENU \*/ #menu ul { padding: 0; margin: 0 auto; background-color: #ccc; list-style: none; height: 40px; } #menu ul li { float: left; } #menu ul li a { display: block; text-align: center; width: 200px; height: 40px; line-height: 40px; text-transform: capitalize; color: #353535; text-decoration: none; } #menu ul li a:hover { background-color: #ddd; } /\* CONTEUDO \*/ #conteudo { min-height: 400px; padding: 10px; background-color: #fff; } /\* RODAPE \*/ #rodape { text-align: center; background-color: #ccc; min-height: 50px; line-height: 50px; } \[/sourcecode\]

Agora que temos nosso CSS definido, iremos referencia-lo em nosso HTML.

\[sourcecode language='html'\] @import url('StyleSheet.css'); \[/sourcecode\]

E o nosso HTML ficará assim:

\[sourcecode language='csharp'\] <%@ Master Language="C#" AutoEventWireup="true" CodeFile="MasterPage.master.cs" Inherits="MasterPage" %> @import url('StyleSheet.css');

[business.com](#)
=================

*   [home](#)
*   [a empresa](#)
*   [produtos](#)
*   [contato](#)

© 2009 BUSINESS.COM - Todos os direito reservados.

\[/sourcecode\]

Já estamos com nossa MasterPage pronta para ser utilizada. Com isso iremos criar uma página do tipo WebForm clicando com o botão direito em nosso projeto e adicionar um novo item.

[![imagem045](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem045-1-300x199.jpg "imagem045")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem045-1.jpg)

Repare que na caixa de dialogo existe a opção "Select master page". Marque-a para que possamos criar um novo WebForm baseado em nossa MasterPage.

Ira aparecer uma nova caixa de dialogo para selecionarmos a MasterPage desejada. Repare que nela visualizamos toda a estrutura do site, ou seja, se tivessemos criado um diretório especifico para nossa MasterPage, essa poderia ser visualizada. Selecione a MasterPage e em seguida clique em OK.

[![imagem046](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem046-1-300x185.jpg "imagem046")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem046-1.jpg)

Foi adicionado em nosso projeto um WebForm e repare que quase não existe código nele. Porque? Porque todo o código de layout esta definido na MasterPage. Com isso toda e qualquer mudança que ocorrer na MasterPage afetaram os WebForms.

Veja como ficou meu WebForm.

\[sourcecode language='csharp'\] <%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="\_Default" %> \[/sourcecode\]

Se lembra do ContentPlaceHolder criado em nossa MasterPage, pois bem, esse ASP Content que aparece se refere ao ContentPlaceHolder da nossa MasterPage.

Agora mude para modo de designer para incluirmos um conteudo qualquer em nosso WebForm.

[![imagem047](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem047-1-300x136.jpg "imagem047")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem047-1.jpg) \[sourcecode language='csharp'\] <%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="\_Default" %> 

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tincidunt tristique tristique. Aenean rhoncus arcu vel magna dignissim id tristique nunc scelerisque. Vestibulum sagittis arcu eget dui vulputate fringilla! Mauris sed mauris ac felis luctus convallis. Phasellus dolor enim, pretium ac varius eu, egestas ultrices odio. Fusce fermentum iaculis urna, sit amet consectetur odio rutrum ut. Aenean et mauris elit, dignissim dignissim sapien. Aenean scelerisque ante eu est tempor mollis. Maecenas id tellus nisl, fringilla venenatis nunc. Nulla feugiat, tellus eget dictum fermentum, libero ipsum varius magna; at ullamcorper dui enim euismod tortor.

Nullam vel tortor velit. Aenean tortor urna, pretium id consequat a, lobortis ac orci. Proin tortor leo, dictum in vulputate sit amet, aliquam at magna? Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed consequat magna id sapien mollis condimentum. Duis fringilla nunc sed ligula tempus pharetra. Nunc eros libero, egestas vitae porta sed, dictum ut arcu? Nullam in felis sapien, tincidunt tempor lectus. Mauris egestas euismod massa, id consequat ligula accumsan vel. Vivamus quis turpis risus, vitae porta turpis. Nam porttitor auctor arcu, et pretium enim dapibus id. Proin posuere dolor vitae tortor gravida pellentesque. Vestibulum at sem lectus.

Sed consequat congue tincidunt. Praesent nec enim interdum nibh posuere tempus? Quisque malesuada mauris eget sem tempor mollis viverra arcu viverra. Etiam massa odio, suscipit ut adipiscing ut, accumsan id turpis. Sed convallis scelerisque est vitae tempor. Integer rhoncus blandit magna non consequat. Sed nec congue ligula. Phasellus eleifend, nunc nec auctor luctus, orci magna bibendum leo, at sagittis risus orci id odio. Praesent tincidunt neque at ipsum aliquet molestie. Suspendisse pellentesque suscipit bibendum.

\[/sourcecode\]

E teremos o nosso resultado final.

[![imagem048](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem048-1-300x225.jpg "imagem048")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem048-1.jpg)

Agora basta criar mais WbForms e utilizar a MasterPage criada ou ate mesmo criar outras MasterPages.

Você poderá também criar uma MasterPage para utiliza-la em uma outra MasterPage.

Espero que tenha esclarecido bem o uso da MasterPage e qualquer dúvida estarei a disposição para ajudar.

Abraço e até a próxima.

**Fonte:** [Download](http://www.csharpbrasil.com.br/wp-content/uploads/2009/11/utilizando-masterpage-em-aplicacoes-asp-net.zip)

### Sites de referência em HTML e CSS

*   [Pinceladas da Web](http://www.pinceladasdaweb.com.br)
*   [Maujor](http://www.maujor.com)