---
title: 'Gerar arquivo PDF a partir de código HTML'
date: Sat, 28 Jul 2012 03:04:39 +0000
draft: false
tags: ['C#', 'C#', 'Código Fonte', 'Dicas', 'HTML', 'HTML para PDF', 'PDF']
---

Existem inúmeras ferramentas para gerar arquivos PDF como .Net, mas poucas delas são confiáveis, e quando são, o valor para utiliza-las é um tanto elevado. A ferramenta mais utilizada para gerar arquivos PDF é o [iTextSharp](http://sourceforge.net/projects/itextsharp/ "iTextSharp"), que é fácil de implementar, traz inúmeras opções ao desenvolvedor e é totalmente gratuita. Mas para gerar arquivo PDF a partir de um arquivo ou código HTML não é muito simples, tornando o processo muito "braçal". Encontrei uma solução muito simples e gratuita para essa função, que foi a utilização do [PDFFizer](http://sourceforge.net/projects/pdfizer/ "PDFFizer"). Veja o código de exemplo: \[sourcecode language="csharp"\] public void HtmlToPdf() { System.Text.StringBuilder sbHtml = new System.Text.StringBuilder(); sbHtml.Append(""); sbHtml.Append(""); sbHtml.Append(" C#.Net =D "); sbHtml.Append("  
"); sbHtml.Append("![C#](http://2.bp.blogspot.com/-qW60lVRk0gI/T3dX_aznzXI/AAAAAAAACD8/TMN8VDG3Xm4/s1600/C_Sharp.png)"); sbHtml.Append("Testando o PDFizer"); sbHtml.Append(""); sbHtml.Append(""); using (System.IO.Stream fluxo = new System.IO.FileStream(@"C:\\PDF.pdf", System.IO.FileMode.OpenOrCreate)) { Pdfizer.HtmlToPdfConverter htmlToPdf = new Pdfizer.HtmlToPdfConverter(); htmlToPdf.Open(fluxo); htmlToPdf.Run(sbHtml.ToString()); htmlToPdf.Close(); } } \[/sourcecode\] O PDFizer se mostrou bastante eficiente, só apresento problemas em paginas HTML complexas, quando o código fonte continha tabelas sem um padrão. Também encontrei uma solução que funcionou 100% mas utiliza um programa para gerar o PDF, o [wkhtmltopdf](http://code.google.com/p/wkhtmltopdf/ "wkhtmltopdf"). Ele é um programa que executa pelo DOS e gera arquivos PDF de um arquivo HTML como pode ser visto no código fonte abaixo: \[sourcecode language="csharp"\]

  System.Diagnostics.Process p = new System.Diagnostics.Process();

            p.StartInfo.FileName = @"C:\\Program Files\\wkhtmltopdf\\wkhtmltopdf.exe";

            p.StartInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;  //executa em segudno plano, sem abrir a tela do DOS

            p.StartInfo.Arguments = @"--margin-top 4mm --margin-left 20mm --page-size A4 --zoom 3  C:\\html.html c:\\pdf.pdf";

            p.Start();

            p.WaitForExit();

\[/sourcecode\] O wkhtmltopdf gerou arquivos PDF perfeitamente, perfeito para gerar Boletos Bancários e para o mais complexo dos HTML's. Espero que esse artigo ajude alguém. Abraço!