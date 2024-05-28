---
title: 'Dica - Limitando a quantidade caracteres em um TextBox do tipo Multiline'
date: Wed, 17 Mar 2010 19:16:34 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'Dicas', 'Dicas', 'JavaScript', 'VB.NET', 'VB.NET', 'Visual Studio', 'Visual Studio', 'WebForm']
---

Você já tentou utilizar o MaxLength do TextBox quando esse esta com TextMode igual a MultiLine?

No TextBox o TextMode é uma propriedade na qual definimos o tipo de campo será ele. Existem 3 tipos:

*   **SingleLine:** após renderizado o _HTML_, será gerado um simples _input_ do tipo _Text_;
*   **Password:** será gerado um _input_ do tipo _Password_;
*   **MultiLine:** diferente dos anteriores será gerado um TextArea e esse não possui a propriedade MaxLength.

Para que possamos contornar essa situação, poderemos utilizar JavaScript para limitar a quantidade de caracteres digitados no TextBox.

Essa dica pode ser utilizada também em projetos ASP.NET com VB.NET ou até mesmo aplicá-las em projetos onde será desenvolvido com puro HTML, basta nesse caso fazer algumas adaptações.

Primeiro adicionaremos ao nosso Page\_Load da página uma linha onde será incluído o atributo _maxlength_ ao nosso _TextBox_ com o valor definido.

\[sourcecode language='csharp'\] // Inclui o atributo maxlength TextBox1.Attributes.Add("maxlength", "400"); // Inclui o atributo onkeyup TextBox1.Attributes.Add("onkeyup", "return ismaxlength(this);"); \[/sourcecode\]

Após isso, adicionaremos então nosso _JavaScript_ a página. Essa _JavaScript_ será o responsável em limitar o numero de caracters no TextBox.

\[sourcecode language='javascript'\] function ismaxlength(obj) { var mlength = obj.getAttribute ? parseInt(obj.getAttribute("maxlength")) : "" if (obj.getAttribute && obj.value.length > mlength) { obj.value = obj.value.substring(0, mlength) } } \[/sourcecode\]

Vale lembrar que não é necessário utilizar esse método quando o TextMode for do tipo SingleLine ou Password pois o MaxLength funciona nativamente em ambos.

Espero que essa dica seja útil.

Abraço e até a próxima.