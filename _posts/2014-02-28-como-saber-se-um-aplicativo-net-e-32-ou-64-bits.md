---
title: 'Como saber se um aplicativo .NET é 32 ou 64 bits'
date: Fri, 28 Feb 2014 11:59:10 +0000
draft: false
tags: ['32 bits', '64 bits', 'Any CPU', 'ASP.NET', 'ASP.NET', 'ASP.NET MVC', 'Assembly', 'BadImageFormatException', 'C#', 'C#', 'Could not load file or assembly', 'Dicas', 'Microsoft SDK', 'Microsoft Windows SDK for Windows 7 and .NET Framework 4', 'SDK', 'SDK', 'Windows Form']
---

No desenvolvimento de aplicações .NET seja ela, ASP.NET, ASP.NET MVC, Windows Library, Windows Form é possível utilizamos algumas diversas linguagens para programação. Porem é possível também definir que nosso executável ou assembly rode em plataforma 32 bits, 64 bits ou para ambas as plataformas (Any CPU).

Mais imagina-se a seguinte situação, um pouco absurda, mais possível de se ocorrer. Você é um implantador de sistemas e deverá atender a uma demanda em um cliente. Implantar o sistema e se depara com um erro ao executar o sistema que acabou de instalar com a seguinte mensagem:

```plain System.BadImageFormatException: Could not load file or assembly '' or one of it dependencies. An attempt was made to load programa with an incorrect format. ```

Alguns outros Exceptions poderão ser vistos aqui nesse artigo sobre [Exceptions do .NET Framework](https://raphaelcardoso.com.br/csharp/exceptions-do-net-framework/)

Esse erro ocorrer porque um assembly necessário não foi encontrado na tentativa de executar o sistema. Mais analisando o sistema, é identificado que o assembly se encontra junto ao projeto. Isso ocorre porque o assembly que tentou-se carregar está em uma plataforma diferente do sistema.

*   Exemplo 1: Aplicativo compilado para 32 bits e assembly para 64 bits
*   Exemplo 2: Aplicativo compilado para 64 bits e assembly para 32 bits

A solução para esses casos seria a compilação de ambos para a mesma plataforma.

No caso das aplicações ASP.NET, também ocorrem esse tipo de problema, onde se o sistema operacional for 64 bits, o Application Pooling no IIS (Internet Information Services) por padrão será 64 bits e no caso de aplicação ser compilada para 32 bits, ocorrerá o mesmo problema.

A solução para esse caso é compilar a aplicação para ambas as plataformas (Any CPU) ou para 64 bits. Outra solução seria definir o Application Pooling para rodar em modo 32 bits.

Recentemente me deparei com essa segunda situação que citei. O programador enviou um assembly em 32 bits e o IIS (Internet Information Services) do meu servidor estava com Application Pooling definido para 64 bits. Resultado, ocorreu um **BadImageFormatException**. A solução seria, mudar o assembly para 64 bits ou mudar o Application Pooling para 32 bits. Mais ai vem a pergunta, como ter certeza realmente para qual plataforma ela foi compilada?

Para responder a essa pergunta, basta efetuar o download do [Microsoft Windows SDK for Windows 7 and .NET Framework 4](http://www.microsoft.com/en-us/download/details.aspx?id=8279). e instala-lo. No SDK conterá as ferramentas necessárias.

Inicie a instalação do SDK.

[caption id="attachment_4767" align="aligncenter" width="772"]![Imagem da tela de inicio do setup do SDK](/contents/2014/02/tela1.png) Imagem da tela de inicio do setup do SDK[/caption] [caption id="attachment_4768" align="aligncenter" width="776"]![Imagem da Tela de informações sobre o termo da licença de uso](/contents/2014/02/tela2.png) Tela de informações sobre o termo da licença de uso[/caption] [caption id="attachment_4769" align="aligncenter" width="771"]![Imagem da Tela de definição do local de instalação do SDK](/contents/2014/02/tela3.png) Imagem da Tela de definição do local de instalação do SDK[/caption] [caption id="attachment_4770" align="aligncenter" width="777"]![Imagem da tela de escolha das opções de instalação](/contents/2014/02/tela4.png) Imagem da tela de escolha das opções de instalação[/caption] [caption id="attachment_4771" align="aligncenter" width="772"]![Imagem da tela sobre o aviso de inicio da instalação do SDK](/contents/2014/02/tela5.png) Imagem da tela sobre o aviso de inicio da instalação do SDK[/caption] [caption id="attachment_4772" align="aligncenter" width="775"]![Imagem da tela de progresso da instalação do SDK](/contents/2014/02/tela6.png) Imagem da tela de progresso da instalação do SDK[/caption] [caption id="attachment_4773" align="aligncenter" width="773"]![Imagem da tela de informação da conclusão da instalação do SDK](/contents/2014/02/tela7.png) Imagem da tela de informação da conclusão da instalação do SDK[/caption]

Após a instalação, abra o prompt do SDK localizado no menu _Iniciar > Microsoft Windows SDK v7.1 > Windows SDK 7.1 Command Prompt_ e digite o comando abaixo:

```plain CorFlags ``` [caption id="attachment_4774" align="aligncenter" width="684"]![Imagem do prompt do SDK com a execução do comando citado](/contents/2014/02/tela8.png) Imagem do prompt do SDK com a execução do comando citado[/caption]

No meu caso, esse comando irá gerar o resultado abaixo:

```plain Version : v2.0.50727 CLR Header: 2.5 PE : PE32 CorFlags : 9 ILONLY : 1 32BIT : 0 Signed : 1 ```

Para entender o resultado, criei a tabela abaixo que explica como identificar qual a plataforma do assembly

Plataforma

PE

ILONLY

32BIT

64 bits

PE32+

0

0

32 bits

PE32

0

1

32 bits / 64 bits

PE32

1

0

Considerando o resultado acima e seguindo a tabela abaixo, meu assembly é Any CPU, ou seja, é compilado para 32 e 64 bits.

Espero que essa dica seja útil e qualquer dúvida deixe seu comentário.

Abraço e bom estudo