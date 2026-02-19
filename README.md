# Anne English Lab

Projeto web educacional com navegação entre páginas para prática de inglês.

## Estrutura implementada

- `index.html` → Login aluno + login exclusivo da professora
- `dashboard.html` → Resumo do aluno (nome, nível, XP, streak, atividades)
- `listening.html` → Listening com reprodução, gravação, correção e frases completas
- `quizzes.html` → Quiz de múltipla escolha com correção e XP
- `flashcards.html` → Flashcards com ganho de XP
- `performance.html` → Desempenho detalhado (aluno) e painel de todos os alunos (professora)
- `styles.css` → Estilos globais
- `common.js` → Sessão, alunos, sistema de XP e controle de papéis
- `index.js`, `dashboard.js`, `listening.js`, `quizzes.js`, `flashcards.js`, `performance.js` → Lógica por página

## Login exclusivo da professora

Credenciais fixas no código:

- Usuário: `professora.anne`
- Senha: `Anne@2024`

Ao entrar como professora, a página `performance.html` mostra o desempenho de todos os alunos salvos no navegador.

## Listening completo

A página `listening.html` contém:

- as 50 palavras mais usadas (clicáveis para ouvir);
- 30 frases curtas;
- 30 frases médias;
- 40 frases com conectores;
- treino de escuta e gravação com correção automática por similaridade.

## Sistema de XP

- Cada atividade concluída adiciona XP.
- XP e progresso são salvos em `localStorage`.
- Dashboard e Performance são atualizados com os novos valores.

## Como rodar

```bash
python3 -m http.server 8000
```

Abra:

- `http://127.0.0.1:8000/index.html`
