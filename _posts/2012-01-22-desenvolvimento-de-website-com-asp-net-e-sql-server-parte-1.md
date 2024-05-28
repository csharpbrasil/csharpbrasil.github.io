---
title: 'Desenvolvimento de Website com ASP.NET e SQL Server - Parte 1'
date: Sun, 22 Jan 2012 18:10:05 +0000
draft: false
tags: ['.NET', 'acesso a dados', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'CMS', 'Content Management Systems', 'CRUD', 'CSS', 'Desenvolver website', 'Desenvolvimento de Website', 'N-Camadas', 'N-Tier', 'Sistema de gerenciamento de conteúdo', 'Sql Server', 'SQL Server', 'System.Data.OleDb', 'System.Data.SqlClient', 'Visual Studio', 'Visual Studio']
---

Olá caro leitor!

Estamos iniciando uma serie de artigos que tem como objetivo lhe mostrar o passo a passo da criação de um website utilizando ASP.NET e SQL Server.

Caso queira acessar as outras partes, veja os links abaixo:

*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 1](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-1/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 1")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 2](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-2/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 2")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 3](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-3/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 3")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 4](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-4/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 4")
*   [Desenvolvimento de Website com ASP.NET e SQL Server - Parte 5](https://raphaelcardoso.com.br/desenvolvimento-de-website-com-asp-net-e-sql-server-parte-5/ "Desenvolvimento de Website com ASP.NET e SQL Server – Parte 5")

Nessa primeira parte iremos criar nosso banco de dados, as tabelas, camada de conexão, camada de entidades e a camada de regras de negocio. Então vamos ao que interessa.

Inicialmente criaremos o nosso banco de dados então para isso abra o **Microsoft SQL Manager** e crie-o conforme imagem abaixo.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem001-300x162.jpg "imagem001")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem001.jpg)

Agora criaremos nossa tabela. A principio será somente 1 (uma) tabela. Segue abaixo o script:

\[sourcecode language='sql'\] CREATE TABLE PAGINAS ( ID\_PAGINA INT IDENTITY(1, 1) NOT NULL, TITULO\_PAGINA VARCHAR(40) NOT NULL, TEXTO\_PAGINA VARCHAR(MAX), DATACRIACAO\_PAGINA DATETIME, ATIVO\_PAGINA INT, PRIMARY KEY(ID\_PAGINA) ) \[/sourcecode\]

Vamos inserir alguns dados iniciais.

\[sourcecode language='sql'\] INSERT INTO PAGINAS(TITULO\_PAGINA, TEXTO\_PAGINA, DATACRIACAO\_PAGINA, ATIVO\_PAGINA) VALUES('Empresa', 'Conteudo da página sobre a empresa', GETDATE(), 1) INSERT INTO PAGINAS(TITULO\_PAGINA, TEXTO\_PAGINA, DATACRIACAO\_PAGINA, ATIVO\_PAGINA) VALUES('Serviços', 'Conteudo da página de serviços', GETDATE(), 1) \[/sourcecode\]

O fato de termos somente uma tabela é que nela teremos todas as páginas e seus conteúdos cadastrados. Nosso website terá a flexibilidade de criar, alterar, excluir e ativas ou desativas as páginas.

Futuramente criaremos uma pagina que listará produtos e para isso criaremos uma segunda tabela. Mais isso veremos em um próximo artigo.

Agora abra o Visual Studio e crie uma nova Solution clicando no menu _File > New > Project..._

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem002-300x185.jpg "imagem002")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem002.jpg)

Para minha solution darei o nome de _ProjetoWebSite_.

Após isso, criaremos nosso primeiro. Esse projeto terá como objetivo a manipulação de dados utilizando o SQL Server.

Clique com o botão direito em cima da solution e clique na opção _Add > New Project..._

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem003-300x162.jpg "imagem003")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem003.jpg)

Feito isso, siga os passo conforme a imagem abaixo selecionando _Windows > Class Librar_y e defina um nome para o projeto. No meu caso escolhi _WebSite.Data_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem004-300x185.jpg "imagem004")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem004.jpg)

Com nosso projeto da camada de conexão criada, iremos implementar alguns métodos. Basicamente serão 4 (quatro) métodos e 1 (uma) propriedade. Os 4 (quatro) métodos serão para abrir e fechar conexão, retornar os dados e outro pra executar comando. Vamos ao código.

\[sourcecode language='csharp'\] using System; using System.Data; using System.Data.SqlClient; namespace WebSite.Data { public class Connection { private SqlConnection Conexao; /// /// Dados de conexao para SqlServer /// public string ConnectionString { get; set; } public Connection() { } /// /// Construtor que recebe como parametro a ConnectionString /// ///  public Connection(string ConnectionString) { this.ConnectionString = ConnectionString; } ///  /// Abre conexao ///  public void AbrirConexao() { if (string.IsNullOrEmpty(this.ConnectionString)) throw new Exception("Não foi informado a ConnectionString."); if (Conexao == null) { Conexao = new SqlConnection(); Conexao.ConnectionString = this.ConnectionString; } Conexao.Open(); } ///  /// Fecha conexao ///  public void FechaConexao() { if (Conexao != null && Conexao.State == ConnectionState.Open) { Conexao.Close(); } } ///  /// Retorna os dados ///  ///  /// Retorna coleção de dados public IDataReader RetornaDados(string sql) { if (string.IsNullOrEmpty(sql)) throw new Exception("Não foi informado a query SQL."); if (Conexao == null || Conexao.State == ConnectionState.Closed) throw new Exception("A conexão fechada. Execute o comando AbrirConexao e não se esqueça de FecharConexao no final."); SqlCommand command = new SqlCommand(); command.Connection = this.Conexao; command.CommandText = sql; IDataReader reader = command.ExecuteReader(); return reader; } ///  /// Executa comando ///  ///  /// Retorna o total de linhas afetadas public int ExecutaComando(string sql) { if (string.IsNullOrEmpty(sql)) throw new Exception("Não foi informado a query SQL."); if (Conexao == null || Conexao.State == ConnectionState.Closed) throw new Exception("A conexão fechada. Execute o comando AbrirConexao e não se esqueça de FecharConexao no final."); SqlCommand command = new SqlCommand(); command.Connection = this.Conexao; command.CommandText = sql; int result = command.ExecuteNonQuery(); return result; } } } \[/sourcecode\]

Para utilização da classe, será necessário instancia-la, executar o método para abrir conexão, executar os métodos para retornar os dados ou executar comando SQL e em seguida encerrar conexão.

Essa camada de conexão é simples, de fácil entendimento e pode ser utilizado em qualquer projeto.

Com nossa camada de conexão criada, vamos à camada de entidades onde teremos todas as entidades envolvidas no projeto e que é um espelho de nossas tabelas. Inicialmente teremos somente 1 (uma) entidade. Vamos criar um novo projeto.

Clique com o botão direito em cima da solution e clique na opção _Add > New Project..._

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem005-300x162.jpg "imagem005")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem005.jpg)

Feito isso, siga os passo conforme a imagem abaixo selecionando Windows > Class Library e defina um nome para o projeto. No meu caso escolhi _WebSite.Entities_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem006-300x185.jpg "imagem006")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem006.jpg)

Agora vamos criar nossa entidade. Renomeie o arquivo _Class1.cs_ para _Paginas.cs_ que será um espelho da nossa tabela Paginas. Segue código abaixo.

\[sourcecode language='csharp'\] using System; namespace WebSite.Entities { public class Paginas { public int Id { get; set; } public string Titulo { get; set; } public string Texto { get; set; } public DateTime DataCriacao { get; set; } public bool Ativo { get; set; } public Paginas() { } public Paginas(int Id) { this.Id = Id; } public Paginas(int Id, string Titulo, string Texto, DateTime DataCriacao, bool Ativo) { this.Id = Id; this.Titulo = Titulo; this.Texto = Texto; this.DataCriacao = DataCriacao; this.Ativo = Ativo; } } } \[/sourcecode\]

Com nossa camada de entidades criada, iremos cria camada de regra de negócios. Siga os passos abaixo.

Clique com o botão direito em cima da solution e clique na opção _Add > New Project..._

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem007-300x162.jpg "imagem007")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem007.jpg)

Feito isso, siga os passo conforme a imagem abaixo selecionando _Windows > Class Library_ e defina um nome para o projeto. No meu caso escolhi _WebSite.Business_.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem008-300x185.jpg "imagem008")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem008.jpg)

Agora vamos criar as regras de negocio. Renomeie o arquivo _Class1.cs_ para _Paginas.cs_ que conterá todas as operações necessárias para manipularmos nossa tabela Paginas.

Antes de implementar os códigos, precisaremos adicionar como referencia ao nosso projeto as bibliotecas criadas anteriormente. Adicione a biblioteca _WebSite.Data_ e _WebSite.Entities_ clicando com botão direito em _References > Add References > Projects_. Na janela que segue selecione as 2 (duas) bibliotecas criadas.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem009-300x253.jpg "imagem009")](https://raphaelcardoso.com.br/wp-content/uploads/2012/01/imagem009.jpg)

Na classe _Paginas_, vamos adicionar as referencias.

\[sourcecode language='csharp'\] using System.Configuration; using System.Data; \[/sourcecode\]

Agora implementaremos a nossas regras conforme o código abaixo.

\[sourcecode language='csharp'\] using System; using System.Collections.Generic; using System.Text; using System.Configuration; using System.Data; namespace WebSite.Business { public class Paginas { private string ConnectionString = ConfigurationManager.ConnectionStrings\["DBConnection"\].ConnectionString; public Paginas() { } public Entities.Paginas\[\] ListaPaginas() { return ListaPaginas(null); } public Entities.Paginas\[\] ListaPaginas(Entities.Paginas pagina) { List lstPaginas = new List(); Data.Connection connection = new Data.Connection(this.ConnectionString); connection.AbrirConexao(); StringBuilder sqlString = new StringBuilder(); sqlString.AppendLine("select \* from paginas"); if (pagina != null) { sqlString.AppendLine("where 1 = 1"); if (pagina.Id > 0) { sqlString.AppendLine("and id\_pagina = " + pagina.Id + ""); } if (!string.IsNullOrEmpty(pagina.Titulo) && pagina.Titulo.Length > 0) { sqlString.AppendLine("and titulo\_pagina like '" + pagina.Titulo.Replace("'", "''") + "'"); } if (!string.IsNullOrEmpty(pagina.Texto) && pagina.Texto.Length > 0) { sqlString.AppendLine("and texto\_pagina like '" + pagina.Texto + "'"); } } IDataReader reader = connection.RetornaDados(sqlString.ToString()); int idxId = reader.GetOrdinal("ID\_PAGINA"); int idxTitulo = reader.GetOrdinal("TITULO\_PAGINA"); int idxTexto = reader.GetOrdinal("TEXTO\_PAGINA"); int idxDataCriacao = reader.GetOrdinal("DATACRIACAO\_PAGINA"); int idxAtivo = reader.GetOrdinal("ATIVO\_PAGINA"); while (reader.Read()) { Entities.Paginas \_pagina = new Entities.Paginas(); \_pagina.Id = reader.GetInt32(idxId); \_pagina.Titulo = reader.GetString(idxTitulo); \_pagina.Texto = reader.GetString(idxTexto); \_pagina.DataCriacao = reader.GetDateTime(idxDataCriacao); \_pagina.Ativo = reader.GetInt32(idxAtivo) == 1; lstPaginas.Add(\_pagina); } connection.FechaConexao(); return lstPaginas.ToArray(); } public bool SalvaPagina(Entities.Paginas pagina) { bool salvou = false; if (pagina != null) { Data.Connection connection = new Data.Connection(this.ConnectionString); connection.AbrirConexao(); StringBuilder sqlString = new StringBuilder(); if (pagina.Id > 0) { sqlString.AppendLine("update paginas set"); sqlString.AppendLine("titulo\_pagina = '" + pagina.Titulo.Replace("'", "''") + "',"); sqlString.AppendLine("texto\_pagina = '" + pagina.Texto.Replace("'", "''") + "',"); sqlString.AppendLine("ativo\_pagina = " + (pagina.Ativo ? 1 : 0) + " "); sqlString.AppendLine("where id\_pagina = " + pagina.Id + ""); } else { sqlString.AppendLine("insert into paginas(titulo\_pagina, texto\_pagina, datacriacao\_pagina, ativo\_pagina)"); sqlString.AppendLine("values('" + pagina.Titulo.Replace("'", "''") + "', '" + pagina.Texto.Replace("'", "''") + "', GETDATE(), " + (pagina.Ativo ? 1 : 0) + ")"); } int i = connection.ExecutaComando(sqlString.ToString()); salvou = i > 0; connection.FechaConexao(); } return salvou; } public bool SalvaPagina(int Id, string Titulo, string Texto, DateTime DataCriacao, bool Ativo) { return SalvaPagina(new Entities.Paginas(Id, Titulo, Texto, DataCriacao, Ativo)); } public bool ExcluiPagina(Entities.Paginas pagina) { bool salvou = false; if (pagina != null && pagina.Id > 0) { Data.Connection connection = new Data.Connection(this.ConnectionString); connection.AbrirConexao(); StringBuilder sqlString = new StringBuilder(); sqlString.AppendLine("delete from paginas"); sqlString.AppendLine("where id\_pagina = " + pagina.Id + ""); int i = connection.ExecutaComando(sqlString.ToString()); connection.FechaConexao(); } return salvou; } public bool ExcluiPagina(int Id) { return ExcluiPagina(new Entities.Paginas(Id)); } } } \[/sourcecode\]

Como pode ver, até aqui somente criamos as classes que iremos utilizar em nosso Website. Até momento nosso projeto ficou da seguinte forma.

*   **WebSite.Data:** Camada responsável por abrir conexão, executar comandos SQL, retornar dados e encerrar conexão.
*   **WebSite.Entities:** Camada responsável por manter nossas entidades que serão utilizadas em todo o projeto.
*   **WebSite.Business:** Camada responsável em conter todas as operações possíveis, ou seja, ela conterá no mínimo as quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Excluir (Delete).

Com o que já criamos, é possível também reutiliza-lo em um projeto do tipo WinForm (Windows Form), porem nosso foco será o desenvolvimento de um website.

Vale lembrar também que a camada de conexão de dados pode ser reutilizada e modificada para a utilização de outros bancos de dados. Modificando você poderá usar os seguintes:

*   System.Data.OleDb
*   System.Data.OracleClient
*   MySql.Data.MySqlClient
*   System.Data.SQLite
*   FirebirdSql.Data.FirebirdClient

Espero que com esse primeiro artigo da serie, você possa ter uma visão melhor sobre o desenvolvimento de projetos N-Camadas e com ele ter base para iniciar outros projetos com maior facilidade e com uma visão mais ampla do todo.

No próximo artigo iniciaremos a criação de nosso website.

Fonte do projeto: [Github](https://github.com/csharpbrasil/projeto-website-aspnet)

Não deixe de participar do fórum. Siga o C# Brasil no Twitter e Facebook.

Até o próximo artigo e bons estudos!