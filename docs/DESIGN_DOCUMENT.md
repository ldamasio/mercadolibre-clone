# Documentação de Arquitetura - Nível de Implementação

## Visão Geral da Arquitetura

Este documento detalha as decisões de implementação e padrões arquiteturais utilizados no backend do MercadoLibre Clone.

## Estrutura de Camadas

```
┌─────────────────────────────────────────────────────────┐
│                    HTTP Handlers                         │
│              (Camada de Apresentação)                    │
├─────────────────────────────────────────────────────────┤
│                    Repository                            │
│              (Camada de Persistência)                    │
├─────────────────────────────────────────────────────────┤
│                     Models                               │
│               (Camada de Domínio)                        │
├─────────────────────────────────────────────────────────┤
│                   Middleware                             │
│              (Camada Transversal)                        │
└─────────────────────────────────────────────────────────┘
```

## Decisões Arquiteturais

### 1. Clean Architecture Simplificada

**Decisão**: Implementar uma versão simplificada de Clean Architecture sem over-engineering.

**Justificativa**:
- **Separação de responsabilidades clara** sem complexidade desnecessária
- **Testabilidade** através de interfaces bem definidas
- **Manutenibilidade** com código organizado em camadas lógicas
- **Pragmatismo** evitando abstrações excessivas para um MVP

**Implementação**:
```go
// Interface define o contrato (repository/interface.go)
type ProductRepositoryInterface interface {
    GetProductByID(id string) (*models.Product, error)
    // ...
}

// Handler depende da interface, não da implementação
type ProductHandler struct {
    repo repository.ProductRepositoryInterface
}

// Injeção de dependência no construtor
func NewProductHandler(repo repository.ProductRepositoryInterface) *ProductHandler {
    return &ProductHandler{repo: repo}
}
```

### 2. Repository Pattern com Interface

**Decisão**: Usar Repository Pattern com interface para abstrair o acesso aos dados.

**Justificativa**:
- **Desacoplamento**: Handlers não conhecem detalhes de persistência
- **Testabilidade**: Facilita criação de mocks para testes unitários
- **Flexibilidade**: Permite trocar implementação (JSON → Database) sem alterar handlers
- **Single Responsibility**: Cada camada tem uma responsabilidade única

**Implementação**:
```go
// Repository real que lê de arquivos JSON
type ProductRepository struct {
    dataPath string
    mu       sync.RWMutex  // Thread-safety
    products []models.Product // Cache em memória
}

// Mock para testes
type mockRepository struct {
    products []models.Product
}

// Ambos implementam ProductRepositoryInterface
```

### 3. Concorrência e Thread-Safety

**Decisão**: Usar `sync.RWMutex` para proteger acesso concorrente aos dados.

**Justificativa**:
- **Segurança**: Múltiplas goroutines podem ler/escrever simultaneamente
- **Performance**: RWMutex permite múltiplas leituras simultâneas
- **Prevenção de race conditions**: Essencial em servidores HTTP

**Implementação**:
```go
func (r *ProductRepository) GetAllProducts() ([]models.Product, error) {
    r.mu.RLock()         // Lock para leitura
    defer r.mu.RUnlock() // Unlock garantido
    
    if len(r.products) == 0 {
        return nil, errors.New("no products loaded")
    }
    return r.products, nil
}
```

### 4. Carregamento de Dados em Memória

**Decisão**: Carregar todos os dados JSON em memória na inicialização.

**Justificativa**:
- **Performance**: Evita I/O em cada requisição
- **Simplicidade**: Não há necessidade de cache complexo
- **Adequado ao contexto**: Conjunto de dados limitado para um MVP
- **Trade-off aceitável**: Usa mais memória mas ganha em velocidade

**Implementação**:
```go
func (r *ProductRepository) LoadData() error {
    r.mu.Lock()
    defer r.mu.Unlock()
    
    // Carrega todos os arquivos JSON uma vez
    r.loadProducts()
    r.loadProductDetails()
    r.loadSellers()
    // Dados ficam em memória durante toda execução
}
```

### 5. Error Handling Consistente

**Decisão**: Usar erros sentinela e wrapping para melhor contexto.

**Justificativa**:
- **Clareza**: Erros específicos do domínio são facilmente identificáveis
- **Debugging**: Error wrapping preserva contexto da falha
- **HTTP mapping**: Facilita tradução para status codes HTTP apropriados

**Implementação**:
```go
// Erros sentinela definidos
var (
    ErrProductNotFound = errors.New("product not found")
    ErrSellerNotFound  = errors.New("seller not found")
)

// Uso com wrapping para contexto
if err := r.loadProducts(); err != nil {
    return fmt.Errorf("loading products: %w", err)
}

// Handler traduz para HTTP
if err == repository.ErrProductNotFound {
    utils.RespondWithError(w, http.StatusNotFound, "product not found")
    return
}
```

### 6. Middleware Pattern

**Decisão**: Implementar middleware como funções que envolvem handlers.

**Justificativa**:
- **Composição**: Fácil adicionar/remover funcionalidades
- **Reusabilidade**: Middleware pode ser aplicado a qualquer handler
- **Separação de concerns**: Lógica transversal isolada dos handlers

**Implementação**:
```go
// Middleware assinatura padrão
func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        wrapped := &responseWriter{w, http.StatusOK}
        
        next.ServeHTTP(wrapped, r) // Chama próximo handler
        
        log.Printf("%s %s %d %s", r.Method, r.URL.Path, 
                   wrapped.statusCode, time.Since(start))
    })
}

// Composição no main.go
handler := middleware.Logger(middleware.CORS(mux))
```

### 7. JSON como Formato de Resposta

**Decisão**: Padronizar todas as respostas em JSON com estrutura consistente.

**Justificativa**:
- **Consistência**: Frontend sempre recebe formato previsível
- **Extensibilidade**: Fácil adicionar campos sem quebrar compatibilidade
- **Padrão da indústria**: JSON é amplamente suportado

**Implementação**:
```go
// Resposta de sucesso
type ProductResponse struct {
    Product       Product       `json:"product"`
    ProductDetail ProductDetail `json:"product_detail"`
    Seller        Seller        `json:"seller"`
}

// Resposta de erro padronizada
type ErrorResponse struct {
    Error   string `json:"error"`   // Tipo do erro
    Message string `json:"message"` // Descrição legível
}
```

### 8. Configuração via Environment

**Decisão**: Usar variáveis de ambiente com valores padrão.

**Justificativa**:
- **12-Factor App**: Segue boas práticas de aplicações cloud-native
- **Flexibilidade**: Diferentes configurações sem recompilar
- **Segurança**: Senhas/secrets não ficam no código

**Implementação**:
```go
type Config struct {
    Port     string
    DataPath string
    Version  string
}

func Load() *Config {
    return &Config{
        Port:     getEnv("PORT", "8080"),
        DataPath: getEnv("DATA_PATH", "./data"),
        Version:  getEnv("VERSION", "1.0.0"),
    }
}
```

## Padrões de Teste

### 1. Table-Driven Tests

**Justificativa**: Facilita adicionar casos de teste e melhora legibilidade.

```go
func TestGetProductByID(t *testing.T) {
    tests := []struct {
        name       string
        productID  string
        wantStatus int
        wantError  bool
    }{
        {"existing product", "TEST001", http.StatusOK, false},
        {"non-existing product", "NOTEXIST", http.StatusNotFound, true},
        {"empty ID", "", http.StatusBadRequest, true},
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // test implementation
        })
    }
}
```

### 2. Mocks via Interface

**Justificativa**: Testes unitários isolados sem dependências externas.

```go
type mockRepository struct {
    products []models.Product
    err      error // Simula erros
}

func (m *mockRepository) GetAllProducts() ([]models.Product, error) {
    if m.err != nil {
        return nil, m.err
    }
    return m.products, nil
}
```

## Considerações de Performance

### 1. Caching em Memória
- Todos os dados são carregados uma vez na inicialização
- Trade-off: Usa ~10-50MB RAM mas elimina I/O nas requisições
- Adequado para catálogo de produtos limitado

### 2. Conexões HTTP
- Timeouts configurados para evitar conexões penduradas
- Graceful shutdown para não perder requisições em andamento

### 3. Concorrência
- RWMutex permite múltiplas leituras simultâneas
- Handlers são stateless e thread-safe
- Não há compartilhamento de estado mutável entre requisições

## Possíveis Evoluções

### 1. Migração para Banco de Dados
```go
// Basta criar nova implementação da interface
type PostgresRepository struct {
    db *sql.DB
}

func (r *PostgresRepository) GetProductByID(id string) (*models.Product, error) {
    // SQL query implementation
}
```

### 2. Cache Distribuído
- Adicionar Redis como cache entre handler e repository
- Implementar invalidação de cache
- Manter interface intacta

### 3. Observabilidade
- Adicionar OpenTelemetry para tracing
- Métricas com Prometheus
- Logs estruturados com contexto

## Conclusão

A arquitetura escolhida balanceia:
- **Simplicidade**: Código fácil de entender e modificar
- **Testabilidade**: 80%+ de cobertura facilmente alcançável
- **Performance**: Adequada para os requisitos do MVP
- **Manutenibilidade**: Estrutura clara facilita evolução
- **Pragmatismo**: Evita over-engineering mantendo flexibilidade

O design permite evolução incremental sem grandes refatorações, seguindo o princípio YAGNI (You Aren't Gonna Need It) mas mantendo portas abertas para crescimento futuro.
