---
title: 'Enviando anexo em e-mail com ASP.NET'
date: Fri, 05 Sep 2008 00:59:39 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'C#', 'SMTP', 'Visual Studio', 'Visual Studio', 'WebForm', 'WinForm']
---

Olá pessoa, a pedido de um amigo que recentemente começou programar em ASP.NET com C-Sharp, vou fazer um passo a passo de como enviar e-mail com anexo.

Estou utilizando o Visual Studio 2005, mais quem não tiver poderá usar o Visual Web Developer Express 2005 ou 2008.  

1- Crie um novo projeto ASP.NET Web Site  

![](/contents/2008/09/emailcomanexo01-1.jpg)

2- Na página inicial que será criada automaticamente nesse novo projeto, adicione 4 Labels, 3 TextBox, 1 FileUpload e 1 Button.  

![](/contents/2008/09/emailcomanexo02-1.jpg)

3- De um duplo clique no botão e vamos implementar as opções de envio. Declare as seguintes Namespaces: System.Net.Mail, System.Net e System.IO

```csharp
using System.Net.Mail; 
using System.Net; 
using System.IO;
```

4- No método do botão vamos atribuir o código abaixo.

```csharp
protected void btnEnviar_Click(object sender, EventArgs e)
{
    // Estancia da Classe de Mensagem
    MailMessage _mailMessage = new MailMessage();
    // Remetente
    _mailMessage.From = new MailAddress("meuemail@meuservidor.com");
    // Destinatario
    _mailMessage.CC.Add(txtEmail.Text);
    // Assunto
    _mailMessage.Subject = "Email com Anexo";
    // A mensagem é do tipo HTML ou Texto Puro?
    _mailMessage.IsBodyHtml = true;
    // Corpo da Mensagem
    _mailMessage.Body = txtNome.Text + " " + txtMensagem.Text;

    // Recupera o binario enviado pelo FileUpload
    MemoryStream MS = new MemoryStream(fileAnexo.FileBytes);
    // Anexa o Stream do arquivo
    Attachment anexo = new Attachment(MS, fileAnexo.FileName);
    _mailMessage.Attachments.Add(anexo);

    // Estancia a Classe de Envio
    SmtpClient _smtpClient = new SmtpClient("smtp.meuservidor.com");
    // Credencial para envio por SMTP Seguro (Quando o servidor exige autenticação)
    _smtpClient.Credentials = new NetworkCredential("meuemail@meuservidor.com", "123minhasenha");
    // Envia a mensagem
    _smtpClient.Send(_mailMessage);
}
```

Pronto, se executarmos o nosso código iremos receber o e-mail com as informações e anexo informado.  

![](/contents/2008/09/emailcomanexo04-1.jpg)


Abraço a todos.