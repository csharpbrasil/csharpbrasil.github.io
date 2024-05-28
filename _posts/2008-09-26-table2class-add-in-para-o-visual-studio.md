---
title: 'Table2Class - Add-in para o Visual Studio'
date: Fri, 26 Sep 2008 01:39:05 +0000
draft: false
tags: ['Add-ins', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'VB.NET', 'Visual Studio', 'Visual Studio']
---

Estou aqui para mais um artigo. Dessa vez não vou ensinar ou dar dicas, vou apresentar o meu mais recente "projetinho" desenvolvido por questão de necessidade. É um Add-in para o Visual Studio com o seguinte propósito, gerar classe em C-Sharp apartir de determinada tabela de um determinando banco de dados. Ou seja, vou criar uma classe de dados apartir das minhas tabelas.

Quando eu abro o Visual Studio e inicio um novo projeto, terei a opção no menu Tools > Table2Class

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class01-1-300x277.jpg "table2class01")](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class01-1.jpg)

Em seguida será aberto uma nova janela onde iremos criar a classe.  
Clicamos nos botão do ConnectionString para uma nova conexão.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class02-1.jpg "table2class02")](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class02-1.jpg)

Teremos a opção de conectar em dois tipo de banco de dados: Microsoft SQL Server e MySQL Nessa mesma janela poderemos testar nossa conexão e em seguida clicar em OK

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class03-1.jpg "table2class03")](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class03-1.jpg)

Bom, estamos a 1 passo de concluir e deixar todo o simples processo para o Add-in.  
Na janela inicial, iremos selecionar as tabelas na qual queremos criar as classes. Toda tabela adicionada, será inclusa em um mesmo arquivo .cs e não poderá existir no mesmo projeto mais de uma classe com o mesmo nome, pois não faço essa tratativa.  
Depois de todas as informações passadas, basta clicar no botão Create.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class04-1.jpg "table2class04")](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class04-1.jpg)

E logo teremos nossa classe criada e adicionada em nosso projeto.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class05-1-300x277.jpg "table2class05")](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/table2class05-1.jpg)

É tão simples criar plugin para o Visual Studio, que levei um dia para cria-lo. Mais ainda estou melhorando e pretendo adicionar suporte a vários outros bancos de dados e outras opções que irem surgindo. Assim que ele estiver em uma versão mais estável, irei disponibiliza-lo para download.

Abraço e sucesso!!!

Fonte: [Download](https://raphaelcardoso.com.br/wp-content/uploads/2008/09/Table2Class.zip)