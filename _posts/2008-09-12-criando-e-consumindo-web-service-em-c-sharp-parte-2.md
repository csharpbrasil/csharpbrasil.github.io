---
title: 'Criando e consumindo Web Service em C-Sharp - Parte 2'
date: Fri, 12 Sep 2008 17:43:40 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'C#', 'consumir webservice', 'Visual Studio', 'Visual Studio', 'WebService']
---

Olá pessoa, dando continuidade ao artigo anterior onde criamos um web service, nesse artigo irei mostrar como é simples utilizado em uma aplicação WinForm.

Para quem não leu o artigo anterior:  
[Criando e consumindo Web Service em C-Sharp - Parte 1](/criando-e-consumindo-web-service-em-c-sharp-parte-1)

  
Vamos ao que interessa.  
1- Abra o projeto anterior, quem não tiver poderá fazer o download do projeto do [Github](https://github.com/csharpbrasil/Criando-Consumindo-WebService).  
2- Clique com o botão direito em cima do Solution no Solution Explorer do Visual Studio > _Add_ > _New Project..._  
[![](/contents/2008/09/criandowebservice05-1-275x300.jpg "criandowebservice05")](/contents/2008/09/criandowebservice05-1.jpg)  
3- Na janela que ira abrir, escolha Windows Application, defina um nome **_TesteMeuWebService_**  
[![](/contents/2008/09/criandowebservice04-1-300x228.jpg "criandowebservice04")](/contents/2008/09/criandowebservice04-1.jpg)  
4- Agora adicionaremos referencia ao nosso WebService já criado. Clique com o botão direito em cima do Project no Solution Explorer do Visual Studio > _Add Web Reference..._  
[![](/contents/2008/09/criandowebservice06-1.jpg "criandowebservice06")](/contents/2008/09/criandowebservice06-1.jpg)  
5- Vamos listar os Web Services inclusos em nosso Solution.  
[![](/contents/2008/09/criandowebservice07-1.jpg "criandowebservice07")](/contents/2008/09/criandowebservice07-1.jpg)  
6- Selecionamos o nosso Web Service  
[![](/contents/2008/09/criandowebservice08-1.jpg "criandowebservice08")](/contents/2008/09/criandowebservice08-1.jpg)  
7- Adicionamos como referencia ao projeto.  
[![](/contents/2008/09/criandowebservice09-1.jpg "criandowebservice09")](/contents/2008/09/criandowebservice09-1.jpg)  
8- Agora vamos ao WinForm. Adicione 3 Labels, 3 TextBox, 1 ComboBox e 1 Button  
[![](/contents/2008/09/criandowebservice10-1.jpg "criandowebservice10")](/contents/2008/09/criandowebservice10-1.jpg)  
9- Adicione a lista de operações no ComboBox conforme imagem abaixo.

*   Adição
*   Divisão
*   Multiplicação
*   Subtração

[![](/contents/2008/09/criandowebservice11-1.jpg "criandowebservice11")](/contents/2008/09/criandowebservice11-1.jpg)  
10- Agora de um duplo clique no Button para adicionarmos o evento Click e o código abaixo.

```csharp private void button1_Click(object sender, EventArgs e) { decimal ValorA; decimal ValorB; localhost.OperacoesBasicas operacao = localhost.OperacoesBasicas.Adicao; decimal Resultado; decimal.TryParse(textBox1.Text, out ValorA); decimal.TryParse(textBox2.Text, out ValorB); switch (comboBox1.SelectedIndex) { case 0: operacao = localhost.OperacoesBasicas.Adicao; break; case 1: operacao = localhost.OperacoesBasicas.Divisao; break; case 2: operacao = localhost.OperacoesBasicas.Multiplicacao; break; case 3: operacao = localhost.OperacoesBasicas.Subtracao; break; default: operacao = localhost.OperacoesBasicas.Adicao; break; } localhost.Service MeuWebService = new localhost.Service(); Resultado = MeuWebService.Calculadora(ValorA, ValorB, operacao); textBox3.Text = Resultado.ToString(); } ```

Pronto, mais se formos executar o nosso projeto, ele não será executado, pois o projeto que esta definido como principal é o WebService, então clique com o botão direito em cima do Project do WinForm > _Set as StartUp Project_  
[![](/contents/2008/09/criandowebservice12-1.jpg "criandowebservice12")](/contents/2008/09/criandowebservice12-1.jpg)  
Agora sim, é só executar nosso projeto.  
[![](/contents/2008/09/criandowebservice13-1.jpg "criandowebservice13")](/contents/2008/09/criandowebservice13-1.jpg)

Espero que tenham entendido e qualquer dúvida é só mandar os comentários que responderei.

Fonte do projeto: [Github](https://github.com/csharpbrasil/Criando-Consumindo-WebService).

Abraço e até lá.