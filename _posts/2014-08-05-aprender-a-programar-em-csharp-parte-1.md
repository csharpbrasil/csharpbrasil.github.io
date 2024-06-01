---
title: 'Aprender a programar em C# - Parte 1'
date: Tue, 05 Aug 2014 11:00:14 +0000
draft: false
tags: ['Aprender a programar em C#', 'C Sharp', 'C#', 'C#', 'Conceitos básicos', 'Iniciante', 'Visual Studio']
---

Com o objetivo de levar um pouco do conhecimento de C# (C-Sharp) aos iniciantes em programação, estou iniciando uma nova série com o foco no aprendizado sobre a linguagem onde os iniciantes em programação acompanhar e aprender a programar em C#. Iremos abordar alguns detalhes básicos sobre a linguagem tais como sintaxe, tipos de dados, variáveis, operadores, controle de fluxo e laços de repetição.

### 1 - Introdução

O C# (C-Sharp) é uma linguagem de programação orientada a objeto e fortemente tipada criada pela Microsoft e tendo como principal desenvolvedor [Anders Hejlsberg](http://pt.wikipedia.org/wiki/Anders_Hejlsberg) (o mesmo criador do Delphi e Turbo Pascal) como parte do Framework .NET que se encontra na atualmente na versão 5.0. É uma linguagem influenciada pelo C++, Java e Object Pascal.

### 2 - Sintaxe

Um código em C# será armazenado sempre em um arquivo com extensão ".cs" como por exemplo _FolhaDePagamento.cs_ ou _ConexaoDados.cs_. Dentro dos arquivos C#, poderemos ter várias ou nenhuma namespaces e dentro dessas uma ou mais classes. Vamos a alguns exemplos:

```csharp
namespace Br.CSharpBrasil.MeuNamespace
{
    public class FolhaDePagamento
    {
        public FolhaDePagamento()
        {

        }
    }

    public class ConexaoDados
    {
        public ConexaoDados()
        {

        }
    }
}

namespace Br.CSharpBrasil.OutroNamespace
{
    public class Faturamento
    {
        public Faturamento()
        {

        }
    }
}
```

Em uma classe C#, poremos utilizar algumas modificadores de acesso como: public ou internal

* **_public_:** Esse modificador quando definida na classe a torna acessível publicamente, ou seja, não existe restrição para acesso a classe.
* **_internal_:** Ao aplicar esse modificador a uma classe, essa passa a ser acessível somente dentro do mesmo arquivo do nosso assembly, ou seja, nenhum outro poderá ter acesso a classe.

Veja o exemplo de uso dos modificadores.

```csharp
namespace Br.CSharpBrasil.MeuProjeto
{
    public class MinhaClasse1
    {
        public MinhaClasse1()
        {

        }
    }

    internal class MinhaClasse2
    {
        public MinhaClasse2()
        {

        }
    }
}
```

### 3 - Tipos de dados

Agora que já conhece um pouco da estrutura de um arquivo C#, veremos os tipos de dados existente. Como mencionei anteriormente, o C# é uma linguagem fortemente tipada e possui alguns tipos de dados que poderemos utilizar para declara o tipo de nossas variáveis.

| NOME    | CLASSE .NET | TAMANHO | INTERVALO                                    |
| ------- | ----------- | ------- | -------------------------------------------- |
| byte    | Byte        | 8       | 0 a 255                                      |
| sbyte   | SByte       | 8       | -128 a 127                                   |
| int     | Int32       | 32      | -2147483648 a 2147483647                     |
| uint    | Uint32      | 32      | 0 a 4294967295                               |
| short   | Int16       | 16      | -32768 a 32767                               |
| ushort  | UInt16      | 16      | 0 a 65535                                    |
| long    | Int64       | 64      | -922337203685477508 a 922337203685477507     |
| ulong   | UInt64      | 64      | 0 a 18446744073709551615                     |
| float   | Single      | 32      | -3,4 x 10^28 a 3,4 x 10^38                   |
| double  | Double      | 64      | ±5,0 x 10^-324 a ±1,7 x 10^308               |
| char    | Char        | 16      |                                              |
| bool    | Boolean     | 8       | true ou false                                |
| object  | Object      |         |                                              |
| string  | String      |         |                                              |
| decimal | Decimal     | 128     | (-7,9 x 10^28 a 7,9 x 10^28) / (10^(0 a 28)) |

### 4 - Variáveis

Para a criação das variáveis, é importante seguir algumas regrinhas básicas na hora de dar um nome a elas:

* Não utilizar palavras reservadas do C#: while, for, if, do, event, etc...
* Não é permitido caracteres especiais, espaços
* Utilizar somente _ ou letras ou números
* Obrigatoriamente deverá iniciar com _ ou letras
* O nome da variável deverá ser único no contexto que ela for declarada.

Vamos a alguns exemplo de declaração de variáveis:

```csharp
int contador = 890 ;
double preco = 3210.74D ;
bool existe = false ;
string site = "csharpbrasil.com.br" ;
```

### 6 - Operadores

Os operadores são termos ou símbolos usados em uma expressão.

| CATEGORIA           | OPERADORES                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------- |
| Primários           | x.y, f(x), a[x], x++, x–, new, typeof, checked, unchecked, default(T), delegate, sizeof, -> |
| Unários             | +x, -x, !x, ~x, ++x, –x, (T)x, await, &x, *x                                                |
| Aritméticos         | x * y, x / y, x % y, x + y, x – y                                                           |
| Shift (Troca)       | x << y, x >> y                                                                              |
| Relacional          | x < y, x > y, x <= y, x >= y, is, as                                                        |
| Igualdade           | x == y, x != y                                                                              |
| E lógico            | x & y                                                                                       |
| OU Exclusivo Lógico | x ^ y                                                                                       |
| OU Lógico           | x \| y                                                                                      |
| E Condicional       | x && y                                                                                      |
| OU Condicional      | x \| y                                                                                      |
| Condicional         | ?:                                                                                          |
| Atribuição          | x = y, x += y, x -= y, x *= y, x /= y, x %= y, x &= y, x \|= y, x ^= y, x <<= y, x >>= y    |
| Null-coalescing     | ??                                                                                          |
| Lambda              | =>                                                                                          |

Como já conhece os operadores, vamos a alguns de uso:

```csharp
/* OPERADORES ARITMETICOS */
int x = 6 * 5 / 3; // Resultado = 10
int y = 9 + 8 * 14; // Resultado = 121
int z = 15 % 7; // Resultado = 1
```

### 7- Controle de fluxo

São instruções que controlam o fluxo da execução do programa de acordo com certas condições. Sem eles o código é executado do começo ao fim sem respeitar nenhuma condição. São eles:

* **_if_:** É utilizada para verificar se um condição é verdadeira. Esse é utilizando em conjunto com alguns dos operadores citados anteriormente.
* **_else_:** É utilizado quando a condição testada do controle if não é verdadeira. Esse também pode ser utilizado em conjunto com if
* **_switch_:** Esse controle de fluxo testa um parâmetro passado comparando-o com as condições existentes e direciona a saída para um deles. Quando não existe nenhuma condição, ele direciona para uma saída padrão.

```csharp
int x = 2 * 3;
int y = 15 / 3;

if (x >= 6)
{
    // Executada um instrução qualquer
}

if (y > 10)
{
    // Executada um instrução qualquer
}
else
{
    // Executada um instrução qualquer
}

switch (x % y)
{
    case 0:
        // Executada um instrução qualquer
        break;
    case 1:
        // Executada um instrução qualquer
        break;
    default:
        // Executada um instrução qualquer
        break;
}
```

### 8- Laços de repetição

Os laços de repetição ou loops como são normalmente conhecidos, são instruções de interação que podem ser executadas um determinado numero de vezes, ou enquanto uma condição não for satisfatória ou até mesmo até quando ele for interrompida.

* **_do_:** É executado enquanto uma determinada condição não é atendida
* **_for_:** É executado um determinado numero de vezes
* **_foreach_:** É executado em cima de uma matriz ou coleção, ou seja, percorre todos os elementos
* **_while_:** É executado enquanto uma determinada condição não é atendida

```csharp
/* EXEMPLO DE EXECUÇÃO COM O LOOP "do" */
int x = 0;
do
{
    Console.WriteLine(x);
    x++;
} while (x <10);

/* EXEMPLO DE EXECUÇÃO COM O LOOP "for" */
for(int y = 0; y < 10; y++)
{
    Console.WriteLine(y);
}

/* EXEMPLO DE EXECUÇÃO COM O LOOP "foreach" */
int[] l = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
foreach(int i in l)
{
    Console.WriteLine(i);
}

/* EXEMPLO DE EXECUÇÃO COM O LOOP "while" */
int z = 0;
while (z <10)
{
    Console.WriteLine(z);
    z++;
}
```

Até aqui você conseguiu ver ó básico da linguagem C#. Para que possamos mesmo começar a entender mais, [no próximo artigo](/aprender-a-programar-em-csharp-parte-2/) começaremos com a criação de um exemplo em C# criado em um editor de texto qualquer e compilando diretamente em linha de comando com o compilador [csc](http://msdn.microsoft.com/en-us/library/78f4aasd.aspx) para entender mais um pouco do funcionamento. 

Até o próximo artigo e bons estudos!