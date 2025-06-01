# Trading Room - Desafio Técnico Ebinex 🧠💹

Este projeto é uma aplicação de simulação de trading desenvolvida em Next.js com foco em performance, usabilidade e estrutura escalável.

> 💼 Desenvolvido como parte do desafio técnico para vaga de Front-end Sênior (Tech Lead) na **Ebinex**.

---

## 🔎 Visão Geral

O sistema simula uma Trading Room integrada com o gráfico da **TradingView**, onde o usuário pode:

- Realizar operações de compra e venda com tempo definido
- Programar ordens para a próxima vela (ex: 1min)
- Acompanhar ordens em andamento e histórico de lucros/prejuízos
- Visualizar saldo e retorno estimado por operação

---

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) – Gerenciamento de estado global
- [React Hot Toast](https://react-hot-toast.com/) – Feedback visual
- [TradingView Widget](https://www.tradingview.com/widget/) – Gráfico interativo
- [Vercel](https://vercel.com/) – Deploy

---

## 📁 Estrutura do Projeto

A estrutura foi cuidadosamente organizada para garantir escalabilidade, reusabilidade e manutenção clara.


---

## ✅ Funcionalidades Implementadas

- [x] Interface responsiva baseada no layout fornecido
- [x] Gráfico da TradingView integrado
- [x] Barra de progresso sincronizada com o tempo real
- [x] Controle de tempo da vela (1min, 2min, 5min)
- [x] Operações instantâneas (compra/venda)
- [x] Ordens programadas para próxima vela
- [x] Listagem de operações ativas
- [x] Histórico com resultado (vitória/derrota)
- [x] Saldo atualizado com persistência local
- [x] Navegação por abas (Operações / Ordens / Histórico)
- [x] Feedback visual com toasts

---

## 🧠 Diferenciais técnicos

- Estado global persistente via Zustand + `middleware/persist`
- Código dividido por responsabilidade (UI, lógica, helpers)
- Hook reutilizável para scripts externos (`useScript`)
- Arquitetura escalável para suportar múltiplos ativos no futuro
- Separação entre ordem programada, operação ativa e histórico

---

## 🔧 Como rodar localmente

```bash
# 1. Clone o projeto
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo

# 2. Instale as dependências
npm install
# ou
yarn

# 3. Rode o projeto
npm run dev
# ou
yarn dev
```

---

## 🌍 Deploy
[🔗 Acessar demo](https://vercel.com/)