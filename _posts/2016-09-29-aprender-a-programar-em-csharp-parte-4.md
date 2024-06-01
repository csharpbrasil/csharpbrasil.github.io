---
title: 'Aprender a programar em C# – Parte 4'
date: Thu, 29 Sep 2016 10:30:00 +0000
draft: false
tags: ['Aprender a programar em C#', 'C Sharp', 'C#', 'C#', 'Conceitos básicos', 'Iniciante', 'Visual Studio']
---

No parte anterior dessa série de artigos que abordamos como Aprender a Programar em C#, você viu um pouco sobre a linguagem C# (C-Sharp) de como ela surgiu, tipos de dados, sintaxes, variáveis, operadores, controle de fluxo e laços de repetição, também pode ver um pouco sobre o desenvolvimento de uma aplicação e a compilação por linha de comando e também viu o desenvolvimento utilizando o Visual Studio.

* [Aprender a programar em C# - Parte 1](/aprender-a-programar-em-csharp-parte-1)
* [Aprender a programar em C# - Parte 2](/aprender-a-programar-em-csharp-parte-2)
* [Aprender a programar em C# - Parte 3](/aprender-a-programar-em-csharp-parte-3)

Nessa nova parte, iremos abordar o desenvolvimento de uma aplicação C# utilizando o Visual Studio, porém essa aplicação irá utilizar banco de dados SQL Server, ou seja, criaremos uma simples aplicação que realizar CRUD (Create, Read, Update e Delete) em um banco de dados. Se você não conhece nada de banco de dados, é uma oportunidade para começar a aprender. Imaginando que você conhece banco de dados, em especial o SQL Server, que também sabe utilizar o SQL Server Manager e já tenha uma instancia do SQL Server ou SQL Server Express instalado, vamos criar a tabela de clientes. Abra seu SQL Manager e crie a tabela utilizando o script sql abaixo. 

```sql
CREATE TABLE CLIENTES
(
    ID INT IDENTITY(1, 1) NOT NULL,
    NOME VARCHAR(60) NOT NULL,
    DATA_NASCIMENTO DATETIME NOT NULL,
    EMAIL VARCHAR(150) NULL,
    CONSTRAINT PK_CLIENTES PRIMARY KEY (ID)
)
GO
```

Vamos incluir também em nossa alguns registros iniciais. 

```sql
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Ferris Q. Finley','1997/06/08','interdum.ligula.eu@egestas.edu');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Taylor H. Stone','1986/06/02','amet.dapibus@sedleoCras.edu');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Meredith U. Cote','1992/12/20','purus@nullavulputate.org');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Orla Y. Stout','1981/04/27','ante@dignissim.edu');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Susan F. Sanford','1995/04/08','ut.aliquam@arcuvelquam.edu');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Kennedy Y. Carr','1986/12/22','dolor@arcuCurabiturut.co.uk');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Baker X. Mckee','1983/08/09','nascetur@Donecatarcu.org');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Sade R. Pitts','1994/06/14','commodo.tincidunt.nibh@non.co.uk');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Judah M. Farrell','1993/08/17','Maecenas@massa.co.uk');
INSERT INTO CLIENTES (NOME,DATA_NASCIMENTO,EMAIL) VALUES ('Maya N. Singleton','1986/11/03','erat.eget@arcuAliquamultrices.org');
```

Com o banco de dados pronto, já podemos iniciar o desenvolvimento. 

![aprender_programar_csharp_parte4_001](/contents/2015/06/aprender_programar_csharp_parte4_001.png)

Sugiro para o desenvolvimento desse projeto o [Visual Studio Community](visualstudio.microsoft.com) porque alem de gratuito, ele é completo e atende bem as nossas necessidades. Para efetuar o download, basta ir diretamente no site do Visual Studio acessando o link [visualstudio.microsoft.com](visualstudio.microsoft.com).

![aprender_programar_csharp_parte4_002](/contents/2016/09/aprender_programar_csharp_parte4_002-1.png) 

Dando continuidade, abra o Visual Studio e clique no menu _File > New > Project_ e escolha o template _Windows Desktop > Windows Forms Application_. Para nosso projeto também utilizaremos o _.NET Framework 4.5_. Defina o nome do projeto como **ProgramarCSharpComBancoDados**. 

![aprender_programar_csharp_parte4_003](/contents/2015/06/aprender_programar_csharp_parte4_003.png) 

No template escolhido, já teremos um Form criado na qual iremos adicionar 1 DataGridView e 4 Button. Precisaremos alterar o nome dos nossos objetos. Para fazer isso, clique com o botão direito em cima do objeto que deseja e altere a propriedade "(Name)" de cada objeto. 

![aprender_programar_csharp_parte4_005](/contents/2015/07/aprender_programar_csharp_parte4_005.png) 

Para o DataGridView defina o nome como gridClientes,para o primeiro botão que usado para para listar os clientes no grid defina o nome como btnListar, o segundo será para excluir e terá o nome de btnExcluir, o terceiro será para editar e terá o nome de btnEditar e o quarto botão será para incluir um novo cliente e terá o nome de btnNovo. A posição dos componentes em tela não fará diferença. Distribua os objetos da forma que achar conveniente. 

![aprender_programar_csharp_parte4_004](/contents/2015/06/aprender_programar_csharp_parte4_004.png) 

Agora adicione vamos adicionar a Connection String no App.config da aplicação. Acesse o Solution Explorer, localize o App.Config e dê um duplo clique sobre ele para que possamos incluir a linha abaixo: 

```xml
<connectionStrings>
  <add name="DbConnection" connectionString="Data Source=<seu_servidor>;User Id=<seu_usuario>;Password=<sua_senha>;Initial Catalog=<seu_bancodados>" providerName="System.Data.SqlClient" />
</connectionStrings>
```

Adicionaremos a biblioteca _System.Configuration.dll_ clicando com botão direito sobre a pasta _References_ e _Add References_. 

![aprender_programar_csharp_parte4_006](/contents/2016/09/aprender_programar_csharp_parte4_006-1.png) 

Vamos começar a codificar atribuindo as operações de consulta, exclusão, edição e inclusão para os respectivos botões. Para inicio, dê um duplo clique no botão Listar e realize a codificação conforme abaixo: 

```csharp
private void btnListar_Click(object sender, EventArgs e)
{
    var dataTable = new DataTable();

    // Retorna para a variavel a ConnectionString configurada no App.Config
    var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DbConnection"].ConnectionString;

    // Cria uma instancia de conexão com o banco de dados
    using (System.Data.SqlClient.SqlConnection connection = new System.Data.SqlClient.SqlConnection(connectionString))
    {
        // Abre a conexão
        connection.Open();

        // Cria uma instancia do command
        using (System.Data.SqlClient.SqlCommand command = new System.Data.SqlClient.SqlCommand())
        {
            // Comando SQL que será executado
            var _sqlQuery = "SELECT * FROM CLIENTES";

            command.Connection = connection;
            command.CommandText = _sqlQuery;

            // Adiciona o resultado em um DataTable
            using (System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(command))
            {
                adapter.Fill(dataTable);
            }
        }

        // Fecha conexão
        connection.Close();
    }

    // Atribui o resultado ao grid
    gridClientes.DataSource = dataTable;
    // Gera automaticamente as colunas
    gridClientes.AutoGenerateColumns = true;
    // Muda o modo de seleção da grid para linha inteira
    gridClientes.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
}
```

Para realizar o teste, basta apertar F5 ou clicar no menu _Debug > Start Debugging_. 

![aprender_programar_csharp_parte4_007](/contents/2016/09/aprender_programar_csharp_parte4_007-1.png) 

Agora vamos codificar o botão Excluir clicando duas vezes sobre ele e atribuindo o código baixo:

```csharp
private void btnExcluir_Click(object sender, EventArgs e)
{
    if (gridClientes.SelectedRows.Count > 0)
    {
        // Pega o ID da primeira coluna da linha selecionada e converte para Integer
        int id;
        int.TryParse(gridClientes.SelectedRows[0].Cells[0].Value.ToString(), out id);

        // Retorna para a variavel a ConnectionString configurada no App.Config
        var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DbConnection"].ConnectionString;

        // Cria uma instancia de conexão com o banco de dados
        using (System.Data.SqlClient.SqlConnection connection = new System.Data.SqlClient.SqlConnection(connectionString))
        {
            // Abre a conexão
            connection.Open();

            // Cria uma instancia do command
            using (System.Data.SqlClient.SqlCommand command = new System.Data.SqlClient.SqlCommand())
            {
                // Comando SQL que será executado
                var _sqlQuery = "DELETE FROM CLIENTES WHERE ID = @ID";

                command.Connection = connection;
                command.CommandText = _sqlQuery;
                command.Parameters.AddWithValue("id", id);

                // Executa a query
                command.ExecuteNonQuery();
            }

            // Fecha conexão
            connection.Close();
        }

        // Invoca o botão listar
        btnListar_Click(sender, e);
    }
}
```

Para os botões de Editar e Novo vamos criar um segundo formulário que terá os campos que deverão ser preenchidos. Clique com o botão direto sobre o projeto e depois selecione _Add > Windows Form_. 

![aprender_programar_csharp_parte4_008](/contents/2016/09/aprender_programar_csharp_parte4_008-1.png) 

![aprender_programar_csharp_parte4_009](/contents/2016/09/aprender_programar_csharp_parte4_009-1.png) 

Criado o formulário, precisaremos alterar o seu construtor para que ele possa receber valores do tipo Integer. Esses valores será o ID para utilizarmos o mesmo formulário para Edição e Inclusão. O código deverá ficar conforme abaixo:

```csharp
private int Id;
public Form2(int id = 0)
{
    this.Id = id;
    InitializeComponent();
}
```

Agora vamos adicionar os campos necessários e atribuir nome para eles. 

![aprender_programar_csharp_parte4_010](/contents/2016/09/aprender_programar_csharp_parte4_010-1.png) 

Adicione 1 Botão, 3 labels, 2 Textbox e 1 DateTimePicker. Renomeie para btnSalvar, txtNome, txtDataNascimento e txtEmail respectivamente. Feito isso, vamos atribuir o código para o botão Salvar. Dê um duplo clique sobre o botão Salvar.

```csharp
private void btnSalvar_Click(object sender, EventArgs e)
{
    var nome = txtNome.Text;
    var dataNascimento = txtDataNascimento.Value;
    var email = txtEmail.Text;

    // Retorna para a variavel a ConnectionString configurada no App.Config
    var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DbConnection"].ConnectionString;

    // Cria uma instancia de conexão com o banco de dados
    using (System.Data.SqlClient.SqlConnection connection = new System.Data.SqlClient.SqlConnection(connectionString))
    {
        // Abre a conexão
        connection.Open();

        // Cria uma instancia do command
        using (System.Data.SqlClient.SqlCommand command = new System.Data.SqlClient.SqlCommand())
        {
            command.Connection = connection;

            #region Comando SQL que será executado

            var _sqlQuery = string.Empty;

            // Se foi passado o Id, é para editar
            if (this.Id > 0)
            {
                _sqlQuery = "UPDATE CLIENTES SET NOME = @NOME, EMAIL = @EMAIL, DATA_NASCIMENTO = @DATA_NASCIMENTO WHERE ID = @ID";

                command.Parameters.AddWithValue("id", this.Id);
            }
            else
            {
                _sqlQuery = "INSERT INTO CLIENTES(NOME, DATA_NASCIMENTO, EMAIL) VALUES(@NOME, @DATA_NASCIMENTO, @EMAIL)";
            }

            command.Parameters.AddWithValue("NOME", nome);
            command.Parameters.AddWithValue("DATA_NASCIMENTO", dataNascimento);
            command.Parameters.AddWithValue("EMAIL", email);

            command.CommandText = _sqlQuery;

            #endregion

            // Executa a query
            command.ExecuteNonQuery();
        }

        // Fecha conexão
        connection.Close();
    }

    // Fecha o formulario
    this.Close();
}
```

Agora vamos atribuir o código que será responsável por carregar os dados caso seja passado o Id do registro que desejamos editar. Voltando ao modo Designer, dê duplo clique no Form e atribua o código abaixo.

```csharp
private void Form2_Load(object sender, EventArgs e)
{
    var dataTable = new DataTable();

    // Retorna para a variavel a ConnectionString configurada no App.Config
    var connectionString = System.Configuration.ConfigurationManager.ConnectionStrings["DbConnection"].ConnectionString;

    // Cria uma instancia de conexão com o banco de dados
    using (System.Data.SqlClient.SqlConnection connection = new System.Data.SqlClient.SqlConnection(connectionString))
    {
        // Abre a conexão
        connection.Open();

        // Cria uma instancia do command
        using (System.Data.SqlClient.SqlCommand command = new System.Data.SqlClient.SqlCommand())
        {
            // Comando SQL que será executado
            var _sqlQuery = "SELECT * FROM CLIENTES WHERE ID = @ID";

            command.Connection = connection;
            command.CommandText = _sqlQuery;
            command.Parameters.AddWithValue("ID", this.Id);

            // Adiciona o resultado em um DataTable
            using (System.Data.SqlClient.SqlDataAdapter adapter = new System.Data.SqlClient.SqlDataAdapter(command))
            {
                adapter.Fill(dataTable);
            }
        }

        // Fecha conexão
        connection.Close();
    }

    if (dataTable != null && dataTable.Rows.Count > 0) {
        var row = dataTable.Rows[0];
        txtNome.Text = row["NOME"].ToString();
        txtDataNascimento.Value = Convert.ToDateTime(row["DATA_NASCIMENTO"].ToString());
        txtEmail.Text = row["EMAIL"].ToString();
    }

}
```

E agora para finalizar o formulário principal, vamos atribuir a codificação para chamar o formulário de edição/inclusão. Para codificar, primeiro execute um duplo clique sobre os botões.

```csharp
private void btnNovo_Click(object sender, EventArgs e)
{
    // Executa o formulario
    var form2 = new Form2();
    // Defini o titulo do formulário
    form2.Text = "Novo";
    // Centraliza o form em relação ao form principal
    form2.StartPosition = FormStartPosition.CenterParent;
    // Abre o form em modo Dialog
    form2.ShowDialog();
    // Invoca o botão de listar após o dialog ser fechado
    btnListar_Click(sender, e);
}
```

```csharp
private void btnEditar_Click(object sender, EventArgs e)
{
    if (gridClientes.SelectedRows.Count > 0)
    {
        int id;
        // Pega o ID da primeira coluna da linha selecionada e realiza a conversão para Integer
        int.TryParse(gridClientes.SelectedRows[0].Cells[0].Value.ToString(), out id);

        // Executa o formulario passando o Id do registro que será editado
        var form2 = new Form2(id);
        // Defini o titulo do formulário
        form2.Text = "Editar";
        // Centraliza o form em relação ao form principal
        form2.StartPosition = FormStartPosition.CenterParent;
        // Abre o form em modo Dialog
        form2.ShowDialog();
        // Invoca o botão de listar após o dialog ser fechado
        btnListar_Click(sender, e);
    }
}
```

Ao executar nossa aplicação, já podemos listar, excluir, incluir e editar os registros. 

![aprender_programar_csharp_parte4_011](/contents/2016/09/aprender_programar_csharp_parte4_011-1.png) 

Até aqui você aprendeu como criar formulários, efetuar a chamada de um formulário através de outros, efetuar a conexão com banco de dados SQL Server e efetuar transações efetuando as quarto operações Consulta, Inclusão, Exclusão e Edição. Procure exercitar atribuindo mais campos de dados ou até mesmo faça um novo projeto de cadastro mais completo.

Fonte do projeto: [Github](https://github.com/csharpbrasil/aprender_programar_csharp_parte4).

Até o próximo artigo e bom estudo!