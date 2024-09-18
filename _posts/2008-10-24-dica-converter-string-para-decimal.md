---
title: 'Dica - Converter String para Decimal'
date: Fri, 24 Oct 2008 22:56:18 +0000
draft: false
tags: ['C#', 'C#', 'Dicas', 'Dicas', 'Visual Studio', 'Visual Studio']
---

Olá caro leitor, em mais uma dica útil, principalmente para os iniciantes, vou ensinar como converter um valor do tipo String para Decimal. 

Existe várias formas de realizar essa conversão. Esse exemplo se aplica aos demais tipos como: Int, DateTime, Float, etc. 

Então veja que temos um valor do tipo String e queremos converte-lo para Decimal. 
Será atribuído o valor convertido a variável declarada **_preco2_** e a variável Booleana **_converteu_** retornará valor igual a True, ou seja, a conversão ocorreu com sucesso. 
```csharp 
string sPreco1 = "12,95"; decimal dPreco1; 
Boolean Convercao1 = decimal.TryParse(sPreco1, out dPreco1); 
``` 
Mais tem um porem, suponhamos que esse valor em string não só possua somente numero mais também algum outro caracter como por exemplo uma letra. Então nesse caso ao tentarmos converter será retornado a variável **_preco2_** o valor igual a 0 (zero) e a variável Booleana **_converteu_** retornará valor igual a False, ou seja, a conversão não ocorreu. Em que caso podemos aplica-lo? Suponha que você ira realizar um calculo matemática, então realizamos a tratativa antes de executa-lo. 
```csharp 
string sPreco1 = "12,95"; 
string sPreco2 = "6,76"; 
decimal dPreco1; 
decimal dPreco2;
Boolean Convercao1 = decimal.TryParse(sPreco1, out dPreco1);
Boolean Convercao2 = decimal.TryParse(sPreco2, out dPreco2); 
decimal result; 
if (Convercao1 && Convercao2) { 
    result = decimal.Add(dPreco1, dPreco2); 
} else { 
    result = 100; 
 } 
```
 Existe outras formar mais simples de realizar a conversão. Utilizando o Convert.ToDecimal() 
 ```csharp 
 string sPreco1 = "12,95"; 
 decimal result = Convert.ToDecimal(sPreco1); 
 ``` 
 Utilizando o decimal.Parse() 
 ```csharp 
 string sPreco1 = "12,95"; 
 decimal result = decimal.Parse(sPreco1); 
 ``` 
 Tá ai mais uma dica. 
 Para realizar a conversão em outros tipo, é só seguir o mesmo conceito. 
 Dúvidas? mande comentários. 

Abraço e sucesso!