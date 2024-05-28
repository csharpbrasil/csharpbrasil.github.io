---
title: 'Expressões de Consulta e Palavras-Chave: Introdução ao LINQ - Parte 2'
date: Thu, 02 Feb 2012 23:46:28 +0000
draft: false
tags: ['C#', 'consulta', 'expressões', 'from', 'join', 'LINQ', 'LINQ', 'orderby', 'select', 'where']
---

Olá pessoal, neste artigo veremos o que são as Expressões de Consulta do LINQ e veremos suas Palavras-Chave. Acompanhem: Se você não viu a 1ª parte desta série de artigos sugiro que a veja clicando [aqui](https://raphaelcardoso.com.br/csharp/conceitos-introducao-ao-linq-parte-1/). ** Expressões de Consulta LINQ –** As expressões de consulta LINQ, introduzidas ao **C# 3.0**, são escritas com uma sintaxe declarativa que permite realizar com poucas linhas de código as operações de filtragem, ordenação, agrupamento, projeções, junção, entre outras. As expressões devem ser iniciadas com **from**, depois podem ter um ou mais **from**, **join**, **let**, **where** ou até mesmo **orderby** e devem terminar com **select** ou **group by**. Abaixo temos a sintaxe das expressões de consulta LINQ: **from** id **in** fonteDados { **from** id **in** fonteDados | **join** id **in** fonteDados **on** expressão **equals** expressão \[**into** id\] | **let** id = expressão | **where** condição | **orderby** id1, id2, ... \[**ascending**|**descending**\] } **select** expressão | **group** expressão **by** chave \[ **into** id \] Na tabela abaixo vemos as palavras-chave do **C#** para as consultas LINQ, e sua descrição:

**Cláusula**

**Descrição**

from

Especifica a fonte de dados e uma variável de série (semelhante a uma variável de iteração em um laço foreach, por exemplo).

where

Filtra elementos da fonte de dados baseada em uma ou mais expressões booleanas.

select

Faz projeções, permitindo assim especificar o tipo e o formato dos elementos do resultado da consulta.

join

Junta duas fontes de dados baseado em comparações de igualdade entre dois elementos especificados.

in

Palavra-chave contextual, utilizada na cláusula join.

on

Palavra-chave contextual, utilizada na cláusula join.

equals

Palavra-chave contextual, utilizada na cláusula join. Ela substitui perfeitamente o operador == na comparação.

group

Agrupa os resultados de uma consulta de acordo com valores específicos de uma determinada chave.

by

Palavra-chave contextual, utilizada na cláusula group.

into

Fornece um identificador para servir de referência para os resultados de uma cláusula de junção (join), agrupamento (group) ou projeção (select).

orderby

Classifica os resultados em ordem ascendente ou descendente.

ascending

Palavra-chave contextual utilizado na cláusula orderby para determinar classificação em ordem ascendente, que é a padrão, caso a mesma seja omitida da sintaxe.

descending

Palavra-chave contextual utilizado na cláusula orderby para determinar classificação em ordem descendente.

let

Introduz uma variável para armazenar resultados de expressões intermediárias numa expressão de consulta. Assim, o resultado armazenado pode ser reutilizado em na consulta.

_Mais informações sobre a sintaxe e a tabela podem ser encontradas [neste artigo](http://www.devmedia.com.br/post-18217-Expressoes-de-consulta-LINQ.html)._

 Para quem tem conhecimentos básicos de SQL não terá dificuldade ao usar o LINQ em seus projetos. _ Tenho publicado no blog um minicurso básico de SQL Server. Para vê-lo clique [aqui](http://programandodotnet.wordpress.com/category/net/sql-server/basico/). O curso avançado está em andamento, para vê-lo clique [aqui](http://programandodotnet.wordpress.com/category/net/sql-server/avancado/)._ Na próxima parte da série de artigos iremos criar alguns exemplos práticos que abordarão os conceitos vistos nas partes 1 e 2 desta série de artigos. Aguardem! _ Um abraço, e até o próximo artigo._ _ Wellington Balbo de Camargo_ [wellingtonbalbo@gmail.com](mailto:wellingtonbalbo@gmail.com)