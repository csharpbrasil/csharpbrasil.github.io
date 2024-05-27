---
title: 'Criando Web Api com ASP.NET Core - Parte 1'
date: Thu, 16 Feb 2017 10:00:49 +0000
draft: false
tags: ['.NET Core', '.NET Core', 'ASP.NET', 'ASP.NET MVC', 'ASP.NET Web API', 'C#', 'Criando Web Api', 'Criando Web Api ASP.NET Core', 'Desenvolvimento Web API', 'dotnetcore', 'Visual Studio', 'Web API']
---

Daremos inicio a série de artigos Criando Web Api com ASP.NET Core. Antes disso, o que você precisa saber sobre o ASP.NET Core:

*   Nova geração do ASP.NET
*   Desenvolvido pela Microsoft e pela Comunidade
*   Open-source
*   Cross-Plataform
*   Modular

Para saber mais, acesse o site da fundação [.NET Foundation](https://dotnetfoundation.org/)

Para iniciar o projeto é necessário ter instalado o **.NET Core e o Visual Studio 2017** ou mais recente. Caso não tenha instalado, leia o artigo [Instalando o .NET Core](https://raphaelcardoso.com.br/instalando-o-net-core) será necessário baixar e instalar para prosseguir.  

Abra o seu Visual Studio e crie um novo projeto. Clique no menu **File > New > Project** e escolha a opção **Visual C# > .NET Core > ASP.NET Core Web Application (.NET Core)** e defina um nome para o seu projeto. No meu caso será **AspNetCoreWebApi**:

![](https://raphaelcardoso.com.br/wp-content/uploads/2017/02/novo_projeto_webapplication_dotnetcore.png)

Na próxima janela, defina o template para o tipo **Empty**.

![](https://raphaelcardoso.com.br/wp-content/uploads/2017/02/template_novo_projeto.png)

O template escolhido já auxilia trazendo a nossa API funcionando, bastanto somente executar.

![](https://raphaelcardoso.com.br/wp-content/uploads/2017/02/resultado_api.png)

Dentro da nossa solution já temos um Controller criado.

![](https://raphaelcardoso.com.br/wp-content/uploads/2017/02/solutions.png)

Se abrir a classe ValueController criada, iá reparar que várias actions foram criados como exemplo:

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
```

Ao executar, nossa api irá responder pelos seguintes link:

```
**GET: http://\[servidor\]:\[porta\]/api/value**
```

![](https://raphaelcardoso.com.br/wp-content/uploads/2017/02/api_value_get-1024x553.png)

```
**POST: http://\[servidor\]:\[porta\]/api/value**
```

![](https://raphaelcardoso.com.br/wp-content/uploads/2017/02/api_value_post-1024x553.png)

Nesse artigo você pode ter uma breve introdução sobre o ASP.NET Core e como cria-lo de forma simples.

Fonte do projeto: [GitHub](https://github.com/csharpbrasil/AspNetCoreWebApi)

Abraço e até os próximos artigos!