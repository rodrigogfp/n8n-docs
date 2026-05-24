# Remotion + Claude Code

> Tutorial — bem-vindo(a)!

## O que você vai aprender

Criar vídeos profissionais descrevendo o que você quer em texto. Sem abrir nenhum editor de vídeo. O Claude Code escreve o código, o Remotion renderiza o MP4.

---

## FASE 01 — Introdução e Preparação

### O que você vai precisar

- Node.js (gratuito) — [nodejs.org](https://nodejs.org)
- Claude Code — requer assinatura paga (plano Max ou Team)
- Computador com Windows, Mac ou Linux
- Conexão com internet

### O que você vai fazer

- Instalar 2 programas simples
- Criar um projeto de vídeo com 1 comando
- Descrever o vídeo que quer em português
- Exportar o vídeo pronto em MP4

### Passo 1 — Instale o Node.js

Acesse **nodejs.org**, clique no botão verde de download e siga a instalação normalmente. Clique em "Próximo" até finalizar. Não precisa configurar nada.

### Passo 2 — Instale o Claude Code

Abra o terminal e cole o comando abaixo:

```bash
npm install -g @anthropic-ai/claude-code
```

Depois de instalar, basta digitar `claude` no terminal para abrir.

> **Nunca abriu o terminal?**
> - Windows: procure "Terminal" no menu Iniciar.
> - Mac: Cmd + Espaço e digite "Terminal".

> **Atenção**
> O Remotion é gratuito para uso individual. O Claude Code exige assinatura paga. Veja os valores em [claude.ai/pricing](https://claude.ai/pricing)

---

## FASE 02 — Crie Seu Primeiro Vídeo

### Passo 1 — Crie o projeto

```bash
npx create-video@latest
```

Quando aparecerem as perguntas, escolha:

- Template → **Blank**
- TailwindCSS → **Yes**
- Install Skills → **Yes**

### Passo 2 — Entre na pasta e instale

```bash
cd meu-video
npm install
```

Troque `meu-video` pelo nome que você escolheu no passo anterior.

### Passo 3 — Inicie o preview no navegador

```bash
npm run dev
```

O Remotion Studio abre em [http://localhost:3000](http://localhost:3000).
Deixe esse terminal aberto!

> Se abriu uma janela no navegador com o Remotion Studio, está tudo certo!

### Passo 4 — Abra o Claude Code e descreva seu vídeo

Abra uma **segunda aba** do terminal e cole:

```bash
cd meu-video
claude
```

Agora descreva em português o vídeo que você quer!

> **Dica de ouro**
> Comece simples. Textos aparecendo, contagens regressivas, animações básicas. Quanto mais direto o pedido, melhor o resultado.

---

## FASE 03 — Prompts Prontos

Copie, cole e personalize. Troque os textos pelo seu conteúdo.

### 01 — Texto com fade-in *(aberturas e testes)*

```
Crie um vídeo de 5 segundos com fundo escuro e o texto 'Olá Mundo' aparecendo com fade-in no centro da tela, fonte grande e branca.
```

### 02 — Countdown animado *(stories e reels)*

```
Faça um countdown de 10 a 0 com números grandes no centro, cada número mudando de cor. Fundo preto, duração 10 segundos.
```

### 03 — Anúncio de promoção *(Instagram Stories)*

```
Crie um vídeo estilo stories vertical (1080x1920) anunciando 30% de desconto. Fundo gradiente roxo para azul, texto grande '30% OFF' com animação de bounce, e texto menor 'Só até domingo' embaixo.
```

### 04 — Apresentação de produto *(lançamentos)*

```
Crie um vídeo de 8 segundos com 3 slides: slide 1 com logo texto 'MinhaMarca', slide 2 com texto 'O melhor produto do mercado', slide 3 com 'Compre agora'. Transições suaves entre slides.
```

### 05 — Lista animada *(conteúdo educativo)*

```
Crie um vídeo com fundo branco mostrando uma lista de 5 itens aparecendo um por um com animação da esquerda para direita: '1. Planeje', '2. Execute', '3. Meça', '4. Ajuste', '5. Escale'.
```

---

> **Galeria oficial do Remotion**
> Dezenas de exemplos prontos pra se inspirar: [remotion.dev/prompts](https://remotion.dev/prompts)

> **Como personalizar qualquer prompt**
> - Troque os textos entre aspas pelo seu conteúdo
> - Mude as cores dizendo o nome — ex: "fundo vermelho"
> - Ajuste a duração — ex: "vídeo de 8 segundos"
> - Formato vertical para Stories — "formato 1080x1920"
