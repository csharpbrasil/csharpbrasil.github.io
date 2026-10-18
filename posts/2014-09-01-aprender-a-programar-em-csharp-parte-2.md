---
title: 'Aprender a programar em C# – Parte 2'
date: Mon, 01 Sep 2014 11:30:22 +0000
draft: false
tags: ['Aprender a programar em C#', 'C Sharp', 'C#', 'C#', 'Conceitos básicos', 'Iniciante', 'Visual Studio']
---

Como você pode ter acompanhado no artigo anterior, nós realizamos uma breve introdução e abordagem dos conceitos básicos do C# (C-Sharp) como sintaxe, tipos de dados, variáveis, operadores, controle de fluxo e laços de repetição, caso ainda não tenha conferido, acesse o link [Aprender a programar em C# – Parte 1](/aprender-a-programar-em-csharp-parte-1 "Aprender a programar em C# – Parte 1")



Nessa segunda parte da série Aprender a programar em C#, iremos criar alguns exemplos de código C# em um editor de texto comum de sua preferencia (pode ser o notepad ou notepad++) e compilar o código no compilador [csc]([Compiler Options - C# reference | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/)) que acompanha o .NET Framework.

Abra seu editor favorito (no meu caso, vou usar o Notepad++) e vamos criar um código simples abaixo:

```csharp
using System;

namespace MeuNamespace
{
    public class MinhaClasse
    {
        static void Main()
        {
            Console.WriteLine("Olá C# Brasil!");
            Console.ReadKey();
        }
    }
}
```

Agora que seu código de exemplo está pronto, vamos realizar a compilação por linha de comando e gerar nosso primeiro executável. Abra o prompt de comando em _iniciar > executar_ ou utilizando a tecla de atalho _Win + R_ e digite o comando abaixo:

```shell
csc /out:C:\exemplos\Exemplo1.exe C:\exemplos\Exemplo1.cs
```

Ao executar o comando, ele irá gerar resultado abaixo informando a versão do compilador e do .NET Framework utilizado.

![aprender_programar_csharp_parte2_1](/contents/2014/09/aprender_programar_csharp_parte2_1.jpg)

Quando executarmos nossa aplicação, será exibido conforme a imagem abaixo:

![aprender_programar_csharp_parte2_2](/contents/2014/09/aprender_programar_csharp_parte2_2.jpg)

Caso ocorra algum erro, ele é informado na linha de comando como na imagem a seguir.

![aprender_programar_csharp_parte2_3](/contents/2014/09/aprender_programar_csharp_parte2_3.jpg)

No caso desse exemplo, foi provocado um erro proposital para ilustrar removendo o carácter ";" (ponto-virgula) do final da linha 9.

Vamos dificultar um pouco mais as coisas e incluir um pouco de interação ao nosso aplicativo.

```csharp
using System;

namespace MeuNamespace
{
    public class MinhaClasse
    {
        static void Main()
        {
            Console.Write("Informe seu nome: ");
            string nome = Console.ReadLine();

            Console.WriteLine("Olá " + nome + " bem-vindo ao C# Brasil!");
            Console.Write("Pressione qualquer tecla para continuar...");
            Console.ReadKey();
        }
    }
}
```

No código acima, o aplicativo ao ser executado, o usuário será solicitado que informe o seu nome e ao concluir o preenchimento e teclar _enter_ uma mensagem é exibida.

Vamos compilar nosso código.

```shell
csc /out:C:\\exemplos\\Exemplo2.exe C:\\exemplos\\Exemplo2.cs
```

![aprender_programar_csharp_parte2_4](/contents/2014/09/aprender_programar_csharp_parte2_4.jpg)

Feito a compilação e sem a ocorrência de erro, vamos executar a aplicação e teremos o resultado abaixo:

![aprender_programar_csharp_parte2_5](/contents/2014/09/aprender_programar_csharp_parte2_5.jpg) 

![aprender_programar_csharp_parte2_6](/contents/2014/09/aprender_programar_csharp_parte2_6.jpg)

Agora vamos a um outro exemplo com um pouco mais interação do usuário. Nesse exemplo o usuário deverá informar um número entre 0 e 100 para A e B. No código é realizado a recuperação dos valores informados pelo usuário e a conversão para inteiro para fazer o calculo entre A e B. Caso o valos não seja satisfatório, o código irá retornar uma mensagem informando.

```csharp
using System;

namespace MeuNamespace
{
    public class MinhaClasse
    {
        static void Main()
        {
            Console.Write("Informe um número para A entre 0 e 100: ");
            string input1 = Console.ReadLine();
            Console.Write("Informe um número para B entre 0 e 100: ");
            string input2 = Console.ReadLine();

            int num1 = 0;
            int num2 = 0; 

            if (int.TryParse(input1, out num1) && int.TryParse(input2, out num2) && (num1 >= 0 && num1 <= 100) && (num2 >= 0 && num2 <= 100))
            {
                int result = num1 + num2;
                Console.WriteLine("A) " + num1);
                Console.WriteLine("B) " + num2);
                Console.WriteLine("Resultado: " + result);
            }
            else
            {
                Console.WriteLine("Ocorreu um problema. Um dos números informados não eram validos ou não eram números inteiros.");
                Console.WriteLine("A) " + num1);
                Console.WriteLine("B) " + num2);
            }

            Console.WriteLine("Pressione qualquer tecla para continuar...");
            Console.ReadKey();
        }
    }
}
```

Vamos compilar nosso código.

```shell
csc /out:C:\\exemplos\\Exemplo3.exe C:\\exemplos\\Exemplo3.cs
```

![aprender_programar_csharp_parte2_7](/contents/2014/09/aprender_programar_csharp_parte2_7.jpg)

Feito a compilação, vamos executar a aplicação:

![aprender_programar_csharp_parte2_8](/contents/2014/09/aprender_programar_csharp_parte2_8.jpg) 

![aprender_programar_csharp_parte2_9](/contents/2014/09/aprender_programar_csharp_parte2_9.jpg)

Até aqui você aprendeu um pouco mais sobre a linguagem C# (C-Sharp) além de poder aplicar na prática o uso do compilador [csc]([Compiler Options - C# reference | Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/)) em linha de comando. Pelo fato de o compilador em si não ser nosso foco, não irei fazer maiores abordagem acerca de seus outros parametros de compilação uma vez que é possível realizar algo mais avançado do que o proposto no artigo.

Para a [próxima parte](/aprender-a-programar-em-csharp-parte-3), iremos começar com a abordagem do uso do Visual Studio, então aconselho te-lo instalado pois não iremos abordar sua instalação mais sim o seu uso. Poderá ser usado o Visual Studio Express ou qualquer outra versão completa (Professional, Premium ou Ultimate).

Para obter o Visual Studio, basta acessar o site [visualstudio.microsoft.com](visualstudio.microsoft.com).

Fonte do projeto: [Github](https://github.com/csharpbrasil/aprender_programar_csharp_parte2).

Até o próximo artigo e bons estudos!