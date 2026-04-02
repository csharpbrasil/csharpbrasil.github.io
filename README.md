# C# Brasil

## Configuração do ambiente de desenvolvimento



#### Instalando o Ruby

**Linux (Ubuntu/Debian):**

```shell
sudo apt-get install ruby-full
```

**Windows:**

```shell
winget install RubyInstallerTeam.Ruby.3.4
```

> Após a instalação no Windows, feche e reabra o terminal para que o `ruby` e o `gem` sejam reconhecidos no PATH.

Em seguida, instale o toolchain MSYS2/MINGW necessário para compilar gems com extensões nativas:

```shell
ridk install
```

Quando solicitado, selecione a opção **3** — _MSYS2 and MINGW development toolchain_.



#### Instalando o Bundler e Jekyll

```shell
sudo gem install bundler jekyll
```

#### Instalando as dependencias do projeto

```shell
bundler install
```

#### Executando o projeto

```shell
bundle exec jekyll serve
```



## Links de referência

- [Installing Ruby](https://www.ruby-lang.org/en/documentation/installation/)

- [Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/)


