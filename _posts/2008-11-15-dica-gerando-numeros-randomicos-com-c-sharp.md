---
title: 'Dica - Gerando Números Randômicos com C-Sharp'
date: Sat, 15 Nov 2008 02:39:45 +0000
draft: false
tags: ['C#', 'C#', 'Dicas', 'Dicas', 'Visual Studio', 'Visual Studio']
---

Se precisarmos gerar números randômicos, o C# tem uma classe especifica para isso. A classe Random que faz parte do Framework.NET. \[sourcecode language='csharp'\] Random random = new Random(); int i = random.Next(0, 100); TextBox1.Text = i.ToString(); \[/sourcecode\] Uma dica muito útil para essa classe é a possibilidade de criarmos um gerador de senhas aleatórias como mostro no exemplo abaixo. \[sourcecode language='csharp'\] public string GeraSenha() { int Tamanho = 15; // Numero de digitos da senha string senha = string.Empty; for (int i = 0; i < Tamanho; i++) { Random random = new Random(); int codigo = Convert.ToInt32(random.Next(48, 122).ToString()); if ((codigo >= 48 && codigo < = 57) || (codigo >= 97 && codigo < = 122)) { string \_char = ((char)codigo).ToString(); if (!senha.Contains(\_char)) { senha += \_char; } else { i--; } } else { i--; } } return senha; } \[/sourcecode\] Esse método pode ser muito útil se você for criar um aplicativo WinForm ou WebForm onde precisará gerar uma senha aleatória para o usuário. Agora teste o exemplos e veja o resultado. Abraço e sucesso!!!