---
title: 'Criando aplicação Web com ASP.NET Core MVC – Parte 2'
date: Thu, 30 May 2019 11:00:19 +0000
draft: false
tags: ['.NET Core', 'aspnet-core', 'aspnet-core-mvc', 'C#', 'C#', 'Criando Aplicação Web', 'Criando Aplicação Web com ASP.NET Core MVC', 'dotnetcore', 'Linux', 'Mac', 'Windows']
---

Resumo
------

Na primeira parte dessa série de artigos, iniciamos explicando o significado da sigla MVC e sobre o ASP.NET Core para depois abordamos sobre as caracteristicas do nosso projeto e dar início ao desenvolvimento.

Você vai ver ainda ao logo dessa série assuntos variados para que possamos enriquecer nosso projeto com funcionalidades bem úteis. Ainda poderemos fazer uma breve abordagem sobre segurança e testes unitários.

Então, vamos ao que interessa.

### Continuando o desenvolvimento

Para dar continuidade ao projeto, será necessario que você faça o download do fonte que está disponibilizado no [Github](https://github.com/csharpbrasil/CriandoAplicacaoAspNetCore).

#### Consulta de usuários

Após autenticar no painel adminitrativo, a primeira visão que o usuário terá é do menu superior com algumas funcionalidades do painel e dentre elas, vamos disponibilizar uma área que permita-nos gerenciar os usuários cadastrados.

Normalmente em um sistema usamos permissão para essas ações, mas a principio, qualquer usuário que tiver acesso ao painel, poderá editar e utilizar todas as funcionalidades existentes.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/1_painel_administrativo-1024x553.png)

Dando sequencia em nosso projeto, vamos criar a tela onde iremos consultar os usuários cadastrados. Para isso, incluiremos um novo controle na area do painel.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/novo_controller.png)

Definaremos o nome como UsuarioController.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/novo_controller_usuario.png)

E incluiremos a consulta para listar todos os usuários cadastrados.

{% highlight csharp %}
using CriandoAplicacaoAspNetCore.Model.Dtos;
using CriandoAplicacaoAspNetCore.Model.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CriandoAplicacaoAspNetCore.WebApp.Areas.Painel.Controllers
{
    [Area("Painel")]
    [Authorize]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioBusiness _usuarioBusiness;

        public UsuarioController(IUsuarioBusiness usuarioBusiness)
        {
            this._usuarioBusiness = usuarioBusiness;
        }

        public IActionResult Consultar()
        {
            var usuarios = _usuarioBusiness.Filtrar();

            return View(usuarios);
        }
    }
}
{% endhighlight %}

Criaremos também a view referente a tela de consulta de usuários.

{% highlight csharp %}
@model IEnumerable<CriandoAplicacaoAspNetCore.Model.Dtos.UsuarioDto>
@{
    ViewData["Title"] = "Usuários";
}

<div class="row">
    <div class="col">
        <h2 class="display-4">Consultar Usuários</h2>
    </div>
</div>

<div class="row mt-4 mb-4">
    <div class="col">
        <a class="btn btn-primary" asp-area="Painel" asp-controller="Usuario" asp-action="Novo"><i class="fas fa-plus-circle"></i> Novo</a>
    </div>
</div>

<div class="row">
    <div class="col">
        <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Login</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                @foreach (var item in Model)
                {
                    <tr>
                        <th scope="row">
                            <a class="btn btn-info btn-sm" asp-area="Painel" asp-controller="Usuario" asp-action="Editar" asp-route-id="@item.IdUsuario"><i class="fas fa-pen-alt"></i></a>
                            <a class="btn btn-danger btn-sm" asp-area="Painel" asp-controller="Usuario" asp-action="Excluir" asp-route-id="@item.IdUsuario"><i class="fas fa-trash-alt"></i></a>
                        </th>
                        <td>@item.Nome</td>
                        <td>@item.Login</td>
                        <td>@item.Email</td>
                    </tr>
                }
            </tbody>
        </table>
    </div>
</div>
{% endhighlight %}

Ao executar nosso projeto, teremos agora a lista de todos os usuários cadastrados.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/consulta_usuarios-1024x553.png)

#### Melhorando a segurança

Se reparar, a nossa senha esta armazenada de forma que qualquer um que tenha acesso ao nosso banco de dados poderá visualiza-la.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/senha_banco.png)

Para melhorar a segurança, não vamos mais armazenar nossa senha, mas sim o hash.

Criaremos um novo projeto contendo nosso **_SecurityManager.cs_** que será responsável por criar e validar nosso hash.

{% highlight csharp %}
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Security.Cryptography;
using System.Text;

namespace CriandoAplicacaoAspNetCore.Utils
{
    public class SecurityManager
    {
        private const int ITERATION_COUNT = 10000;

        public static string CreateSalt()
        {
            using (var generator = RandomNumberGenerator.Create())
            {
                byte[] randomBytes = new byte[128 / 8];
                generator.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }

        public static string CreateHash(string value, string salt)
        {
            var valueBytes = KeyDerivation.Pbkdf2(password: value, salt: Encoding.UTF8.GetBytes(salt),
                                                  prf: KeyDerivationPrf.HMACSHA512, iterationCount: ITERATION_COUNT,
                                                  numBytesRequested: 256 / 8);
            return Convert.ToBase64String(valueBytes);
        }

        public static bool Validate(string value, string salt, string hash)
            => CreateHash(value, salt) == hash;
    }
} 
{% endhighlight %}

E agora vamos alterar a autenticação do usuário para que ele passe a fazer uso da validação pelo hash.

Primeiro, vamos remover a coluna de **_Senha_** e criar as Colunas para o _**Hash**_ e outra para p **_Salt_**.

{% highlight sql %}
ALTER TABLE Usuario DROP COLUMN Senha
ALTER TABLE usuario ADD Hash VARCHAR(256)
ALTER TABLE usuario ADD Salt VARCHAR(256)
{% endhighlight %}

E atualizaremos a senha do usuário _**Admin**_ para a senha padrão _**123456**_, porém, será armazenado somente o Hash e o Salt. Não teremos mais a senha gravada.

{% highlight sql %}
UPDATE Usuario SET Hash = 'NLAZBttBU8HbUrODUPQxViEDr1d7RMi4B/2F6yaKOrQ=', Salt = 'Nkt8krN4/TBHUJXu4zEm6A==' 
WHERE Login = 'admin'
{% endhighlight %}

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/hash_salt_banco.png)

Atualizaremos a entidade Usuario e a configuração do Entity Framework.

{% highlight csharp %}
using System;
namespace CriandoAplicacaoAspNetCore.Model.Entities
{
	public class Usuario
	{
		public virtual int IdUsuario { get; set; }
		public virtual string Nome { get; set; }
		public virtual string Email { get; set; }
		public virtual string Login { get; set; }
		public virtual string Hash { get; set; }
		public virtual string Salt { get; set; }
	}
} 
{% endhighlight %}

{% highlight csharp %}
using System;
using CriandoAplicacaoAspNetCore.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CriandoAplicacaoAspNetCore.Data.Mapping
{
	public class UsuarioConfig : IEntityTypeConfiguration<Usuario>
	{
		public void Configure(EntityTypeBuilder<Usuario> builder)
		{
			builder.ToTable("Usuario");
			builder.HasKey(t => t.IdUsuario);
			builder.Property(t => t.IdUsuario);
			builder.Property(t => t.Nome);
			builder.Property(t => t.Email);
			builder.Property(t => t.Login);
			builder.Property(t => t.Hash);
			builder.Property(t => t.Salt);
		}
	}
}
{% endhighlight %}

Agora vamos alterar a autenticação do usuário para que seja validado atraves do hash.

{% highlight csharp %}
using CriandoAplicacaoAspNetCore.Model.Dtos;
using CriandoAplicacaoAspNetCore.Model.Interfaces;
using CriandoAplicacaoAspNetCore.Utils;
using System.Collections.Generic;
using System.Linq;

namespace CriandoAplicacaoAspNetCore.Business
{
    public class UsuarioBusiness : IUsuarioBusiness
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsuarioBusiness(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        public virtual UsuarioDto Autenticar(LoginDto loginDto)
        {
            var usuario = this._unitOfWork
                .UsuarioRepository
                .Get(q => q.Login.ToLower().Equals(loginDto.Usuario))
                .FirstOrDefault();

            if (!SecurityManager.Validate(loginDto.Senha, usuario.Salt, usuario.Hash))
                return null;

            return new UsuarioDto
            {
                IdUsuario = usuario.IdUsuario,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Login = usuario.Login
            };
        }

        public IEnumerable<UsuarioDto> Filtrar()
        {
            var query = this._unitOfWork
                .UsuarioRepository
                .Get(null, o => o.OrderBy(u => u.Nome))
                .Select(s => new UsuarioDto
                {
                    IdUsuario = s.IdUsuario,
                    Nome = s.Nome,
                    Email = s.Email,
                    Login = s.Login
                });
            return query.ToList();
        }
    }
}
{% endhighlight %}

Feito isso, o usuário passará a se autenticar informando a senha, porém para validar será necessário buscar o usuário no banco de dados, pegar a senha informada juntamente com o Hash e o Salt para validar.

Dessa forma garantimos que mesmo que um usuário mal intensionado tenha acesso ao banco de dados e consiga roubar o hash e o salt, não teria como ter acesso ao sistema por não ter a senha do usuário e para descobrir a senha.

Em caso de o usuário esquecer a senha, será necessário resetar a senha, gerando uma nova aleatória para que ele possa alterar em outro momeno. No caso de ele necessitar alterar a senha, será necessário que ele informe a senha atual e informa nova senha. Mas essa será uma implementação futura.

#### Inclusão, edição e exclusão de usuários

Agora para completar a funcionalidade de cadastro de usuários, será necessário criar o formulário para inclusão e edição de usuários, além da opção para exclusão.

Seguindo os passos anteriores, vamos criar uma nova View.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/nova_view_salvar.png)

Teremos uma view para listar a Consulta de Usuários e uma View para Salvar. Essa view de Salvar, será usado tanto para Novo quanto para edição. O detalhe é que para Novo, teremos o campo senha sendo exibido, já na edição, não iremos editar a senha.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/1_novo_usuario-1024x553.png)

Tela de cadastro de usuário

Não me preocupei muito com valiação dos campos. A principio iremos nos preocupar em criar as funcionalidades.

Teremos também a tela de edição de usuário.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/1_editar_usuario-1024x553.png)

Em ambas as funcionalidades, iremos utilizar o [Bootbox](http://bootboxjs.com/), biblioteca que facilitar a criação de modal utilizando o [Bootstrap](https://getbootstrap.com/).

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/1_editar_usuario_mensagem_sucesso-1024x553.png)

Para a exclusão, iremos fazer uso do bootbox para informar ao usuário sobre a ação que ele esta executando e permitir que ele escolha continuar ou não.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/1_excluir_usuario-1024x553.png)

E o usuário é alertado sobre a execução que acabou de ser realizada, dando a opção para ele clicar no botão _OK_ e regarregar a página de consulta de usuários.

![](https://raphaelcardoso.com.br/wp-content/uploads/2019/05/1_usuario_excluido_sucesso-1024x553.png)

Com isso temos a nossa funcionalidade de cadastro de usuários praticamente pronto. É claro que poderiamos colocar validações dos campos, opção para checar se o login já esta cadastrado e até dar opção para que o usuário possa alterar a senha. Mas deixaremos essas funcionalidades para uma outra ocasião.

Para os próximos artigos, iremos abordar a implementação de algumas outras funcionalidades ou até quem sabe melhorias das atuais.

Caso tenha alguma dúvida ou sugestão, pode mandar para mim.

#### Referências

*   [Layout no ASP.NET Core](https://docs.microsoft.com/pt-br/aspnet/core/mvc/views/layout)
*   [Auxiliares de marcação internos do ASP.NET Core](https://docs.microsoft.com/pt-br/aspnet/core/mvc/views/tag-helpers/built-in)
*   [Referência da sintaxe Razor para ASP.NET Core](https://docs.microsoft.com/pt-br/aspnet/core/mvc/views/razor)
*   [Hash de senhas no ASP.NET Core](https://docs.microsoft.com/pt-br/aspnet/core/security/data-protection/consumer-apis/password-hashing)
*   [Bootbox.js](http://bootboxjs.com/)

#### Fonte do projeto

Fonte do projeto: [Github](https://github.com/csharpbrasil/CriandoAplicacaoAspNetCore).

Abraço e bom estudo!