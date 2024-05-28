---
title: 'LINQ - Language Integrated Query'
date: Tue, 16 Nov 2010 15:30:28 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'Framework', 'Language Integrated Query', 'LINQ', 'LINQ', 'LINQPAD', 'Visual Studio']
---

Recentemente recebi a [2ª edição do livro "Como programar com ASP.NET e C#"](https://novatec.com.br/livros/como-programar-com-aspnet-c-2ed/) do autor [Alfredo Lotar](http://twitter.com/AlfredoLotar) enviado como cortesia pela [Editora Novatec](http://www.novatec.com.br/) para fazer uma [resenha sobre ele](https://raphaelcardoso.com.br/como-programar-com-asp-net-e-c-editora-novate/). Como já conheço a qualidade do trabalho do [Alfredo Lotar](http://twitter.com/AlfredoLotar) então dei inicio ao estudo sobre LINQ que era o meu maior interesse até então.

Mais o que vem a ser o LINQ? Language Integrated Query ou simplesmente LINQ consistem em um modelo de programação unificado para extrair e atualizar dados de diferentes fontes de dados utilizando uma sintaxe conhecida como por exemplo o C# (C-Sharp).

Com o LINQ podemos por exemplo manipular um array com uma sintaxe bem simples. Então vamos a um pequeno exemplo.

\[sourcecode language='sql'\] int\[\] num = { 1, 8, 3, 6, 5, 0, 4, 7, 2, 9 }; var obj = from n in num where n > 5 select n; GridView1.DataSource = obj; GridView1.DataBind(); \[/sourcecode\]

Como por ver no exemplo anterior, criar um array de inteiros (int ou integer) com numero. Utilizando instrução LINQ realizei uma consulta e retornando os numeros maiores que 5. E o resultado irá retornar os numeros 8, 6, 7 e 9.

Agora vamos a mais alguns exemplos:

##### Ordenando dados usando **ORDERBY**

\[sourcecode language='sql'\] var obj = from n in num where n > 5 orderby n select n; \[/sourcecode\]

##### Organizando os dados em ordem ascendente usando **ORDERBY** e **ASCENDING**

\[sourcecode language='sql'\] var obj = from n in num where n > 5 orderby n ascending select n; \[/sourcecode\]

##### Organizando os dados em ordem descendente usando **ORDERBY** e **DESCENDING**

\[sourcecode language='sql'\] var obj = from n in num where n > 5 orderby n descending select n; \[/sourcecode\]

Faremos em seguinda um pouco diferente. Dessa vez teremos um array de string.

\[sourcecode language='sql'\] string\[\] nomes = { "Joao", "Maria", "Paulo", "Rita", "Vitor", "Suzana", "Denis", "Ana", "Jose", "Beatriz", "Marcia" }; var obj = from n in nomes where n.Length > 4 select n; GridView1.DataSource = obj; GridView1.DataBind(); \[/sourcecode\]

Você viu no exemplo anterior uma lista de nomes na qual eu realizei uma consulta solicitando que fosse retornado os nomes que tivessem mais de 4 caracteres.

Agora vamos complicar um pouco as coisas. Vamos criar uma estrutura chamado _Cliente_ as propriedades _Codigo_ e _Nome_ e nela implementaremos a Interface _IComparable_ para nos dar a possibilidade de criar uma ordenação de dados usando o LINQ.

\[sourcecode language='csharp'\] public class Cliente : IComparable { public int Codigo { get; set; } public string Nome { get; set; } public Cliente() { } public Cliente(int Codigo, string Nome) { this.Codigo = Codigo; this.Nome = Nome; } public int CompareTo(object obj) { Cliente temp = (Cliente)obj; if (this.Codigo < temp.Codigo) { return 1; } if (this.Codigo > temp.Codigo) { return -1; } else { return 0; } } } \[/sourcecode\]

Agora usaremos a estrutura criando um array e adicionando dados.

\[sourcecode language='csharp'\] List lstClientes = new List(); lstClientes.Add(new Cliente(3, "Maria")); lstClientes.Add(new Cliente(5, "Pedro")); lstClientes.Add(new Cliente(1, "Paulo")); lstClientes.Add(new Cliente(4, "Rita")); lstClientes.Add(new Cliente(2, "João")); \[/sourcecode\]

Depois de criado nosso array de _Cliente_ com os dados, vamos a nossa consulta usando LINQ.

\[sourcecode language='sql'\] var obj = from c in lstClientes.ToArray() select c; \[/sourcecode\]

O exemplo anterior não é diferente dos já citados a não ser por um pequeno detalhe. Se executarmos o código abaixo e apresenta-lo no _GridView_, será exibido o _Codigo_ e o _Nome_. Mais podemos limitar isso como por exemplo exibir somente o Nome. Veja o exemplo:

\[sourcecode language='sql'\] var obj = from c in lstClientes.ToArray() select new { c.Nome }; \[/sourcecode\]

Vamos agora atribuir um filtro a nossa consulta e ordenar.

\[sourcecode language='sql'\] var obj = from c in lstClientes.ToArray() where c.Nome.Contains("P") orderby c.Codigo ascending select new { c.Codigo, c.Nome }; \[/sourcecode\]

Na consulta anterior realizamos a busca de nomes iniciados com _"P"_ e ainda ordenamos por _Codigo_

A vantagens de se usar o LINQ é que temos uma flexibilidade muito grande para realizar consultar o que torna o código mais compacto e mais compreensível. Mais as vantagens não para por ai. Podemos ainda:

##### Junção de 2 ou mais estruturas com _JOIN_:

##### \[sourcecode language='sql'\] var obj = from p in pessoas join c in cidades on p.IdCidade equals c.IdCidade join u in ufs on c.IdUf equals u.IdUf select new { p.IdPessoa, p.NomePessoa, c.NomeCidade, u.SiglaUf }; \[/sourcecode\]

##### Agrupamento com _GROUP BY_:

\[sourcecode language='sql'\] var obj = from p in pessoas join c in cidades on p.IdCidade equals c.IdCidade join u in ufs on c.IdUf equals u.IdUf group u by u.IdUf into grupo from g in grupo.Distinct() select new { g.IdUf, g.SiglaUf, TotalPessoas = grupo.Count() }; \[/sourcecode\]

Enfim, existe muito mais opções de uso do LINQ e que com certeza deixará nosso trabalho mais facil e um código mais simples. Lembrando que o uso do LINQ não se limita aos exemplos acima mencionado e que o mesmo pode ser feito a consultas a dados.

Ainda para finalizar, deixo uma dica para você que quer treinar a aprender mais da sintaxe do LINQ e de quebra realizar consulta diretamente a um banco de dados, bastando usar o [LINQPAD](http://www.linqpad.net/)

\[caption id="attachment\_1405" align="aligncenter" width="300" caption="Exemplo de uso do LINQ no LINQPAD"\][![Exemplo de uso do LINQ no LINQPAD](https://raphaelcardoso.com.br/wp-content/uploads/2010/11/linqpad-1-300x193.jpg "linqpad")](https://raphaelcardoso.com.br/wp-content/uploads/2010/11/linqpad-1.jpg)\[/caption\]  

Abraço e bom estudo!

_"Se um dia você tiver que escolher entre o mundo e o amor, lembre-se: Se escolher o mundo ficará sem amor, mas se você escolher o amor, com ele conquistará o mundo" (Albert Einstein)_