---
title: 'Segundo fator de autenticação com Google Authenticator'
date: Thu, 23 Jan 2014 09:00:19 +0000
draft: false
tags: ['ASP.NET', 'Authenticator', 'C#', 'C#', 'csharp', 'Google', 'Google', 'Segundo Fator de Autenticação', 'Segurança', 'Segurança']
---

Você já pensou em alguma forma de melhorar a segurança de seu aplicativo seja ele web ou desktop? Saiba que com pouco trabalho você pode implementar em sua aplicação o uso do segundo fator de autenticação. Mais o que vem a ser o segundo fator de autenticação?

O segundo fator de autenticação é um método de segurança que podemos usar em nossa aplicação como um complemento que alem de o usuário informar os dados de login, ele deverá informar uma senha aleatória gerada por um dispositivo chamado Token. Normalmente o Token é um dispositivo físico que nos casos mais comuns geram senhas aleatórias baseadas no tempo que mudam a cada intervalo de segundo ou a cada nova solicitação. Alguns bancos utilizam-se desses dispositivos para reforçar a segurança do acesso e das transações.

Existe também os dispositivos virtuais que normalmente são utilizados em dispositivos como os Smartphones.

Nesse artigos, irei abordar a utilização do Google Authenticator em nosso aplicativo.

Para quem não conhece, o Google Authenticatior é um aplicativo que gera esses códigos aleatórios. Ele está presente hoje para Android, IOS e Blackberry.

Com esse mesmo aplicativo você pode utilizar a verificação do segundo fator de segurança em sua conta do Google por exemplo. Existem outros grandes portais que utilizam do Google Authenticatior, tais como o DropBox e Amazon.

[![Google Authenticator](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator1-150x150.png)](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator1.png)

É possível adicionar essa funcionalidade em seu portal e você somente precisará de um dispositivo virtual (Smartphone) para utilizar o Google Authenticator.

Para exemplificar, criei um formulário onde eu terei uma chave secreta e um identificador. Nesse caso, a chave será conhecida para o exemplo, porem o ideal que ela seja secreta. Já o identificador, ele é usado para identificar a conta no Google Authenticator e não é usado como parametro do calculo. No entanto que no próprio Google Authenticator é possível renomea-lo.

[![Formulário de geração do segundo fator](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator2-150x150.png)](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator2.png)

Ao preencher o formulário, é gerado o QR Code na qual utilizarei para configurar o Google Authenticator com uma nova conta.

[![Leitura de um código de barra](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator3-150x150.png)](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator3.png)

E ao ler esse QR Code, é gerado a nossa nova conta.

[![Google Authenticator com a conta configurada](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator4-150x150.png)](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator4.png)

Para o teste, eu criei um outro formulário onde eu informarei o código exibido no Google Authenticator.

[![Teste do código gerado pelo Google Authenticator](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator5-150x150.png)](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator5.png) [![Teste do código gerado pelo Google Authenticator](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator6-150x150.png)](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator6.png)

Porém, se o código mudar no Google Authenticator e eu ainda informar o anterior, o verificar não irá aceitar. Isso porque passou-se o tempo e o novo código foi gerado.

[![Teste do código gerado pelo Google Authenticator](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator7-150x150.png)](https://raphaelcardoso.com.br/wp-content/uploads/2014/01/google_authenticator7.png)

Para que você implemente em sua aplicação, inicialmente você terá que parametrizar a opção para que o usuário escolha usar ou não o Token. Outro ponto importante é, implementar uma forma de ele poder acessar ou recuperar o acesso caso ele perca o dispositivo de Token ou não o tenha em mãos. Lembrando de que não poderá abrir mão da segurança, ou seja, você deverá implementar uma forma alternativa ao token. No caso do Google, ele nos fornece uma tabela com códigos de segurança onde cada código somente pode ser usado uma unica vez.

Deverá ser implementado também em sua aplicação a possibilidade de habilitar e configurar o dispositivo, ou seja, o usuário acessar o portal, habilita o parâmetro e configura o Token da mesma forma como fizemos no exemplo.

Assim, quando tudo certo e o parâmetro estiver ativo, no momento do login o usuário deverá informar as credenciais e o código do token.

Para que você possa estudar e implementar essa funcionalidade em sua aplicação, vou disponibilizar o meu código de exemplo para download.

Em caso de dúvidas, poderá deixar seu comentário ou acessar o nosso [fórum](https://raphaelcardoso.com.br/forum).

Fonte do projeto: [Github](https://github.com/csharpbrasil/GoogleAuthentication).

Abraço e até a próxima!