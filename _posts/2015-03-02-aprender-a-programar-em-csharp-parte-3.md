---
title: 'Aprender a programar em C# – Parte 3'
date: Mon, 02 Mar 2015 10:30:51 +0000
draft: false
tags: ['Aprender a programar em C#', 'C Sharp', 'C#', 'C#', 'Conceitos básicos', 'Iniciante', 'Visual Studio']
---

Você viu nos artigos anteriores a abordagem sobre a linguagem C# (C-Sharp) de como ela surgiu, tipos de dados, sintaxes, variáveis, operadores, controle de fluxo e laços de repetição, também pode ver o desenvolvimento de uma aplicação simples e compilação por linha de comando.

* [Aprender a programar em C# - Parte 1](/aprender-a-programar-em-csharp-parte-1)
* [Aprender a programar em C# - Parte 2](/aprender-a-programar-em-csharp-parte-2)

Nessa nova parte iremos abordar o desenvolvimento de uma aplicação simples utilizando o Visual Studio para que nós possamos nos familiarizar com a ferramente. Portanto, é importante que já tenha o Visual Studio instalado. Sugiro o uso do Visual Studio Community 2013. Acesse o link [visualstudio.microsoft.com](visualstudio.microsoft.com/) e faça o download e instalação, é fácil.

![Tela do Visual Studio Community 2013](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_1.png) 

Com o Visual Studio aberto, vamos criar um novo projeto. Acesse o menu principal _File > New > Project_. Criaremos um projeto do tipo Windows Forms Application que se encontra no Template Windows Desktop utilizando o .NET Framework 4.5 e definindo o nome do projeto como _MeuPrimeiroWindowsFormApplication_.

![Tela de criação do novo projeto.](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_2.png)

Com o nosso projeto criado e aberto no Visual Studio, vamos edita-lo e criar alguns componentes. Enquanto isso vamos conhecendo um pouco mais da ferramenta.

![Tela do nosso projeto aberto no Visual Studio](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_3.png)

Vamos fazer algo simples, da barra de ferramentas (Toolbox) arrastaremos alguns componentes para o nosso Windows Form.

* 2 Button
* 2 Label
* 2 TextBox

![Tela contendo os componentes arrastados](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_4.png)

Edite a propriedade Text dos _Buttons_ e dos _Labels_.

* Button1 = Confirmar
* Button2 = Sair
* Label1 = Nome
* Label2 = E-mail

![Tela com a propriedade Text alterada dos TextBox e das Labels](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_5.png)

Agora vamos codificar os botões. Primeiro clique duas vezes sobre o botão _Sair_ e digite a linha abaixo. Esse será o comando que informaremos ao Form (this) que ele deverá ser fechado.

```csharp
DialogResult mensagem = MessageBox.Show("Deseja finalizar a aplicação?", "Encerrar", MessageBoxButtons.YesNo, MessageBoxIcon.Question, MessageBoxDefaultButton.Button2);

if (mensagem == System.Windows.Forms.DialogResult.Yes)
{
    this.Close();
}
```

Aperte a tecla F5 ou clique no menu principal _Debug > Starting Debugging_.

![Tela com a pergunta se deseja encerrar](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_6.png)

Codificaremos o botão confirmar. Clique duas vezes sobre o botão _Confirmar_ e digite o código abaixo.

```csharp
string nome = textBox1.Text;
string email = textBox2.Text;

if (nome.Length > 0 && email.Length > 0)
{
    string mensagem = string.Format("Olá {0}, o e-mail informado foi {1}", nome, email);

    MessageBox.Show(mensagem, "Mensagem", MessageBoxButtons.OK, MessageBoxIcon.Information, MessageBoxDefaultButton.Button1);
}
```

Aperte a tecla F5 ou clique no menu principal _Debug > Starting Debugging_.

Preencha os campos com seu nome e e-mail para realizar o teste.

![Tela com o resultado da execução](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_7.png)

Adicione um novo botão ao nosso Form e altere a propriedade Text para _Abrir Form_.

![Tela com o novo botão](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_8.png)

Adicione um novo Form ao projeto. Clique com o botão direito sobre o projeto e _Add > Windows Form_.

![Tela de como adicionar um novo Form](https://raphaelcardoso.com.br/wp-content/uploads/2015/02/aprender_a_programar_em_csharp_3_9.png)

Clique duas vezes sobre esse novo botão adicionado ao Form1 e vamos adicionar uma nova ação. Essa ação irá chamar o Form2. Digite o código abaixo.

Form2 form2 = new Form2(); form2.ShowDialog(); 

```csharp
Form2 form2 = new Form2();
form2.ShowDialog();
```

Aperte a tecla F5 ou clique no menu principal _Debug > Starting Debugging_.

Clique no botão _Abrir Form_ e terá o resultado abaixo.

![Tela do resultado quando botão Abrir Form é clicado](https://raphaelcardoso.com.br/wp-content/uploads/2015/03/aprender_a_programar_em_csharp_3_10.png)

Até aqui foi possível você aprender como criar um formulário, fazer chamada a outros formulários, adicionar e utilizar componentes e como alterar suas propriedades.

Para a [Parte 4](/aprender-a-programar-em-csharp-parte-4) desse artigo, iremos abordar o uso de banco de dados.

Fonte do projeto: [Github](https://github.com/csharpbrasil/aprender_programar_csharp_parte3).

Até o próximo artigo e bons estudos!