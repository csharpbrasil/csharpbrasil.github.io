---
title: 'Conceitos: Introdução ao LINQ - Parte 1'
date: Wed, 01 Feb 2012 02:15:47 +0000
draft: false
tags: ['C#', 'Entity Data Model', 'Entity Framework', 'LINQ', 'LINQ', 'Linq To DataSet', 'Linq To Entities', 'Linq To Objects', 'Linq To Sql']
---

Olá pessoal, neste artigo iremos aprender alguns dos principais conceitos do **LINQ**, da Microsoft. Acompanhem: ** Introdução –** LINQ (Language-Integrated Query – Linguagem Integrada de Consulta) é, como define muito bem a documentação do MSDN, “um set de recursos introduzidos no Visual Studio 2008 que estende as poderosas capacidades de consulta SQL para as linguagens C# e Visual Basic. O LINQ introduz patterns facilmente aprendidos para consultar e atualizar dados, e uma tecnologia que pode ser estendida para suportar potencialmente qualquer tipo de armazenamento de dados.”. Acho que o próprio MSDN definiu muito bem o que é o LINQ não é?

![](http://programandodotnet.files.wordpress.com/2011/10/linqproject.jpg)

O LINQ é considerado a “ponte” entre o “mundo dos objetos” e o “mundo dos dados”. A ideia com o LINQ foi tornar as consultas como um recurso de primeira classe nas linguagens de programação da plataforma .NET, sendo incorporado às linguagens C# e Visual Basic. _Para saber mais sobre LINQ, visite [este link](http://msdn.microsoft.com/pt-br/library/bb397926.aspx) e os conteúdos adjacentes._ Como já escrito, o LINQ foi introduzido ao Visual Studio 2008, e com ele alguns recursos para suportar o LINQ nas linguagens. Entre os principais, temos a inclusão desses recursos:

*   Iniciadores de Objetos
*   Métodos de Extensão ([Extensions Methods](http://programandodotnet.wordpress.com/2011/08/06/extensions-methods/))
*   Expressões Lambda
*   Tipos Anônimos
*   Tipos Implícitos em Variáveis Locais (var)

Os **LINQ Providers** permitem as operações básicas do CRUD, de consulta, exclusão, atualização e inserção, além de permitir o mapeamento de tipos definidos pelo usuário. O .NET Framework suporta cinco providers para o LINQ, que são os seguintes: ** - Linq to SQL –** O Linq to SQL fornece uma estrutura em runtime para gerenciar dados relacionais como objetos sem perder a habilidade de consulta. Assim, sua aplicação é livre para manipular objetos enquanto o Linq to SQL permanece em segundo plano, rastreando as alterações automaticamente. O Linq to SQL permite fazer o mapeamento objeto-relacional ([ORM](http://pt.wikipedia.org/wiki/Mapeamento_objeto-relacional) – Object-Relational Mapping), ou seja, permite mapear um modelo de dados de um banco de dados relacional para um modelo de objetos. ** - Linq to DataSet –** O Linq to DataSet permite a consulta de objetos do tipo DataSet na memória. O diagrama da **Figura 01** mostra a relação entre o Linq to DataSet e o ADO.NET 2.0:

![](http://programandodotnet.files.wordpress.com/2011/10/linqtodatasetarchiteture.gif)

Figura 01 – Diagrama da relação do Linq To DataSet com o ADO.NET 2.0

** - Linq to Objects –** Componente que permite consultar coleções de objetos do tipo **IEnumerable<T>** diretamente. Resumindo, o Linq to Objects representa uma aproximação melhorada a coleções de objetos. Da maneira antiga, teríamos que fazer laços **foreach** complexos para especificar como recuperar dados de uma coleção. Com Linq to Objects, você escreve código declarativamente que descreverá o que você deseja recuperar. ** - Linq to XML –** Componente que fornece uma interface de manipulação de XML em memória. O Linq to XML é parecido com o **DOM** (Document Object Model), você pode consultar e modificar o documento e, após isso, salvá-lo em um arquivo ou mesmo serializá-lo e enviar via email, por exemplo. Entretanto, o Linq To Xml difere do DOM, já que seu modelo de objeto é ligeiramente mais leve e rápido para trabalhar, pois tem como vantagem o uso das linguagens **C#** e **Visual Basic**. **- Linq to Entities –** O Linq to Entities, que é parte do [ADO.NET Entity Framework](http://msdn.microsoft.com/en-us/library/bb399572.aspx), introduzido ao SP1 do .NET Framework 3.5, permite trabalhar com dados num alto nível de abstração do esquema relacional. O Entity Framework suporta o [Entity Data Model](http://imasters.com.br/artigo/13549/desenvolvimento/desvendando_o_entity_framework_o_entity_data_model_edm/) (EDM) para definição dos dados num nível conceitual. O Linq to Entities é um recurso do Entity Framework, que permite escrever consultas ao modelo conceitual, usando as linguagens C# e Visual Basic. _PS: Os Linq Providers foram adicionados a partir da versão 3.5 do .NET Framework._ Espero que estes conceitos iniciais tenham dado um overview da grandiosidade do LINQ e de seus recursos. Na próxima parte da série de artigos veremos expressões de consulta e palavras-chave. Aguardem! _ Um abraço, e até o próximo artigo._ _ Wellington Balbo de Camargo_ [wellingtonbalbo@gmail.com](mailto:wellingtonbalbo@gmail.com)