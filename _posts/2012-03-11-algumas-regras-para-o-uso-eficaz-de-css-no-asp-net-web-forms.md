---
title: 'Algumas regras para o uso eficaz de CSS no ASP.NET Web Forms'
date: Sun, 11 Mar 2012 10:24:26 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'CSS', 'CSS', 'Dicas', 'Web Forms']
---

Tornar-se compatível com os padrões web ao usar CSS com ASP.NET Web Forms nem sempre é uma tarefa facil, segue abaixo uma serie de dicas que podem ajudar no caminho.

1\. Prefira CSS ao invés de ASP.NET Skins.

*   CSS é um padrão bem aceito
*   Designers entendem CSS mas não conseguem entender o mecanismo de propriedades do ASP.NET
*   Skins levam a "Classitis". Cada skin cria um atributo de classe HTML que tem seus estilos associados. Isso não segue o principio da reutilização.
*   Uma boa implementação de CSS externo um tamanho menor e um download mais rápido do que sua implementação equivalente com skins.
*   A própria Microsoft investiu em ferramentas de design CSS (o Expression Web e a inclusão do motor do Expression Web apartir da versão 2008 do Visual Studio) e realmente não fazem mais nada com skins. Então siga seu exemplo. CSS esta tendo um melhor suporte pelas ferramentas Microsoft.

2\. Use CSS dentro do Themes em ASP.NET para obter um melhor suporte do Visual Studio. Em particular, ao invés de links para arquivos CSS na sessão <head> do seu arquivo HTML:

*   Crie uma ou mais pastas theme dentro da pasta App\_Themes.
*   Coloque seus arquivos CSS dentro dessas pastas themes.
*   Faça o link para estes themes usando o atributo Themes na diretiva de pagina.

3\. Quando você arrasta algum controle da toolbox, ASP.NET, dependendo do controle, pode adicionar um estilo inline para seu controle. Remova esses estilos inline, pois devido às especificidades das regras, elas irão sobrescrever qualquer estilo que você definir nos seus arquivos CSS.

4\. A grande maioria dos controles ASP.NET tem varias propriedade de formação que pode ser definidos através da properties window ou diretamente na marcação do componente. Todas as definição se tornarão estilos inline e devem ser evitados. A única propriedade que recomendo ser utilizada (com cautela para não gerar “classitis”) é a propriedade CssClass.

5\. Arquivos CSS são escritos para estilizar elementos HTML puros e não controles ASP.NET. Portando a compreensão que do mapeamento que é feito entre os dois é vital para gerar arquivos CSS que separa a estrutura (HTML) da apresentação (CSS).

6\. Compreender os mapeamentos entre os controles ASP.NET e os tipos HTML é também vital para garantir que seu site esta seguindo os padrões web e as diretrizes estabelecidas. Se você utilizar um controle ASP.NET, você precisa ter certeza que o tipo corresponde HTML foi destinada para esse uso.

7\. Muitas vezes temos que escolher entre um controle ASP.NET ou um elemento HTML correspondente. Para controles simples como um TextBox, um Label, se você precisa utilizar o controle para alguma funcionalidade server side, ou se você gostaria de tirar vantagem dos controles de validação do ASP.NET, use os controles ASP.NET. Se você não for fazer isso use elementos HTML mais leves.

8\. Note que você pode usar seletores ID apenas com elementos HTML. O ID que você atribui a um controle ASP.NET provavelmente será alterado quando o HTML para o componente for processado. Então para controles ASP.NET use o atributo CssClass para definir o estilo. Se o controle não tem o atributo, você pode coloca-lo dentro de uma tag <div>. Envolver o controle em um tag <div> deve ser o ultimo recurso. Normalmente você pode refatorar seu CSS usado seletores contextuais em tags que envolvam um grupo de elementos.