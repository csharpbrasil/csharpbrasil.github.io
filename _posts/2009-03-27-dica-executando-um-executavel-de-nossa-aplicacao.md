---
title: 'Dica - Executando um executavel de nossa aplicação'
date: Fri, 27 Mar 2009 21:01:17 +0000
draft: false
tags: ['.NET', 'C#', 'C#', 'Diagnostics', 'Dicas', 'Dicas', 'Framework', 'Process', 'Visual Studio']
---

Para que possamos de nossa aplicação chamar um executável basta utilizar a Namespace System.Diagnostics. Suponhamos que queremos adicionar uma Label com o endereço de nosso site para ser chamada quando clicado, basta fazer como o exemplo abaixo. \[sourcecode language='csharp'\] public void ChamaLink() { string app = @"C:\\Program Files\\Internet Explorer\\iexplore.exe"; string param = "http://raphaelcardoso.com.br"; System.Diagnostics.Process process = System.Diagnostics.Process.Start(app, param); } \[/sourcecode\] Essa classe ira chamar qualquer aplicação que desejar. Abraço e sucesso!!!