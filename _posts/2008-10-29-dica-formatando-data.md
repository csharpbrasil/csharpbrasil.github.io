---
title: 'Dica - Formatando Data'
date: Wed, 29 Oct 2008 04:24:45 +0000
draft: false
tags: ['C#', 'C#', 'Dicas', 'Dicas', 'Visual Studio', 'Visual Studio']
---

Olá leitor, a dica de hoje será como fazer formatação de data em C#. Para isso mostrarei os formatos existentes:

*   **d** - MM/dd/yyyy
*   **D** - dddd, MMMM dd, yyyy
*   **f** - dddd, MMMM dd, yyyy HH:mm
*   **F** - dddd, MMMM dd, yyyy HH:mm:ss
*   **g** - MM/dd/yyyy HH:mm
*   **G** - MM/dd/yyyy HH:mm:ss
*   **m, M** - MMMM dd
*   **r, R** - Ddd, dd MMM yyyy HH':'mm':'ss 'GMT'
*   **s** - yyyy-MM-dd HH:mm:ss
*   **S** - yyyy-MM-dd HH:mm:ss GMT
*   **t** - HH:mm
*   **T** - HH:mm:ss
*   **u** - yyyy-MM-dd HH:mm:ss
*   **U** - dddd, MMMM dd, yyyy HH:mm:ss
*   **y, Y** - MMMM, yyyy

Alguns exemplos: Exemplo 1 \[sourcecode language='csharp'\] DateTime Data = DateTime.Now; string DataFormato = Data.ToString("D"); \[/sourcecode\] Exemplo 2 \[sourcecode language='csharp'\] DateTime Data = DateTime.Now; string DataFormato = Data.ToString("F"); \[/sourcecode\] Exemplo 3 \[sourcecode language='csharp'\] DateTime Data = DateTime.Now; string DataFormato = Data.ToString("G"); \[/sourcecode\] Exemplo 4 \[sourcecode language='csharp'\] DateTime Data = DateTime.Now; string DataFormato = Data.ToString("S"); \[/sourcecode\] Exemplo 4 \[sourcecode language='csharp'\] DateTime Data = DateTime.Now; string DataFormato = Data.ToString("T"); \[/sourcecode\] Agora teste alguns exemplos e veja o resultado. Abraço e sucesso!!!