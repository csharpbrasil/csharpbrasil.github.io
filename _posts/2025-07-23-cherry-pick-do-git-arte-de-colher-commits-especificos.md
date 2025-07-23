---
title: 'Cherry-pick do Git: A Arte de Colher Commits Específicos'
date: Wed, 23 Jul 2025 10:00:00 +0000
draft: false
tags: ['Git', 'Controle de Versão', 'Cherry-pick', 'Desenvolvimento', 'Versionamento']
---

Já imaginou poder pegar aquele commit específico de uma branch e aplicá-lo em outra, sem todo o drama de um merge completo? É aí que entra o **cherry-pick** do Git – uma ferramenta que é quase como usar uma pinça cirúrgica no seu código.

## O que é Cherry-pick?

O cherry-pick é literalmente "colher cerejas" – você escolhe exatamente qual commit quer aplicar em sua branch atual. É como se você dissesse: "Quero só essa mudança específica, obrigado". Não precisa trazer toda a bagunça junto.

## Quando Usar?

Cenários clássicos onde o cherry-pick brilha:

- **Bug crítico em produção**: Você tem a correção em `develop`, mas não pode fazer merge de tudo
- **Feature específica**: Precisa de uma funcionalidade que está em outra branch, mas o resto não
- **Hotfix seletivo**: Aplicar correções pontuais sem quebrar o fluxo de trabalho

## Como Funciona na Prática

### Comando básico
```bash
git cherry-pick <hash-do-commit>
```

### Exemplo real
```bash
# Você está na branch main e quer um commit da develop
git checkout main
git cherry-pick a1b2c3d4
```

### Cherry-pick múltiplo
```bash
# Vários commits específicos
git cherry-pick a1b2c3d4 e5f6g7h8

# Range de commits
git cherry-pick a1b2c3d4..e5f6g7h8
```

## Lidando com Conflitos

Quando rola conflito (e vai rolar), o Git pausa o processo:

```bash
# Resolver conflitos manualmente nos arquivos
# Depois:
git add .
git cherry-pick --continue

# Ou desistir:
git cherry-pick --abort
```

## Opções Úteis

### Manter referência ao commit original
```bash
git cherry-pick -x a1b2c3d4
```
Adiciona uma linha: `(cherry picked from commit a1b2c3d4)`

### Não committar automaticamente
```bash
git cherry-pick -n a1b2c3d4
```
Útil quando você quer revisar antes de committar.

## Cenário Real: Hotfix em Produção

```bash
# 1. Identificar o commit na develop
git log develop --oneline | grep "fix critical bug"
# 7f8a9b0c fix critical bug in payment validation

# 2. Aplicar na main (produção)
git checkout main
git cherry-pick -x 7f8a9b0c

# 3. Deploy para produção
git push origin main
```

## Pegadinhas a Evitar

### 1. Duplicação de Commits
Cherry-pick cria novos commits com novos hashes. Se depois você fizer merge da branch original, pode rolar duplicação no histórico.

### 2. Perda de Contexto
O commit pode não fazer sentido fora do contexto original da branch.

### 3. Dependências Quebradas
Um commit pode depender de mudanças anteriores que não foram aplicadas.

## Dicas de Sobrevivência

### 1. Use com Moderação
Cherry-pick não é bala de prata. Abuse dele e vai ter um histórico bagunçado que nem você vai entender depois.

### 2. Commits Limpos
Funciona melhor com commits bem definidos e atômicos. Aquele commit gigante com "fix varios bugs" vai dar dor de cabeça.

### 3. Teste Sempre
Nunca assuma que o cherry-pick vai funcionar perfeitamente. Sempre teste depois de aplicar.

## Conclusão

Cherry-pick é aquela ferramenta que você não usa todo dia, mas quando precisa, ela salva a vida. É perfeita para situações específicas onde você precisa de cirurgia, não de machado.

**Pontos-chave:**
- Use para commits específicos, não para integração massiva
- Sempre teste após aplicar
- Cuidado com duplicação no histórico
- Prefira commits atômicos e bem documentados

Lembre-se: com grandes poderes vêm grandes responsabilidades. Use com parcimônia e sempre pense no impacto no histórico do projeto.

E aí, já teve que usar cherry-pick em alguma situação crítica? Conte sua experiência!
