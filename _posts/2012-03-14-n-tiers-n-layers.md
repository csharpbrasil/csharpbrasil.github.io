---
title: 'N-Tiers != N-Layers'
date: Wed, 14 Mar 2012 16:00:13 +0000
draft: false
tags: ['C#', 'N-Layers', 'N-Tiers']
---

Hoje vamos esclarecer a diferença entre n-tiers e n-layers, algo que causa bastante complicação, principalmente quando estamos lendo livros técnicos traduzidos do inglês, no qual ambas as definições são tratados como “camadas”. Logical layers (Camadas Lógicas) são apenas uma forma de organizar seu código. Camadas típicas incluem negócios, apresentação e dados – o mesmo que o modelo três camadas tradicional. Mas quando estamos falando sobre layers, estamos falando apenas da organização lógica do código. De nenhuma maneira é implícito que essas camadas podem ser executadas em computadores diferentes ou em diferentes processos em um único computador, ou em um mesmo processo em um único computador. Tudo que estamos fazendo é discutir uma forma de organizar um código em um conjunto de camadas definidas pela função especifica. Physical tiers (Camadas físicas) definem apenas aonde o código vai rodar. Especificamente, tiers são os lugares onde as layers são implantadas e onde as layers são executadas. Em outras palavras tiers é a implantação física das layers. Referência: _Rockford Lhotka,_ [_Should all apps be n-tier?_](http://www.lhotka.net/weblog/ShouldAllAppsBeNtier.aspx "Should all apps be n-tier.")