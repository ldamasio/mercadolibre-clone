# Global Action Plan (High Level)

---

## Contexto

- O ambiente de produção é composto pelas seguintes tecnologias e plataformas:
    - **Orquestração**: Kubernetes
    - **Monitoramento**: Prometheus, OpenTelemetry
    - **Service Mesh**: Istio
    - **CD/GitOps**: ArgoCD
    - **CI**: GitHub Actions
    - **Provedores de Nuvem**: AWS, GCP

---

## Fluxo de Trabalho (Workflow)

- **Setup do Ambiente de Desenvolvimento Local**: Configurar todas as ferramentas e dependências necessárias para o desenvolvimento.
- **Bootstrap de Aplicações**: Iniciar um projeto de API em Go e uma página web em Next.js.
- **Implementação de Lógica de Dados**: Desenvolver a lógica para armazenamento e consulta de dados em arquivos `.json` estáticos.
- **Página de Detalhes do Item**: Criar a página que consumirá os dados, focando na exibição detalhada de cada item.
- **Sugestões de Produtos Relacionados**: Implementar um carrossel para exibir sugestões de produtos similares ou relacionados.
- **Web Server**: Configurar um servidor web para disponibilizar a API e a página de detalhes do item.
- **Experiência do Usuário (UX)**: Otimizar a renderização das fotos do produto para garantir uma excelente experiência ao usuário.

---

## Estrutura Sugerida (Exemplo Básico)

```
mercadolibre-clone/
├── backend/
│   ├── src/
│   │   ├── cmd/
│   │   │   └── server/
│   │   │       └── main.go
│   │   ├── internal/
│   │   │   ├── models/
│   │   │   │   ├── product.go
│   │   │   │   ├── seller.go
│   │   │   │   └── review.go
│   │   │   ├── handlers/
│   │   │   │   ├── product_handler.go
│   │   │   │   ├── health_handler.go
│   │   │   │   └── handlers_test.go
│   │   │   ├── repository/
│   │   │   │   ├── product_repository.go
│   │   │   │   └── repository_test.go
│   │   │   ├── middleware/
│   │   │   │   ├── cors.go
│   │   │   │   └── logger.go
│   │   │   └── config/
│   │   │       └── config.go
│   │   └── pkg/
│   │       └── utils/
│   │           ├── response.go
│   │           └── errors.go
│   ├── data/
│   │   ├── products.json
│   │   ├── sellers.json
│   │   └── reviews.json
│   ├── go.mod
│   ├── go.sum
│   ├── Makefile
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── products/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Breadcrumb.tsx
│   │   │   ├── product/
│   │   │   │   ├── ProductGallery.tsx
│   │   │   │   ├── ProductInfo.tsx
│   │   │   │   ├── ProductPrice.tsx
│   │   │   │   ├── SellerInfo.tsx
│   │   │   │   └── ProductFeatures.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       └── Loading.tsx
│   │   ├── hooks/
│   │   │   ├── useProduct.ts
│   │   │   └── useApi.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── productService.ts
│   │   ├── types/
│   │   │   ├── product.ts
│   │   │   └── seller.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── public/
│   │   └── images/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.local.example
│
├── docker/
│   ├── backend/
│   │   └── Dockerfile
│   ├── frontend/
│   │   └── Dockerfile
│   └── docker-compose.yml
│
├── scripts/
│   ├── setup.sh
│   ├── test.sh
│   └── validate.sh
│
├── docs/
│   ├── API.md
│   ├── DESIGN_DOCUMENT.md
│   └── images/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── README.md
├── run.md
├── .gitignore
└── .env.example
```