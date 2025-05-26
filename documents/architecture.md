# Arquitetura MVC do Sistema de Gerenciamento de Tarefas

```mermaid
flowchart LR
    subgraph Usuario[Usuário]
        user["👤 Usuário"]
    end

    subgraph Cliente[Cliente (Navegador)]
        browser["🌐 Navegador<br/>(Postman, Frontend, etc)"]
    end

    subgraph Servidor[Servidor (Node.js/Express)]
        subgraph Views[Views]
            viewList[Listar Tarefas]
            viewForm[Formulário]
            viewHeader[Header]
        end
        subgraph Controllers[Controllers]
            ctrlUsers[Users]
            ctrlTasks[Tasks]
            ctrlCategories[Categories]
        end
        subgraph Models[Models]
            modelUser[User\n(id, nome, email)]
            modelTask[Task\n(id, título, status, userId, categoryId)]
            modelCategory[Category\n(id, nome)]
        end
    end

    subgraph DBServer[Servidor Banco de Dados]
        db[(PostgreSQL)]
    end

    %% Fluxo de comunicação
    user -- Interação --> browser
    browser -- HTTP Requests/Responses --> viewList
    browser -- HTTP Requests/Responses --> viewForm
    browser -- HTTP Requests/Responses --> viewHeader
    viewList -- Chama --> ctrlTasks
    viewForm -- Chama --> ctrlTasks
    viewHeader -- Chama --> ctrlUsers
    ctrlUsers -- CRUD Users --> modelUser
    ctrlTasks -- CRUD Tasks --> modelTask
    ctrlCategories -- CRUD Categories --> modelCategory
    modelUser -- SQL --> db
    modelTask -- SQL --> db
    modelCategory -- SQL --> db

    %% Estilização
    classDef cliente fill:#e3f2fd,stroke:#1976d2,stroke-width:2px;
    classDef servidor fill:#e8f5e9,stroke:#388e3c,stroke-width:2px;
    classDef db fill:#fce4ec,stroke:#c2185b,stroke-width:2px;
    classDef usuario fill:#fffde7,stroke:#fbc02d,stroke-width:2px;
    class browser,cliente;
    class Servidor,servidor;
    class db,db;
    class user,usuario;
```

## Descrição dos Componentes

### Usuário e Cliente

-   **Usuário**: Pessoa que interage com o sistema via navegador ou ferramenta de API.
-   **Cliente**: Navegador ou ferramenta (ex: Postman) que faz requisições HTTP para o servidor.

### Servidor (Node.js/Express)

-   **Views**: Responsáveis por formatar e entregar as respostas da API.
-   **Controllers**: Implementam a lógica de negócio, recebem requisições, validam dados e coordenam as operações.
-   **Models**: Representam as entidades do banco de dados e executam operações SQL.

### Banco de Dados

-   **PostgreSQL**: Armazena dados persistentes das entidades (Users, Tasks, Categories).

## Fluxo de Dados

1. Usuário interage com o Cliente (navegador ou ferramenta de API).
2. Cliente faz requisições HTTP para o Servidor.
3. Views recebem as requisições e encaminham para os Controllers.
4. Controllers processam a lógica e interagem com os Models.
5. Models executam operações no Banco de Dados.
6. Respostas são devolvidas ao Cliente e apresentadas ao Usuário.
