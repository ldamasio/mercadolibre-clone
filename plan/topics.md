
## Tópicos Essenciais para Implementação

### Backend (Go)

-   **Estrutura REST**: Desenvolver uma API **simples e limpa**.
    
-   **Persistência de Dados**: Implementar armazenamento em **JSON sem complexidade excessiva**.
    
    -   **CRUD de Produtos**: Funções para **Criar, Ler, Atualizar e Deletar produtos em lote**.
        
    -   **Listagem de Produtos**: Funcionalidade para listar todos os produtos disponíveis.
        
-   **Testes Unitários**: Criar uma suíte de **testes unitários básicos**.
    
-   **Documentação da API**: **Produzir e manter atualizada** a documentação da API.
    
-   **Cobertura de Testes**: Garantir uma cobertura de testes de **80% ou mais**.
    

----------

### Frontend (Next.js)

-   **Design**: Replicar **fielmente o design do Mercado Livre**.
    
-   **Componentização**: Desenvolver **componentes reutilizáveis**.
    
-   **Responsividade**: Assegurar que a aplicação seja **totalmente responsiva** em diferentes dispositivos.
    
-   **Estilização**: Utilizar **Tailwind CSS para agilizar a estilização**.
    

----------

### Web Server

-   **Middlewares**:
    
    -   **Error Handling**: Tratamento de erros.
        
    -   **Security**: Implementar medidas de segurança.
        
    -   **Logging**: Registro de atividades e eventos.
        
-   **Rotas**:
    
    -   **Healthcheck**: Rota para verificar a saúde do serviço.
        
    -   **Produtos Relacionados**: Rota otimizada para ler dados e fornecer ao frontend.
        
    -   **Características do Produto**: Rota para detalhes técnicos e específicos do produto.
        
    -   **Descrição do Produto**: Rota para a descrição textual do produto.
        
    -   **Outros Produtos da Marca**: Rota para listar produtos da mesma marca.
        
    -   **Loja Oficial da Marca**: Rota para informações da loja oficial.
        
    -   **Meios de Pagamento**: Rota para informações sobre as opções de pagamento.
        
-   **Configuração**: Gerenciamento das configurações do servidor.
    
-   **Entrypoint**: Ponto de entrada da aplicação.
