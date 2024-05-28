---
title: 'Criando um Array de objetos - Parte I'
date: Thu, 09 Apr 2009 04:13:12 +0000
draft: false
tags: ['arrays', 'C#', 'C#', 'delegate', 'Dicas', 'Dicas', 'events', 'tips']
---

Hoje irei falar um pouco à respeito de Arrays de objetos, mais especificamente, utilizando controles Windows Forms em diversas situações que podem surgir ao longo do desenvolvimento de um sistema. O primeiro passo é entender como podemos instanciar um objeto do tipo controle e como atribuir eventos a eles. Veja no exemplo a seguir: \[sourcecode language='csharp'\] private void Form1\_Load(object sender, EventArgs e) { // Declarando o Array do tipo 'Button', 'btn' como identificador e dimensão '\[10\]'. // Button representa um controle 'Button' no namespace System.Windows.Forms Button\[\] btn = new Button\[10\]; //Inicializando uma nova instancia de 'btn',\[0\] neste caso. //Observação importante: lembre-se sempre que devemos iniciar apartir de \[0\]. btn\[0\] = new Button(); //Definindo as propriedades basicas do controle: Localização do controle, tamanho, nome e texto; respectivamente. btn\[0\].Location = new System.Drawing.Point(100, 100); btn\[0\].Size = new System.Drawing.Size(100, 25); btn\[0\].Name = "Botao1"; btn\[0\].Text = "Botão 1"; //Adicionando o controle especificado à coleção de controles do Form1 this.Controls.Add(btn\[0\]); } \[/sourcecode\] \[caption id="attachment\_620" align="aligncenter" width="339" caption="Resultado"\]![Screenshot do 'Resultado da tela'](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/img1_post1-1.jpg)\[/caption\]

* * *

A seguir iremos criar e assinar eventos neste botão que foi instanciado: \[sourcecode language='csharp'\] private void Form1\_Load(object sender, EventArgs e) { Button\[\] btn = new Button\[10\]; btn\[0\] = new Button(); btn\[0\].Location = new System.Drawing.Point(100, 100); btn\[0\].Size = new System.Drawing.Size(100, 25); btn\[0\].Name = "Botao1"; btn\[0\].Text = "Botão 1"; // Assinando o evento btn\[0\].Click += new System.EventHandler(this.evento\_do\_botao1); this.Controls.Add(btn\[0\]); } \[/sourcecode\] E as ações do evento: \[sourcecode language='csharp'\] private void evento\_do\_botao1(object sender, EventArgs e) { MessageBox.Show("Evento do botao1"); } \[/sourcecode\]

\[caption id="attachment\_621" align="aligncenter" width="160" caption="Resultado"\]![Resultado](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/post1_img2-1.jpg)\[/caption\]

* * *

Outro exemplo utilizando o delegate: \[sourcecode language='csharp'\] private void Form1\_Load(object sender, EventArgs e) { Button\[\] btn = new Button\[10\]; btn\[0\] = new Button(); btn\[0\].Location = new System.Drawing.Point(100, 100); btn\[0\].Size = new System.Drawing.Size(100, 25); btn\[0\].Name = "Botao1"; btn\[0\].Text = "Botão 1"; //Atribuindo um evento anonimo btn\[0\].Click += delegate { MessageBox.Show("Este é um evento anonimo, e está dentro de outro evento(Form1\_Load) npor isso não possui (object sender, EventArgs e) nele tambem pode ser assinado em Run-time"); }; } \[/sourcecode\]

\[caption id="attachment\_622" align="aligncenter" width="371" caption="Resultado"\]![Resultado](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/post1_img3-1.jpg)\[/caption\] Caso tenha alguma duvida, sinta-se à vontade para perguntar nos comentários. Muito obrigado, e um grande abraço.