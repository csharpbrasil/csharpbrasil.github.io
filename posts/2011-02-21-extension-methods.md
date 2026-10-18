---
title: 'Extension Methods'
date: Mon, 21 Feb 2011 10:00:05 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'Dicas', 'Extension Methods', 'Framework', 'Visual Studio', 'Visual Studio']
---

Extension Methods é uma nova característica presente apartir do C# 3.0 e que permitem adicionarmos métodos para tipos existentes sem criar um novo tipo derivado, recompilar ou modificar o tipo original. Extension Methods são um tipo especial de método estático, mas eles são chamados como se fossem métodos de instância no tipo estendido.

Agora que sabemos como funciona na teoria, vamos a prática.

O Extension Methods pode ser aplicado em projetos WebForm quanto WinForm, porem nesse exemplo irei fazer WebForm. Para inicia crie um novo WebSite.

[![](/contents/2011/02/ExemploExtensionMethods000-1-300x186.jpg "ExemploExtensionMethods000")](/contents/2011/02/ExemploExtensionMethods000-1.jpg) [![](/contents/2011/02/ExemploExtensionMethods001-1-300x185.jpg "ExemploExtensionMethods001")](/contents/2011/02/ExemploExtensionMethods001-1.jpg)

Iniciando o novo projeto, iremos adicionar o diretorio App_Code para criar nossa classe.

[![](/contents/2011/02/ExemploExtensionMethods002-1-300x219.jpg "ExemploExtensionMethods002")](/contents/2011/02/ExemploExtensionMethods002-1.jpg) [![](/contents/2011/02/ExemploExtensionMethods003-1-300x185.jpg "ExemploExtensionMethods003")](/contents/2011/02/ExemploExtensionMethods003-1.jpg)

Agora iremos alterar nossa classe incluido o código que desejamos para extender por exemplo uma string.

```csharp using System; public static class CSharpBrasilExtension { public static string ToMD5(this string value) { System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create(); byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(value); byte[] hash = md5.ComputeHash(inputBytes); System.Text.StringBuilder sb = new System.Text.StringBuilder(); for (int i = 0; i < hash.Length; i++) { sb.Append(hash[i].ToString("X2")); } return sb.ToString(); } } ``` [![](/contents/2011/02/ExemploExtensionMethods004-1-300x174.jpg "ExemploExtensionMethods004")](/contents/2011/02/ExemploExtensionMethods004-1.jpg)

Após criarmos a nossa classe, o metodo irá estender todo e qualquer objeto do tipo String e no código acima criamos uma extensão para converter uma determinada String em MD5. Veja exemplo de uso.

```csharp string Nome = "C# Brasil"; string MD5 = Nome.ToMD5(); Response.Write(MD5); ```

Você pode estender qualquer tipo de objeto. Podemos extender por exemplo um objeto do tipo string para converte-lo para decimal ou um DateTime para Int ou até mesmo String.

O Extension Methods quando bem utilizado pode facilitar e muito o desenvolvimento. Por exemplo, podemos criar uma extesão para calcular um valor decimal. Veja abaixo:

```csharp public static decimal CalcularIPI(this decimal value, decimal percentual) { decimal Total = decimal.Divide(decimal.Multiply(value, percentual), 100); return Total; } ```

No caso do exemplo acima utilizamos a passagem de parametros. Veja como utiliza-lo:

[![](/contents/2011/02/ExemploExtensionMethods005-1-300x169.jpg "ExemploExtensionMethods005")](/contents/2011/02/ExemploExtensionMethods005-1.jpg) ```csharp decimal Valor = 580.78M; decimal Perc = 2; decimal IPI = Valor.CalcularIPI(Perc); Response.Write(IPI.ToString()); ```

Não existe nada de tão complicado na criação de um Extension Methods é tão simples quanto desenvolver e encapsular aquelas tão usadas funções em nossas classes.

Você também pode ver alguns outros extension methods criados por mim [aqui](http://www.extensionmethod.net/Author/raphael-augusto-ferroni-cardoso).

Deixarei para download o projeto criado: [download id="7" format="2"]

Abraço e até a próxima.