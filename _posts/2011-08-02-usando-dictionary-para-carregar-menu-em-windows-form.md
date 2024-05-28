---
title: 'Usando Dictionary para carregar menu em Windows Form'
date: Tue, 02 Aug 2011 11:03:26 +0000
draft: false
tags: ['.NET', 'C#', 'C#', 'Dicas', 'Dicas', 'Visual Studio', 'Visual Studio', 'WinForm']
---

Neste post vamos usar de forma simples a classe Dictionary do .net Framework, imaginando um o seguinte cenário aonde nosso form principal trabalha com Mdi. Temos um formulário principal, e no mesmo ele tem um menuStrip responsável a carregar os menus da nossa aplicação, para cada item de menu devemos ficar fazendo instancia para cada form que existir na nossa aplicação.

Exemplo \[sourcecode language="csharp"\] FCadastroCliente CadastroCliente = new FCadastroCliente(); CadastroCliente.MdiParent = this; CadastroCliente.ShowDialog(); CadastroCliente.Dispose(); \[/sourcecode\]

Isso com certeza tem que ser feito para nossa aplicação chamar as determinadas telas do nosso projeto. Com o Dictionary vamos implementar um procedimento aonde o mesmo vai se responsabilizar por fazer isso de modo simples e bastante produtivo, para que nos menus passamos chamar só o nosso metodo que acabamos de desenvolver para carregar telas.

\[sourcecode language="csharp"\] using System.Collections.Generic; private Dictionary dicForms = new Dictionary(); private void CarregaTela() { CarregarTela(typeof(T)); } private void CarregarTela(Type type) { bool carregar = true; Form f = null; try { if (dicForms.ContainsKey(type)) { if (dicForms.TryGetValue(type, out f)) { if (!f.IsDisposed) { f.Focus(); carregar = false; } else { dicForms.Remove(type); } } } if (carregar) { Cursor = Cursors.WaitCursor; f = (Form)Activator.CreateInstance(type); dicForms.Add(type, f); f.MdiParent = this; f.FormBorderStyle = FormBorderStyle.FixedSingle; f.StartPosition = FormStartPosition.CenterScreen; f.MaximizeBox = false; f.Show(); } } catch (Exception ex) { dicForms.Remove(type); MessageBox.Show("Não foi possível inicializar a tela " + type.Name + "!" + "\\n\\nCausa:" + ex.Message, "Aviso", MessageBoxButtons.OK, MessageBoxIcon.Error); if (f != null) { f.Close(); f.Dispose(); } } finally { Cursor = Cursors.Default; } } \[/sourcecode\]

Agora basta passar em cada item de menu chamar a tela assim

\[sourcecode language="csharp"\] CarregaTela(); \[/sourcecode\]

E nosso método que acabamos de implementar ira criar a instância do nosso objeto tela para o sistema.