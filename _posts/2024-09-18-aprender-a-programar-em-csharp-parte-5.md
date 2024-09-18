---
title: 'Aprender a programar em C# – Parte 5'
date: Thu, 18 Sep 2024 19:30:00 +0000
draft: false
tags: ['Aprender a programar em C#', 'C Sharp', 'C#','linq', 'lambda', 'Conceitos básicos', 'Iniciante', 'Visual Studio']
---
Na continuidade da nossa série sobre programação em C#, chegamos a um tema muito relevante e atual: LINQ (Language Integrated Query) e Expressões Lambda. Esses conceitos são fundamentais para quem deseja trabalhar com manipulação de dados de forma eficiente e expressiva. Neste artigo, vamos explorar o que são, como funcionam e como podemos utilizá-los em nossos projetos.

## 1. O que é LINQ?

LINQ é uma poderosa ferramenta que permite realizar consultas em coleções de dados de forma semelhante a consultas SQL, mas diretamente em C#. Com LINQ, você pode trabalhar com arrays, listas, bancos de dados e XML, entre outros, utilizando uma sintaxe clara e concisa.

### 1.1. Tipos de LINQ

Existem diferentes tipos de LINQ que podemos utilizar:

- **LINQ to Objects**: Permite realizar consultas em coleções em memória, como arrays e listas.
- **LINQ to SQL**: Permite realizar consultas em bancos de dados SQL Server.
- **LINQ to XML**: Permite realizar consultas em documentos XML.

## 2. Sintaxe do LINQ

A sintaxe do LINQ pode ser dividida em duas abordagens: **Sintaxe de Consulta** e **Sintaxe de Método**.

### 2.1. Sintaxe de Consulta

A sintaxe de consulta é semelhante à SQL e é bastante intuitiva. Veja um exemplo:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numeros = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        var pares = from n in numeros
                    where n % 2 == 0
                    select n;
        Console.WriteLine("Números pares:");
        foreach (var numero in pares)
        {
            Console.WriteLine(numero);
        }
    }
}
```

### 2.2. Sintaxe de Método

A sintaxe de método utiliza métodos de extensão e é mais comum em cenários onde você precisa de operações mais complexas. Veja o mesmo exemplo utilizando a sintaxe de método:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numeros = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        var pares = numeros.Where(n => n % 2 == 0);
        Console.WriteLine("Números pares:");
        foreach (var numero in pares)
        {
            Console.WriteLine(numero);
        }
    }
}
```

## 3. O que são Expressões Lambda?

Expressões Lambda são uma forma concisa de representar métodos anônimos. Elas são frequentemente usadas em LINQ para definir critérios de seleção, filtragem e transformação de dados.

### 3.1. Sintaxe de Expressões Lambda

A sintaxe básica de uma expressão lambda é:

```csharp
(parameters) => expression
```

Por exemplo, a expressão lambda `n => n % 2 == 0` recebe um parâmetro `n` e retorna um valor booleano indicando se `n` é par.

## 4. Usando LINQ e Expressões Lambda Juntos

Uma das grandes vantagens de LINQ é que ele permite o uso de expressões lambda para realizar operações de forma mais flexível. Veja um exemplo onde utilizamos LINQ com expressões lambda para filtrar e ordenar uma lista de objetos:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
class Pessoa
{
    public string Nome { get; set; }
    public int Idade { get; set; }
}

class Program
{
    static void Main()
    {
        List<Pessoa> pessoas = new List<Pessoa>
        {
            new Pessoa { Nome = "Ana", Idade = 25 },
            new Pessoa { Nome = "João", Idade = 30 },
            new Pessoa { Nome = "Maria", Idade = 22 },
            new Pessoa { Nome = "Pedro", Idade = 35 }
        };

        var pessoasFiltradas = pessoas
            .Where(p => p.Idade > 25)
            .OrderBy(p => p.Nome);

        Console.WriteLine("Pessoas com mais de 25 anos:");

        foreach (var pessoa in pessoasFiltradas)
        {
            Console.WriteLine($"{pessoa.Nome}, {pessoa.Idade} anos");
        }
    }
}
```

## 5. Conclusão

Neste artigo, introduzimos o LINQ e as expressões lambda, mostrando como essas ferramentas podem facilitar a manipulação de dados em C#. Com a prática, você poderá aplicar esses conceitos em seus projetos, tornando seu código mais limpo e eficiente.

No próximo artigo, continuaremos a explorar mais recursos do C# e como utilizá-los em aplicações do mundo real. Até lá, bons estudos e mãos à obra!

---

**Referências:**

- Documentação oficial do [LINQ](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/)
- Exemplos de [Expressões Lambda](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/lambda-expressions)
