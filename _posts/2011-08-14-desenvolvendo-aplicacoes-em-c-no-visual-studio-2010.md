---
title: 'Desenvolvendo aplicações em C no Visual Studio 2010'
date: Sun, 14 Aug 2011 03:32:15 +0000
draft: false
tags: ['.NET', 'C/C++', 'C#', 'C#', 'CodeBlock', 'Dev-C++', 'Framework', 'Visual Studio', 'Visual Studio']
---

Por questões de necessidade, procurei uma alternativa para utilizar o Visual Studio no desenvolvimento de aplicações em C isso porque estou familiarizado com ele no desenvolvimento em ASP.NET e C#. Com isso para atender a minha necessidade e também por não ter me adaptado em utilizar o CodeBlocks e o Dev-C++ vou passar o caminho a seguir. Vale lembrar que apesar de estar utilizando o Visual Studio 2010 nada lhe impede de utilizar outrar versões.

Para iniciarmos, abra o Visual Studio e acesse o menu _File > New > Project..._. Na janela que se segue, escolha na lista a esquerda a opção _Other Languages > Visual C++ > Win32 > Win32 Console Application_ e defina o nome para o projeto.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0001-300x186.png "imagem0001")](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0001.png)

Um assistente será iniciado. Siga os passos abaixo clicando no botão _Next_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0002-300x254.png "imagem0002")](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0002.png)

Na próxima janela clique em _Console Application_ e em _Empty project_ e clique em _Next_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0003-300x254.png "imagem0003")](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0003.png)

No _Solution Explorer_ do projeto iniciar, clique com o botão direito em cima da pasta _Source File_ e acesse a opção _Add > New item..._ e escolha o template _C++ File (.cpp)_ e defina um nome para ele com a extensão _.c_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0004-300x278.png "imagem0004")](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0004.png) [![](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0005-300x186.png "imagem0005")](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0005.png) [![](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0006-300x273.png "imagem0006")](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0006.png)

Agora basta abrir o arquivo e iniciar o desenvolvimento. Para testar, utilize o código abaixo:

\[sourcecode language="c"\] #include #include #include int main() { int tam; char \*nome = (char\*)malloc(sizeof(char)); printf("Informe seu nome: "); gets(nome); tam = strlen(nome); printf("Seu nome e %s \\n", nome); printf("Seu nome possui %d caracteres\\n", tam); printf("Endereco de memoria %p \\n", &nome); printf("\\n"); system("pause"); return 1; } \[/sourcecode\]

Veja o resultado da execução abaixo.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0007-300x152.png "imagem0007")](https://raphaelcardoso.com.br/wp-content/uploads/2011/06/imagem0007.png)

Espero com isso poder ajudar os iniciantes em C que já esteja mais familiarizado com o Visual Studio.

Não deixe de seguir o [C# Brasil](http://raphaelcardoso.com.br) no [Twitter](http://twitter.com/csharpbrasil), no [Facebook](http://facebook.com/csharpbrasil) e participar do [Forum](/forum/ "Forum").

Até a próxima