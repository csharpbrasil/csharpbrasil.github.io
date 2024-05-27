---
title: 'Testando seu código JavaScript com Jasmine'
date: Mon, 13 Aug 2018 11:30:02 +0000
draft: false
tags: ['addMatchers', 'bdd', 'jasmine', 'JavaScript', 'JavaScript', 'karma', 'matcher', 'NodeJS', 'spec', 'suite', 'Teste Unitário', 'toBe', 'toContain', 'toEqual', 'toMatch', 'Unit Test']
---

O que é o Jasmine?
------------------

Nos dias atuais, no âmbito do desenvolvimento de software, muito fala-se em qualidade de desenvolvimento e de entrega. Com isso, novos conceitos vão surgindo, automações de processos são aplicados e novas ferramentas são necessárias para facilitar e agilizar essas entregas.

Para garantir que o que está sendo solicitado pelo nosso cliente está sendo realmente entregue com qualidade é importante que nossa aplicação seja testada. Mas imagina que antes de cada nova entrega nossa aplicação tenha que ser testada. Para uma aplicação pequena como um site institucional por exemplo é até fácil, agora imagine uma aplicação com diversos cadastros, como garantir que tudo está funcionando bem, com qualidade e o mais importante, que a aplicação não tenha quebrado com algum novo desenvolvimento ou até mesmo uma refatoração de código.

Para aplicações desenvolvidas utilizando JavaScript, é possível garantir que tudo que foi desenvolvido possa estar 100% funcionando utilizando o Jasmine.

![Jasmine](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem1-300x83.png)

Veja algumas das caracteristicas do Jasmine?

*   É um Framework utilizado para criar testes em JavaScript
*   Utiliza o conceito BDD, ou seja, testes guiados por comportamento
*   Possui sintaxe simples e de fácil leitura
*   Executa os testes no navegador ou por linha de comando
*   É independente de qualquer outro Framework
*   Pode ser usado em projetos NodeJs, Ruby ou Python

### Como utilizar em meu projeto?

Existem algumas formas de utilizar e a mais simples delas é usando a versão standalone do Jasmine

#### Versão Standalone

Para utilizar a versão standalone, basta fazer o seguinte:

*   Acesse o site do jasmine e efetue o download da última versão [aqui](https://jasmine.github.io/)
*   Descompactar no diretório raiz do nosso projeto

No seu projeto teremos uma estrutura semelhante à imagem abaixo contendo o arquivo principal SpecRunner.html que irá ter associado a ele o Jasmine e as specs.

![Estrutura do diretório da versão standalone do Jasmine](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem2.png)

Nessa mesma estrutura teremos a pasta src (source) contendo os arquivos fonte do nosso projeto e a pasta spec irá conter todos os arquivos javascript com códigos fonte de teste de nosso projeto.

![Arquivo Spec Runner](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem3.png)

Um arquivo de spec de javascript é de facil leitura e conterá sempre as seguintes partes:

*   **Suite:** representado pela função **_describe_** que por sua vez receberá dois parametros, sendo a descrição ou nome do teste e a função que conterá as specs ou outras partes importantes;
*   **Spec:** representado pela função it, também irá receber dois parametros, sendo a descrição ou nome da spec e a função que conterá os matchers;

![Estrutura do arquivo de spec contendo uma Suite, uma Spec e um Matcher](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem4.png)

Para que que o Jasmine possa lhe retornar o resultado em um report conforme a imagem abaixo, você deverá abrir o aquivo SpecRunner.html no seu navegador padrão.

![Relatório contendo o resultado de execução com sucesso do Jasmine](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem5.png)

![Relatório contendo o resultado de execução com falha do Jasmine](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem6.png)

Outra forma de executarmos os testes é usando o Karma. Esse por sua vez é um Test Runner que pode utilizar tanto o Jasmine quanto o Mocha ou QUnit.

Se você tiver algum projeto desenvolvido com Angular, provavelmente ele já estará configurado para utilizar o Karma com o Jasmine para testes dos javascript.

#### Executando usando o Karma

Antes de iniciar com o karma, será necessário instalar alguns pacotes.

*   Instalando os pacotes requeridos

```
npm i --save-dev jasmine jasmine-core karma karma-chrome-launcher karma-jasmine
```

*   Cria a estrutura do jasmine

```
.\node_modules\.bin\jasmine init
```

*   Cria a estrutura do karma

```
.\node_modules\.bin\karma init
```

*   Executar o karma

```
.\node_modules\.bin\karma start
```

### Um pouco sobre alguns Matchers

*   **toBe:** Compara o valor e o tipo do objeto

![toBe](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem7.png)

toBe

*   **toEqual:** Compara o valor do objeto

![toEqual](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem9.png)

toEqual

*   **toMatch:** Comparação utilizando expressão regular

![toMatch](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem8.png)

toMatch

*   **toContain:** Verifica se está contido no array

![toContain](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem10.png)

toContain

*   **not:** Pode ser utilizado em conjunto com outros matchers para inverter a comparação

![not](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem11.png)

not

#### Alguns outros matchers

*   toBeUndefined
*   toBeDefined
*   toBeNull
*   toBeNaN
*   toThrow
*   toThrowError

É possível criar seu próprio Matcher usando _jasmine.addMatchers_.

![jasmine.addMatchers](https://raphaelcardoso.com.br/wp-content/uploads/2018/08/Imagem12.png)

jasmine.addMatchers

Foi possível ver como é simples garantir a qualidade da entrega do nosso projeto utilizando a criação de teste de javascript usando o Jasmine.

Deixarei disponível o fonte utilizado como exemplo para esse artigo.

Fonte do projeto: [Github](https://github.com/ferronicardoso/testando-javascript-com-jasmine).

Abraço e bom estudo!