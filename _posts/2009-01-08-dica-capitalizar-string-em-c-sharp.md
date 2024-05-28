---
title: 'Dica - Capitalizar string em C-Sharp'
date: Thu, 08 Jan 2009 15:55:57 +0000
draft: false
tags: ['C#', 'C#', 'Dicas', 'Dicas', 'Visual Studio', 'Visual Studio']
---

Uma técnica bem simples, ou melhor 2 ténicas que encontrei em um site na qual não lembro mais. Como no C-Sharp não existe um método para fazer isso, então temos dois códigos que poderemos adicionar em nosso projeto para capitalizar uma string, ou seja, converter para maiúsculo os primeiros caracteres. Pode ser usado para tratar nomes próprios por exemplo. Então segue abaixo: **Primeiro método** \[sourcecode language='csharp'\] private string CapitalizeWords(string value) { if (value == null) throw new ArgumentNullException("value"); if (value.Length == 0) return value; System.Text.StringBuilder result = new System.Text.StringBuilder(value); result\[0\] = char.ToUpper(result\[0\]); for (int i = 1; i < result.Length; ++i) { if (char.IsWhiteSpace(result\[i - 1\])) { result\[i\] = char.ToUpper(result\[i\]); } } return result.ToString(); } \[/sourcecode\] **Segundo método** \[sourcecode language='csharp'\] private string CapitalizeWordsCulture(string value) { return System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(value); } \[/sourcecode\] O segundo método é mais funcionai e mais simples. Espero que ajude. Abraço e sucesso!