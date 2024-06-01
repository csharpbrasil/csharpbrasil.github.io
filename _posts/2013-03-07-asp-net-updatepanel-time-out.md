---
title: 'ASP.NET UpdatePanel Time Out'
date: Thu, 07 Mar 2013 16:52:00 +0000
draft: false
tags: ['Ajax Control Toolkit', 'ASP.NET', 'ASP.NET', 'Time out', 'UpadatePanel']
---

Em requisições assíncronas de um UpdatePanel que levam mais de 90 segundos pode ocorrer o seguinte erro: Microsoft JScript runtime error: Sys.WebForms.PageRequestManagerTimeoutException: The server request timed out. Isso ocorre porque 90 segundos é valor default para o timeout de uma requisição via UpdatePanel, se alguma de suas solicitações levam mais de 90 segundos para processamento você pode alterar o valor de timeout no ScriptManager configurando a propriedade AsyncPostBackTimeout="600" no ScriptManager, o tempo deve ser em segundos. No trecho de código acima definimos o timeout para 600 segundos (10 minutos). Também é possível definir programaticamente: ```csharp protected void Page_Load(object sender, EventArgs e) { . . . ScriptManager _scriptManager = ScriptManager.GetCurrent(this); _scriptMan.AsyncPostBackTimeout = 600; } ```