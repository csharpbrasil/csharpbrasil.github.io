---
title: 'Criando e consumindo Web Service em C-Sharp - Parte 1'
date: Sun, 07 Sep 2008 15:48:52 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'C#', 'consumir webservice', 'Visual Studio', 'Visual Studio', 'WebService']
---

Em mais um artigo, vou explicar como criar nosso primeiro Web service e ainda consumi-lo tanto em uma aplicação Windows Form quanto em um Web Form. Como primeira parte dessa publicação iremos criar nosso Web service.

**Mais o que vem a ser o Web service?**

  
_**Web service** é uma solução utilizada na integração de sistemas e na comunicação entre aplicações diferentes. Com esta tecnologia é possível que novas aplicações possam interagir com aquelas que já existem e que sistemas desenvolvidos em plataformas diferentes sejam compatíveis. Os Web services são componentes que permitem às aplicações enviar e receber dados em formato XML. Cada aplicação pode ter a sua própria "linguagem", que é traduzida para uma linguagem universal, o formato XML. (fonte: [Wikipédia](http://pt.wikipedia.org/wiki/Web_service))_

Um Web service nada mais é que uma Classe seja ela em C-Sharp quanto VB.NET. Essa classe ou Web service pode ser consumido por uma aplicação Web Form, Windows Form ou até mesmo outros Web service e detalhe, independente da linguagem que eles foram criados.  
Suponhamos que você tenha criado um Web service em VB.NET com todas as regras de negocio da sua empresa onde suas aplicações Web Form irá consumi-lo, e se futuramente você pretende disponibiliza-lo para parceiros ou clientes isso não será problema, mesmo que seus parceiros possuam aplicações em C-Sharp, Java, Delphi ou qualquer outra linguagem que venha a surgir e tenha a capacidade de consumir um Web Service.

Então agora vamos ao que interessa.

1- Abra o Visual Studio.  
2- Crie um novo _ASP.NET Web Service_ em _File > New > Web Site..._

[![](/contents/2008/09/criandowebservice01-1.jpg "criandowebservice01")](/contents/2008/09/criandowebservice01-1.jpg)

Seu código inicialmente será igual ao código abaixo.

```csharp using System; using System.Web; using System.Web.Services; using System.Web.Services.Protocols; [WebService(Namespace = "http://tempuri.org/")] [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)] public class Service : System.Web.Services.WebService { public Service() { //Uncomment the following line if using designed components //InitializeComponent(); } [WebMethod] public string HelloWorld() { return "Hello World"; } } ```

Iremos criar um WebMetodo que possibilita a uma aplicação realizar as 4 Operações Básicas da Matemática, mais o detalhe é que daremos a possibilidade de se escolher qual delas usar no mesmo WebMetodo.

Para isso crie uma nova classe do tipo Enum e nosso código ficará como o exemplo abaixo:

```csharp using System; using System.Web; using System.Web.Services; using System.Web.Services.Protocols; [WebService(Namespace = "http://tempuri.org/")] [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)] public class Service : System.Web.Services.WebService { public Service() { //Uncomment the following line if using designed components //InitializeComponent(); } [WebMethod] public string HelloWorld() { return "Hello World"; } } public enum OperacoesBasicas { Adicao = 0, Divisao = 1, Multiplicacao = 2, Subtracao = 3 } ```

Feito isso iremos criar então um novo WebMetodo chamado _Calculadora_ onde iremos informar 2 valores do Tipo _Decimal_, a Tipo da _Operação_ e será retornado um outro valor do tipo _Decimal_. Veja o código abaixo:

```csharp [WebMethod] public decimal Calculadora(decimal ValorA, decimal ValorB, OperacoesBasicas TipoOperacao) { decimal ResultadoAB = 0; switch (TipoOperacao) { case OperacoesBasicas.Adicao: { ResultadoAB = decimal.Add(ValorA, ValorB); break; } case OperacoesBasicas.Divisao: { ResultadoAB = decimal.Divide(ValorA, ValorB); break; } case OperacoesBasicas.Multiplicacao: { ResultadoAB = decimal.Multiply(ValorA, ValorB); break; } case OperacoesBasicas.Subtracao: { ResultadoAB = decimal.Subtract(ValorA, ValorB); break; } } return ResultadoAB; } ```

Pronto, nosso básico Web Service está pronto. Agora execute o Web Service e será aberto uma página com a lista de WebMetodos do seu Web Service. Clique no link _Calculadora_ e será aberto outra página para entrada dos valores.

[![](/contents/2008/09/criandowebservice02-1.jpg "criandowebservice02")](/contents/2008/09/criandowebservice02-1.jpg)

Para realizar as operações você deverá informar o _TipoOperacao_.

*   Adicao ou 0
*   Divisao ou 1
*   Multiplicacao ou 2
*   Subtracao ou 3

Será aberto uma outra página com o resultado.  
[![](/contents/2008/09/criandowebservice03-1.jpg "criandowebservice03")](/contents/2008/09/criandowebservice03-1.jpg)

Viu como é simples?

Fonte do projeto: [Github](https://github.com/csharpbrasil/Criando-Consumindo-WebService).

Espero que tenham entendido e no próximo artigo irei explicar como consumir esse mesmo Web Service em Windows Form.

Abraço e sucesso!!!