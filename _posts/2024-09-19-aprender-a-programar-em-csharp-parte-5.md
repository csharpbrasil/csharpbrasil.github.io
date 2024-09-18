---
title: 'Aprender a programar em C# – Parte 4'
date: Thu, 19 Sep 2024 19:30:00 +0000
draft: false
tags: ['Aprender a programar em C#', 'C Sharp', 'C#', 'C#', 'Conceitos básicos', 'Iniciante', 'Visual Studio']
---

Na sequência da nossa série sobre como aprender a programar em C#, chegamos a um tema muito relevante e atual: LINQ (Language Integrated Query), expressões Lambda e o Entity Framework. Esses conceitos são fundamentais para quem deseja trabalhar com dados de forma eficiente e moderna em aplicações C#. Neste artigo, vamos explorar cada um deles, entender suas funcionalidades e como utilizá-los em nossos projetos.

## 1. O que é LINQ?

LINQ é uma poderosa ferramenta que permite realizar consultas a diferentes fontes de dados (como coleções em memória, bancos de dados, XML, entre outros) utilizando uma sintaxe semelhante à SQL. Com LINQ, você pode escrever consultas de forma mais legível e concisa, integrando-as diretamente ao código C#.

### Exemplo de uso do LINQ

Vamos considerar uma lista simples de objetos `Produto` e realizar uma consulta para filtrar produtos com preço superior a um determinado valor.

csharp

```csharp
using System;

using System.Collections.Generic;

using System.Linq;

public class Produto

{

    public string Nome { get; set; }

    public decimal Preco { get; set; }

}

class Program

{

    static void Main()

    {

        List<Produto> produtos = new List<Produto>

        {

            new Produto { Nome = "Produto A", Preco = 50 },

            new Produto { Nome = "Produto B", Preco = 150 },

            new Produto { Nome = "Produto C", Preco = 30 }

        };

        var produtosCaros = from p in produtos

                            where p.Preco > 100

                            select p;

        foreach (var produto in produtosCaros)

        {

            Console.WriteLine($"Produto: {produto.Nome}, Preço: {produto.Preco}");

        }

    }

}
```

Neste exemplo, utilizamos a sintaxe de consulta do LINQ para filtrar produtos com preço superior a 100. A consulta é executada e os resultados são exibidos no console.

## 2. Expressões Lambda

As expressões Lambda são uma forma concisa de representar métodos anônimos. Elas são frequentemente utilizadas em conjunto com LINQ para simplificar a sintaxe das consultas.

### Exemplo de uso de Lambda

O mesmo exemplo anterior pode ser reescrito utilizando expressões Lambda:

csharp

```csharp
var produtosCaros = produtos.Where(p => p.Preco > 100);

foreach (var produto in produtosCaros)

{

    Console.WriteLine($"Produto: {produto.Nome}, Preço: {produto.Preco}");

}
```

Aqui, a expressão `p => p.Preco > 100` é uma expressão Lambda que define a condição de filtragem. Essa sintaxe é mais compacta e muitas vezes mais fácil de ler.

## 3. O que é o Entity Framework?

O Entity Framework (EF) é uma biblioteca de mapeamento objeto-relacional (ORM) que facilita a interação com bancos de dados em aplicações .NET. Com o EF, você pode trabalhar com dados utilizando objetos C# em vez de escrever comandos SQL diretamente.

### Configurando o Entity Framework

Para começar a usar o Entity Framework em seu projeto, você precisa instalá-lo via NuGet. No Visual Studio, você pode fazer isso através do Package Manager Console:

bash

```bash
Install-Package EntityFramework
```

### Exemplo de uso do Entity Framework

Vamos criar um exemplo simples de como usar o Entity Framework para realizar operações CRUD em uma tabela de produtos.

1. **Definindo o modelo de dados:**

csharp

```csharp
public class Produto

{

    public int Id { get; set; }

    public string Nome { get; set; }

    public decimal Preco { get; set; }

}
```

2. **Criando o contexto do banco de dados:**

csharp

```csharp
using System.Data.Entity;

public class MeuDbContext : DbContext

{

    public DbSet<Produto> Produtos { get; set; }

}
```

3. **Realizando operações CRUD:**

csharp

```csharp
class Program

{

    static void Main()

    {

        using (var context = new MeuDbContext())

        {

            // Adicionar um novo produto

            var novoProduto = new Produto { Nome = "Produto D", Preco = 200 };

            context.Produtos.Add(novoProduto);

            context.SaveChanges();

            // Consultar produtos

            var produtos = context.Produtos.ToList();

            foreach (var produto in produtos)

            {

                Console.WriteLine($"Produto: {produto.Nome}, Preço: {produto.Preco}");

            }

            // Atualizar um produto

            var produtoParaAtualizar = context.Produtos.First();

            produtoParaAtualizar.Preco = 250;

            context.SaveChanges();

            // Excluir um produto

            var produtoParaExcluir = context.Produtos.Last();

            context.Produtos.Remove(produtoParaExcluir);

            context.SaveChanges();

        }

    }

}
```

Neste exemplo, criamos um novo produto, consultamos todos os produtos, atualizamos o preço de um produto e, por fim, excluímos um produto do banco de dados.

## Conclusão

Neste artigo, abordamos conceitos fundamentais como LINQ, expressões Lambda e o Entity Framework, que são essenciais para o desenvolvimento de aplicações C# modernas e eficientes. Com essas ferramentas, você pode manipular dados de forma mais intuitiva e produtiva.

No próximo artigo, continuaremos a explorar mais recursos do C# e do .NET, sempre buscando aprimorar suas habilidades de programação. Até lá, bons estudos e mãos à obra!
