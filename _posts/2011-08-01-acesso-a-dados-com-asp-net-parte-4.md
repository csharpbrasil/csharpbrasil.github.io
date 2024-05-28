---
title: 'Acesso à Dados com ASP.NET - Parte 4'
date: Mon, 01 Aug 2011 11:29:52 +0000
draft: false
tags: ['acesso a dados', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'dataset', 'Sql Server', 'tableadapter', 'xml']
---

Olá pessoal, volto com mais uma parte de nossa série de [artigos](http://programandodotnet.wordpress.com/category/net/asp-net/) sobre acesso ao banco de dados com ASP.NET usando a linguagem C#. Nesta parte iremos falar sobre **DataSet Tipado** e **Table Adapter**. Acompanhem: **Definições básicas:** **Dataset Tipado** **–** Um DataSet Tipado tem toda a estrutura das tabelas de um banco normal, fornecendo o acesso às colunas do banco como se fossem propriedades do DataSet. Resumindo: um DataSet Tipado nada mais é do que uma classe que o Visual Studio cria colocando o nome de cada coluna de cada tabela do banco como uma propriedade desta classe criada. Uma das inúmeras vantagens do uso do Dataset Tipado é que podemos nos beneficiar do recurso de auto-completar do Visual Studio, mais conhecido como **IntelliSense**. **Table Adapter –** o TableAdapter pode ser entendido como um DataAdapter usado por um DataSet Tipado. Explicando melhor:  o TableAdapter seria uma espécie de **DataAdapter Tipado**, em que sua função é a de realizar a comunicação entre o DataSet e a fonte de dados. Entretanto, o TableAdapter, diferente do DataAdapter, não é uma classe nativa do .NET Framework. A classe de nosso TableAdapter é gerada automaticamente pelo Visual Studio e é personalizada para cada DataTable do DataSet Tipado. Em outro artigo, irei falar sobre o TableAdapter. Ok, chega de teoria, vamos para a parte prática! Abra o Solution Explorer (CTRL + W + S), clique com o botão direito no seu projeto, clique em Add New Item, escolha DataSet, dê o nome **DadosDataSet** e clique em Ok, como mostra a imagem abaixo: [![](http://programandodotnet.files.wordpress.com/2010/02/dadosdataset.jpg)](http://programandodotnet.files.wordpress.com/2010/02/dadosdataset.jpg) Irá aparecer uma janela perguntando se o DataSet recém criado pode ser adicionado na pasta **App\_Code**. Clique em Yes e aguarde. Se não aparecer logo de cara para você um Wizard de configuração para o nosso TableAdapter, clique na parte cinza de nosso DataSet e clique em Add > TableAdapter. Deverá aparecer um Wizard parecido com o da imagem abaixo: [![](http://programandodotnet.files.wordpress.com/2010/02/wizardtableadapter.jpg)](http://programandodotnet.files.wordpress.com/2010/02/wizardtableadapter.jpg) Começamos nossas configurações escolhendo a conexão que usaremos. Selecione a conexão que tínhamos criado na parte 1 de nossa série de artigos. Clique em Next, o Wizard irá perguntar se desejamos salvar a string de conexão com o banco de dados no arquivo de configuração **web.config**. Deixe selecionado a opção de salvar e altere o nome da mesma se desejar, como mostra a imagem abaixo: [![](http://programandodotnet.files.wordpress.com/2010/02/connectionstring1.jpg)](http://programandodotnet.files.wordpress.com/2010/02/connectionstring1.jpg) Salvar a string de conexão é uma boa idéia porque qualquer alteração nela não muda em nada o código-fonte, o que facilita a manutenção. Clique em Next. Na próxima tela, iremos escolher como faremos o acesso aos dados, por **comandos SQL**, **Stored Procedures** existentes ou novas. Vamos usar comandos SQL, escolha a 1ª opção e clique em Next. [![](http://programandodotnet.files.wordpress.com/2010/02/commandtype.jpg)](http://programandodotnet.files.wordpress.com/2010/02/commandtype.jpg) Na próxima tela, devemos informar o comando SQL que deve ser executado pelo TableAdapter. Podemos fazer isso de duas formas: inserindo diretamente a instrução SQL do nosso Select que retorna o nome da companhia da tabela de Clientes, ou por meio do editor gráfico de queries, clicando no botão **Query Builder**. Insira a instrução SQL como na imagem abaixo e clique em Next. [![](http://programandodotnet.files.wordpress.com/2010/02/sqlstatement.jpg)](http://programandodotnet.files.wordpress.com/2010/02/sqlstatement.jpg) Na próxima tela, iremos escolher os métodos que nosso TableAdapter terá. Temos duas maneiras de obter os dados pelo TableAdapter: pelo método **Fill()**, opção **Fill a DataTable**, que preenche um DataTable passado como parâmetro, e através de um método que retorna um objeto do tipo DataTable, opção **Return a DataTable**. Podemos selecionar ambas as opções e alterar os nomes sugeridos pelo VS. Vamos manter o primeiro nome e alterar o segundo para **GetCustomers** e desmarcar a última opção, que é usada quando queremos criar métodos que façam as operações de inclusão, exclusão e alteração. Seu Wizard deve estar igual ao da imagem abaixo: [![](http://programandodotnet.files.wordpress.com/2010/02/tableadaptermethods.jpg)](http://programandodotnet.files.wordpress.com/2010/02/tableadaptermethods.jpg) Ok, processo concluído. Clique em Next e uma tela irá mostrar a você que foi concluída a operação, clique em Finish. Será exibido no nosso DataSet Tipado o DataTable e o TableAdapter criado no Wizard. Vamos criar o DataTable da tabela **Orders** e seu TableAdapter. Para isso, abra o Server Explorer (CTRL + W + L), abra seu banco **Northwind**, expanda a pasta **Tables** e arraste a tabela Orders para nosso **DataSet Designer**, como mostra a imagem: [![](http://programandodotnet.files.wordpress.com/2010/02/datasetdesigner.jpg)](http://programandodotnet.files.wordpress.com/2010/02/datasetdesigner.jpg)   Percebemos que o Visual Studio criou automaticamente um DataTable chamado  Orders, e um TableAdapter, chamado **OrdersTableAdapter**, com os métodos **Fill()** e **GetData()**, além disso o VS detectou um relacionamento entre a tabela Customers e a tabela Orders, como você pode notar na linha que interliga as duas tabelas. Clique com o botão direito do mouse sobre **OrdersTableAdapter** e clique em **Add Query**. Iremos fazer praticamente os mesmos passos que fizemos na criação de nosso DataTable Customers. Na primeira tela, escolheremos a opção **Use SQL statements** e clicaremos em Next. Na próxima tela, iremos deixar selecionado a opção **SELECT which return rows** e pressionaremos novamente o botão Next. Na tela seguinte, iremos alterar a instrução SQL que o VS gerou para nós. Ficará como na imagem abaixo: [![](http://programandodotnet.files.wordpress.com/2010/02/sqlstatement2.jpg)](http://programandodotnet.files.wordpress.com/2010/02/sqlstatement2.jpg) Na próxima tela, deixe marcado somente a opção **Return a DataTable** e altere o nome do método para **ObterEncomendasPeloCliente**. Clique em Next e em Finish para concluir o processo. Seu TableAdapter da tabela Orders deverá ficar como na imagem abaixo: [![](http://programandodotnet.files.wordpress.com/2010/02/orderstableadapter.jpg)](http://programandodotnet.files.wordpress.com/2010/02/orderstableadapter.jpg) Até o momento, não precisamos escrever nenhum código. Tudo foi definido de forma gráfica e produtiva. O DataSet Tipado é representado por um arquivo com extensão **.xsd**, que significa **XML Schema Definition**. Esse arquivo contém a definição da estrutura do DataSet Tipado e é utilizado para gerar o código C# automaticamente, em tempo de execução ou de desenvolvimento. **Aqui encerra mais uma parte de nossa série de artigos, na próxima parte iremos criar uma nova página em nossa aplicação parecida com a que já temos e iremos configurar a página, via código, para que receba os dados de nosso DataSet Tipado. ** **Iremos também falar dos controles DataSource do ASP.NET. ** **Abraços!** _Até o próximo artigo._