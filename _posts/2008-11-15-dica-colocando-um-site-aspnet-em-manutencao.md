---
title: 'Dica - Colocando um site ASP.NET em manutenção'
date: Sat, 15 Nov 2008 03:14:53 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'C#', 'Dicas', 'Dicas', 'Visual Studio', 'Visual Studio']
---

Para colocarmos um site em manutenção basta utilizar um recurso disponível no ASP.NET 2.0 que muita gente não conhece. Crie um arquivo html com o nome app\_offline.htm e uma mensagem qualquer de manutenção no diretório raiz do site e pronto! A presença dele fará com que o IIS entenda que toda requisição realizada seja exibido esse arquivo, ou seja, se precisarmos colocar o site em manutenção, não será necessário parar o serviço web ou remover qualquer arquivo. Vale lembrar que ele não impedira de você chamar no browser arquivos html, imagens ou por exemplo um websevice diretamente, mais isso ajuda muito não necessitando fazer qualquer outra mudança na estrutura de diretorio do site. Abraço!!!