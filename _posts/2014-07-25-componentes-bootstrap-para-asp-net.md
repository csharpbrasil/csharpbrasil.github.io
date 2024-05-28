---
title: 'Componentes Bootstrap para ASP.NET'
date: Fri, 25 Jul 2014 11:00:24 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET Server Controls', 'Bootstrap', 'C#', 'Código Fonte', 'Código Fonte', 'CSS', 'Dicas', 'HTML', 'jquery']
---

Quando iniciamos um novo projeto, a primeira coisa que pensamos é, o que usar como acelerador para o desenvolvimento visual e logo nos vem a cabeça em usar o [Bootstrap](http://getbootstrap.com). Mais quem não conhece o Bootstrap acaba por ter que aprender para utilizar e isso poderá demandar um pouco de tempo e atrasar o projeto. O Bootstrap é um framework CSS que nos permite desenvolver um website ou aplicação web utilizando uma gama de componentes e funcionalidades basicamente utilizando HTML, CSS e jQuery. Já venho utilizando o Bootstrap a um bom tempo e já desenvolvi diversos projetos com ele e sempre que inicializo um novo projeto, eu preciso reescrever novamente as tags para ter todos os componentes que preciso em tela. Porem, com o objetivo de acelerar o meu desenvolvimento e também com o objetivo de estudar dois assuntos diferentes, resolvi criar os meus próprios ASP.NET Server Controls Bootstrap, ou seja, criei alguns componentes Bootstrap para ASP.NET. Mais antes de ter feito isso, realizei uma rápida pesquisa pela internet para ver o que eu encontrava de projetos nesse nível. O que acabei por encontrar o projeto criado pelo [Pedro Fernandes](https://github.com/pmcfernandes/BootstrapControls) e que utilizei como ponta pé inicial para desenvolver o meu projeto. Alguns dos componentes criados por ele foram reaproveitados, outros modificados ou melhorados e outros reescritos. Vale lembrar que o meu único objetivo era para estudar ASP.NET Server Controls. O objetivo desse artigo é mostrar um pouco do que foi feito com o comparativo de alguns componentes e a disponibilização do fontes. O componentes criados foram:

*   Alert
*   Button
*   PageHeader
*   Table
*   Images
*   Panel
*   Carousel
*   List Group
*   Collapse
*   Wells
*   Label
*   Breadcrumbs
*   Progress bars
*   Modal
*   Glyphicon

![Carousel](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_carousel.png) O primeiro componente que irei citar é o Carousel que é um dos que mais gostei de criar. Se reparar, ele tem dois parâmetros, onde um eu informa o Glyphicon para avançar e outro apara retroceder o Carousel. Abaixo o código para uso em um WebForm. \[code='html'\]    

#### First slide

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

#### Second slide

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

#### Third slide

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

\[/code\] Se eu tivesse que escrever o HTML do Carousel, ele seria algo parecido com o que teremos abaixo. \[code='html'\]

![First slide](img1.jpg)

#### First slide

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

![Second slide](img2.jpg)

#### Second slide

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

![Third slide](img3.jpg)

#### Third slide

Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.

[](#Carousel1)[](#Carousel1)

\[/code\] ![Collapse](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_collapse.png) Outro componente que gostei muito de ter feito foi o Collapse. Esse me ajudou bastante a entender todo o funcionamento de um Server Control e o resultado ficou ótimo. Repare que o componente possui em seu conteúdo Button, ou seja, temos a possibilidade de utilizar outros Server Controls dentro do Collapse. Para escrever seu código em ASP.NET, ficará da seguinte forma: \[code='html'\]     Collapsible Group Item #1  

Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.

Collapsible Group Item #2

Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.

\[/code\] Já o HTML é conforme abaixo (irei resumi-lo pois ficará um código muito grande: \[code='html'\]

#### [Collapsible Group Item #1](#Collapse1_CollapseItem1_ctl01)

Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.

[Button Sample](javascript:__doPostBack('Collapse1$CollapseItem1$ctl01$Button11',''))

#### [Collapsible Group Item #2](#Collapse1_CollapseItem2_ctl01)

Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.

[Button Sample](javascript:__doPostBack('Collapse1$CollapseItem2$ctl01$Button12',''))

\[/code\] ![Glyphicon](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_glyphicon.png) Já o Glyphicon, ele é o mais simples. Nos permite incluir um ícone apensar selecionando de uma lista e pode ser usado da seguinte forma: \[code='html'\]  \[/code\] O HTML, segundo a documentação do Bootstrap ficará assim: \[code='html'\]  \[/code\] Alem dos componentes citados, alguns outros foram criados e outros poderiam ser facilmente implementados. Porem, deixarei aqui disponível o fonte para quem quiser aprender um pouco sobre o desenvolvimento de ASP.NET Server Control e do Bootstrap. Veja abaixo os outros componentes criados: ![Button](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_button.png) ![Modal](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_modal.png) ![Tables](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_tables.png) ![Progressbar](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_progressbar.png) ![Panel](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_panel.png) ![List Group](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bootstrap_listgroup.png) Fonte do projeto: [Github](https://github.com/csharpbrasil/CSharpBrasil.Web.Controls). Não deixe de participar do fórum. Siga o C# Brasil no Twitter e Facebook. Até o próximo artigo e bons estudos!