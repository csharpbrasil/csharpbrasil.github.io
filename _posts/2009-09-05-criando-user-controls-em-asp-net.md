---
title: 'Criando User Controls em ASP.NET'
date: Sat, 05 Sep 2009 15:13:19 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'C#', 'Framework', 'VB.NET', 'VB.NET', 'Visual Studio', 'Visual Studio']
---

Olá leitor! Estou de volta, agora com uma abordagem um pouco mais interessante. Hoje iremos ver como é fácil criação de um User Control. Mais o que vem a ser um User Control? Bom, o User Control resumidamente é:

*   Uma página ASP.NET só que com comportamento de Controle
*   Tem a praticidade da utilização e reutilização de código
*   Agilidade na manutenção

Imagine a situação. Você esta desenvolvendo um projeto para a empresa e o seu Gerente de TI solicita uma nova funcionalidade para o sistema e essa deverá ser aplica em todo o projeto ou em parte dele. O Trabalho seria tenebroso, criar em uma página e aplicar nas demais.

Então eu lhe digo, que com o User Control será mais pratico, bastando somente projeta-lo e inclui-lo onde for necessário e sem perder a praticidade do ASP.NET.

Então vamos ao que interessa.

Em um projeto novo qualquer ou já existente do tipo ASP.NET Web Site iremos adicionar um novo arquivo, clicando com botão direito em cima do nosso projeto

![imagem011](https://raphaelcardoso.com.br/wp-content/uploads/2009/09/imagem011-1.jpg "imagem011") [ ![imagem012](https://raphaelcardoso.com.br/wp-content/uploads/2009/09/imagem012-1-300x199.jpg "imagem012")](https://raphaelcardoso.com.br/wp-content/uploads/2009/09/imagem012-1.jpg) ![imagem013](https://raphaelcardoso.com.br/wp-content/uploads/2009/09/imagem013-1.jpg "imagem013")

Após adicionarmos um novo Web User Control ou simplesmente User Control, iremos adicionar os controles que usaremos como exemplo. São eles:

*   1 Label
*   1 TextBox
*   2 Button
*   1 ListBox

![imagem005](https://raphaelcardoso.com.br/wp-content/uploads/2009/09/imagem005-1.jpg "imagem005")

Agora, basta adicionarmos as funcionalidades necessárias aos componentes do nosso User Control.

De um duplo-clique no botão 1 para adicionarmos a funcionalidade abaixo que irá incluir os idiomas em nossa lista.

\[sourcecode language='csharp'\] // Recuperar informação do TextBox string Idioma = txtIdioma.Text.Trim(); // Cria um novo item do idioma ListItem item = new ListItem(Idioma); // Atribui o item a nossa lista lstIdiomas.Items.Add(item); // Limpa o TextBox txtIdioma.Text = string.Empty; \[/sourcecode\]

Agora de um duplo-clique no botão 2 para adicionarmos a funcionalidade abaixo que irá remover itens selecionados da nossa lista.

\[sourcecode language='csharp'\] // Recupera o item ListItem item = lstIdiomas.Items.FindByValue(lstIdiomas.SelectedValue); // Remove da lista lstIdiomas.Items.Remove(item); \[/sourcecode\]

Agora abra o designer da página Default.aspx ou outra qualquer que deseje atribuir o nosso User Control. Você irá no Solution Explorer arrastar o seu UserControl para a página em modo designer conforme abaixo.

![imagem006](https://raphaelcardoso.com.br/wp-content/uploads/2009/09/imagem006-1-300x282.jpg "imagem006")

Após adicionado teremos o resultado abaixo.

![imagem007](https://raphaelcardoso.com.br/wp-content/uploads/2009/09/imagem007-1-300x281.jpg "imagem007")

Agora só poderá explorar mais a fundo as funcionalidades e utilidades do Web User Control do ASP.NET. Nele você também poderá acessar informações em seu banco de dados ou até mesmo em WebService.

Espero que com mais esse aprendizado você possa desenvolver seus projetos com maior rapidez e com mais facilidade.  
Abraço e até a próxima.

Fonte: [Download](https://raphaelcardoso.com.br/wp-content/uploads/2009/09/criando-user-controls-em-aspnet.zip)