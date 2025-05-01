---
title: 'Cache distribuído local com LiteDB e IDistributedCache no .NET'
date: Thu, 01 May 2025 19:00:00 +0000
draft: false
tags: ['CSharp', 'C#', 'NET 9', 'NET 8', 'CSharpBrasil.Extensions.Caching.LiteDb', 'Caching', 'LiteDb', 'NoSql', 'IDistributedCache']
---

## Introdução

O `IDistributedCache` é uma interface poderosa da plataforma .NET que permite abstrair o uso de cache distribuído em aplicações web, APIs e serviços. As implementações mais comuns incluem Redis ou SQL Server, mas e quando queremos algo mais leve, local e com persistência?

Neste artigo, apresento a biblioteca **CSharpBrasil.Extensions.Caching.LiteDb**, uma solução desenvolvida para oferecer caching distribuído local com o banco LiteDB — um banco NoSQL leve e embutido em C#.

## Por que usar LiteDB como backend de cache?

- **Sem dependências externas:** ideal para aplicações em containers, APIs internas e soluções desktop.
- **Desempenho local otimizado:** armazena os dados em um único arquivo `.db`, com leitura simultânea e escrita isolada por coleção.
- **Controle completo:** opções de segurança, rebuild, collation e cache cleanup automático.

## Instalação

Instale via NuGet:

```bash
dotnet add package CSharpBrasil.Extensions.Caching.LiteDb
```

## Configuração da biblioteca

A biblioteca implementa `IDistributedCache` e pode ser injetada com facilidade em qualquer aplicação .NET via `IServiceCollection`:

```csharp
builder.Services.AddLiteDbDistributedCache(options =>
{
    options.DatabasePath = "cache.db";
    options.CollectionName = "cache";
    options.Password = "sua-senha-opcional";
    options.CleanupInterval = TimeSpan.FromMinutes(10);
    options.EnableAutoCleanup = true;
});
```

### Opções disponíveis

```csharp
public class LiteDbDistributedCacheOptions
{
    public string DatabasePath { get; set; } = "cache.db";
    public string CollectionName { get; set; } = "cache";
    public bool EnableAutoCleanup { get; set; } = true;
    public TimeSpan CleanupInterval { get; set; } = TimeSpan.FromMinutes(10);
    public bool ReadOnly { get; set; } = false;
    public string? Password { get; set; }
    public bool Upgrade { get; set; } = false;
    public bool AutoRebuild { get; set; } = false;
    public long InitialSize { get; set; } = 0;
    public Collation Collation { get; set; } = Collation.Default;
}
```

## Exemplo de uso em API

```csharp
[ApiController]
[Route("api/cache")]
public class CacheController : ControllerBase
{
    private readonly IDistributedCache _cache;

    public CacheController(IDistributedCache cache)
    {
        _cache = cache;
    }

    [HttpPost("{key}")]
    public async Task<IActionResult> Set(string key, [FromBody] string value)
    {
        await _cache.SetStringAsync(key, value, new DistributedCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
        });
        return Ok();
    }

    [HttpGet("{key}")]
    public async Task<IActionResult> Get(string key)
    {
        var value = await _cache.GetStringAsync(key);
        return Ok(value ?? "(not found)");
    }
}
```

## Exemplo de uso em Console App

```csharp
var host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddLiteDbDistributedCache(options =>
        {
            options.DatabasePath = "console-cache.db";
        });
    })
    .Build();

var cache = host.Services.GetRequiredService<IDistributedCache>();

await cache.SetStringAsync("message", "Olá mundo!", new DistributedCacheEntryOptions
{
    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(30)
});

var result = await cache.GetStringAsync("message");
Console.WriteLine($"Mensagem em cache: {result}");
```

## Considerações finais

Essa biblioteca foi pensada para aplicações reais que precisam de caching local performático, com segurança e controle total sobre a persistência dos dados. O LiteDB é uma excelente alternativa quando não se quer depender de um Redis ou infraestrutura externa.

Acesse o código no GitHub e instale o pacote no NuGet para começar a usar agora mesmo!

- **NuGet:** [CSharpBrasil.Extensions.Caching.LiteDb](https://www.nuget.org/packages/CSharpBrasil.Extensions.Caching.LiteDb)
- **GitHub:** https://github.com/csharpbrasil/CSharpBrasil.Extensions.Caching.LiteDb

Participe da nossa comunidade no [WhastApp](https://chat.whatsapp.com/CYW7HUiK70xAmPpFx9mVMR).

Bons estudos e mãos à obra!
