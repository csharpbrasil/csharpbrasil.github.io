---
title: 'Criando Botões com Imagens'
date: Fri, 14 Nov 2008 23:53:24 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'C#', 'CSS', 'CSS', 'Visual Studio', 'Visual Studio']
---

Olá leitor, hoje vamos ver um artigo um pouco diferente porem não menos importante.  
Veremos como criar botões mais estilizados, simples, sofisticados e de fácil modificação somente usando CSS. A diferença que aplicaremos esse estilo em botões do próprio ASP.NET igual ao exemplo abaixo.

\[caption id="attachment\_386" align="aligncenter" width="467" caption="Botões mais estilizados, simples, sofisticados e de fácil modificação "\]![Botões mais estilizados, simples, sofisticados e de fácil modificação ](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/botoescomimagens001-1.jpg "botoescomimagens001")\[/caption\]  

Primeiro crie uma nova página ASP.NET e adicione um ou mais botões que se encontra na barra de ferramentas do Visual Studio.

![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/botoescomimagens002-1.jpg "botoescomimagens002")

Na propriedade **_CssClass_** do botão adiconaremos a classe **_sites_** que iremos criar logo a seguir.

Agora adicionaremos o um icone ![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/sites-1.png "sites") ao projeto e aplicaremos o seguinte CSS:

\[sourcecode language='css'\] input\[type=button\], input\[type=submit\] { padding: 0 20px 0 42px; height: 42px; border: 1px solid #B60000; min-width: 150px; } input\[type=button\].sites, input\[type=submit\].sites { background: transparent url('icones/Sites.png') left center no-repeat; } input\[type=button\]:hover, input\[type=submit\]:hover { background-color: #666; color: #FFF; } \[/sourcecode\]

Bom, se tudo estiver correto teremos logo o resultado esperado.

![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/botoescomimagens003-1.jpg "botoescomimagens003")

Pronto! Agora você já pode criar aplicações web sofisticadas em ASP.NET com interfaces mais agradáveis para seus clientes e/ou usuários.

Nada impede de utilizar outros tipos de icones. Nesse caso utilizei icones do tipo PNG, mais poderiamos utilizar JPEG ou GIF.  
Altere os icones, cores, fontes ou o que achar melhor e veja o resultado.

Código fonte: [Botão com Imagens](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/Botoes_com_Imagens.zip)

Espero que seja útil.  
Abraço e sucesso!!!