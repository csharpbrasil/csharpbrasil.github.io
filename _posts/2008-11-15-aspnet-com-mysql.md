---
title: 'ASP.NET com MySql'
date: Sat, 15 Nov 2008 02:07:03 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'C#', 'MySql', 'MySql', 'Visual Studio', 'Visual Studio']
---

Existe hoje em dia vários tipos de banco de dados, mais nenhum deles me agrada mais que o MySql. Quando iniciei meu aprendizado em asp (vbscript), utilizava muito o Access, mais isso até conhecer o MySql que também foi minha escolha por ser um banco de dados gratuito e que esta disponível gratuitamente na maioria dos serviços de hospedagem. Minha escolha não foi só por isso, escolhi também por sua robustez, qualidade e facilidade de gerenciamento.

A um pouco mais de 1 ano iniciei o meu estudo com ASP.NET e não poderia deixar por menos, corri atrás de procurar informações sobre a utilização do MySql no ASP.NET e fui feliz. Hoje todas as minhas aplicações, seja ela desktop ou web são utilizando o MySql, ao contrario de muitos outros profissionais que preferem o Sql Server Express ou Firebird (tem suporte também que eu saiba para aplicações Windows Form).

Para utilizar o MySql, teremos duas opções de drive para conexão:

1.  [MySQL Connector/ODBC 5.1](http://dev.mysql.com/downloads/connector/odbc/5.1.html)
2.  [Connector/Net 5.2](http://dev.mysql.com/downloads/connector/net/5.2.html)

Particularmente prefiro a segunda opção. Então vamos colocar a mão na massa.

Faça o download do Drive Connector.NET 5.2 e instale que é o que eu mais indico por sua classes e métodos serem muito semelhantes aos drives do Sql Server e Oracle.

Você ira precisar instalar mais 2 ferramentas essenciais, o MySQL Administrator e MySQL Query Browser, além é claro do próprio MySql Server. Mais como não é o foco do artigo, não abordarei o passo a passo da instalação que alias é bem mais simples que os demais. Mais segue os links abaixo.

*   [MySql Server 5.0](http://dev.mysql.com/downloads/mysql/5.0.html)
*   [MySQL Administrator e MySql Query Browser](http://dev.mysql.com/downloads/gui-tools/5.0.html)

Depois de ter instalado o MySql Server, o Administrator e o Query Browser vamos iniciar um novo projeto no Visual Studio do tipo WebForm ASP.NET.

No _Solution Explorer_ do Visual Studio, vamos adicionar a dll do MySql ao projeto que nos dará suporte a ele em nosso WebForm. Com o botão direito em no _Project_ do _Solutions Explorer_ e clique na opção _Add Reference..._

![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/mysqlaspnet001-1.jpg "mysqlaspnet001")

Será aberto um nova janela onde iremos escolher a tab Browse e selecionaremos a dll do MySql Connector.NET que foi instalado. No meu caso o caminho é **_C:\\Arquivos de programas\\MySQL\\MySQL Connector Net 5.2.2\\Binaries\\.NET 2.0\\MySql.Data.dll_**.

![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/mysqlaspnet002-1.jpg "mysqlaspnet002")

Agora iremos crie um novo banco de dados e a tabela no MySql e para isso abra o Query Browser e execute o script abaixo.

\[sourcecode language='sql'\] CREATE DATABASE \`dbalbuns\` CREATE TABLE \`dbalbuns\`.\`albuns\` ( \`idalbum\` int(10) unsigned NOT NULL AUTO\_INCREMENT, \`titulo\` varchar(100) DEFAULT NULL, \`descricao\` varchar(100) DEFAULT NULL, \`preco\` decimal(18,2) DEFAULT '0.00', PRIMARY KEY (\`idalbum\`) USING BTREE ) ENGINE=InnoDB DEFAULT CHARSET=latin1; \[/sourcecode\]

Criamos então no nosso banco de dados **_dbalbuns_** com a tabela **_albuns_**.

Vamos inserir alguns dados para que possamos começar a criar nosso exemplo.

\[sourcecode language='sql'\] insert into albuns(titulo, descricao, preco) values('Armandinho', 'Reggae', 30.99); insert into albuns(titulo, descricao, preco) values('Tom Jobim', 'MPB', 43.56); insert into albuns(titulo, descricao, preco) values('Nirvana', 'Rock', 27.90); \[/sourcecode\]

Volte ao Visual Studio e vamos adicionar um Grid na página Default.aspx

![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/mysqlaspnet003-1.jpg "mysqlaspnet003")

Abra o Code Behind do WebForm Default.aspx e declare o namespace do MySql

\[sourcecode language='csharp'\] using MySql.Data.MySqlClient; \[/sourcecode\]

E vamos adicionar o código abaixo no Page\_Load

\[sourcecode language='csharp'\] protected void Page\_Load(object sender, EventArgs e) { string connectionString = "server=localhost;uid=root;pwd=123456;database=dbalbuns"; MySqlConnection conn = new MySqlConnection(connectionString); MySqlCommand cmd = new MySqlCommand(); cmd.CommandText = "select \* from albuns"; cmd.Connection = conn; DataTable dt = new DataTable(); MySqlDataAdapter da = new MySqlDataAdapter(cmd); da.Fill(dt); GridView1.DataSource = dt; GridView1.DataBind(); } \[/sourcecode\]

Se executarmos o nosso projeto, ira aparecer nosso WebForm no browser com os dados que cadastramos no MySql.

![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/mysqlaspnet004-1.jpg "mysqlaspnet004")

Podemos ainda dar uma incrementada no visual do nosso Grid.

![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/mysqlaspnet005-1.jpg "mysqlaspnet005") ![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/mysqlaspnet006-1.jpg "mysqlaspnet006")

É isso ai. Agora é por sua conta explorar um pouco mais da robustez do MySql com a facilidade do ASP.NET

Dúvidas? Deixe seu comentário!

Abraço e sucesso!!!