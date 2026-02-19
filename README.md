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
- `dashboard.html` → Resumo geral + botões separados de Unit 1 e Unit 2
- `quizzes.html` → Quiz principal (50 questões)
- `translation.html` → Quiz de tradução
- `flashcards.html` / `listening.html` → módulos gerais já existentes
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
