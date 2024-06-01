---
title: 'Criando aplicação Web com ASP.NET Core MVC - Parte 1'
date: Thu, 23 Aug 2018 16:50:28 +0000
draft: false
tags: ['.NET Core', 'aspnet-core', 'aspnet-core-mvc', 'C#', 'C#', 'claim', 'Criando Aplicação Web', 'Criando Aplicação Web com ASP.NET Core MVC', 'dotnetcore', 'Linux', 'Mac', 'MVC', 'Windows']
---

Introdução
----------

Como de costume, estou trazendo mais uma série de artigos e dessa vez falaremos sobre como criar aplicação web com ASP.NET Core MVC. Nesse artigo foi realizar o passo a passo para que você tenha conhecimento para explorar esse mais novo recurso. Sendo assim, esse série tem como principal foco o desenvolvimento de uma aplicação web utilizando-se da tecnologia mais comentada do momento e seguindo um dos padrões mais populares quando o assunto é desenvolvimento Web.

Esse artigo é para todos aqueles que tenha um conhecimento prévio de desenvolvimento web com HTML, CSS e JavaScript, além de também conhecimento em C# e banco de dados. Se você não tiver conhecimento em C#, aconselho ler meu artigo **[Aprender a programar em C#](https://raphaelcardoso.com.br/aprender-a-programar-em-csharp-parte-1)**.

Então vamos ao que interessa.

### Sobre o padrão MVC

A sigla **MVC** é o acrónimo de _Model-View-Controller_ (Modelo-Visão-Controlador), padrão de arquitetura de software que divide um determinado aplicativo de software em três partes interconectadas, de modo a separar as representações internas de informações das formas pelas quais as informações são apresentadas ou aceitas pelo usuário.

### Sobre o ASP.NET Core

O [ASP.NET Core](https://github.com/aspnet/Home) é um projeto enxuto para criação de aplicações web, open source, multiplataforma (disponível para Windows, Mac e Linux) e que está disponível no Github. Ele é uma evolução do ASP.NET, com uma arquitetura mais exuta e modular que pode ser executado desenvolvido e executado em sua plataforma favorita.

Para saber mais sobre o ASP.NET Core, leia a [Introdução ao ASP.NET Core](https://docs.microsoft.com/pt-br/aspnet/core/?view=aspnetcore-2.1).

#### Configurando o nosso ambiente

Para que possamos iniciar o desenvolvido, é necessário instalar algumas ferramentas dependendo do sistema operacional que esteja utilizando:

*   [SDK do .NET Core 2.2 ou posterior](https://www.microsoft.com/net/download/all)
*   [Visual Studio Code](https://code.visualstudio.com/), [Microsoft Visual Studio 2017](https://visualstudio.microsoft.com/pt-br/downloads/) ou [MonoDevelop](https://www.monodevelop.com/download/)
*   [C# para Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp)
*   [Microsoft SQL Server 2017 Express](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)
*   [SQL Server Management Studio](https://docs.microsoft.com/pt-br/sql/ssms/download-sql-server-management-studio-ssms) ou [SQL Operation Studio](https://docs.microsoft.com/pt-br/sql/sql-operations-studio/download?view=sql-server-2017)

Quanto o uso da IDE, poderá utilizar qualquer uma das citadas. Vale ressaltar que diferente do Visual Studio Code e do MonoDevelop, o Microsoft Visual Studio é exclusivo do Windows. Sendo assim, para Mac e Linux deverá fazer uso dos outros dois citados.

[](/contents/2018/08/0_mono_develop-1024x576.jpg)

Caso esteja utilizando o Mac, o SQL Server deverá ser executado em um Container no Docker, já para sistemas Linux, também poderá ser executado em um Container ou instalado diretamente caso sua versão seja suportada.

Para que possamos nos conectar ao SQL Server, utilizaremos o SQL Server Management Studio para Windows e o SQL Operation Studio para qualquer sistema operacional, seja ele Linux, Mac ou Windows.

Com nosso ambiente configurado, podemos iniciar a criação do projeto.

#### Informações sobre o projeto

Antes de iniciarmos o desenvolvimento do nosso projeto, é importante citar alguns pontos que iremos abordar inicialmente. O desafio será criar uma aplicação web completa.

O projeto será desenvolvido utilizando os seguintes recursos:

*   ASP.NET Core MVC
*   Bootstrap
*   Font Awesome
*   Entity Framework Core
*   SQL Server

Nessa primeira parte teremos as seguintes funcionalidades:

*   **Acesso protegido por senha:** Para que o usuário possa utilizar a aplicação, será necessário informar login e senha para ter acesso as funcionalidades da aplicação;

#### Iniciando o desenvolvimento

Abra o Visual Studio para criarmos a estrutura do projeto clicando em _File > New Project_, selecionando _ASP.NET Core Web Application_ e em seguinda escolhendo a opção _Web Application (Model-View-Controller)_.

![](/contents/2018/08/1_criar_solution_e_webapp.jpg)

![](/contents/2018/08/2_definir_tipo_aplicacao.png)

Dessa forma já teremos um projeto padrão em ASP.NET Core MVC funcionando.

![](/contents/2018/08/3_projeto_padrao-1024x553.png)

O próximo passo é criar mais 3 novos projetos do tipo Class Library.

![](/contents/2018/08/4_projeto_class_library.jpg)

Sendo assim, teremos:

*   Business: Camada onde teremos nossa regra de negócio;
*   Data: Camada responsável pela interface de conexão com o banco de dados;
*   Model: Camada que conterá todos as nossas entidade, Dtos, etc.

![](/contents/2018/08/4_projeto_class_library.jpg)

Para seguirmos com o nosso desenvolvimento, vamos analisar a estrutura do projeto Web Application.

![](/contents/2018/08/6_estrutura_projeto_web.jpg)

Analisando a estrutura temos:

*   **wwwroot**: diretório que contem arquivos estativos como imagens, javascripts, css, e outros;
*   **Areas**: diretório que permite organizar nossa aplicação de forma que facilite a manutenção. No nosso projeto por exemplo, teremos uma área especifica para o nosso painel de controle e ainda poderia ter uma área para acesso de cliente ou até com divisões relacionados a negócio.
*   **Controllers**: como o próprio nome diz, é o diretório que contem os controllers utilizados no projeto;
*   **Models**: diretório dos arquivos de models utilizados pelas Views e pelas Controllers;
*   **Views**: diretorio que irá conter outros subdiretorios. Esses subdiretorios estarão relacionados diretamente com os controllers, ou seja, teremos as views de cada controller alem de views, partial views e layout utilizados;
*   **Program.cs**: arquivo principal responsavel por inicializar a aplicação;
*   **Startup.cs**: possui configurações de nosso projeto, tais como, definição de rotas, ativação de recursos relacionados ao ASP.NET Core ou ao projeto

![](/contents/2018/08/7_estrutura_wwwroot.jpg)

Feito isso, vamos configurar os Layouts, Views e Controllers.

![](/contents/2018/08/8_estrutura_projeto.jpg)

Foi criado um layout para o login e um layout para o próprio painel. Separamos o SideBar, NavBar e Profile do layout para arquivos separados para facilitar o entendimento e manutenção.

Repare que temos os diretórios, _Home_ e _Secure_. No _Home_ temos o _Index_ do painel de controle e no _Secure_ temos a View de _Login_.

Em relação ao banco de dados, criaremos a tabela _Usuario_. Para essa primeira parte iremos somente autenticar no painel.

```sql
CREATE TABLE Usuario
(
	IdUsuario INT IDENTITY(1, 1) NOT NULL,
	Nome VARCHAR(100) NOT NULL,
	Email VARCHAR(150) NULL,
	Login VARCHAR(50) NOT NULL,
	Senha VARCHAR(50) NOT NULL,
	CONSTRAINT PK_Usuario PRIMARY KEY (IdUsuario)
)
GO
```

Vamos incluir também o usuário administrador

```sql
INSERT INTO Usuario (Nome, Login, Senha) VALUES ('Administrador', 'admin', '123456')
```

Para a camada de Dados, criamos o ApplicationContext e o repositório de usuários. O ApplicationContext é a classe que implementa o DbContext que é responsável por abrir conexão de nossa aplicação com o banco de dados. Já o repositório nos permitirá utilizar o ApplicationContext para interagir com nossas tabelas realizando operações de consulta, inclusão, exclusão e atualização. Inicialmente teremos somente o repositório de usuário para que possamos implementar a autenticação.

```csharp
using System;
using CriandoAplicacaoAspNetCore.Data.Mapping;
using CriandoAplicacaoAspNetCore.Model.Entities;
using Microsoft.EntityFrameworkCore;

namespace CriandoAplicacaoAspNetCore.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet Usuarios { get; set; }

        public ApplicationContext(DbContextOptions options)
        : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioConfig());
        }
    }
}
```csharp
using System;
using CriandoAplicacaoAspNetCore.Model.Entities;
using CriandoAplicacaoAspNetCore.Model.Interfaces;

namespace CriandoAplicacaoAspNetCore.Data.Repositories
{
    public class UsuarioRepository : GenericRepository, IUsuarioRepository
    {
        public UsuarioRepository(ApplicationContext context)
        : base(context)
        {
        }
    }
}
```

Repare que nosso repositório de usuário não possui nenhum metodo implementado. Ele herda do GenericRepository todas os métodos necessários.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CriandoAplicacaoAspNetCore.Model.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CriandoAplicacaoAspNetCore.Data.Repositories
{
    public abstract class GenericRepository : IGenericRepository where TEntity : class
    {
        private readonly ApplicationContext _context;
        private readonly DbSet _dbSet;

        public GenericRepository(ApplicationContext context)
        {
            this._context = context;
            this._dbSet = this._context.Set();
        }

        public virtual void Add(TEntity entity)
        {
            this._dbSet.Add(entity);
        }

        public virtual void AddRange(List list)
        {
            list.ForEach(this.Add);
        }

        public virtual TEntity GetById(int id)
        {
            return this._dbSet.Find(id);
        }

        public virtual IQueryable Get(Expression<Func<TEntity, bool>> expression = null, 
            Func<iqueryable, IOrderedQueryable> orderby = null, string includes = "", bool noTracking = false)
        {
            IQueryable query = this._dbSet;

            if (expression != null)
            {
                query = query.Where(expression);
            }

            foreach (var include in includes.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(include);
            }

            if (noTracking)
                query = query.AsNoTracking();

            if (orderby != null)
            {
                return orderby(query).AsQueryable();
            }
            else
            {
                return query;
            }
        }

        public virtual void Update(TEntity entity)
        {
            this._context.Entry(entity).State = EntityState.Modified;
        }

        public virtual void Delete(int id)
        {
            var entity = this._dbSet.Find(id);
            this._dbSet.Remove(entity);
        }

        public virtual void Delete(TEntity entity)
        {
            this._dbSet.Attach(entity);
            this._dbSet.Remove(entity);
        }

        public virtual void Delete(Expression<Func<TEntity, bool>> expression)
        {
            foreach (var entity in this._dbSet.Where(expression).AsEnumerable())
            {
                this._dbSet.Remove(entity);
            }
        }

        public virtual bool Any(int id)
        {
            return this._dbSet.Find(id) != null;
        }

        public virtual bool Any(Expression<func<tentity, bool>> expression)
        {
            return this._dbSet.Any(expression);
        }
    }
}
```

Na camada de negócio, criamos o código que irá autenticar o usuário.

```csharp
using System;
using System.Linq;
using System.Linq.Expressions;
using CriandoAplicacaoAspNetCore.Model.Dtos;
using CriandoAplicacaoAspNetCore.Model.Entities;
using CriandoAplicacaoAspNetCore.Model.Interfaces;

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
            Expression<Func<Usuario, bool>> expression = q => q.Login.ToLower().Equals(loginDto.Usuario) && 
                q.Senha.Equals(loginDto.Senha);
            var usuarioDto = this._unitOfWork.UsuarioRepository
                                             .Get(expression)
                                             .Select(s => new UsuarioDto
                                             {
                                                 IdUsuario = s.IdUsuario,
                                                 Nome = s.Nome,
                                                 Email = s.Email,
                                                 Login = s.Login
                                             })
                                             .FirstOrDefault();

            return usuarioDto;
        }
    }
}
```

Não me preocupei muito com a parte de segurança nesse momento. Então, nossa senha estará armazenada no banco de dados sem nenhuma criptografia.

Tendo agora nossa camada de dados e de negócio pronta, poderemos criar o controller que será o reponsável por interagir com a nossa view. Criamos então o controller do login em nosso Web Application.

```csharp
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CriandoAplicacaoAspNetCore.Model.Dtos;
using CriandoAplicacaoAspNetCore.Model.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CriandoAplicacaoAspNetCore.WebApp.Areas.Painel.Controllers
{
    [Area("Painel")]
    public class SecureController : Controller
    {
        private readonly IUsuarioBusiness _usuarioBusiness;

        public SecureController(IUsuarioBusiness usuarioBusiness)
        {
            this._usuarioBusiness = usuarioBusiness;
        }

        [AllowAnonymous]
        public IActionResult Login()
        {
            var model = new LoginDto();
            return View(model);
        }

        [AllowAnonymous]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task Login(LoginDto model)
        {
            if (ModelState.IsValid)
            {
                var usuario = this._usuarioBusiness.Autenticar(model);

                if (usuario != null)
                {
                    var claims = new List()
                    {
                    new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Name, usuario.Nome),
                    new Claim(ClaimTypes.GivenName, usuario.Login)
                    };

                    var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var principal = new ClaimsPrincipal(identity);
                    var authProperties = new AuthenticationProperties
                    {
                        AllowRefresh = true,
                        IsPersistent = true,
                        ExpiresUtc = DateTime.UtcNow.AddMinutes(2)
                    };

                    await HttpContext
                        .SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, 
                            principal, authProperties);

                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    model = new LoginDto();

                    TempData["ErroAutenticacao"] = "Usuário ou senha inválido";
                    return View(model);
                }
            }

            return View(model);
        }

        public async Task Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Secure");
        }
    }
}
```

Em nosso controller temos três actions, uma responsável por exibir o formulário de login, que apesar de estar omitido, ele é do tipo HttpGet, outra action responsável por processar os dados submetidos, ou seja, irá receber a operação de Post do formulário de login e outra para deslogar o usuário.

Para que possa entender melhor como é realizado a autenticação, o action de login, após receber os dados e autenticar, utilizamos os dados do usuário para gerar a lista de Claim para criação do cookies. Para saber mais, leia sobre como [Usar autenticação de cookie sem o ASP.NET Core Identity](https://docs.microsoft.com/pt-br/aspnet/core/security/authentication/cookie).

Quando o usuário realizar a autenticação, será redirecionado para a tela inicial do painel. Se eu executar nosso projeto, terei acesso ao painel pelo porta 5000 que é padrão do ASP.NET Core.

![](/contents/2018/08/9_tela_login-1024x553.png)

Espero que com esse artigo você tenha conseguido entender um pouco do ASP.NET Core MVC que na minha opinião, quem já tem um conhecimento prévio do ASP.NET MVC conseguirá seguir tranquilamente com o desenvolvimento.

Para os próximos artigos, iremos abordar a implementação de algumas telas. Caso tenha alguma dúvida ou sugestão, pode mandar para mim.

#### Referências

*   [Introdução ao ASP.NET Core MVC e ao Visual Studio](https://docs.microsoft.com/pt-br/aspnet/core/tutorials/first-mvc-app/start-mvc)
*   [Visão geral do ASP.NET Core MVC](https://docs.microsoft.com/pt-br/aspnet/core/mvc/overview)
*   [Download do SQL Server](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

#### Fonte do projeto

Fonte do projeto: [Github](https://github.com/csharpbrasil/CriandoAplicacaoAspNetCore).

Abraço e bom estudo!