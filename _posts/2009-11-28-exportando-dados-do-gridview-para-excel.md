---
title: 'Exportando dados do GridView para Excel'
date: Sat, 28 Nov 2009 23:33:34 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'Dicas', 'Dicas', 'Excel', 'Exportar', 'Grid2Excel', 'GridToExcel', 'GridView', 'GridView2Excel', 'GridViewToExcel', 'HtmlTextWriter', 'StringWriter', 'VB.NET', 'VB.NET', 'Visual Studio', 'Visual Studio', 'WebForm']
---

No artigo de hoje ensinarei um jeito simples e rápido de implementar em uma página ASP.NET a opção de exportar o conteudo de um GridView contendo informações para o Excel. Isso será feito sem a necessidade de qualquer outro componente.

Essa semana me foi solicitado a criação e disponibilização de uma opção para que o usuário pudesse exportar os dados de um GridView e pesquisando um pouco na internet (porque alias não sei tanta coisa assim de ASP.NET) encontrei a solução.

Para iniciarmos vamos criar duas páginas ASP.NET. A primeira será para exibir os dados como de costume e a outra será para carregar e exportar os dados.

Poderemos fazer de dois modos:

*   Ou carregamos os dados no primeiro WebForm e quando necessário carregamos os dados no segundo WebForm, ou seja, realizamos 2 chamadas ao metodo responsavel em carregar os dados
*   Ou carregamos os dados no primeiro WebForm e quando necessário pegamos esse mesmos dados e atribuimos em um Session para em seguida carregarmos no segundo WebForm, ou seja, realizamos 1 chamada ao metodo responsavel em carregar os dados

Na minha opinião é mais performatico utilizarmos a segunda opção, assim não seria necessário realizar a mesma chamada ao metodo 2 vezes. A única desvantagem é que se no momento em que formos exportar para o Excel, os dados já tenham sido alterados ou não existam mais. Mesmo assim, usaremos a segunda opção.

Vamos a principio criar nosso banco de dados e a tabela de contatos para utilizarmos no exemplo. Sendo assim abra o Microsoft SQL Manager Express e execute o script abaixo.

\[sourcecode language='sql'\] CREATE DATABASE ESTUDOS USE ESTUDOS CREATE TABLE CONTATOS ( IDCONTATO INT IDENTITY(1,1) NOT NULL, NOME VARCHAR(100) NULL, TELEFONE VARCHAR(13) NULL ) \[/sourcecode\]

Agora vamos adicionar algumas informações.

\[sourcecode language='sql'\] INSERT INTO CONTATOS(NOME, TELEFONE) VALUES('JOAO', '(11)5421-7414') INSERT INTO CONTATOS(NOME, TELEFONE) VALUES('PEDRO', '(11)5785-5421') INSERT INTO CONTATOS(NOME, TELEFONE) VALUES('MARIA', '(21)3254-8522') INSERT INTO CONTATOS(NOME, TELEFONE) VALUES('RENATO', '(19)3657-8421') INSERT INTO CONTATOS(NOME, TELEFONE) VALUES('FATIMA', '(16)3627-7412') INSERT INTO CONTATOS(NOME, TELEFONE) VALUES('EMILIA', '(12)7452-7854') INSERT INTO CONTATOS(NOME, TELEFONE) VALUES('JOSE', '(34)3214-8521') INSERT INTO CONTATOS(NOME, TELEFONE) VALUES('ISABEL', '(64)8521-8444') \[/sourcecode\]

Agora que estamos com o nosso banco de dados pronto e contendo informações, iremos criar nosso WebForm, então inicie o Visual Studio e crie um novo Web site e no WebForm Default.aspx que foi criada adicione 1 GridView e 2 Buttons.

[![imagem049](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem049-1-300x213.jpg "imagem049")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem049-1.jpg) \[sourcecode language='csharp'\]    
\[/sourcecode\]

Atribuiremos agora o metodo para carregar os dados do GridView.

\[sourcecode language='csharp'\] public DataTable CarregaDados() { string ConnectionString = @"Data Source=.\\SQLEXPRESS;User Id=sa;Password=jo29si04;Initial Catalog=estudos;"; DataTable dt = new DataTable(); using (SqlConnection connection = new SqlConnection(ConnectionString)) { using (SqlCommand command = new SqlCommand()) { command.Connection = connection; command.CommandText = "select \* from contatos"; using (SqlDataAdapter adapter = new SqlDataAdapter()) { adapter.SelectCommand = command; adapter.Fill(dt); } } } return dt; } \[/sourcecode\]

Esse metodo criado será usado para carregar os dados do banco para o GridView.

Agora vamos ao que realmente importa para nós nesse momento. Iremos criar a opção de exportar para excel.

Abra um novo WebForm chamado exporta\_excel.aspx para que possamos adicionar 1 GridView e o metodo abaixo.

[![imagem050](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem050-1-300x216.jpg "imagem050")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem050-1.jpg) \[sourcecode language='csharp'\] protected void Page\_Load(object sender, EventArgs e) { DataTable dt = (Session\["Contatos2Excel"\] as DataTable); gridContatos.DataSource = dt; gridContatos.DataBind(); string attachment = "attachment; filename=contatos.xls"; Response.ClearContent(); Response.AddHeader("content-disposition", attachment); Response.ContentType = "application/ms-excel"; System.IO.StringWriter sw = new System.IO.StringWriter(); HtmlTextWriter htw = new HtmlTextWriter(sw); gridContatos.RenderControl(htw); Response.Write(sw.ToString()); } public override void VerifyRenderingInServerForm(Control control) { } \[/sourcecode\]

Quando a página para exportar for chamada, o GridView será carregado com o conteudo da Session e gerado o Excel. Teste e veja o resultado.

Nosso WebForm principal com a opção de carregar os dados e exportar para Excel.

[![imagem051](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem051-1-227x300.jpg "imagem051")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem051-1.jpg)

Efetuando a chamada para exportar para Excel

[![imagem052](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem052-1-300x253.jpg "imagem052")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem052-1.jpg)

Excel com o resultado final.

[![imagem053](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem053-1-237x300.jpg "imagem053")](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/imagem053-1.jpg)

Espero que esse dica seja util para você como foi para mim.

Abraço e até a próxima.

Fonte: [Download](https://raphaelcardoso.com.br/wp-content/uploads/2009/11/exportando-dados-do-gridview-para-excel.zip)