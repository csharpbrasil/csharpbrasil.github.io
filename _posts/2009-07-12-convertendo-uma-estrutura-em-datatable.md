---
title: 'Convertendo uma estrutura em DataTable'
date: Sun, 12 Jul 2009 02:00:21 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'C#', 'C#', 'DataTable', 'Dicas', 'Dicas', 'Framework', 'Melhores Práticas', 'Microsoft', 'VB.NET', 'Visual Studio', 'Visual Studio']
---

Esses dias fiquei pensando em um meio de criar um jeito de converter uma estrutura de dados qualquer em um DataTable e cheguei finalmente em uma meio muito interessante.

Como exemplo, eu criei a seguinte estrutura na qual desejava converter em um DataTable:

\[sourcecode language='csharp'\] public class Clientes { private string \_Nome; private int \_Idade; private string \_Cidade; public string Nome { get { return \_Nome; } set { \_Nome = value; } } public int Idade { get { return \_Idade; } set { \_Idade = value; } } public string Cidade { get { return \_Cidade; } set { \_Cidade = value; } } } \[/sourcecode\]

Para realizar o teste em minha classe de conversão de estrutura para DataTable criei o código abaixo gerando um array com os dados.

\[sourcecode language='csharp'\] List lstClientes = new List(); Clientes cliente1 = new Clientes(); cliente1.Nome = "João Batista"; cliente1.Idade = 22; cliente1.Cidade = "São Paulo"; lstClientes.Add(cliente1); Clientes cliente2 = new Clientes(); cliente2.Nome = "Renato Ferraz"; cliente2.Idade = 48; cliente2.Cidade = "Rio de Janeiro"; lstClientes.Add(cliente2); Structure2DataTable struct2dt = new Structure2DataTable(); DataTable dt = struct2dt.GetDataTable(lstClientes.ToArray()); dataGridView1.DataSource = dt; \[/sourcecode\]

No exemplo acima eu criei uma lista genérica da minha estrutura _Clientes_...

\[sourcecode language='csharp'\] List lstClientes = new List(); \[/sourcecode\]

Sendo assim, eu poderia instanciar a minha classe _Clientes_ e adicionar a ela.

\[sourcecode language='csharp'\] Clientes cliente1 = new Clientes(); cliente1.Nome = "João Batista"; cliente1.Idade = 22; cliente1.Cidade = "São Paulo"; lstClientes.Add(cliente1); Clientes cliente2 = new Clientes(); cliente2.Nome = "Renato Ferraz"; cliente2.Idade = 48; cliente2.Cidade = "Rio de Janeiro"; lstClientes.Add(cliente2); \[/sourcecode\]

Agora vem a parte que nos interessa que é o trecho em que utilizo a minha classe de conversão.

\[sourcecode language='csharp'\] Structure2DataTable struct2dt = new Structure2DataTable(); DataTable dt = struct2dt.GetDataTable(lstClientes.ToArray()); dataGridView1.DataSource = dt; \[/sourcecode\]

No código acima, eu instanciei a minha classe informando o tipo de dados que da qual desejo converter para DataTable, no caso um array da minha classe Clientes (_Clientes\[\]_) e o resultado da conversão será atribuída em um DataTable e esse como exemplo em um DataGridView.

Você deve estar se perguntando como é possível, então vamos a classe.

\[sourcecode language='csharp'\] public class Structure2DataTable { private DataTable dt = new DataTable(); public DataTable GetDataTable(T t) { DataTable dt = new DataTable(); Type tipo = t.GetType(); if (tipo.IsArray) { Array arr = (t as Array); foreach (object obj in arr) { tipo = obj.GetType(); PropertyInfo\[\] propriedades = tipo.GetProperties(); if (propriedades.Length > 0) { DataRow row = dt.NewRow(); foreach (PropertyInfo p in propriedades) { if (!dt.Columns.Contains(p.Name)) dt.Columns.Add(p.Name, p.PropertyType); row\[p.Name\] = p.GetValue(obj, null); } dt.Rows.Add(row); dt.AcceptChanges(); } } } else { PropertyInfo\[\] propriedades = tipo.GetProperties(); if (propriedades.Length > 0) { DataRow row = dt.NewRow(); foreach (PropertyInfo p in propriedades) { if (!dt.Columns.Contains(p.Name)) dt.Columns.Add(p.Name, p.PropertyType); row\[p.Name\] = p.GetValue(t, null); } dt.Rows.Add(row); dt.AcceptChanges(); } } return dt; } } \[/sourcecode\]

O segredo esta na namespace _System.Reflection_ que possui todas as funcionalidades necessárias para criação dessa classe de conversão.

\[sourcecode language='csharp'\] public class Structure2DataTable \[/sourcecode\]

O é um nome genérico que iremos utilizar dentro da nossa classe fazendo referencia ao tipo de estrutura passada, ou seja, dentro na nossa classe de conversão ele representará a nossa estrutura _Clientes_.

Com isso criei um método que será o responsável em retornar o resultado da conversão e nele passaremos o parâmetro do mesmo tipo.

\[sourcecode language='csharp'\] public DataTable GetDataTable(T t) \[/sourcecode\]

Dentro desse método iremos criar uma instância do DataTable que retornará os nossos dados que vieram da estrutura _Clientes_, criamos uma variável do tipo Type que irá armazenar o tipo da nossa estrutura.

Em seguida verificaremos se a estrutura passada é do tipo Array, se for converteremos para Array e faremos um laço recuperando as propriedades dele, mais se não for somente recuperaremos as propriedades e iremos atribuindo as informações contidas em nosso DataTable.

Veja o resultado:

 [![](https://raphaelcardoso.com.br/wp-content/uploads/2009/07/estrutura_datatable001.jpg)](https://raphaelcardoso.com.br/wp-content/uploads/2009/07/estrutura_datatable001.jpg) 

Bom, espero que seja útil para você.  
Se quiser, poderá pegar o código [aqui](https://raphaelcardoso.com.br/wp-content/uploads/2009/07/Structure2DataTable.zip).  
Qualquer dúvida estarei a disposição.  
  
Abraço