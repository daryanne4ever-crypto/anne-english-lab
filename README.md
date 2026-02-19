# Anne English Lab

Sistema educacional web com login de aluno/professora, dashboard, quizzes, listening, flashcards e desempenho.

## Estrutura por unidade (sem mistura de conteúdo)

- `/unit1`
  - `quiz.html` / `quiz.js`
  - `flashcards.html` / `flashcards.js`
  - `listening.html` / `listening.js`
- `/unit2`
  - `quiz.html` / `quiz.js`
  - `flashcards.html` / `flashcards.js`
  - `listening.html` / `listening.js`

Cada unidade possui conteúdo e pontuação independentes.

## Navegação principal

- `index.html` → Login (aluno + professora)
- `dashboard.html` → Resumo geral + acesso para Unit 1
- `unit1/menu.html` → Menu da Unit 1 com Quiz, Translation, Flashcards e Listening
- `performance.html` → desempenho aluno/professora

## XP e progresso

Persistidos no `localStorage`:

- XP geral / nível geral
- atividades gerais
- XP da `unit1`
- XP da `unit2`

Funções-chave no `common.js`:

- `addXP(...)` para fluxo geral
- `addUnitXP('unit1'|'unit2', ...)` para progresso por unidade
- `getUnitProgress('unit1'|'unit2')`

## Professora (acesso exclusivo)

Credenciais fixas:

- Usuário: `professora.anne`
- Senha: `Anne@2024`

## Executar localmente

```bash
python3 -m http.server 8000
```

Abra `http://127.0.0.1:8000/index.html`.


## Interface principal

Os módulos de estudo (quiz, translation, flashcards e listening) foram retirados da interface principal e centralizados no menu da Unit 1 (`unit1/menu.html`).
