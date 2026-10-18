---
title: 'Criando e consumindo Web API – Parte 2'
date: Mon, 29 Jun 2015 10:30:38 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET Web API', 'C#', 'Controller', 'Desenvolvimento web', 'Desenvolvimento Web API', 'Dicas', 'HttpGet', 'HttpPost', 'JSON', 'Postman', 'Web API', 'Web API']
---

Dando continuidade a série de artigo [Criando e consumindo Web API](https://raphaelcardoso.com.br/tags/desenvolvimento-web-api/), onde na [primeira parte](https://raphaelcardoso.com.br/criando-e-consumindo-web-api-parte-1/) fiz uma abordagem superficial do que é uma Web API e como cria-la. Nessa segunda parte, abordaremos o uso de conexão com banco de dados para efetuar o CRUD (Create, Read, Update, Delete). Para isso, não irei utilizar o Entity Framework de inicio. Isso ficará para uma nova parte dessa série. A principio a ideia é mostrar o funcionamento de uma Web API.

Então para dar inicio, faça o download do fonte do artigo disponivel no [Github](https://github.com/csharpbrasil/AspNetWebApi) se já não fez pois iremos utiliza-lo como base para o desenvolvimento dessa segunda parte. Somente para rever o que foi feito na primeira parte, nós criamos no projeto anterior 3 métodos, sendo um para retornar a data e hora do servidor, outro para realizar o filtro de clientes pelo código e outro para realizar o envio de dados de um cliente.

Vamos descartar esses métodos que criamos e vamos criar alguns outros métodos novos e definir as suas rotas. Para esse exemplo utilizaremos SQL Server. Não irei me aprofundar em como criar o banco, simplesmente vou deixar aqui meu script para criar a tabela de clientes.

Abra seu _SQL Manager_ e crie a tabela utilizando o script sql abaixo.


```sql 
CREATE TABLE CLIENTES ( ID INT IDENTITY(1, 1) NOT NULL, NOME VARCHAR(60) NOT NULL, DATA_NASCIMENTO DATETIME NOT NULL, EMAIL VARCHAR(150) NULL, CONSTRAINT PK_CLIENTES PRIMARY KEY (ID) ) GO ```

Agora vamos incluir alguns registros iniciais para nossos testes.


```sql 
INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Elliott V. Sears','1971/09/12','ut.ipsum.ac@Aliquam.net') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Jayme A. Woods','1964/02/14','nascetur.ridiculus@Curae.net') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Leo K. Small','1988/05/12','a.sollicitudin.orci@atpede.net') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Winter Z. Collier','1991/10/15','consectetuer.adipiscing@Phasellusfermentum.net') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Andrew P. Rivera','1966/11/03','dictum@pretium.net') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Brenda B. Acevedo','1972/05/17','natoque.penatibus@Integervulputate.com') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Carlos Z. Velez','1971/03/19','Suspendisse.tristique.neque@turpis.ca') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Herrod Z. Flores','1951/12/24','imperdiet.non.vestibulum@Nunc.net') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Willow U. Simon','1967/11/23','urna.suscipit@felisullamcorper.co.uk') INSERT INTO clientes([nome],[data_nascimento],[email]) VALUES('Oliver F. Pickett','1948/02/19','mollis.dui.in@id.com') ```

A primeira coisa a fazer é criar uma nova pasta chamada _Models_ na raiz do nosso projeto. Essa pasta irá conter a classe _Cliente_ que criaremos agora.

Clique sobre a pasta com o botão direito e escolha _Add > Class_.

![criando_e_consumindo_webapi_001](/contents/2015/06/criando_e_consumindo_webapi_0011.png)

E defina o nome para a classe como _Cliente.cs_.

![criando_e_consumindo_webapi_002](/contents/2015/06/criando_e_consumindo_webapi_0021.png)

Com a classe _Cliente_ criada, vamos incluir algumas propriedades.

```csharp 
public class Cliente { public int Id { get; set; } public string Nome { get; set; } public DateTime DataNascimento { get; set; } public string Email { get; set; } } ```

Agora com a nossa classe Cliente criada, vamos alterar o nosso controller. Na primeira parte havíamos criado o controller chamado _DefaultController_ e é nele que vamos criar os nossos métodos.

Primeiramente, criamos a variável para a _ConnectionString_ que vamos utilizar.

```csharp 
private string ConnectionString = "Data Source=;User Id=;Password=;Initial Catalog="; ```

Criado a ConnectionString, podemos já incluir o nosso primeiro método que será responsável por trazer todos os clientes cadastrados.

```csharp 
[HttpGet] [Route("clientes/todos")] public HttpResponseMessage GetAll() { try { List lstClientes = new List(); using (SqlConnection connection = new SqlConnection(this.ConnectionString)) { connection.Open(); using (SqlCommand command = new SqlCommand()) { command.Connection = connection; command.CommandText = "select id, nome, data_nascimento, email from clientes"; SqlDataReader reader = command.ExecuteReader(); while (reader.Read()) { Cliente cliente = new Cliente() { Id = reader["id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["id"]), Nome = reader["nome"] == DBNull.Value ? string.Empty : reader["nome"].ToString(), DataNascimento = reader["data_nascimento"] == DBNull.Value ? DateTime.MinValue : Convert.ToDateTime(reader["data_nascimento"]), Email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString() }; lstClientes.Add(cliente); } } connection.Close(); } return Request.CreateResponse(HttpStatusCode.OK, lstClientes.ToArray()); } catch (Exception ex) { return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); } } ```

Explicando o código acima, na linha 07 temos declarado a lista onde incluiremos os clientes retornados do banco e que será retornado pela API quando foi feito o _HttpGet_. Da linha 09 até a linha 35 é a parte onde realizamos a consulta no banco, incluímos o resultado na lista para depois retornar o Array dessa lista na resposta da API na linha 37.

Utilizando o [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop) que citei no [artigo anterior](https://raphaelcardoso.com.br/criando-e-consumindo-web-api-parte-1), poderemos fazer o teste de nossa API.

![criando_e_consumindo_webapi_003](/contents/2015/06/criando_e_consumindo_webapi_0031.png)

No caso do HttpGet, podemos fazer o mesmo teste diretamente no browser.

![criando_e_consumindo_webapi_004](/contents/2015/06/criando_e_consumindo_webapi_0041.png)

Para realizar a consulta de um cliente especifico, criaremos um método também de _HttpGet_, porem esse passaremos o _id_. Basicamente ele faz quase as mesmas coisa que o anterior, porem ele irá retornar um simples objeto ao invés de uma lista.

```csharp 
[HttpGet] [Route("cliente/{id:int}")] public HttpResponseMessage GetById(int id) { try { Cliente cliente = null; using (SqlConnection connection = new SqlConnection(this.ConnectionString)) { connection.Open(); using (SqlCommand command = new SqlCommand()) { command.Connection = connection; command.CommandText = "select id, nome, data_nascimento, email from clientes where id = @id"; command.Parameters.AddWithValue("id", id); SqlDataReader reader = command.ExecuteReader(); while (reader.Read()) { cliente = new Cliente() { Id = reader["id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["id"]), Nome = reader["nome"] == DBNull.Value ? string.Empty : reader["nome"].ToString(), DataNascimento = reader["data_nascimento"] == DBNull.Value ? DateTime.MinValue : Convert.ToDateTime(reader["data_nascimento"]), Email = reader["email"] == DBNull.Value ? string.Empty : reader["email"].ToString() }; } } connection.Close(); } return Request.CreateResponse(HttpStatusCode.OK, cliente); } catch (Exception ex) { return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); } } ```

Executando, teremos os seguintes resultados.

![criando_e_consumindo_webapi_005](/contents/2015/06/criando_e_consumindo_webapi_0051.png) ![criando_e_consumindo_webapi_006](/contents/2015/06/criando_e_consumindo_webapi_0061.png)

Agora vem a parte interessante do Web API. Criaremos um novo método para excluir o cliente utilizando o _HttpDelete_ informando o _id_.

Você vai reparar que a rota para consultar o cliente é a mesma de excluir, ou seja, ambas são _http://{servidor}/api/meuprojeto/cliente/{id}_. Isso pelo de os métodos possuírem as operações diferentes, ou seja, um é _HttpGet_ e o outro é _HttpDelete_.

```csharp 
[HttpDelete] [Route("cliente/{id:int}")] public HttpResponseMessage DeleteById(int id) { try { bool resultado = false; using (SqlConnection connection = new SqlConnection(this.ConnectionString)) { connection.Open(); using (SqlCommand command = new SqlCommand()) { command.Connection = connection; command.CommandText = "delete from clientes where id = @id"; command.Parameters.AddWithValue("id", id); int i = command.ExecuteNonQuery(); resultado = i > 0; } connection.Close(); } return Request.CreateResponse(HttpStatusCode.OK, resultado); } catch (Exception ex) { return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); } } ```

Na linha 26, repare que estou passando o resultado do tipo _boolean_. Assim saberei se o meu registro foi excluído ou não. Caso exista o registro e consiga excluir retorna _true_, senão retornará _false_.

![criando_e_consumindo_webapi_007](/contents/2015/06/criando_e_consumindo_webapi_0071.png)

Outra situação que merece atenção é com a criação de duas ou mais rotar iguais com o mesmo tipo de operação. Isso levará a ocorrer um _InvalidOperationException_. Então já sabe, ocorrer esse Exception, confira as rotas e operações.

![criando_e_consumindo_webapi_008](/contents/2015/06/criando_e_consumindo_webapi_0081.png)

Já temos em nossa Web API a possibilidade de consultar com _HttpGet_ e excluir _HttpDelete_. Agora vamos criar a opção de cadastrar usando o _HttpPost_. Nessa caso iremos submeter os dados para que sejam gravados, ou seja, os dados serão enviados no corpo do Http no formato jSON. Esse jSON deverá estar no formato de nosso objeto do parâmetro do método da Web API.

```csharp 
[HttpPost] [Route("cliente")] public HttpResponseMessage Post(Cliente cliente) { try { bool resultado = false; if (cliente == null) throw new ArgumentNullException("cliente"); using (SqlConnection connection = new SqlConnection(this.ConnectionString)) { connection.Open(); using (SqlCommand command = new SqlCommand()) { command.Connection = connection; command.CommandText = "insert into clientes(nome, data_nascimento, email) values(@nome, @data_nascimento, @email)"; command.Parameters.AddWithValue("nome", cliente.Nome); command.Parameters.AddWithValue("data_nascimento", cliente.DataNascimento); command.Parameters.AddWithValue("email", cliente.Email); int i = command.ExecuteNonQuery(); resultado = i > 0; } connection.Close(); } return Request.CreateResponse(HttpStatusCode.OK, resultado); } catch (Exception ex) { return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); } } ```

Analisando o método de Post, veja que logo na linha 09 estamos verificando se os dados passados são nulos. Caso seja nulo, um Exception será acionado o que irá retornar um _BadRequest_ pela linha 35. Em caso de sucesso, um resultado do tipo boolean será retornado na linha 31.

Para executar o Post pelo _Postman_, passaremos o tipo de operação que no caso será POST, a url e o tipo de dados JSON. É importante destacar que o JSON deve respeitar o formato do objeto do parâmetro do método. No caso o parâmetro é o objeto Cliente e deverá estar no formato abaixo.

[code='javascript'] { "Nome":"Seu nome aqui", "DataNascimento":"1980-01-01T00:00:00", "Email":"seuemail@servidor.com" } ```

Caso você não informe esse JSON, será retornado o erro de parâmetro nulo conforme foi citado anteriormente.

Informando os dados corretamente, será retornado true em caso de sucesso na inclusão.

![criando_e_consumindo_webapi_009](/contents/2015/06/criando_e_consumindo_webapi_0091.png)

Se consultarmos todos os clientes, veremos nosso registro incluso.

![criando_e_consumindo_webapi_010](/contents/2015/06/criando_e_consumindo_webapi_0101.png)

Poderemos também realizar a consulta passando o Id do cliente e também retornará o registro incluso.

![criando_e_consumindo_webapi_011](/contents/2015/06/criando_e_consumindo_webapi_011.png)

Já podemos consultar, incluir e excluir os registro, agora faremos o que irá atualizar os dados. Nesse caso usaremos a operação _HttpPut_. O método irá receber o id do cliente e o objeto cliente com os dados da mesma forma que submetemos no Post para inclusão.

```csharp 
[HttpPut] [Route("cliente/{id:int}")] public HttpResponseMessage Put(int id, Cliente cliente) { try { bool resultado = false; if (cliente == null) throw new ArgumentNullException("cliente"); if (id == 0) throw new ArgumentNullException("id"); using (SqlConnection connection = new SqlConnection(this.ConnectionString)) { connection.Open(); using (SqlCommand command = new SqlCommand()) { command.Connection = connection; command.CommandText = "update clientes set nome = @nome, data_nascimento = @data_nascimento, email = @email where id = @id"; command.Parameters.AddWithValue("id", id); command.Parameters.AddWithValue("nome", cliente.Nome); command.Parameters.AddWithValue("data_nascimento", cliente.DataNascimento); command.Parameters.AddWithValue("email", cliente.Email); int i = command.ExecuteNonQuery(); resultado = i > 0; } connection.Close(); } return Request.CreateResponse(HttpStatusCode.OK, resultado); } catch (Exception ex) { return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message); } } ```

A diferença desse método para o de _Post_ é que esse está realizando o _UPDATE_ do registro e verificando se o _Id_ informado é maior que zero.

![criando_e_consumindo_webapi_012](/contents/2015/06/criando_e_consumindo_webapi_0121.png)

Nesse artigo você pode ver como criar um simples CRUD no Web API. Com o que viu até aqui é possível ampliar mais a funcionalidade utilizando até mesmo ORM como o _Entity Framework_ e _NHibernate_.

Em caso de dúvida, utilize os comentários ou publique sua dúvida no fórum.

Fonte do projeto: [Github](https://github.com/csharpbrasil/AspNetWebApi).

Abraço e até a próxima!