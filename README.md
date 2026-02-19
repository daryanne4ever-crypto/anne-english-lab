# Anne English Lab

Sistema educacional web com login de aluno/professora, dashboard, quizzes, listening, flashcards e desempenho.

## Navegação

- `index.html` → Login (aluno + professora)
- `dashboard.html` → Resumo do aluno
- `quizzes.html` → Quiz principal com 50 questões e 5 níveis
- `translation.html` → Quiz de tradução de frases
- `flashcards.html` → 50 flashcards com tradução, IPA e áudio
- `listening.html` → Escutar e gravar com correção automática
- `performance.html` → Desempenho (aluno) / painel geral (professora)

## Professora (acesso exclusivo)

Credenciais fixas:

- Usuário: `professora.anne`
- Senha: `Anne@2024`

## Requisitos implementados

- Quiz principal com 50 questões em 5 níveis progressivos.
- Subida de nível no quiz principal a cada 10 acertos.
- XP mantido e atualizado em dashboard/performance.
- Translation quiz com campo digitável e correção automática.
- Flashcards com 50 palavras (EN, PT, IPA, botão de áudio).
- Persistência em `localStorage` para XP, nível e atividades.

## Executar localmente

```bash
python3 -m http.server 8000
```

Abra `http://127.0.0.1:8000/index.html`.
