---
title: 'Dica - Criptografia MD5 com C-Sharp'
date: Fri, 24 Oct 2008 19:25:57 +0000
draft: false
tags: ['C#', 'C#', 'Dicas', 'Dicas', 'MD5', 'System.Security.Cryptography.MD5', 'Visual Studio', 'Visual Studio']
---

Olá caro leitor, aqui vai mais uma dica legal na hora de pensar em segurança. Quando desenvolvo um sistema, seja ele Desktop ou Web, procuro sempre criptografar as Senhas ou outras informações que julgo pertinentes. Esse método utilizo para criptografar uma string qualquer para o formato MD5 para deixa-las armazenadas no banco, tornando mais difícil de ser descoberta. Segue o código \[sourcecode language='csharp'\] public string getMD5Hash(string input) { System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create(); byte\[\] inputBytes = System.Text.Encoding.ASCII.GetBytes(input); byte\[\] hash = md5.ComputeHash(inputBytes); System.Text.StringBuilder sb = new System.Text.StringBuilder(); for (int i = 0; i < hash.Length; i++) { sb.Append(hash\[i\].ToString("X2")); } return sb.ToString(); } \[/sourcecode\] Aproveitem mais essa dica. Abraço e sucesso!!!