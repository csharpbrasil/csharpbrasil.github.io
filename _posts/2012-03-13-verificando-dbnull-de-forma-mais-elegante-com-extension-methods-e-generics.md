---
title: 'Verificando DBNull de forma mais “elegante” com extension methods e generics'
date: Tue, 13 Mar 2012 17:00:15 +0000
draft: false
tags: ['C#', 'DBNull', 'Dicas', 'Extension Methods', 'generics']
---

Em um banco de dados relacional um valor nulo é usado em uma coluna quando o valor é desconhecido ou ausente. Um nulo não é uma string vazia (para tipos de dados string ou datetime), nem um valor zero (para tipos de dados numéricos). ([MSDN](http://msdn.microsoft.com/en-us/library/ms172138.aspx "Handling Null Values (ADO.NET)")) Em alguns códigos que utilizam DataReader para leitura dos dados eu costumo encontrar verificações se o valor retornado da base de dados não é nulo como o código a seguir: \[sourcecode language="csharp"\] ... if( myDataReader\["columnName"\] != DBNull.Value ) { myObject.Propriety = Convert.ToBoolean( myDataReader \["columnName"\] ); } else { //Faça algo } ... \[/sourcecode\] Eu particularmente acho essa forma de verificação um tanto “deselegante”, pois no momento em seja feita a leitura de alguma tabela que possua vários campos que podem retornar nulo a quantidade de “if” será grande e prejudicará a leitura do código e deixará o método extenso. Para contornar isso, uma solução que encontrei foi com a utilização de [extension methods](http://msdn.microsoft.com/pt-br/library/bb383977.aspx "Extension Methods (C# Programming Guide)") e [generics](http://msdn.microsoft.com/pt-br/library/512aeb7t.aspx "Generics (C# Programming Guide)"). \[sourcecode language="csharp"\] using System; namespace MyNamespace { public static class MyExtensions { public static T DefaultDbNull( this Object value, object defaultValue ) { if( value == Convert.DBNull ) return ( T )defaultValue; return ( T )value; } } } \[/sourcecode\] Forma de usar: \[sourcecode language="csharp"\] ... myObject.Propriety = myDataReader\["columnName"\].DefaultDbNull( string.Empty ); ... \[/sourcecode\] Desta forma eliminamos uma grande quantidade de “if”, em troca de um único método de extensão que poderá ser reutilizável em todo o aplicativo que utilizar a classe de extensão.