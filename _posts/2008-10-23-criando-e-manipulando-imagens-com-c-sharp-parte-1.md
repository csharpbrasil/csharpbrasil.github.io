---
title: 'Criando e Manipulando imagens com C-Sharp - Parte 1'
date: Thu, 23 Oct 2008 22:28:21 +0000
draft: false
tags: ['Bitmap', 'C#', 'C#', 'Image', 'MemoryStream', 'Visual Studio', 'Visual Studio']
---

Vou iniciar uma serie de pequenos artigos ensinando como manipular e até criar imagens com C#.

Nesse primeiro artigo, vou ensinar como pegar uma imagem qualquer e corta-la em formato de um circulo como o exemplo abaixo.

\[caption id="attachment\_238" align="aligncenter" width="300" caption="Exemplos das miniaturas geradas com a nossa classe que criaremos nesse exemplo"\][![Exemplos das miniaturas geradas com a nossa classe que criaremos nesse exemplo](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens001-1-300x186.jpg "criandomanipulandoimagens001")](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens001-1.jpg)\[/caption\]  

Independente do tipo de projeto, o resultado será o mesmo, mais para ficar mais interessante, vamos inicie um novo projeto webform.

![](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens002-1-300x195.jpg "criandomanipulandoimagens002")

Com o botão direito em cima do nosso _Project > Add New Item..._ iremos adicionar uma nova Classe chamada "ImageBuilder.cs"...

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens003-1-300x198.jpg "criandomanipulandoimagens003")](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens003-1.jpg)

...e inclua o código abaixo.

\[sourcecode language='csharp'\] public byte\[\] ImagemRedonda(string Path) { // Carrega a imagem System.Drawing.Image imagem = System.Drawing.Bitmap.FromFile(Path); // Estancia a Classe que será responsavel em converter a imagem em Array de Byte System.IO.MemoryStream ms = new System.IO.MemoryStream(); // Atribui a imagem no Memory Stream criado imagem.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg); // Retorna um Array Byte conteudo a imagem return ms.ToArray(); } \[/sourcecode\]

Agora iremos incluir uma imagem no nosso projeto para usarmos como exemplo. Crie um pasta chamada "Imagens" e com o botão direito em cima dela clique em _Add Existing Item..._ e escolha uma imagem do formato **_JPEG_** qualquer.

Crie um novo WebForm que será o responsável em exibir nossa imagem na página Default.aspx. Com o botão direito em cima do nosso _Project > Add New Item…_ iremos adicionar o WebForm chamada “Imagem.aspx”.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens004-1.jpg "criandomanipulandoimagens004")](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens004-1.jpg)

Atribuir o código abaixo que receberá a QueryString "Path", irá pegar o caminho físico e informa-lo para a nossa Classe "ImageBuilder" e essa exibirá a imagem.

\[sourcecode language='csharp'\] protected void Page\_Load(object sender, EventArgs e) { ImageBuilder img = new ImageBuilder(); string Path = Request.QueryString\["path"\]; string ServerPath = Server.MapPath(Path); Response.ContentType = "image/jpeg" Response.BinaryWrite(img.ImagemRedonda(ServerPath)); } \[/sourcecode\]

No Default.aspx iremos chamar o página Imagem.aspx e passando a QueryString path=|caminho\_da\_imagem| igual o código abaixo.

\[sourcecode language='xml'\] \[/sourcecode\]

Se você fez os passos corretos, ao executar a imagem será exibida em seu tamanho real.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens005-1.jpg "criandomanipulandoimagens005")](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens005-1.jpg)

Agora iremos ao que interessa. Na classe "ImageBuilder", adicione os códigos abaixo que irá cortar e dar o formato arredondado para a imagem.

Esse código irá deixar a imagem em formado arredondado.

\[sourcecode language='csharp'\] private System.Drawing.Image ArredondaImagem(System.Drawing.Image imgTemp, int Largura, int Altura) { System.Drawing.Image imagem = CortaImagem(imgTemp, Largura, Altura); System.Drawing.Graphics graphic = System.Drawing.Graphics.FromImage(imagem); System.Drawing.Rectangle retangulo = new System.Drawing.Rectangle(); System.Drawing.Pen PW = new System.Drawing.Pen(System.Drawing.Brushes.White, 2); for (int i = imagem.Height; i < (imagem.Height \* 2); i++) { retangulo.Height = i; retangulo.Width = i; retangulo.X = imagem.Width / 2 - retangulo.Width / 2; retangulo.Y = imagem.Height / 2 - retangulo.Height / 2; graphic.DrawEllipse(PW, retangulo); } return imagem; } \[/sourcecode\]

Esse código irá cortar a imagem

\[sourcecode language='csharp'\] private static System.Drawing.Image CortaImagem(System.Drawing.Image imgPhoto, int Width, int Height) { int sourceWidth = imgPhoto.Width; int sourceHeight = imgPhoto.Height; int sourceX = 0; int sourceY = 0; int destX = 0; int destY = 0; float nPercent = 0; float nPercentW = 0; float nPercentH = 0; nPercentW = ((float)Width / (float)sourceWidth); nPercentH = ((float)Height / (float)sourceHeight); if (nPercentH < nPercentW) { nPercent = nPercentW; destY = (int)((Height - (sourceHeight \* nPercent)) / 2); } else { nPercent = nPercentH; destX = (int)((Width - (sourceWidth \* nPercent)) / 2); } int destWidth = (int)(sourceWidth \* nPercent); int destHeight = (int)(sourceHeight \* nPercent); System.Drawing.Bitmap bmPhoto = new System.Drawing.Bitmap(Width, Height, System.Drawing.Imaging.PixelFormat.Format24bppRgb); bmPhoto.SetResolution(imgPhoto.HorizontalResolution, imgPhoto.VerticalResolution); System.Drawing.Graphics grPhoto = System.Drawing.Graphics.FromImage(bmPhoto); grPhoto.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic; grPhoto.DrawImage(imgPhoto, new System.Drawing.Rectangle(destX, destY, destWidth, destHeight), new System.Drawing.Rectangle(sourceX, sourceY, sourceWidth, sourceHeight), System.Drawing.GraphicsUnit.Pixel);

grPhoto.Dispose(); return bmPhoto; } \[/sourcecode\]

E agora alteraremos o metodo "ImagemRedonda" atribuindo a linha que Corta a imagem conforme o código abaixo: \[sourcecode language='csharp'\] public byte\[\] ImagemRedonda(string Path) { // Carrega a imagem System.Drawing.Image imagem = System.Drawing.Bitmap.FromFile(Path); // Corta Imagem nas medidas informadas imagem = ArredondaImagem(imagem, 150, 150); // Estancia a Classe que será responsavel em converter a imagem em Array de Byte System.IO.MemoryStream ms = new System.IO.MemoryStream(); // Atribui a imagem no Memory Stream criado imagem.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg); // Retorna um Array Byte conteudo a imagem return ms.ToArray(); } \[/sourcecode\]

E aqui esta nosso resultado.

[![](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens006-1.jpg "criandomanipulandoimagens006")](https://raphaelcardoso.com.br/wp-content/uploads/2008/10/criandomanipulandoimagens006-1.jpg)

Espero que esse exemplo seja útil e aguarde que em breve postarei mais novos artigos nessa mesma linha, criando e manipulando imagens

  

Abraço e sucesso!!!