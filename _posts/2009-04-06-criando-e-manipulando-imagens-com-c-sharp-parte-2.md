---
title: 'Criando e manipulando imagens com C-Sharp - Parte 2'
date: Mon, 06 Apr 2009 13:23:37 +0000
draft: false
tags: ['.NET', 'Bitmap', 'C#', 'C#', 'Exif', 'Image', 'MemoryStream', 'Visual Studio', 'Visual Studio']
---

Seguindo a serie de artigos de criação e manipulação de imagens (veja o arquivo [anterior](https://raphaelcardoso.com.br/criando-e-manipulando-imagens-com-c-sharp-parte-1/)), nesse artigo irei ensinar como remover as Meta Tags existentes em uma imagem do tipo JPG. Essas Meta Tags são chamadas de \[W:Exif\] (Exchangeable image file format) e nelas existem diversas informações sobre a imagens.

Normalmente encontramos essas Meta Tags nas fotos que são tiradas por câmeras fotográficas digitais. Eis algumas das informações encontradas.

*   Marca do Equipamento
*   Software de Criação
*   Velocidade do obturador
*   Modo do Flash
*   Comprimento focal
*   Abertura do diafragma
*   Tempo de exposição
*   Data em que a foto foi tirada
*   etc...

![criandomanipulandoimagens_parte2_01](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/criandomanipulandoimagens_parte2_01-1.jpg "criandomanipulandoimagens_parte2_01")

A principio utilizei essa técnica para editar uma foto sem a necessidade de utilizar o meu editor de imagens (\[W:Photoshop\]). Agora vamos ao que interessa.

\[sourcecode language='csharp'\] private void RemoveExifProperties(string imagePath) { // Imagem original System.Drawing.Bitmap OriginalBitmap = new System.Drawing.Bitmap(imagePath); // Carrega a lista de propriedades da imagem System.Drawing.Imaging.PropertyItem\[\] aPropertyItem = OriginalBitmap.PropertyItems; foreach (System.Drawing.Imaging.PropertyItem property in aPropertyItem) { // Pega a propriedade atual da imagem System.Drawing.Imaging.PropertyItem p = property; // Atribui novo valor a propriedade p.Value = new byte\[0\]; // Seta a nova propriedade OriginalBitmap.SetPropertyItem(p); } // Salva a imagem em memoria System.IO.MemoryStream mStream = new System.IO.MemoryStream(); OriginalBitmap.Save(mStream, OriginalBitmap.RawFormat); OriginalBitmap.Dispose(); // Salva a imagem da memoria em arquivo System.Drawing.Bitmap CopyBitmap = new System.Drawing.Bitmap(mStream); CopyBitmap.Save(imagePath); CopyBitmap.Dispose(); mStream.Dispose(); } \[/sourcecode\]

No Código acima eu informo para o meu método o caminho físico da minha imagem que desejo remover as informações. Eu atribuo o array de propriedades da imagem a um variável do tipo System.Drawing.Imaging.PropertyItem\[\] e em seguida faço um foreach (laço de repetição) para pegar uma propriedade da imagem por vez e atribuir valor do tipo byte\[0\]. Faço isso porque o valor dá propriedade é do tipo array de byte(byte\[\]).

Feito isso, crio uma variável do tipo MemoryStream e salvo a imagem nela. Esse processo atribui a imagem em memória para que eu possa salva-la.

Ai vem a pergunta, porque não salvar diretamente em disco? Não poderia porque a imagem esta aberta e ocorreria um Exception ao tentar sobrescrever.

A solução é jogar a imagem modificada em memória para depois salva-la. Após realizar todo esse processo, daremos chamaremos o método Dispose para as variáveis do tipo Bitmap e MemoryStream para evitar descarregar as informações da memória.

Agora basta utilizar o método no projeto que precisar e passar somente o caminho físico da imagem para modificá-la.

\[sourcecode language='csharp'\] private void btnProcessar\_Click(object sender, EventArgs e) { string filePath = @"D:Minhas imagensS7301443.JPG"; RemoveExifProperties(filePath); } \[/sourcecode\]

E aqui temos o resultado.

![criandomanipulandoimagens_parte2_02](https://raphaelcardoso.com.br/wp-content/uploads/2009/04/criandomanipulandoimagens_parte2_02-1.jpg "criandomanipulandoimagens_parte2_02")

Algumas informações aparentemente não são removidas e sim atribuídas com seus valores padrões.

Espero que tenha entendido. Caso tenha alguma dúvida deixe seu comentário.

Abraço e sucesso!!!