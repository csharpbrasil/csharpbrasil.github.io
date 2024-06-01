---
title: 'Algoritmos de Ordenação em C#'
date: Mon, 28 Jul 2014 12:00:49 +0000
draft: false
tags: ['Algoritmos de Ordenação', 'Bubble sort', 'C#', 'Cocktail sort', 'Código Fonte', 'Comb sort', 'Gnome sort', 'HeapSort', 'Insertion Sort', 'Odd-even sort', 'Ordenação por Inserção', 'Ordenação por seleção', 'Ordenação por troca', 'Quicksort', 'Selection Sort', 'Shell Sort']
---

Quando iniciamos o estudo em programação, um dos primeiros assuntos que se aprende é sobre algoritmo. O algoritmo é um processo de resolução de uma determinada tarefa para a qual ele foi designado. Podemos citar como um exemplo e que é assunto desse artigo o algoritmos de ordenação, que alem de ser o mais comum são também os mais solicitados em atividades acadêmicas quando essa possui como disciplina a programação.

Em programação, um algoritmo de ordenação tem com objetivo realizar a ordenação de uma lista de valores. Citaremos os seguintes métodos:

1.  Ordenação por inserção
    *   Insertion Sort
    *   Shell Sort
2.  Ordenação por seleção
    *   Selection Sort
    *   HeapSort
3.  Ordenação por troca
    *   Bubble sort
    *   Cocktail sort
    *   Comb sort
    *   Gnome sort
    *   Odd-even sort
    *   Quicksort

### Insertion Sort

O Insertion Sort ou Ordenação por inserção é um método simples de ordenação que percorre um vetor ordenando os elementos a esquerda a medida que avança. Vamos ao exemplo em C#.

```csharp 
public static int[] insertionSort(int[] vetor)
{
    int i, j, atual;
    for (i = 1; i < vetor.Length; i++)
    {
        atual = vetor[i];
        j = i;
        while ((j > 0) && (vetor[j - 1] > atual))
        {
            vetor[j] = vetor[j - 1];
            j = j - 1;
        }
        vetor[j] = atual;
    }
    return vetor;
}
```

Resultado da execução do Insertion Sort.

![Resultado da ordenação usando o Insertion Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/insertionSort.png)

### Shell Sort

É um método de ordenação por inserção criado por Donald Shell que basicamente divide a lista a ser ordenada em grupos menores e aplica o método de ordenação por inserção.

```csharp 
public static int[] shellSort(int[] vetor)
{
	int h = 1;
	int n = vetor.Length;
	
	while (h < n)
	{
		h = h * 3 + 1;
	}

	h = h / 3;
	int c, j;
	while (h > 0)
	{
		for (int i = h; i < n; i++)
		{
			c = vetor[i];
			j = i;
			while (j >= h && vetor[j - h] > c)
			{
				vetor[j] = vetor[j - h];
				j = j - h;
			}
			vetor[j] = c;
		}
		h = h / 2;
	}
}   
```

Resultado da execução do Shell Sort.

![Resultado da ordenação usando o Shell Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/shellSort.png)

### Selection Sort

O Selection Sort é um método de ordenação por seleção. Ele percorre a lista em busca do menor valor e o move para a posição correta precedido sempre do elemento de menor valor.

```csharp 
public static int[] selectionSort(int[] vetor)
{
	int min, aux;

	for (int i = 0; i < vetor.Length - 1; i++)
	{
		min = i;

		for (int j = i + 1; j < vetor.Length; j++)
			if (vetor[j] < vetor[min])
				min = j;

		if (min != i)
		{
			aux = vetor[min];
			vetor[min] = vetor[i];
			vetor[i] = aux;
		}
	}

	return vetor;
}
```

Resultado da execução do Selection Sort.

![Resultado da ordenação usando o Selection Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/selectionSort.png)

### Heap Sort

Desenvolvido em 1964 por Robert W. Floyd e J.W.J. Williams, o algoritmo Heap Sort é um método de ordenação por seleção. Esse algoritmo tem esse nome por utiliza uma estrutura de dados chamada [heap](http://pt.wikipedia.org/wiki/Heap).

```csharp 
public static int[] heapSort(int[] vetor)
{
	buildMaxHeap(vetor);
	int n = vetor.Length;

	for (int i = vetor.Length - 1; i > 0; i--)
	{
		swap(vetor, i, 0);
		maxHeapify(vetor, 0, --n);
	}

	return vetor;
}

private static void buildMaxHeap(int[] v)
{
	for (int i = v.Length / 2 - 1; i >= 0; i--)
	{
		maxHeapify(v, i, v.Length);
	}
}

private static void maxHeapify(int[] v, int pos, int n)
{
	int max = 2 * pos + 1, right = max + 1;
	if (max < n)
	{
		if (right < n && v[max] < v[right])
		{
			max = right;
		}
		if (v[max] > v[pos])
		{
			swap(v, max, pos);
			maxHeapify(v, max, n);
		}
	}
}

private static void swap(int[] v, int j, int aposJ)
{
	int aux = v[j];
	v[j] = v[aposJ];
	v[aposJ] = aux;
}
```

Resultado da execução do Heap Sort.

![Resultado da ordenação usando o Heap Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/heapSort.png)

### Bubble Sort

O Bubble Sort é um algoritmo de ordenação mais simples que tem como característica percorrer a vista várias vezes e a cada passagem fazendo flutuar para o topo o maior elemento da sequência.

```csharp 
public static int[] bubbleSort(int[] vetor)
{
	int tamanho = vetor.Length;
	int comparacoes = 0;
	int trocas = 0;

	for (int i = tamanho - 1; i >= 1; i--)
	{
		for (int j = 0; j < i; j++)
		{
			comparacoes++;
			if (vetor[j] > vetor[j + 1])
			{
				int aux = vetor[j];
				vetor[j] = vetor[j + 1];
				vetor[j + 1] = aux;
				trocas++;
			}
		}
	}

	return vetor;
}
```

Resultado da execução do Bubble Sort.

![Resultado da ordenação usando o Bubble Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/bubbleSort.png)

### Cocktail Sort

O Cocktail Sort ou Bubble Sort Bidirecional é uma variação do Bubble Sort que se difere pelo fato de ordenar a lista em ambas as direções.

```csharp 
public static int[] cocktailSort(int[] vetor)
{
	int tamanho, inicio, fim, swap, aux;
	tamanho = vetor.Length;
	inicio = 0;
	fim = tamanho - 1;
	swap = 0;
	while (swap == 0 && inicio < fim)
	{
		swap = 1;
		for (int i = inicio; i < fim; i = i + 1)
		{
			if (vetor[i] > vetor[i + 1])
			{
				aux = vetor[i];
				vetor[i] = vetor[i + 1];
				vetor[i + 1] = aux;
				swap = 0;
			}
		}

		fim = fim - 1;

		for (int i = fim; i > inicio; i = i - 1)
		{
			if (vetor[i] < vetor[i - 1])
			{
				aux = vetor[i];
				vetor[i] = vetor[i - 1];
				vetor[i - 1] = aux;
				swap = 0;
			}
		}

		inicio = inicio + 1;
	}

	return vetor;
}
```

Resultado da execução do Cocktail Sort.

![Resultado da ordenação usando o Cocktail Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/cocktailSort.png)

### Comb Sort

O Comb Sort, é um algoritmo de ordenação por troca. Desenvolvido em 1980 por Wlodzimierz Dobosiewicz e mais tarde, foi redescoberto e popularizado por Stephen Lacey e Richard Box em um artigo publicado na revista Byte em Abril de 1991. O Comb Sort é uma melhoria do Bubble Sort e rivaliza com o Quick Sort.

```csharp 
public static int[] combSort(int[] vetor)
{
	int gap = vetor.Length;
	bool swapped = true;
	while (gap > 1 || swapped)
	{
		if (gap > 1)
		{
			gap = (int)(gap / 1.247330950103979);
		}

		int i = 0;
		swapped = false;
		while (i + gap < vetor.Length)
		{
			if (vetor[i].CompareTo(vetor[i + gap]) > 0)
			{
				int t = vetor[i];
				vetor[i] = vetor[i + gap];
				vetor[i + gap] = t;
				swapped = true;
			}
			i++;
		}
	}

	return vetor;
}
```

Resultado da execução do Bubble Sort.

![Resultado da ordenação usando o Comb Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/combSort.png)

### Gnome Sort

O Gnome Sort é um algoritmo com uma sequencia grande de trocas como o Bubble Sort, porem ele é similar ao Insertion Sort com a diferença de levar um elemento para sua posição correta.

```csharp 
public static int[] gnomeSort(int[] vetor)
{
	int p = 0;
	int aux;
	while (p < (vetor.Length - 1))
	{
		if (vetor[p] > vetor[p + 1])
		{
			aux = vetor[p];
			vetor[p] = vetor[p + 1];
			vetor[p + 1] = aux;
			if (p > 0)
			{
				p -= 2;
			}
		}
		p++;
	}

	return vetor;
}
```

Resultado da execução do Gnome Sort.

![Resultado da ordenação usando o Gnome Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/gnomeSort.png)

### Odd-Even Sort

O Odd-Even Sort é um algoritmo de ordenação por comparação baseado no Bubble Sort.

```csharp 
public static int[] oddEvenSort(int[] vetor)
{
	bool sorted = false;
	while (!sorted)
	{
		sorted = true;
		// odd-even
		for (int x = 1; x < vetor.Length - 1; x += 2)
		{
			if (vetor[x] > vetor[x + 1])
			{
				int tmp = vetor[x];
				vetor[x] = vetor[x + 1];
				vetor[x + 1] = tmp;

				sorted = false;
			}
		}

		// even-odd
		for (int x = 0; x < vetor.Length - 1; x += 2)
		{
			if (vetor[x] > vetor[x + 1])
			{
				int tmp = vetor[x];
				vetor[x] = vetor[x + 1];
				vetor[x + 1] = tmp;

				sorted = false;
			}
		}
	}
	return vetor;
}
```

Resultado da execução do Odd-Even Sort.

![Resultado da ordenação usando o Odd-Even Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/oddEvenSort.png)

### Quick Sort

O Quick Sort é um método de ordenação inventado por [Charles Antony Richard Hoare](http://pt.wikipedia.org/wiki/C.A.R._Hoare) em 1960 quando estudante.

```csharp 
public static int[] quickSort(int[] vetor)
{
	int inicio = 0;
	int fim = vetor.Length - 1;

	quickSort(vetor, inicio, fim);

	return vetor;
}

private static void quickSort(int[] vetor, int inicio, int fim)
{
	if (inicio < fim)
	{
		int p = vetor[inicio];
		int i = inicio + 1;
		int f = fim;

		while (i <= f)
		{
			if (vetor[i] <= p)
			{
				i++;
			}
			else if (p < vetor[f])
			{
				f--;
			}
			else
			{
				int troca = vetor[i];
				vetor[i] = vetor[f];
				vetor[f] = troca;
				i++;
				f--;
			}
		}

		vetor[inicio] = vetor[f];
		vetor[f] = p;

		quickSort(vetor, inicio, f - 1);
		quickSort(vetor, f + 1, fim);
	}
}
```

Resultado da execução do Quick Sort.

![Resultado da ordenação usando o Quick Sort](https://raphaelcardoso.com.br/wp-content/uploads/2014/07/quickSort.png)

Esses são somente alguns dos diversos outros algoritmos de ordenação existentes, alguns mais simples e outros mais complexos. De qualquer forma, poderá fazer download do projeto completo e estudar o seu funcionamento.

Fonte do projeto: [Github](https://github.com/csharpbrasil/AlgoritmoOrdenacao).

Até o próximo artigo e bons estudos!