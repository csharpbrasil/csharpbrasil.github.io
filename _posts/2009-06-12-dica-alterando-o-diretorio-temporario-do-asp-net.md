---
title: 'Dica - Alterando o diretório temporário do ASP.NET'
date: Fri, 12 Jun 2009 19:59:11 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'C#', 'C#', 'Dicas', 'Dicas', 'Framework', 'Microsoft', 'Visual Studio', 'Visual Studio']
---

Estou de volta! Ultimamente ando um pouco atarefado e me impossibilitando de escrever novos artigos. Mais arrumei um tempo nesse dia chuvoso pós feriado.

Na empresa na qual trabalho possuímos nossa aplicação web toda desenvolvida em asp.net e com isso surgiu a necessidade de mudar o diretório dos arquivos temporários compilados.

Para quem não sabe, o ASP.NET é pré-compilado, por isso o primeiro acesso é sempre mais demorado. Esses arquivos pré-compilados ficam armazenados no diretório padrão _C:\\WINDOWS\\Microsoft.NET\\Framework\\v2.0.50727\\Temporary ASP.NET Files_, mais nada nos impede de mudar o diretório.

Então suponhamos que você é o administrador dos servidores de web da sua empresa e que cada servidor possui 2 discos **(Drive C: e D:)** e surgiu a necessidade de mudar o diretório temporário para outro disco de maior capacidade.

Basta abrir a sua aplicação e mudar no próprio **web.config**. No meu caso ficaria assim.

\[sourcecode language="csharp"\] < ?xml version="1.0"?> \[/sourcecode\]

Assim que você tentar acessar o site ele irá pré-compilar o projeto e adiciona-lo nesse diretório criado.

Não se esqueça de dar permissão para os usuário do ASP.NET e do IIS (Internet Information Services) nesse diretório.

Abraço e até a próxima.