---
title: 'Conhecendo e usando o LiteDb'
date: Fri, 12 May 2017 11:30:23 +0000
draft: false
tags: ['.NET Core', 'ASP.NET', 'ASP.NET MVC', 'Bson', 'C#', 'JSON', 'LiteDb', 'LiteDb', 'Mauricio David', 'NoSql', 'NoSql']
---

O LiteDb é um banco de dados NoSql desenvolvido e mantido pelo Mauricio David. Você pode conhecer mais sobre acessando a [página do projeto](http://www.litedb.org/). Mas o que o LiteDb tem de diferença que os outros banco de dados NoSql não tem?

* Não necessita de um servidor de documentos NoSql
* Possui uma API simples muito semelhante ao do MongoDb
* Pequena biblioteca desenvolvida 100% em código C# NET 3.5 / NETStandard 1.4
* Suporte para Portable UWP/PCL
* Recuperação de dados após falha de gravação
* Criptografia de arquivo de dados usando criptografia DES (AES)
* Transações ACID (atomicidade, consistência, isolamento e durabilidade)
* Recuperação de dados após falha de gravação (journal mode)
* Mapeie suas classes POCO para o BsonDocument usando atributos ou usando Fluent Mapper API
* Armazenar arquivos e dados de fluxo (como GridFS no MongoDB)
* Armazenamento de arquivos de dados simples (como SQLite)
* Indexação de campos dos documentos para pesquisa rápida (até 16 índices por coleção)
* Suporte a consultas LINQ
* Shell de comando
* Código-fonte aberto e gratuito, inclusive para uso comercial
* Pode ser instalado via NuGet

Para demonstrar o uso do LiteDb, vamos criar uma aplicação de cadastro simples, realizando as operações básicas como Consulta, Inclusão, Exclusão e Atualização. Iniciaremos criando um novo projeto, pra isso utilizarei o Visual Studio Community 2015. Abra-o e crie um novo projeto usando o template Windows Form Application. ![Criando um novo projeto](/contents/2017/04/criando_usando_litedb_001-1.png) No Form1 desse novo projeto adicionaremos 4 Button e 1 DataGridView. ![Formulário do projeto](/contents/2017/04/criando_usando_litedb_002-1.png) Com o nosso form criado, vamos adicionar a referencia do LiteDb usando o NuGet Package Manager. Pesquise por LiteDb e adicione ao projeto. ![LiteDb - Nuget](/contents/2017/04/criando_usando_litedb_003-1.png) Vamos agora criar o objeto necessário para o nosso projeto. Usaremos o objeto com o nome de Agenda e definiremos para ele qual a coluna é um Id e quais as colunas deverão ser indexadas.

```csharp
using LiteDB;

public class Agenda
{
    [BsonId]
    public int Id { get; set; }

    [BsonIndex]
    public string Nome { get; set; }

    [BsonIndex]
    public string Email { get; set; }

    public string Telefone { get; set; }
}
```

Adicione um novo form e inclua nele 3 Label, 3 TextBox e 2 Button. ![Formulário do Projeto](/contents/2017/04/criando_usando_litedb_004-1.png) Agora vamos implementar o código responsavel em gravar os dados. Dê um duplo clique no button1 do Form2, esse botão será responsavel por incluir os dados.

```csharp
private void button1_Click(object sender, EventArgs e)
{
    var agenda = new Agenda();
    agenda.Nome = textBox1.Text;
    agenda.Email = textBox2.Text;
    agenda.Telefone = textBox3.Text;

    using (var db = new LiteDatabase("Filename=criandoUsandoLiteDb.db"))
    {
        db.GetCollection<Agenda>().Insert(agenda);
    }
    this.Close();
}
```

Repare no código anterior que para salvar simplesmente criamos uma instancia do objeto agenda, atribuimos os valores para ele e salvamos. Para testar precisamos criar um evento no botão incluir do form1.

```csharp
private void button2_Click(object sender, EventArgs e)
{
    var form2 = new Form2();
    form2.ShowDialog();
}
```

Ao executar nosso projeto, já podemos incluir registro no LiteDb. ![Formulário do Projeto](/contents/2017/04/criando_usando_litedb_005-1.png) E podemos confir se os dados estão lá usando o LiteDb Shell (falarei sobre ele mais para frente). 

![LiteDb Shell](/contents/2017/04/criando_usando_litedb_006-1.png) 

Agora em nosso form1 vamos implementar o botão que irá listar todos os dados no DataGridView.

```csharp
private void button1_Click(object sender, EventArgs e)
{
    using (var db = new LiteDatabase("Filename=criandoUsandoLiteDb.db"))
    {
        var agendas = db.GetCollection<Agenda>().FindAll().ToList();

        dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
        dataGridView1.DataSource = agendas;
    }
}
```

![Formulário do Projeto](/contents/2017/04/criando_usando_litedb_007-1.png) 

Para realizar a atualização, vamos criar um novo form, o form3 e adicionar 4 Label, 4 TextBox e 2 Button; 

![Formulário do Projeto](/contents/2017/04/criando_usando_litedb_008-1.png) 

Precisaremos também fazer uma pequena mudança no form3 para que ele receba o id do registro para ser consultado e posteriormente editado. Alteraremos o construtor para receber o Id e carregar os dados para o formulário.

```csharp
protected readonly int Id;
protected Agenda agenda;

public Form3(int id)
{
    this.Id = id;
    InitializeComponent();
    CarregaDados();
}

private void CarregaDados()
{
    using (var db = new LiteDatabase("Filename=criandoUsandoLiteDb.db"))
    {
        agenda = db.GetCollection<Agenda>().FindById(this.Id);
    }

    textBox1.Text = agenda.Id.ToString();
    textBox2.Text = agenda.Nome;
    textBox3.Text = agenda.Email;
    textBox4.Text = agenda.Telefone;
}
```

Agora criaremos o evento para salvar os dados.

```csharp
private void button1_Click(object sender, EventArgs e)
{
    agenda.Nome = textBox2.Text;
    agenda.Email = textBox3.Text;
    agenda.Telefone = textBox4.Text;

    using (var db = new LiteDatabase("Filename=criandoUsandoLiteDb.db"))
    {
        db.GetCollection<Agenda>().Update(agenda);
    }

    this.Close();
}
```

Voltando ao form1, vamos definir o evento do botão atualizar.

```csharp
private void button3_Click(object sender, EventArgs e)
{
    int id;
    int.TryParse(dataGridView1.SelectedRows[0].Cells[0].Value.ToString(), out id);

    var form3 = new Form3(id);
    form3.ShowDialog();
}
```

![Formulário do Projeto](/contents/2017/04/criando_usando_litedb_009-1.png) 

![Formulário do Projeto](/contents/2017/04/criando_usando_litedb_010-1.png) 

Para concluir, iremos definir a opção de excluir. Vamos definir o evento do button4.

```csharp
private void button4_Click(object sender, EventArgs e)
{
    int id;
    int.TryParse(dataGridView1.SelectedRows[0].Cells[0].Value.ToString(), out id);

    if (id > 0)
    {
        var dialogResult = MessageBox.Show("Deseja excluir o registro selecionado?", "Excluir", MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2);

        if (dialogResult == DialogResult.Yes)
        {
            using (var db = new LiteDatabase("Filename=criandoUsandoLiteDb.db"))
            {
                db.GetCollection<Agenda>().Delete(id);
            }
        }
    }
}
```

![Formulário do Projeto](/contents/2017/04/criando_usando_litedb_011-1.png) 

![Formulário do Projeto](/contents/2017/04/criando_usando_litedb_012-1.png) 

Como pode perceber, em nenhum momento foi preciso abrir qualquer tipo de gerenciador de banco de dados, tão pouco executar comandos SQL. Porem é possível criar as consultas utilizando expressão Linq ou o próprio Helper do LiteDb.

```csharp
db.GetCollection().Find(x => x.Nome.Contains("Pedro")).ToList(); db.GetCollection().Find(Query.Contains("Nome", "Pedro"));
```

Outro ponto interessante que pode perceber que somente definimos um nome para o banco de dados e ele foi criado junto com o nosso executável. É possível gerenciar o banco criado, basta utilizar o LiteDb Shell que você irá encontrar [aqui](https://github.com/mbdavid/LiteDB/releases) e consultar seu uso [aqui](https://github.com/mbdavid/LiteDB/wiki/Shell). 

![LiteDb Shell](/contents/2017/04/criando_usando_litedb_013-1.png)

Como pode perceber o LiteDb pode nos atender muito bem para pequenos e médios projetos, tanto para aplicações Windows, Web ou Mobile (esse ainda não vi funcionar mas a proposta parece muito boa). Não deixe de acompanhar o projeto no [GitHub](https://github.com/ferronicardoso/ConhecendoUsandoLiteDb) e qualquer dúvida pode deixar seu comentário. 

Abraço e bom estudo!