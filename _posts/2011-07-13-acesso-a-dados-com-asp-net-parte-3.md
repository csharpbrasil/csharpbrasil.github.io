---
title: 'Acesso à Dados com ASP.NET - Parte 3'
date: Wed, 13 Jul 2011 10:36:25 +0000
draft: false
tags: ['acesso a dados', 'ADO.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'Sql Server']
---

Olá pessoal, começa aqui mais uma parte de nossa série de [artigos](http://programandodotnet.wordpress.com/category/net/asp-net/) sobre acesso ao banco de dados com ASP.NET usando a linguagem C#. Nesta parte iremos falar sobre modelo desconectado e na próximas sobre dataset tipado e table adapter. Acompanhem:

**Modelo Desconectado –** Como visto no artigo anterior, no modelo conectado, a conexão ao banco precisa estar aberta para fazermos com que nossa aplicação acesse os dados. Isso pode ser ruim em alguns casos, como quando usamos aplicações que precisam de uma alta disponibilidade e escalabilidade, por isso não a usamos sempre. Para resolver isso, o **ADO.NET** nos oferece o modelo desconectado, que nada mais é do que uma “cópia” dos dados do modelo conectado, depois de aberto (geralmente por um período pequeno), para um objeto **DataSet** através de um **DataAdapter** para, após isso, a conexão ser fechada.

Com os dados armazenados no DataSet, podemos fazer a manipulação deles para, numa outra ocasião, serem atualizados na fonte de dados através do DataAdapter, seguindo a mesma idéia de manter a conexão aberta por um período mínimo de tempo.

O DataSet é uma classe do namespace **System.Data** do [.NET Framework](http://programandodotnet.wordpress.com/category/net-framework/) e pode ser definido como um banco de dados relacional em memória. Parecido com um banco de dados comum, ele é formado por um conjunto de tabelas (**os objetos DataTable**), que são constituídas por linhas (**objetos DataRow**) e colunas (**objetos DataColumn**). Através de objetos **DataRelation**, podemos relacionar as tabelas umas com as outras.

O DataSet é independente da fonte de dados. Totalmente oposto dos objetos que usamos no artigo anterior, **Command,** **Connection, DataReader** e **DataAdapter**, cujas classes são especifícas para cada **Data Provider**, a classe DataSet é a mesma para qualquer fonte de dados. Com isso, podemos ter, por exemplo, em um mesmo DataSet, dados de um banco SQL, do Access e até do Oracle, ou um arquivo XML. Ok, chega de conversa, vamos por a mão na massa!

Recebi um comentário a respeito de usar controles do tipo **GridView**. Achei legal a idéia e vou implementá-la no exemplo que farei usando DataSet. A idéia é mostrar os produtos de uma determinada categoria em um GridView.

Abra a página Default.aspx de nosso projeto em modo design. No Toolbox, aba Data, arraste um GridView para nossa página, abaixo de nosso DropDownList como mostra a imagem abaixo:

[![](http://programandodotnet.files.wordpress.com/2010/02/gridviewid.jpg)](http://programandodotnet.files.wordpress.com/2010/02/gridviewid.jpg)

Dê o nome de **gvEncomendas**. Clique no DropDownList e altere a propriedade AutoPostBack para true, que indica se a página deve sofrer um PostBack cada vez que o item selecionado no DropDownList for alterado. Quando isso acontecer, o conteúdo do evento SelectedIndexChanged do DropDownList é executado. Para entrarmos nesse evento, dê dois cliques em nosso DropDownList e adicione o seguinte código:

[![](http://programandodotnet.files.wordpress.com/2010/02/selectedindexchanged.jpg)](http://programandodotnet.files.wordpress.com/2010/02/selectedindexchanged.jpg)

Faça o mesmo no evento Page\_Load para que ele chame este método quando a aplicação for executada. Ele método será o responsável por preencher o GridView com os clientes de determinada encomenda, que é passada como parâmetro para o método. Implemente esse método na classe, conforme imagem a seguir:

[![](http://programandodotnet.files.wordpress.com/2010/02/preenchegridview.jpg)](http://programandodotnet.files.wordpress.com/2010/02/preenchegridview.jpg)

Neste método, primeiro definimos um objeto do tipo SqlConnection, que recebe como parâmetro a string de conexão. Ela é a mesma que utilizamos para preencher o DropDownList na artigo anterior. Depois, definimos um objeto SqlCommand, que seleciona os campos **ShipName** (nome do navio), **ShipCity** (cidade do navio) e **ShipCountry** (país do navio) da tabela Orders. Note que o comando possui uma cláusula WHERE, que é responsável por filtrar os produtos pela categoria escolhida. Neste caso, estamos filtrando os registros cujo campo CustomerID é igual a @CustomerID, o qual indica que esta notação é um parâmetro.

Após isso, precisamos informar o valor do parâmetro chamando o método **AddWithValue** da coleção Parameters. Esse método recebe dois parâmetros: o primeiro é o nome do parâmetro, como ele aparece no comando sem a @; e o segundo é o valor do parâmetro. Em seguida, instanciamos um objeto **SqlDataAdapter** e depois o DataSet. Para preencher o DataSet, chamamos o método **Fill()** do DataAdapter, passando o DataSet que queremos preencher e o nome do objeto DataTable que será criado no DataSet.

Perceba que não precisamos abrir e nem fechar a conexão com o banco de dados em nenhum momento. Isso é feito automaticamente pelo método Fill().  Porém, nada nos impediria de abrir a conexão explicitamente antes de chamarmos o método Fill(), mas nesse caso, o fechamento da conexão também teria que ser feito de forma explicita. Finalizando, configuramos a propriedade DataSource do GridView gvEncomendas. A propriedade **DataSource** indica a fonte de dados que será utilizada para preencher o Grid.

Nesse caso, é a DataTable **Orders** do DataSet **dsEncomendas**. Em seguida, chamamos o método DataBind() do GridView para que a vinculação dos dados seja feita.

Agora vamos testar nosso exemplo, salve o projeto e aperte F5. Seu projeto deve estar parecido com a imagem abaixo:

[![](http://programandodotnet.files.wordpress.com/2010/02/compiledproject.jpg)](http://programandodotnet.files.wordpress.com/2010/02/compiledproject.jpg)

**Na próxima parte, iremos falar sobre DataSet tipado e TableAdapter.**

Qualquer dúvida, só postar !

_Até o próximo artigo!_