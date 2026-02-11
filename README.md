# Volei Team Organizer App

Este é um aplicativo para organizar times de vôlei, construído com React, Vite e TypeScript.

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador no link mostrado (geralmente http://localhost:3000).

## Como fazer o Build para Produção

Para gerar a versão otimizada para colocar no ar:

```bash
npm run build
```

Isso criará uma pasta `build/` com os arquivos do site.

## Como colocar no ar (Deploy Gratuito)

### Opção 1: Netlify Drop (Mais fácil e rápido)
1. Rode `npm run build` no seu terminal.
2. Acesse [app.netlify.com/drop](https://app.netlify.com/drop).
3. Arraste a pasta `build` que foi criada no seu projeto para a área pontilhada no site.
4. Pronto! Seu site estará no ar em segundos.

### Opção 2: Vercel com GitHub (Recomendado para manter atualizado)
1. Crie um repositório no GitHub e suba seu código.
2. Crie uma conta na [Vercel](https://vercel.com).
3. Clique em "Add New Project" e selecione seu repositório do GitHub.
4. A Vercel detectará que é um projeto Vite.
5. **Importante**: Nas configurações de "Build & Development Settings", certifique-se que o "Output Directory" esteja configurado como `build` (o padrão é `dist`, mas este projeto usa `build`).
6. Clique em "Deploy".
