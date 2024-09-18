---
title: 'Dica - Converter String para Decimal'
date: Fri, 24 Oct 2008 22:56:18 +0000
draft: false
tags: ['C#', 'C#', 'Dicas', 'Dicas', 'Visual Studio', 'Visual Studio']
---

Olá, caro leitor! Hoje trago uma dica útil, especialmente para os iniciantes na programação em C#. Vamos aprender como converter um valor do tipo `String` para `Decimal`. Essa conversão é uma tarefa comum e pode ser realizada de várias maneiras. O exemplo que veremos aqui pode ser aplicado a outros tipos de dados, como `Int`, `DateTime`, `Float`, entre outros.

## Exemplo de Conversão

Suponha que temos um valor em formato de string e desejamos convertê-lo para decimal. Vamos atribuir o valor convertido a uma variável chamada `dPreco1` e utilizar uma variável booleana chamada `converteu` para verificar se a conversão foi bem-sucedida.

csharp

```csharp
string sPreco1 = "12,95"; // Valor em formato de string

decimal dPreco1; // Variável para armazenar o valor convertido

bool converteu = decimal.TryParse(sPreco1, out dPreco1); // Tentativa de conversão
```

Se a conversão ocorrer com sucesso, a variável `converteu` retornará `true`, e `dPreco1` conterá o valor decimal correspondente. Caso contrário, `dPreco1` será igual a 0, e `converteu` será `false`.

## Tratando Erros na Conversão

É importante considerar que, se a string contiver caracteres não numéricos, a conversão falhará. Por exemplo, se tentarmos converter uma string que contém letras, o resultado será 0 e a variável booleana indicará que a conversão não foi bem-sucedida.

csharp

```csharp
string sPreco2 = "12,95abc"; // Valor inválido

decimal dPreco2;

bool converteu2 = decimal.TryParse(sPreco2, out dPreco2); // Tentativa de conversão
```

Neste caso, `converteu2` será `false`, e `dPreco2` será 0.

## Aplicando a Conversão em Cálculos

A conversão é especialmente útil quando precisamos realizar cálculos matemáticos. Antes de executar qualquer operação, podemos verificar se a conversão foi bem-sucedida:

csharp

```csharp
string sPreco1 = "12,95";

string sPreco2 = "6,76";

decimal dPreco1;

decimal dPreco2;

bool converteu1 = decimal.TryParse(sPreco1, out dPreco1);

bool converteu2 = decimal.TryParse(sPreco2, out dPreco2);

decimal resultado;

if (converteu1 && converteu2)

{

    resultado = decimal.Add(dPreco1, dPreco2); // Realiza a soma

}

else

{

    resultado = 100; // Valor padrão em caso de erro

}
```

## Outras Formas de Conversão

Além do método `TryParse`, existem outras maneiras de realizar a conversão:

1. **Usando `Convert.ToDecimal()`**:
   
   csharp
   
   ```csharp
   string sPreco1 = "12,95";
   
   decimal resultado = Convert.ToDecimal(sPreco1);
   ```

2. **Usando `decimal.Parse()`**:
   
   csharp
   
   ```csharp
   string sPreco1 = "12,95";
   
   decimal resultado = decimal.Parse(sPreco1);
   ```

Essas abordagens são diretas, mas é importante lembrar que elas podem lançar exceções se a string não for um formato válido.

## Conclusão

Espero que esta dica tenha sido útil para você! A conversão de strings para decimais é uma habilidade essencial em programação, especialmente quando lidamos com dados financeiros. Se você tiver dúvidas ou sugestões, fique à vontade para deixar um comentário.

Abraço e sucesso em sua jornada de aprendizado em C#!
