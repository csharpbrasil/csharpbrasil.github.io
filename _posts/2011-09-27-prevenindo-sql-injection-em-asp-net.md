---
title: 'Prevenindo SQL Injection em ASP.NET'
date: Tue, 27 Sep 2011 10:00:36 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'linha de código', 'sql injection']
---

Olá pessoal, neste artigo mostrarei como prevenir ataques de SQL Injection em aplicações **ASP.NET**. Faço este artigo com base na videoaula de [Bruno Belizário](mailto:bsbelizario@hotmail.com), do [Portal Linha de Código](http://www.linhadecodigo.com.br/), mediante autorização do mesmo. Acompanhem o passo-a-passo: **Conceitos –** A Injeção de SQL, ou **SQL Injection**, é um tipo de ameaça séria de segurança, que se aproveita de falhas em sistemas (não é exclusivo pra web) que interagem com bases de dados via SQL. Dito isto, o SQL Injection ocorre quando o usuário mal intencionado consegue inserir uma série de instruções SQL dentro de uma consulta através da manipulação das entradas de dados (alterações em um textbox, por exemplo) de uma aplicação. Fonte: [Wikipedia](https://pt.wikipedia.org/wiki/Injeção_de_SQL). **Prática –** Feito uma breve explicação do SQL Injection, vamos a um exemplo prático. Crie uma aplicação em ASP.NET com o nome **ExemploSQLInjection**. Neste exemplo, irei utilizar o banco **Clientes**, onde tenho as tabelas **Registros** e **Usuarios**, como mostra a **Figura 01**:

[![](http://programandodotnet.files.wordpress.com/2010/06/tables.jpg)](http://programandodotnet.files.wordpress.com/2010/06/tables.jpg)

_Figura 01 - Tabelas Registros e Usuarios_

Vá ao modo **Design** e arraste um **TextBox**, um **Button** e um **GridView**, para que sua página fique da seguinte forma, como mostra a **Figura 02**:

[![](http://programandodotnet.files.wordpress.com/2010/06/default-aspx1.jpg)](http://programandodotnet.files.wordpress.com/2010/06/default-aspx1.jpg)

_Figura 02 - Design da página Default.aspx_

Dê o nome ao ID do botão de **btnConsultar** e ao Grid de **dgvResultado**. Agora vá a página de códigos e crie o método para o botão **Consultar**: \[sourcecode language="csharp"\] private void Consultar() { try { //Crio a variável que irá armazenar a string de conexão string strConn = @"Data Source=WELLINGT-45545B\\SQLEXPRESS;Initial Catalog=Clientes; Integrated Security=True;Pooling=False"; //Crio a conexão por meio do using, que me garante que após o uso, a conexão será fechada using (SqlConnection objConn = new SqlConnection(strConn)) { //Passo a instrução SQL por meio do SqlCommand e concateno //meu Where com o que o usuário digitar no TextBox SqlCommand objCmd = new SqlCommand("SELECT CODIGO, NOME FROM REGISTROS WHERE CODIGO = " + txtConsultar.Text, objConn); //Instancio o DataTable passando como parâmetro o SqlCommand SqlDataAdapter objDtAdapter = new SqlDataAdapter(objCmd); //Instancio o DataSet DataSet ds = new DataSet(); //Uso o método Fill do DataAdapter, passando como parâmetro o DataSet e minha Tabela objDtAdapter.Fill(ds, "REGISTROS"); //Uso o método DataSource de meu GridView, que receberá meu DataSet e chamo o DataBind dgvResultado.DataSource = ds; dgvResultado.DataBind(); } } catch (Exception ex) { throw new Exception(ex.Message.ToString()); } } \[/sourcecode\] _Lembrando que o intuito deste artigo não é o de explicar a conexão com o banco e sim o que torna vulnerável uma aplicação por meio de **SQL Injection**._ Volte ao modo **Design**, dê dois cliques no botão **Consultar** e chame o método recém-criado. Salve e compile o projeto. Digite **01** no TextBox e veja o resultado, como exibe a **Figura 03**:

[![](http://programandodotnet.files.wordpress.com/2010/06/compiledproject11.jpg)](http://programandodotnet.files.wordpress.com/2010/06/compiledproject11.jpg)

_Figura 03 - Resultado de uma consulta simples no banco_

O Grid é populado com os dados do **Registro1**. O problema é que, como ele busca o que for digitado no TextBox, se um usuário mal intencionado digitar a seguinte instrução, como mostra a **Figura 04**:

[![](http://programandodotnet.files.wordpress.com/2010/06/compiledproject21.jpg)](http://programandodotnet.files.wordpress.com/2010/06/compiledproject21.jpg)

_Figura 04 - Exemplo de SQL Injection_

Fazendo isso, consigo descobrir as senhas da tabela **Usuarios** pois da forma como está, nossa consulta concatena tudo o que for digitado no TextBox. Se quiser, podemos até excluir tabelas dessa forma. Dito isso, podemos concluir que nossa instrução **SQL** não foi feita da melhor forma, já que está **vulnerável a ataques**. Para resolver isso, devemos usar a **consulta parametrizada**. Como o próprio nome diz, com ela nós criamos uma variável que é representada por um parâmetro, que será associado ao valor digitado no TextBox. Para entendermos melhor, altere a instrução e adicione a seguinte linha após a instrução: \[sourcecode language="csharp"\] //Passo a instrução SQL por meio do SqlCommand e uso parametrização para evitar SQLInjection SqlCommand objCmd = new SqlCommand("SELECT CODIGO, NOME FROM REGISTROS WHERE " + "CODIGO = @CODIGO", objConn); //Uso o método AddWithValue, que recebe meu parâmetro @Codigo e meu TextBox objCmd.Parameters.AddWithValue("@CODIGO", txtConsultar.Text); \[/sourcecode\] Como vocês podem perceber, o que mudei apenas foi usar o **@Codigo**, e o método **AddWithValue**, que recebe justamente esse parâmetro junto com o que for digitado no TextBox. Dessa forma, estamos evitando vulnerabilidades em nossa aplicação. Compile novamente e tente digitar a instrução que usamos para fazer um **Select** na tabela **Usuarios**, como vemos na **Figura 05**:

[![](http://programandodotnet.files.wordpress.com/2010/06/compiledproject21.jpg)](http://programandodotnet.files.wordpress.com/2010/06/compiledproject21.jpg)

_Figura 05 - Exemplo da tentativa de SQL Injection na aplicação_

Ao fazer isso e clicar no botão **Consultar**, será disparado um erro de falha de conversão, como vemos na **Figura 06**:

[![](http://programandodotnet.files.wordpress.com/2010/06/servererror.jpg)](http://programandodotnet.files.wordpress.com/2010/06/servererror.jpg)

_Figura 06 - Erro de conversão disparado pela aplicação_

Dessa forma evitamos o uso de SQL Injection em nossa aplicação. Por isso, é **altamente recomendado sempre usar parâmetros em instruções SQL**. Assim finalizo o artigo. Para quem se interessar, disponibilizo o código fonte desse projeto aqui. **Créditos** à [Bruno Belizário](mailto:bsbelizario@hotmail.com), que fez a videoaula e ao [Portal Linha de Código](http://www.linhadecodigo.com.br/), por onde pude baixá-la (mediante assinatura), estudá-la e posteriormente fazer este artigo. Quaisquer dúvidas mandem emails para [wellingtonbalbo@gmail.com](mailto:wellingtonbalbo@gmail.com) ou deixem nos comentários deste artigo que responderei o mais rápido possível. _Até o próximo artigo!_