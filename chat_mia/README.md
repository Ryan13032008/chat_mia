# Chat Mia

Fundação arquitetural do projeto para desenvolvimento do curso.

Stack: Next.js (App Router), TypeScript, React, Tailwind CSS, shadcn/ui, React Hook Form, Zod, ESLint e Prettier.

## Pré-requisitos

- Node.js 20+
- npm


## Começando

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). A rota `/` renderiza uma página em branco — intencional nesta etapa.

## Scripts

| Comando                | Descrição                      |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento    |
| `npm run build`        | Build de produção              |
| `npm run start`        | Servidor de produção           |
| `npm run lint`         | ESLint                         |
| `npm run lint:fix`     | ESLint com correção automática |
| `npm run format`       | Prettier (escreve)             |
| `npm run format:check` | Prettier (verifica)            |
| `npm run typecheck`    | TypeScript (`tsc --noEmit`)    |

## Arquitetura

```text
src/
├── app/                 # Rotas (App Router)
├── components/
│   ├── ui/              # Primitivos shadcn/ui
│   ├── common/          # Componentes compartilhados
│   └── layout/          # Peças de layout (quando existirem)
├── features/            # Domínios isolados (feature-based)
├── hooks/               # Hooks compartilhados
├── lib/
│   ├── utils.ts         # Utilitários (ex.: cn)
│   ├── validations/     # Validações Zod compartilhadas
│   └── services/        # Serviços HTTP compartilhados
├── schemas/             # Schemas Zod globais
├── types/               # Tipos TypeScript globais
├── constants/           # Constantes compartilhadas
├── config/              # Configuração e env (Zod)
└── providers/           # Providers React globais
```

Funcionalidades reais devem viver em `src/features/<domínio>/` (components, hooks, schemas, services, types, index).

## Formulários (padrão futuro)

Schema Zod → React Hook Form → componentes shadcn/ui → service.

Validações ficam fora da UI (em `schemas/` da feature).

## Variáveis de ambiente

- Cliente: apenas `NEXT_PUBLIC_*`
- Segredos: somente no servidor, sem prefixo público
- Validação: `src/config/env.ts` (Zod)

## shadcn/ui

Configurado via `components.json`. Para adicionar componentes:

```bash
npx shadcn@latest add <component>
```
