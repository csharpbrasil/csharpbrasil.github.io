---
title: 'Sys.WebForms.PageRequestManagerServerErrorException'
date: Thu, 07 Mar 2013 16:57:25 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'Exception', 'maxRequestLength', 'View State']
---

Sys.WebForms.PageRequestManagerServerErrorException: An Unknown error occurred while processing the request on the server. The status code returned from the server was: 12031 Uma das razões para essa exceção ocorrer é o tamanho do [View State](http://msdn.microsoft.com/en-us/library/bb386448%28v=vs.100%29.aspx) que pode estar excedendo o tamanho limite padrão de envio de dados para o servidor suportado pelo ASP.NET. Para contornar esse problema podemos alterar o tamanho padrão suportado pelo ASP.NET no Web.config na sessão . \[sourcecode language="xml"\] \[/sourcecode\] No exemplo acima, foi aumentado o limite padrão para permitir envio de dados de até 16MB. **maxRequestLength** indica tamanho maximo de um arquivo para upload que o ASP.NET pode suportar. Esse limite pode ser usado para prevenir ataques de negação de serviço causado por usuários postando arquivos grandes para o servidor. O tamanho é especificado em kilobytes. O tamanho padrão é de 4096 KB (4MB).