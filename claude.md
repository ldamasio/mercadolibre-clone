# Contexto do Projeto: Clone do Mercado Livre

Este projeto é uma aplicação full-stack que replica a página de detalhes de um produto do Mercado Livre. O backend é construído em Go e o frontend em Next.js.

## 1. Tecnologias e Plataformas

O ambiente de produção e as ferramentas principais são:
- **Orquestração**: Kubernetes
- **Service Mesh**: Istio
- **Monitoramento**: Prometheus, OpenTelemetry
- **CI/CD**: GitHub Actions para CI, ArgoCD para GitOps (CD)
- **Cloud**: AWS e GCP

## 2. Estrutura do Repositório

A estrutura de diretórios principal é a seguinte. Consulte-a para entender onde cada lógica reside.

```
mercadolibre-clone/
├── backend/            # API em Go
│   ├── src/
│   │   ├── cmd/server/main.go  # Ponto de entrada da API
│   │   ├── internal/
│   │   │   ├── handlers/     # Controladores HTTP
│   │   │   ├── repository/   # Lógica de acesso aos dados
│   │   │   ├── models/       # Estruturas de dados
│   │   │   └── middleware/   # Middlewares (CORS, Logger)
│   │   └── data/             # Arquivos JSON com dados estáticos
│   ├── Makefile
│   └── go.mod
│
├── frontend/           # Aplicação Web em Next.js
│   ├── src/
│   │   ├── app/              # Rotas do Next.js App Router
│   │   ├── components/       # Componentes React reutilizáveis
│   │   ├── services/         # Lógica para chamar a API do backend
│   │   ├── hooks/            # Hooks customizados
│   │   └── types/            # Tipos TypeScript
│   ├── next.config.js
│   └── tailwind.config.js
│
├── docker/             # Dockerfiles e docker-compose
├── scripts/            # Scripts de automação (setup, test)
├── docs/               # Documentação (API.md, DESIGN_DOCUMENT.md)
└── .github/            # Workflows do GitHub Actions
```

## 3. Diretrizes de Desenvolvimento - Backend (Go)

- **Arquitetura**: A API deve ser RESTful, simples e limpa. A lógica de negócio fica nos `handlers`, e o acesso aos dados no `repository`.
- **Persistência**: Os dados são armazenados e lidos de arquivos `.json` no diretório `backend/data/`. Não use um banco de dados.
- **Testes**: Use o framework padrão do Go. A cobertura de testes unitários deve ser de **pelo menos 80%**. Crie os testes ao lado dos arquivos que eles testam (ex: `product_handler_test.go`).
- **Comandos**: Utilize o `Makefile` para comandos comuns como build, test e run.
- **Documentação**: Mantenha o arquivo `docs/API.md` atualizado com qualquer alteração nos endpoints.

## 4. Diretrizes de Desenvolvimento - Frontend (Next.js)

- **Design**: O objetivo é replicar fielmente o design e a UX da página de produto do Mercado Livre.
- **Estilização**: Use **Tailwind CSS** para toda a estilização. As configurações estão em `tailwind.config.js`.
- **Componentização**: Crie componentes reutilizáveis em `src/components/`, organizados por funcionalidade (`product/`, `ui/`, `common/`).
- **Estrutura de Rotas**: Use o App Router do Next.js. A página de detalhes do produto é uma rota dinâmica: `app/products/[id]/page.tsx`.
- **Data Fetching**: A comunicação com a API do backend deve ser feita através das funções no diretório `src/services/`.
- **Responsividade**: A interface deve ser totalmente responsiva para desktops e dispositivos móveis.

## 5. Scripts e Automação

- Para configurar o ambiente, executar testes gerais ou validar o projeto, use os scripts no diretório `scripts/`.
- O workflow de Integração Contínua (CI) está definido em `.github/workflows/ci.yml`.

