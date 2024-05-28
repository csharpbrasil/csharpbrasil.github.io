---
title: 'Executando código dinâmico em C-Sharp'
date: Sat, 22 Nov 2008 17:04:30 +0000
draft: false
tags: ['C#', 'C#', 'CodeDom', 'compilação tardia', 'Compiler', 'late binding', 'Reflection', 'Visual Studio', 'Visual Studio', 'WinForm']
---

Quem já não pensou em como seria possível executar um código C#(c-sharp) dentro de uma aplicação? Sim, é possível e mais simples do que se imagina. Como isso funciona?

1.  Informaremos nosso código para a aplicação
2.  No código da aplicação já seria referenciado as DLLs possíveis que seria permitido (isso é muito importante)
3.  Nosso código será compilado
4.  Caso não ocorra erro, a aplicação ira executar o código do modo esperado.
5.  Caso ocorra erro, será apresentado os detalhes do erro

Então vamos colocar em pratica!!! Iniciaremos um novo projeto do tipo Windows Form (WinForm) e adicione nele 1 button com o nome de btnExecutar e 1 TextBox com nome de txtCodigo e a propriedade Multiline igual a true. Ainda no nosso txtCodigo deveremos adicionar um código inicial na propriedade Text. Segue ele abaixo. \[sourcecode language='csharp'\] using System; using System.IO; using System.Windows.Forms; namespace MyNamespace { public class MyClass { public object DynamicCode(params object\[\] Parameters) { int A = 100; int B = 40; int Resultado = A + B; return (object)Resultado; } } } \[/sourcecode\] Feito isso, iremos referenciar as namespaces necessárias para a execução da nossa aplicação. \[sourcecode language='csharp'\] using System.CodeDom.Compiler; using Microsoft.CSharp; using System.Reflection; \[/sourcecode\] Agora vamos ao código do nosso botão Executar. \[sourcecode language='csharp'\] private void btnExecutar\_Click(object sender, EventArgs e) { // Cria instancia do compilador ICodeCompiler loCompiler = new CSharpCodeProvider().CreateCompiler(); // Cria instancia dos parametros CompilerParameters loParameters = new CompilerParameters(); // Parametros atribuidos loParameters.ReferencedAssemblies.Add("System.dll"); loParameters.ReferencedAssemblies.Add("System.Windows.Forms.dll"); loParameters.GenerateInMemory = true; // Cria instancia do resultado da compilação CompilerResults loCompiled = loCompiler.CompileAssemblyFromSource(loParameters, txtCodigo.Text); // Verifica a existencia de erro if (loCompiled.Errors.HasErrors) { string lcErrorMsg = ""; lcErrorMsg = loCompiled.Errors.Count.ToString() + " Erro:"; for (int x = 0; x < loCompiled.Errors.Count; x++) { lcErrorMsg = lcErrorMsg + "\\r\\nLinha: " + loCompiled.Errors\[x\].Line.ToString() + " - " + loCompiled.Errors\[x\].ErrorText; } MessageBox.Show(lcErrorMsg + "\\r\\n\\r\\n" + txtCodigo.Text, "Compilação", MessageBoxButtons.OK, MessageBoxIcon.Error); return; } // Cria instancia do assemble compilado Assembly loAssembly = loCompiled.CompiledAssembly; object loObject = loAssembly.CreateInstance("MyNamespace.MyClass"); // Verifica se é possivel carrega-lo if (loObject == null) { MessageBox.Show("Não foi possivel carregar a Classe."); return; } object\[\] loCodeParms = new object\[1\]; loCodeParms\[0\] = string.Empty; try { // Executa nosso assemble dinamico e retorna resultado object loResult = loObject.GetType().InvokeMember("DynamicCode", BindingFlags.InvokeMethod, null, loObject, loCodeParms); // Exibe uma mensagem com o resultado MessageBox.Show("Resultado do metodo chamado:\\r\\n\\r\\n" + loResult.ToString(), "Compilação", MessageBoxButtons.OK, MessageBoxIcon.Information); } catch (Exception loError) { // Mensagem caso ocorra erro MessageBox.Show(loError.Message, "Compilação", MessageBoxButtons.OK, MessageBoxIcon.Information); } } \[/sourcecode\] Pronto! Basta executar nosso código para vermos o resultado. ![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/executandocodigodinamico001-1.jpg "executandocodigodinamico001") Caso ocorra algum erro a aplicação ira lhe informar. ![](https://raphaelcardoso.com.br/wp-content/uploads/2008/11/executandocodigodinamico002-1.jpg "executandocodigodinamico002") Bom, agora é só adicionar mais recursos e terá resultados interessantes. Dúvidas? Deixe seu comentário! Abraço e sucesso!!!