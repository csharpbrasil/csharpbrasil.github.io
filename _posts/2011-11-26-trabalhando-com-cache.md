---
title: 'Trabalhando com Cache'
date: Sat, 26 Nov 2011 22:16:17 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'Cache', 'Cache.Insert', 'get', 'propriedades', 'set']
---

Olá pessoal, neste artigo mostrarei como trabalhar com cache. Faço este artigo com base na videoaula de [Bruno Belizário](mailto:bsbelizario@hotmail.com), do [Portal Linha de Código](http://www.linhadecodigo.com.br/), mediante autorização do mesmo. Acompanhem o passo-a-passo: Iremos fazer um exemplo simples e rápido mostrando como armazenar algumas informações de uma página no cache e repassá-las a outra página. Este exemplo é bem parecido com o artigo sobre [Manipulação do Web.Config](https://raphaelcardoso.com.br/manipulando-o-web-config-armazenando-e-recuperando-dados/). Começando, abra o Visual Studio, vá em **File > New Project** (CTRL + SHIFT + N), escolha o template **ASP.NET Web Application** e  dê o nome  **ExemploCache**. Na **Default.aspx**, vá ao modo **Design**, crie uma tabela e insira alguns controles na página, para que fique como pode ser visto na **Figura 01**. [![](http://programandodotnet.files.wordpress.com/2010/07/default-aspx1.jpg)](http://programandodotnet.files.wordpress.com/2010/07/default-aspx1.jpg)

Figura 01 - Default.aspx

Na ordem em que se vê na imagem acima, passei os seguintes **ID’s** aos respectivos controles: **lblNome**, **txtNome**, **lblCidade**, **txtCidade**, **btnSalvarCache** e **btnChamarPagina**. Antes de ir aos códigos, crie uma nova classe que irá guardar o tipo de dados que iremos armazenar em cache. Dê o nome **Pessoa** a essa classe criada. Na classe criada crie o código com as propriedades referentes aos valores que serão inseridos pelo usuário na página, como ilustrado pela **Listagem 01**. _Listagem 01 - Classe Pessoa_ \[sourcecode language="csharp"\] public class Pessoa { public string Nome { get; set; } public string Cidade { get; set; } } \[/sourcecode\] Agora sim, vá à página de códigos e crie o método da **Listagem 02**, que irá salvar os dados em cache. _Listagem 02 - Método para salvar os dados no cache_ \[sourcecode language="csharp"\] private void SalvarEmCache() { try { //Instancio a classe Pessoa, passo as propriedades dela e as atribuo os valores aos textboxes Pessoa objPessoa = new Pessoa(); objPessoa.Nome = txtNome.Text; objPessoa.Cidade = txtCidade.Text; //Crio o Cache com o nome DadosPessoa, que recebe o objeto instanciado da classe Pessoa Cache\["DadosPessoa"\] = objPessoa; } catch (Exception ex) { throw new Exception(ex.Message); } } \[/sourcecode\] A forma descrita acima é a mais simples de se guardar valores no Cache. Mais adiante mostrarei outra forma. Agora chame o método recém-criado no botão **Salvar em Cache**, como ilustrado pela **Listagem 03**. _Listagem 03 - Chamada do método no botão_ \[sourcecode language="csharp"\] protected void btnSalvarCache\_Click(object sender, EventArgs e) { SalvarEmCache(); } \[/sourcecode\] Agora vá ao **Solution Explorer** e crie uma nova página com o nome **DadosPessoa**. Nessa página, que irá receber os dados da **Default.aspx**, vá ao modo **Design** e adicione os controles para que fique parecido com a imagem da **Figura 02**. [![](http://programandodotnet.files.wordpress.com/2010/07/dadospessoa-aspx.jpg)](http://programandodotnet.files.wordpress.com/2010/07/dadospessoa-aspx.jpg)

Figura 02 - DadosPessoa.aspx

Como você pode perceber na imagem deixei os labels **Nome** e **Cidade** somente com o ID, sem texto, já que os textos virão pelo **Cache** gerado pela **Default.aspx**. Isso mesmo que iremos fazer, criando o método ilustrado na **Listagem 04**. _Listagem 04 - Método para recuperar os dados do cache_ \[sourcecode language="csharp"\] private void RecuperaDadosDoCache() { try { //Verifico se meu Cache está diferente de nulo if (Cache\["DadosPessoa"\] != null) { //Instancio a classe Pessoa Pessoa objPessoa = new Pessoa(); //Faço um Cast(conversão) no Cache para o tipo da classe Pessoa objPessoa = (Pessoa)Cache\["DadosPessoa"\]; //Meus labels recebem os valores armazenados na classe Pessoa lblNome.Text = objPessoa.Nome; lblCidade.Text = objPessoa.Cidade; } } catch (Exception ex) { throw new Exception(ex.Message); } } \[/sourcecode\] Assim faço a verificação se há dados no Cache, prevenindo desta forma erros de compilação, para então fazer com o que os labels recebam os valores da digitados pelo usuário na **Default.aspx**. Agora chame este método no **Page\_Load**, como pode ser visto na **Listagem 05**: _Listagem 05 - Chamada do método no evento Page\_Load_ \[sourcecode language="csharp"\] protected void Page\_Load(object sender, EventArgs e) { RecuperaDadosDoCache(); } \[/sourcecode\] Agora volte a **Default.aspx**, dê dois cliques no botão **Chamar Página** e coloque este código que irá redirecionar para a página **DadosPessoa.aspx**, como é ilustrado na **Listagem 06**: _Listagem 06 - Evento click do botão Chamar Página_ \[sourcecode language="csharp"\] protected void btnChamarPagina\_Click(object sender, EventArgs e) { Response.Redirect("DadosPessoa.aspx"); } \[/sourcecode\] Abra a Solution Explorer, clique com o botão direito na **Default.aspx** e clique em **Set As Start Page**, para que a **Default.aspx** seja a página inicial da aplicação quando a mesma for compilada. Salve o projeto, aperte F5 para compilar, clique em **OK** para que o **Web.Config** habilite a compilação e aguarde. Informe na tela o Nome e Cidade e clique no botão **Salvar em Cache**, como ilustra a **Figura 03**: [![](http://programandodotnet.files.wordpress.com/2010/07/compiledproject1.jpg)](http://programandodotnet.files.wordpress.com/2010/07/compiledproject1.jpg)

Figura 03 - Salvando em Cache

_PS: Não criamos um label para exibir mensagem de confirmação da gravação dos dados, já que o intuito deste artigo é apenas de mostrar o uso simplificado do Cache._ Agora clique no **Chamar Página** e veja o resultado na **Figura 04**. [![](http://programandodotnet.files.wordpress.com/2010/07/compiledproject21.jpg)](http://programandodotnet.files.wordpress.com/2010/07/compiledproject21.jpg)

Figura 04 - Retorno dos dados do Cache

Podemos ver que os dados foram armazenados em Cache e não se perderam ao clicarmos no botão **Chamar Página**. Para entendermos melhor o que ocorre em tempo de execução, coloque um breakpoint (**aperte F9**) na linha que instancia o objeto **Pessoa**, na **Default.aspx** e um na linha que faz a verificação se o **Cache** está diferente de nulo na **DadosPessoa.aspx** e compile novamente. Informe o **Nome** e **Cidade** e clique no botão **Salvar em Cache**. O breakpoint será chamado. Aperte **F10** para pular de linha em linha e veja que os objetos da classe **Pessoa** serão populados com os valores que acabamos de digitar, como é ilustrado pela **Figura 05**. [![](http://programandodotnet.files.wordpress.com/2010/07/breakpoint1.jpg)](http://programandodotnet.files.wordpress.com/2010/07/breakpoint1.jpg)

Figura 05 - Valores do objeto da classe Pessoa populados

Aperte **F5** para voltar à página e clique no botão **Chamar Página**. Iremos ao breakpoint da página **DadosPessoa.aspx**, percorra linha a linha e veja que o Cache virá com os dados da Default.aspx, armazenará estes dados na classe Pessoa e os repassará aos labels criados nesta página, que receberão os dados dos objetos criados na classe, como ilustrado pela **Figura 06**. [![](http://programandodotnet.files.wordpress.com/2010/07/breakpoint2.jpg)](http://programandodotnet.files.wordpress.com/2010/07/breakpoint2.jpg)

Figura 06 - Dados recuperados na DadosPessoa.aspx

Como dito anteriormente, vamos ver a outra forma de se guardar valores no Cache, que é pelo método **Insert**, que tem até cinco sobrecargas em sua assinatura, como podemos ver na **Figura 07** (vamos usar todas): [![](http://programandodotnet.files.wordpress.com/2010/07/insertmethodoverloads.jpg)](http://programandodotnet.files.wordpress.com/2010/07/insertmethodoverloads.jpg)

Figura 07 - Método Insert da classe Cache, e seus parâmetros

Comente ou altere a linha do código que guarda os dados no cache para a da **Listagem 07**. _Listagem 07 - Método Cache.Insert_ \[sourcecode language="csharp"\] Cache.Insert("DadosPessoa", objPessoa, null, DateTime.Now.AddSeconds(30), TimeSpan.Zero, System.Web.Caching.CacheItemPriority.NotRemovable, null); \[/sourcecode\] Acima passei estes parâmetros: a **chave**, que é o nome do Cache, o **objeto**, que nesse exemplo é a instância da classe Pessoa, o **parâmetro de dependência**, que neste caso deixamos como nulo, o **parâmetro que indica o tempo de expiração** de meu cache no cache do servidor, deixei 30 segundos, **o intervalo** entre o tempo que o objeto foi acessado pela última vez e o tempo em que ele irá expirar, aqui deixo como Zero, **a prioridade** em que meu objeto Cache ficará na memória do meu servidor, tendo diversas opções, que aqui deixei como **NotRemovable**(que indica que nosso objeto Cache nunca será removido do servidor de minha aplicação) e um **delegate**, que irá notificar a aplicação quando os objetos forem excluídos do Cache, não o usaremos por isso deixei como nulo. Salve e rode a aplicação. Você verá que a aplicação funciona do mesmo jeito, a diferença é que agora nosso **Cache** está mais detalhado, com mais opções que, dependendo da complexidade do seu sistema, podem ser muito importantes. Assim finalizo o artigo. Para quem se interessar, disponibilizo o código fonte desse projeto aqui. **Créditos** à [Bruno Belizário](mailto:bsbelizario@hotmail.com), que fez a videoaula e ao [Portal Linha de Código](http://www.linhadecodigo.com.br/), por onde pude baixá-la (mediante assinatura), estudá-la e posteriormente fazer este artigo. Quaisquer dúvidas mandem emails para [wellingtonbalbo@gmail.com](mailto:wellingtonbalbo@gmail.com) ou deixem nos comentários deste artigo que responderei o mais rápido possível.  _Até o próximo artigo!_

private void SalvarEmCache()

{

try

{

//Instancio a classe Pessoa, passo as propriedades dela e as atribuo os valores aos textboxes

Pessoa objPessoa = new Pessoa();

objPessoa.Nome = txtNome.Text;

objPessoa.Cidade = txtCidade.Text;

//Crio o Cache com o nome DadosPessoa, que recebe o objeto instanciado da classe Pessoa

Cache\["DadosPessoa"\] = objPessoa;

}

catch (Exception ex)

{

throw new Exception(ex.Message);

}

}