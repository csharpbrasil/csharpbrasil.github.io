# C# Brasil

Conteúdo do blog [csharpbrasil.com.br](https://csharpbrasil.com.br). O visual vem do tema compartilhado [`ferronicardoso/blog-theme`](https://github.com/ferronicardoso/blog-theme) (Astro), baixado no build.

## Estrutura

| Caminho | Conteúdo |
|---|---|
| `posts/` | Artigos em Markdown: `YYYY-MM-DD-slug.md` (URL final: `/slug`) |
| `pages/` | Páginas fixas, como `sobre.md` |
| `public/` | Imagens, `contents/` (uploads antigos), `CNAME` — copiados como estão |
| `brand.json` | Nome, cores, logo, imagem principal, redes sociais, menu e analytics |

Para trocar o **logo** ou a **imagem principal**, coloque o arquivo em `public/images/` e aponte `logo`, `hero.image` ou `ogImage` em `brand.json`.

Front matter de um post: `title` e `date` são obrigatórios. Opcionais: `description` (SEO e cards), `summary` (resposta direta no topo), `tags`, `image`, `updated`, `draft`.

## Rodar localmente

Requer Node 24.

```shell
git clone https://github.com/ferronicardoso/blog-theme.git ../blog-theme
cd ../blog-theme && npm install
BLOG_DIR=../csharpbrasil.github.io npm run dev
```

## Publicação

O workflow `.github/workflows/deploy.yml` baixa o tema na versão fixada em `THEME_REF`, gera o site e publica no GitHub Pages a cada push na `main`. Em Settings → Pages, a fonte deve ser **GitHub Actions**.
