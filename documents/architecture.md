# Arquitetura MVC do Sistema de Gerenciamento de Tarefas

```mermaid
graph TB
    subgraph "Frontend/API"
        View[View Layer<br/>API Endpoints]
    end

    subgraph "Backend"
        Controller[Controller Layer<br/>TaskController]
        Model[Model Layer<br/>TaskModel]
    end

    subgraph "Database"
        DB[(PostgreSQL<br/>Database)]
    end

    %% Connections
    View <-->|HTTP Requests/Responses| Controller
    Controller <-->|Data Operations| Model
    Model <-->|SQL Queries| DB

    %% Styling
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
    classDef view fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef controller fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef model fill:#fff3e0,stroke:#e65100,stroke-width:2px;
    classDef database fill:#fce4ec,stroke:#c2185b,stroke-width:2px;

    class View view;
    class Controller controller;
    class Model model;
    class DB database;
```

## Descrição dos Componentes

### View Layer

-   Representa a interface da API REST
-   Endpoints HTTP para interação com o sistema
-   Responsável por receber requisições e enviar respostas
-   Formata os dados para apresentação

### Controller Layer

-   Gerencia as requisições HTTP
-   Implementa a lógica de negócios
-   Coordena a comunicação entre View e Model
-   Valida dados de entrada
-   Processa respostas

### Model Layer

-   Implementa a lógica de acesso aos dados
-   Gerencia as operações do banco de dados
-   Define a estrutura dos dados
-   Implementa validações de dados

### Database

-   Armazena os dados persistentes
-   Tabelas principais:
    -   Users
    -   Tasks
    -   Categories
-   Relacionamentos entre entidades

## Fluxo de Dados

1. **Requisição HTTP** → View Layer
2. **Processamento** → Controller Layer
3. **Operações de Dados** → Model Layer
4. **Persistência** → Database
5. **Resposta** → View Layer → Cliente
