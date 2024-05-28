---
title: 'Não execute ASP.NET em Produção com debug ativado'
date: Thu, 07 Mar 2013 16:48:34 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'Debug']
---

Em resumo:

*   A compilação de paginas ASP.NET leva muito mais tempo, porque otimizações ficam desativadas
*   O código pode executar mais lento, porque caminhos adicionais de depuração estão desativados.
*   Muito mais memória é usada pelo aplicativo no tempo de execução
*   Scripts e imagens baixadas por componentes como Ajax ToolKit ou similares não são armazenados em cachê.
*   Abre uma brecha na segurança, pois as mensagens de erro podem ser exibidas detalhadamente no servidor remoto expondo a aplicação.

**O <_deployment retail=”true”/>_ no Maching.config:** Para os administradores de servidores é possível garantir que ninguém acidentalmente implante uma aplicação ASP.NET com _<compilation debug=”true”/>_ ativado dentro do Web.config, um truque é aproveitar a sessão _<deployment>_ dentro do arquivo machine.config. Defina isso em seu machine.config: \[sourcecode language="xml"\] \[/sourcecode\] Com essa configuração será desativado o _<compilation debug=”true”/>_ dos aplicativos, desativada a capacidade de exibir rastreamento na exibição de uma pagina (desabilita o Trace.axd) e desabilita a capacidade de exibir mensagens de erro detalhadas remotamente. Referências:

*   [ScottGu's Blog](http://web.archive.org/web/20140328143128/http://weblogs.asp.net/scottgu/archive/2006/04/11/442448.aspx "Don’t run production ASP.NET Applications with debug=”true” enabled ")