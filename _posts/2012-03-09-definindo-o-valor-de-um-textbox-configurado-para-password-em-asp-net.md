---
title: 'Definindo o valor de um TextBox configurado para password em ASP.NET'
date: Fri, 09 Mar 2012 16:30:15 +0000
draft: false
tags: ['ASP.NET', 'ASP.NET', 'C#', 'Dicas', 'Dicas', 'password', 'textbox']
---

Quando a propriedade TextMode de um TextBox é definida como password a propriedade Text não será exibida em tempo de execução, esse comportamento é uma forma de manter a segurança impedindo que a mesma seja visualizada pelo HTML da pagina.

Porem em alguns casos é necessário exibir o valor com sua respectiva mascara no TextBox. Por exemplo, uma pagina que exibe o perfil do usuário, onde o usuário tem a capacidade de alterar sua senha faz sentido exibi-la no TextBox. Afinal o usuário já deverá estar autenticado para acessar a pagina do seu perfil (embora o valor será enviado para o navegador e poderia ser facilmente interceptado por algum sniffer).

Deixando a segurança de lado, uma forma de contornar isso em ASP.NET, é adicionar o valor do password para o atributo do controle.

Como o TextBox processa em sua saída um controle input de HTML é possível definir seu atributo "value", da mesma forma que você define sua propriedade Text.

\[sourcecode language='html'\] TextBoxPassword.Attributes.Add("value", "MyPassword"); \[/sourcecode\]

Claro a melhor maneira de fazer isso seria criar uma pagina separada para redefinição do password, onde o usuário deverá inserir a senha atual e depois a nova senha, assim evitando a exibição da senha na pagina.