# Gerenciador de Tarefas

Um sistema de gerenciamento de tarefas desenvolvido como parte do projeto individual do Módulo 2 do curso de Ciência da Computação do Inteli. O sistema é construído com Node.js, Express e PostgreSQL, seguindo a arquitetura MVC. Permite o gerenciamento completo de tarefas, incluindo criação, atualização, exclusão e consulta de tarefas, além de suporte a categorias e usuários.

## Tecnologias Utilizadas

-   **Backend**:

    -   Node.js
    -   Express.js
    -   PostgreSQL
    -   pg (cliente PostgreSQL para Node.js)
    -   dotenv (gerenciamento de variáveis de ambiente)
    -   UUID (para geração de IDs únicos)

-   **Testes**:
    -   Jest (framework de testes)
    -   Supertest (para testes de API)

## Estrutura do Projeto

```
.
├── assets/              # Arquivos estáticos e imagens
├── config/             # Configurações do projeto
│   └── database.js     # Configuração do banco de dados
├── controllers/        # Controladores da aplicação
│   └── TaskController.js
├── documents/          # Documentação do projeto
│   └── wad.md         # Documento de arquitetura web
├── models/            # Modelos do banco de dados
│   └── TaskModel.js
├── routes/            # Definição das rotas da API
│   └── index.js
├── scripts/           # Scripts utilitários
│   └── init.sql      # Script de inicialização do banco
├── services/          # Serviços da aplicação
├── tests/            # Testes automatizados
├── views/            # Templates e views
├── .env              # Variáveis de ambiente
├── .gitignore        # Arquivos ignorados pelo git
├── jest.config.js    # Configuração do Jest
├── package.json      # Dependências e scripts
└── server.js         # Ponto de entrada da aplicação
```

## Configuração do Banco de Dados

### Pré-requisitos

-   PostgreSQL 12 ou superior
-   Node.js 14 ou superior
-   npm ou yarn

### Configuração Inicial

1. Instale o PostgreSQL em sua máquina:

    - [Windows](https://www.postgresql.org/download/windows/)
    - [Linux](https://www.postgresql.org/download/linux/)
    - [macOS](https://www.postgresql.org/download/macosx/)

2. Crie um novo banco de dados:

    ```sql
    CREATE DATABASE gerenciador_tarefas;
    ```

3. Configure as variáveis de ambiente no arquivo `.env`:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=gerenciador_tarefas
    PORT=3000
    NODE_ENV=development
    ```

### Migrações do Banco de Dados

O projeto utiliza um sistema de migrações para gerenciar as alterações no banco de dados. Para executar as migrações:

1. Execute as migrações iniciais:

    ```bash
    npm run migrate:up
    ```

2. Para reverter as migrações:

    ```bash
    npm run migrate:down
    ```

3. Para criar uma nova migração:
    ```bash
    npm run migrate:create -- nome_da_migracao
    ```

## Testando as APIs

### Configuração do Ambiente de Testes

1. Crie um banco de dados separado para testes:

    ```sql
    CREATE DATABASE gerenciador_tarefas_test;
    ```

2. Configure as variáveis de ambiente para testes no arquivo `.env.test`:
    ```
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=gerenciador_tarefas_test
    PORT=3001
    NODE_ENV=test
    ```

### Executando os Testes

1. Testes unitários:

    ```bash
    npm run test:unit
    ```

2. Testes de integração:

    ```bash
    npm run test:integration
    ```

3. Testes de API:

    ```bash
    npm run test:api
    ```

4. Todos os testes com cobertura:
    ```bash
    npm run test:coverage
    ```

### Testando Manualmente as APIs

Você pode usar ferramentas como Postman ou cURL para testar as APIs manualmente:

1. Criar uma nova tarefa:

    ```bash
    curl -X POST http://localhost:3000/api/tasks \
      -H "Content-Type: application/json" \
      -d '{"title": "Nova Tarefa", "description": "Descrição da tarefa", "userId": "123"}'
    ```

2. Listar todas as tarefas:

    ```bash
    curl http://localhost:3000/api/tasks
    ```

3. Buscar uma tarefa específica:

    ```bash
    curl http://localhost:3000/api/tasks/123
    ```

4. Atualizar uma tarefa:

    ```bash
    curl -X PUT http://localhost:3000/api/tasks/123 \
      -H "Content-Type: application/json" \
      -d '{"title": "Tarefa Atualizada", "status": "completed"}'
    ```

5. Deletar uma tarefa:
    ```bash
    curl -X DELETE http://localhost:3000/api/tasks/123
    ```

## Configuração do Ambiente

1. Clone o repositório:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd gerenciador-tarefas
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Inicialize o banco de dados:

    ```bash
    npm run init-db
    ```

4. Inicie o servidor:
    ```bash
    npm start
    ```

## API Endpoints

### Usuários (Users)

-   `POST /api/users` - Criar um novo usuário
-   `GET /api/users` - Listar todos os usuários
-   `GET /api/users/:id` - Buscar um usuário específico
-   `PUT /api/users/:id` - Atualizar um usuário

### Tarefas (Tasks)

-   `POST /api/tasks` - Criar uma nova tarefa
-   `GET /api/tasks` - Listar todas as tarefas
-   `GET /api/tasks/:id` - Buscar uma tarefa específica
-   `PUT /api/tasks/:id` - Atualizar uma tarefa
-   `DELETE /api/tasks/:id` - Deletar uma tarefa
-   `GET /api/users/:userId/tasks` - Listar tarefas de um usuário específico

### Categorias (Categories)

-   `POST /api/categories` - Criar uma nova categoria
-   `GET /api/categories` - Listar todas as categorias
-   `GET /api/categories/:id` - Buscar uma categoria específica
-   `PUT /api/categories/:id` - Atualizar uma categoria
-   `DELETE /api/categories/:id` - Deletar uma categoria

Para documentação detalhada dos endpoints, incluindo formatos de requisição e resposta, consulte o arquivo [WAD.md](documents/wad.md).

## Arquitetura MVC

O projeto segue a arquitetura MVC (Model-View-Controller):

-   **Model (TaskModel.js)**: Responsável pela lógica de negócios e interação com o banco de dados
-   **View**: Neste projeto, a view é representada pela API REST
-   **Controller (TaskController.js)**: Gerencia as requisições HTTP e coordena a interação entre Model e View

## Testes

Para executar os testes:

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

## Documentação

-   [WAD.md](documents/wad.md) - Documento de arquitetura web com detalhes sobre a estrutura do sistema, banco de dados e API
-   [README.md](README.md) - Este arquivo, contendo instruções de instalação e uso

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é parte do curso de Ciência da Computação do Inteli e está sujeito aos termos e condições da instituição.
