# Anne English Lab

Projeto web educacional com navegação entre páginas para prática de inglês.

## Estrutura obrigatória implementada

- `index.html` → Login (nome, senha, botão Entrar)
- `dashboard.html` → Resumo do aluno (nome, nível, XP, streak, atividades)
- `listening.html` → Listening com reprodução, gravação e avaliação automática
- `quizzes.html` → Quiz de múltipla escolha com correção automática e XP
- `flashcards.html` → Flashcards com ganho de XP
- `performance.html` → Desempenho detalhado e histórico de atividades
- `styles.css` → Estilos globais
- `common.js` → Estado do aluno + sistema de XP via localStorage
- `index.js`, `dashboard.js`, `listening.js`, `quizzes.js`, `flashcards.js`, `performance.js` → Lógica por página

## Requisitos atendidos

- HTML, CSS e JavaScript separados.
- Layout moderno e simples.
- Botões estilizados.
- Arquivos organizados por responsabilidade.
- Navegação funcional entre todas as páginas.
- Sistema de XP com atualização no Dashboard.

## Como rodar

```bash
python3 -m http.server 8000
```

Abra:

- `http://127.0.0.1:8000/index.html`

## Como funciona o XP

- Ao concluir atividades (listening, quiz correto, revelar flashcard), o sistema soma XP.
- XP e progresso são salvos em `localStorage`.
- O Dashboard e a página de Performance refletem os valores atualizados.
