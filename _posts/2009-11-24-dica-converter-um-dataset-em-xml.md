---
title: 'Dica - Converter um DataSet em XML'
date: Tue, 24 Nov 2009 16:00:46 +0000
draft: false
tags: ['.NET', 'ASP.NET', 'ASP.NET', 'C#', 'C#', 'Dicas', 'Dicas', 'Framework', 'VB.NET', 'VB.NET', 'Visual Studio', 'Visual Studio', 'WebForm', 'WinForm']
---

Como você faria para converter um DataSet em XML?

Imagine que você esta desenvolvendo um WebService e que os dados serão recebidos por ele e esses dados gravados em formato XML no disco para que depois uma segunda aplicação possa processa-la.

Criaremos aqui uma função simples que fará esse processo de geração do XML e gravação em disco.

\[sourcecode language='csharp'\] /// /// Converte um DataSet para XML em disco /// /// Nosso DataSet /// Caminho e nome do arquivo xml a ser gravado public void GravaXML(DataSet ds, string CaminhoXML) { if (ds != null && ds.Tables.Count > 0) { ds.WriteXml(CaminhoXML); } } ///  /// Converte um DataTable para XML em disco ///  /// Nosso DataTable /// Caminho e nome do arquivo xml a ser gravado public void GravaXML(DataTable dt, string CaminhoXML) { if (dt != null) { DataSet ds = new DataSet(); ds.Tables.Add(dt); GravaXML(ds, CaminhoXML); } } \[/sourcecode\]

Nesse caso criei um função com um overload, ou seja, teremos dois metodos com mesmo nome mais que aceitaram parametros diferentes. Para ambos informaremos o caminho completo do arquivo que desejamos gravar e ou segundo será o objeto que desejamos converter. Para um será informado um DataSet e para o outro um DataTable.

Repare que o segundo metodo irá fazer uma chamada para o primeiro. Fiz isso para poupar o trabalho de reescrever o mesmo código.

_**Uma dica:** Junte todas essas funcionalidades que geralmente você sempre utiliza e crie uma classe. Assim seus projetos ficaram mais organizados e faceis de serem gerenciados._

Espero que essa dica seja útil.

Abraço e até a próxima.