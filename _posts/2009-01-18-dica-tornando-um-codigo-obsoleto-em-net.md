---
title: 'Dica - Tornando um código obsoleto em .NET'
date: Sun, 18 Jan 2009 05:16:55 +0000
draft: false
tags: ['.NET', 'C#', 'C#', 'Dicas', 'Dicas', 'Framework', 'Obsolete', 'Visual Studio', 'Visual Studio']
---

Já ocorreu de precisarmos criar uma classe conteúdo algumas funcionalidades básicas mais usadas e algumas dessas deixaram de ser úteis ou sofreram algum tipo de evolução. OK, mais e as aplicações que utiliza essa nossa classe, como identificar? Em .NET existe o atributo **_Obsolete_**, que pode marcar em nossa classe se ele é um código obsoleto e até mesmo impedir que ele seja compilado. Segue abaixo como utiliza-lo \[sourcecode language='csharp'\] \[Obsolete("Utilize o método PesquisarCliente()")\] public DataSet ListarClientes() { // Aqui vai o codigo antigo return new DataSet(); } public DataSet PesquisarClientes() { // Aqui vai o codigo novo return new DataSet(); } \[/sourcecode\] No caso acima, se utilizarmos o método _ListarClientes()_ seremos avisado de que o método é obsoleto e que poderemos utilizar o método _PesquisarClientes()_ como alternativa. Mais e se caso eu queira forçar a substituição do método pelo programador? Segue abaixo. \[sourcecode language='csharp'\] \[Obsolete("Utilize o método PesquisarCliente()", true)\] public DataSet ListarClientes() { // Aqui vai o codigo antigo return new DataSet(); } public DataSet PesquisarClientes() { // Aqui vai o codigo novo return new DataSet(); } \[/sourcecode\] Se observar bem, verá que foi informado um novo parâmetro no atributo _Obsolete_. Informamos _true_ para que seja exibido erro quando for utilizado o nosso método antigo ou até mesmo onde já esteja utilizando. Esse atributo é ideal para nossas métodos que não sofreram evolução e necessitam ser substituidas. Fica ai a dica. Abraço e sucesso!