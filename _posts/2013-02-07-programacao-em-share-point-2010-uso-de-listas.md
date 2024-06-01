---
title: 'Programação em Share Point 2010 - Uso de Listas'
date: Thu, 07 Feb 2013 18:48:46 +0000
draft: false
tags: ['C#', 'ClientContext', 'Sharepoint', 'Sharepoint', 'SPClientContext', 'Visual Studio', 'WebPart']
---

Vamos discorrer um pouco sobre programação sobre Share Point, e falar informações importantes sobre este assunto.

O procedimento que abordarei aqui vale tanto para programação utilizando a Classe ClientContext como a _SPClientContext_.

No popular, significando que vale tanto para implementar um WebPart como aplicação Cliente consumindo o Share Point.

Utilizarei a seguinte metodologia:

Segue um exemplo simples de acesso, onde estarei comentando item a item sobre o mesmo.

```csharp using (ctx) { try { if (ctx != null) { List Lista = ctx.Web.Lists.GetById(new Guid("{173139CB-4AEFE-4002-9EE2-C411BD64CEAF}")); ctx.Load(Lista); ctx.ExecuteQuery(); CamlQuery query = new CamlQuery(); query.ViewXml = ""; ListItemCollection collListItem = Lista.GetItems(query); ctx.Load(collListItem); ctx.ExecuteQuery(); int jobnro = 0; foreach (ListItem item in collListItem) { jobnro++; String Id = item["ID"].ToString(); } } } catch (Exception e) { MessageBox.Show("Erro na visualização da lista - " + e.Message); } } ```

O ctx é na verdade a conexão com o Share Point, obtendo-se pela classe ClientContext.

O processo de Conexão com o ClientContext (ctx), foge do escopo deste tópico e pode ser facilmente encontrado em outros lugares.

O importante, e quando dito parece lógico, mas deve sempre ser mencionado.

A normalização da Microsoft, diz que Colletion é quando estamos mencionando mais de um elemento, exemplo “Coleção de Listas do Site”, ou “Coleção de Itens de uma Lista”.

Existem 4 (quatro) classes para gerenciamento de listas.

1.  ListColletion
2.  List
3.  ListItemCollection
4.  ListItem

A Classe ListColletion é a coleção de listas de um site, e pode ser obtida através do ClientContext ou SPClientContext, conforme forma de acesso que esta em uso, exemplo:

Se você possui 3 listas (apontamentos, tarefas, agenda), ao instanciar as listas em um objeto ListColletion, o mesmo pegara todas as Listas dela.

Desta forma é possível pesquisar e averiguar qual lista é realmente aquela que se deseja obter.

Uma forma comum de obter esta classe é através da referencia direta das propriedades da classe ClientContext, exemplo: _ctx.Web.Lists (ListColletion)_

```csharp List Lista = ctx.Web.Lists.GetById(new Guid("{173139CB-4AEFE-4002-9EE2-C411BD64CEAF}")); ```

No exemplo acima, pesquisamos se o site possui uma lista especifica.

A classe List contem as informações sobre uma determinada lista, informando entre varias informações o _Guid_ (Uma especie de Chave identificadora) da lista.

Tambem são informações da lista, campos, descrição e informações que detalhem a lista como um todo.

As informações dos elementos da lista são obtidas através da propriedade  _GetItems_.

Um mecanismo muito interessante que ai deve ser aferido, é que como o volume de elementos pode ser muito grande, é importante filtrar os elementos, resgatando apenas o conjunto de itens que se deseja. Isso é realizado por um mecanismo similar ao SQL. O _CamlQuery_ foi a forma encontrada para se realizar esta pesquisa. A sua sintaxe, é bem complexa, mas é de forma geral um mix entre comandos sql e xml.

```csharp CamlQuery query = new CamlQuery(); query.ViewXml = ""; ListItemCollection collListItem = Lista.GetItems(query) ```

No exemplo acima, estamos pegando todos os itens e coletando na coleção de itens da lista (_ListItemCollection_).

Ao instanciar o ListItemColletion, tem-se na verdade não a lista mas o conjunto de dados da lista, ou seja, neste caso tem-se a relação de elementos da lista. Com a coleção desta lista, é possível através de um _foreach_ os elementos individuais.

Para acessar a informação individual utilizamos o artificio de programação:

```csharp foreach (ListItem item in collListItem) { jobnro++; String Id = item["ID"].ToString(); } ```

No caso pegamos os “registros” encontrados no collListItem (_ListItemCollection_) e trabalhamos com estes registros. Um a um, ou registro por registro.

A forma de acessar a informação do item é muito simples, podendo chamar o nome do campo, assim como faríamos tradicionalmente.