---
title: 'Criando Objetos em Tempo de Execução'
date: Wed, 06 Apr 2011 02:08:43 +0000
draft: false
tags: ['.NET', 'C#', 'C#', 'Visual Studio', 'Visual Studio', 'Windows Form', 'WinForm']
---

Vou explicar de maneira simples e exemplificada sobre criação de objetos em tempo de execução.  
  
Vou mostrar um modelo prático. Imagine a seguinte situação. Você possui um webservice que envia consultas SQL para um cliente feito em Windows Form. Nesse cliente, existirá uma aba para cada consulta com um grid para exibir a consulta.  
Imagine o trabalho de ter que adicionar uma aba, um grid, configurar o cabeçalho de cada coluna desse grid? Retrabalho certo?  
  
Como sou preguiçoso, pensei em uma forma mais prática. E que tal se o integrador fosse inteligente a ponto de montar suas próprias abas, com um grid dentro e tudo vier configurado do webservice? Não seria necessário a manutenção no programa cliente caso uma nova consulta fosse adicionada, certo?  
  
Vou mostrar apenas a criação dos componentes, ok? Vou deixar a cargo de vocês se precisarem montar o webservice ou o DataSet com as consultas. Aí vai de cada um na sua utilização.  
  
Primeiro, crie uma nova aplicação Windows Form. Adicione um TabControl e exclua as TabPages que já vem criadas nela. Você pode melhorar ainda mais o código e deixar o seu programa criar a TabControl. Não há problema também.  
  
Vou colocar o código no próprio construtor do formulário, o valor será fixo para a quantidade abas que serão adicionadas somente para teste.  
  
```csharp private int qtdAbas = 10; ```  
  
O código abaixo percorre um for adicionando as abas (TabPage) dinamicamente conforme a variável qtdAbas.  
  
```csharp this.SuspendLayout(); // executa um for para adicionar a quantidade de abas da variável que setamos for (int i = 0; i < qtdAbas; i++) { // primeiro criamos o grid dinamicamente var dg = new System.Windows.Forms.DataGridView(); dg.Dock = System.Windows.Forms.DockStyle.Fill; dg.Location = new System.Drawing.Point(3, 3); dg.Name = "dg" + i.ToString(); dg.Size = new System.Drawing.Size(630, 292); dg.AutoSizeColumnsMode = System.Windows.Forms.DataGridViewAutoSizeColumnsMode.DisplayedCells; // adiciona a aba dinamicamente var aba = new System.Windows.Forms.TabPage(); aba.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224))))); aba.Location = new System.Drawing.Point(4, 32); aba.Name = "aba" + i.ToString(); aba.Padding = new System.Windows.Forms.Padding(3); aba.Size = new System.Drawing.Size(638, 300); aba.TabIndex = tabControl1.TabCount; aba.Text = "Aba " +i.ToString(); aba.Controls.Add(dg); // adiciona o Grid nesta aba // aba.Enter += new System.EventHandler(tabPage_Enter); // DESCOMENTE ESSA LINHA SÓ NO FINAL DO CÓDIGO // adiciona a tabPage no tabControl1 tabControl1.Controls.Add(aba); } this.ResumeLayout(false); ```  
Note que utilizamos os comandos "SuspendLayout()" e "ResumeLayout(false)" antes e depois do nosso loop.  
O método SuspendLayout(), suspende o formulário de que seja executado algum evento vinculado aos componentes do nosso formulário e depois que o loop é feito, é habilitado novamente.  
  
Agora basta rodar o projeto para ver o formulário com 10 abas criadas.  
  
Vou mostrar outro exemplo interessante.  
Suponhamos que você tenha um projeto com vários formulários e grids em cada um e queria que cada um tenha seu grid zebrado.  
Você teria que configurar cada um e caso tivesse que mudar as cores, teria que alterar tudo novamente, certo?  
Abaixo eu crio um método público que retorna um tipo DataGridViewCellStyle, vulgo estilo de célula de grid.  
  
```csharp public DataGridViewCellStyle EstiloZebrado() { // Estilo Zebrado dos DataGridView System.Windows.Forms.DataGridViewCellStyle dgEstiloZebrado = new System.Windows.Forms.DataGridViewCellStyle(); dgEstiloZebrado.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(214)))), ((int)(((byte)(230)))), ((int)(((byte)(254))))); return dgEstiloZebrado; } ```  
  
Voltamos no nosso construtor do form, no momento em que o grid é criado dinamicamente e adicionamos a seguinte linha "dg.AlternatingRowsDefaultCellStyle = EstiloZebrado();"  
  
Dessa forma, todos os grids de cada aba serão zebrados. Se precisar alterar a cor do grid zebrado, basta ir neste método.  
  
Vou mostrar outro exemplo interessante.  
É possível associar eventos em tempo de execução também. Mas esse evento precisa ser genérico para todos os objetos.  
No caso, vou associar um evento no Enter de cada aba (TabPage).  
  
Crie o método abaixo que será genérico para todas as abas (TabPage).  
  
  
```csharp private void tabPage_Enter(object sender, EventArgs e) { DataGridView dg = ((sender as TabPage).Controls["dg" + (tabControl1.SelectedIndex).ToString()]) as DataGridView; if (dg != null) // verifica se o objeto DataGridView foi encontrado { // manipule seu DataGridView da forma como quiser } } ```  
No método acima, eu busco dentro da aba (TabPage) por um componente que comece com dg e um número que é o índice da aba selecionada.  
Dessa forma, eu consigo manipular um objeto que seja padrão em todas as abas. No caso um DataGridView.  
Faço um if verificando se encontrou o DataGridView e posso manipulá-lo como quiser.  
  
No exemplo que vou colocar para download, eu utilizo um MessageBox.Show() somente para mostrar o evento funcionando.  
  
Volte no primeiro trecho de código, aquele comentado e descomente ele.  
Ele é o responsável por adicionar o evento dinamicamente a cada aba.  
  
```csharp // aba.Enter += new System.EventHandler(tabPage_Enter); // DESCOMENTE ESSA LINHA SÓ NO FINAL DO CÓDIGO ```  
Pronto, só colocar para executar e ver o resultado.  
É claro que coloquei apenas alguns exemplos práticos mas você pode melhorar muito suas aplicações tornando as bem modularizadas.  
  
Vou só dar uma última dica. Tá, prometo que é a última.  
Se você estiver em dúvida como criar um objeto em tempo de execução, coloque ele em design no seu formulário, vá no Solution Explorer e veja que tem seu arquivo Form1.cs certo?  
Clique na setinha para mostrar os arquivos Form1.Designer.cs e o Form1.resx.  
Clique duas vezes no Form1.Designer.cs que irá abrir o arquivo onde existe o código de criação dos objetos.  
Como o C# é pré-compilado, esse arquivo nada mais é do que a criação dos objetos em tempo de execução também. Acontece que ele é feito de forma fixa e não dinâmica como fizemos no exemplo acima.  
  
Boa sorte!