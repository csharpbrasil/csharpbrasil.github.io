---
title: 'Dica - Função ASC e CHR com C-Sharp'
date: Fri, 24 Oct 2008 17:05:54 +0000
draft: false
tags: ['C#', 'C#', 'Dicas', 'Dicas', 'Visual Studio', 'Visual Studio']
---

Olá caro leitor, hoje vou começar mais uma nova categoria de postagens. Serão postagens pequenas, úteis e bem objetivas. Quando comecei a aprender C#, eu sempre procurava funcionalidades existentes no VB6 e no ASP (VBScript). Uma dessas funcionalidades era o **_Asc_** e o **_Chr_** que tinha em VB6 e ASP. Quem já programou em uma dessas linguagens conhece bem.

*   **Asc:** Retorna o código \[W:ASCII\] do caracter informado.
*   **Chr:** Retorna o caracter correspondente ao código \[W:ASCII\] informado.

Então aqui vai a primeira dica: \[sourcecode language='csharp'\] public char Chr(int codigo) { return (char)codigo; } public int Asc(string letra) { return (int)(Convert.ToChar(letra)); } \[/sourcecode\] Espero que essa categoria de dicas sejam úteis para os iniciantes e também terá para os experts também. Abraço e sucesso!!!