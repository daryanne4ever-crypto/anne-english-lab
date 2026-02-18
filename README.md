# Anne English Lab

Aplicação web para prática de inglês em **arquivo único (`index.html`)**, com foco em:

- vocabulário aleatório;
- treino de pronúncia com **TTS** (texto para fala);
- reconhecimento de voz com **SpeechRecognition**;
- pontuação por XP e nível;
- ranking em tempo real com Firebase (ou fallback local).

## Funcionalidades

- **Vocabulário interativo:** botão para gerar palavras/expressões com tradução e exemplo.
- **Treino de pronúncia:**
  - ouvir frase em inglês;
  - falar no microfone;
  - receber feedback de acurácia por palavras-chave.
- **Progresso:** acompanhamento de XP, nível e lições concluídas.
- **Login:**
  - login/cadastro por email e password (quando Firebase configurado);
  - login anônimo;
  - modo local automático quando Firebase não está configurado.
- **Ranking:**
  - online com Firebase Realtime Database;
  - local quando sem Firebase.

## Estrutura do projeto

Atualmente o projeto foi unificado para manter tudo simples:

- `index.html` → HTML + CSS + JavaScript + integração opcional com Firebase.

## Como executar localmente

1. Na raiz do projeto, iniciar servidor local:

```bash
python3 -m http.server 8000
```

2. Abrir no navegador:

```text
http://127.0.0.1:8000/index.html
```

## Configuração opcional do Firebase

Se quiser habilitar autenticação/ranking online, injete no `window` (ou por template de ambiente) as variáveis:

- `__FIREBASE_API_KEY`
- `__FIREBASE_AUTH_DOMAIN`
- `__FIREBASE_PROJECT_ID`
- `__FIREBASE_STORAGE_BUCKET`
- `__FIREBASE_MESSAGING_SENDER_ID`
- `__FIREBASE_APP_ID`
- `__FIREBASE_DATABASE_URL`

Sem essas variáveis, a aplicação funciona em **modo local** automaticamente.

## Requisitos de navegador

- Chrome / Edge recomendados para melhor suporte de voz.
- APIs usadas:
  - `SpeechSynthesis`
  - `SpeechRecognition` (ou `webkitSpeechRecognition`)

## Licença

Projeto para fins educacionais.
