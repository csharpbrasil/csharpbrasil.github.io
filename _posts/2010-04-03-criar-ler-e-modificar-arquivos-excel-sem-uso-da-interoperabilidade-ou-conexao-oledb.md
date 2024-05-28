---
title: 'Manipulando arquivos Excel sem uso da interoperabilidade ou conexão OLEDB'
date: Sat, 03 Apr 2010 00:40:13 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'Dicas', 'Dicas', 'Framework', 'Interoperabilidade', 'MemoryStream', 'VB.NET', 'VB.NET', 'Visual Studio', 'Visual Studio', 'WebForm', 'WebService', 'WinForm']
---

Como é de costume, sempre compartilho a minhas experiências e necessidades do dia a dia com você.

Recentemente tive a necessidade de ler um arquivo Excel em um WebService, porem o servidor na qual está hospedado não possui o Office instalado e nem poderia porque no final das contas seria necessário instala-lo em 3 servidores.

Com isso comecei a procurar por soluções e até que cheguei a solução criada pelo chinês [Liu Junfeng](http://www.cnblogs.com/rufi/archive/2010/02/25/excellibrary.html) que tambem possui uma materia no site do [Code Project](http://www.codeproject.com/kb/office/ExcelReader.aspx) e seu fonte disponível no [Google Code](http://code.google.com/p/excellibrary/).

Os exemplos que se seguem poderão ser utilizado tanto em Windows Form quanto em Web Form. Então vamos ao que interessa.

#### Efetuando a leitura de um arquivo excel.

Crie um novo ASP.NET Web Site.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/excellibrary001-1-300x194.png "excellibrary001")](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/excellibrary001-1.png)

Iremos fazer referência ao Excel Library em nosso projeto. Clique com o botão direito

[![](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/excellibrary002-1-291x300.png "excellibrary002")](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/excellibrary002-1.png) [![](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/excellibrary003-1-300x253.png "excellibrary003")](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/excellibrary003-1.png)

Adicione nele 1 FileUpload, 1 Button e 1 GridView. Nesse exemplo iremos fazer upload de um arquivo do Excel e exibi-lo em nosso GridView.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/excellibrary004-1-300x202.png "excellibrary004")](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/excellibrary004-1.png)

Agora vamos atribuir nosso código ao Button. Com isso, dé um duplo clique no Button e no evento dele criado iremos atribuir o código abaixo.

\[sourcecode language='csharp'\] protected void btnProcessarExcel\_Click(object sender, EventArgs e) { if (fupArquivo.HasFile) { // Recebe o arquivo em array de bytes byte\[\] buffer = fupArquivo.FileBytes; // Criar o arquivo em memoria System.IO.MemoryStream stream = new System.IO.MemoryStream(buffer); // Carrega o WorkBook do Excel ExcelLibrary.SpreadSheet.Workbook workbook = ExcelLibrary.SpreadSheet.Workbook.Load(stream); // Recupera o primeiro WorkSheet ExcelLibrary.SpreadSheet.Worksheet worksheet = workbook.Worksheets\[0\]; // Cria uma tabela para armazenar o Excel System.Data.DataTable dtExcel = new System.Data.DataTable(); dtExcel.Columns.Add("Coluna0", typeof(string)); dtExcel.Columns.Add("Coluna1", typeof(string)); // Percorre as linhas do Excel for (int rowIndex = worksheet.Cells.FirstRowIndex; rowIndex <= worksheet.Cells.LastRowIndex; rowIndex++) { // Recupera a linha do Excel ExcelLibrary.SpreadSheet.Row row = worksheet.Cells.GetRow(rowIndex); // Adiciona os dados na tabela System.Data.DataRow newRow = dtExcel.NewRow(); newRow\["Coluna0"\] = row.GetCell(0).StringValue; newRow\["Coluna1"\] = row.GetCell(1).StringValue; dtExcel.Rows.Add(newRow); } // Adicona a tabela com os dados do Excel no Grid gridExcelProcessado.DataSource = dtExcel; gridExcelProcessado.DataBind(); } } \[/sourcecode\]

O código acima será executado quando o Button for clicado. O código irá verificar se o arquivo na qual foi feito o upload é válido e irá processa-lo. Os dados serão atribuidos em uma tabela para que possamos apresenta-lo em nosso Grid.

#### Criando um arquivo Excel

Para criarmos um arquivo do Excel é bem mais simples. O código abaixo deixa isso bem claro. Instanciamos nosso WorkBook e WorkSheet e adicionamos os valores nas celular e para concluir adicionamos nosso WorkSheet no WorkBook e em seguida é só salvar.

\[sourcecode language='csharp'\] string file = "C:\\\\excel\_exemplo.xls"; ExcelLibrary.SpreadSheet.Workbook workbook = new ExcelLibrary.SpreadSheet.Workbook(); ExcelLibrary.SpreadSheet.Worksheet worksheet = new ExcelLibrary.SpreadSheet.Worksheet("Planilha1"); worksheet.Cells\[0, 0\] = new ExcelLibrary.SpreadSheet.Cell("Cliente1"); worksheet.Cells\[0, 1\] = new ExcelLibrary.SpreadSheet.Cell("2344,89"); worksheet.Cells\[1, 0\] = new ExcelLibrary.SpreadSheet.Cell("Cliente2"); worksheet.Cells\[1, 1\] = new ExcelLibrary.SpreadSheet.Cell("1342,00"); worksheet.Cells\[2, 0\] = new ExcelLibrary.SpreadSheet.Cell("Cliente3"); worksheet.Cells\[2, 1\] = new ExcelLibrary.SpreadSheet.Cell("7634,78"); worksheet.Cells\[3, 0\] = new ExcelLibrary.SpreadSheet.Cell("Cliente4"); worksheet.Cells\[3, 1\] = new ExcelLibrary.SpreadSheet.Cell("4322,44"); workbook.Worksheets.Add(worksheet); workbook.Save(file); \[/sourcecode\]

Vale lembrar que o Excel Library é uma excelente alternativa, que no meu caso foi de grande ajuda.

Agora é só explorar os recursos e mão a obra.

Irei deixar para você o projeto criado no artigo para download [aqui](https://raphaelcardoso.com.br/wp-content/uploads/2010/04/ExemploExcelLibrary-1.zip).

Abraço e até a próxima.