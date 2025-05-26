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

## Arquitetura

-   O projeto segue o padrão MVC (Model-View-Controller).
-   Veja o diagrama detalhado em [`documents/architecture.md`](documents/architecture.md).

## Documentação

-   [WAD.md](documents/wad.md) - Documento de arquitetura web com detalhes sobre a estrutura do sistema, banco de dados e API
-   [architecture.md](documents/architecture.md) - Diagrama detalhado da arquitetura do sistema, com fluxos, entidades e camadas
-   [README.md](README.md) - Este arquivo, contendo instruções de instalação e uso

## Estrutura do Projeto

```
.
├── assets/              # Arquivos estáticos e imagens
├── config/              # Configurações do projeto
│   └── database.js
├── controllers/         # Controladores da aplicação
│   ├── CategoryController.js
│   ├── TaskController.js
│   ├── TarefaController.js
│   └── userController.js
├── documents/           # Documentação do projeto
│   ├── architecture.md
│   └── wad.md
├── models/              # Modelos do banco de dados
│   ├── CategoryModel.js
│   ├── TaskModel.js
│   └── userModel.js
├── routes/              # Definição das rotas da API
│   ├── frontRoutes.js
│   ├── index.js
│   └── userRoutes.js
├── scripts/             # Scripts utilitários
│   ├── init.sql
│   └── runSQLScript.js
├── services/            # Serviços da aplicação
│   └── userService.js
├── tests/               # Testes automatizados
│   └── api_test_requests.md
├── views/               # Templates e views (subpastas: pages, css, layout, components)
├── node_modules/        # Dependências do Node.js
├── .gitignore
├── jest.config.js
├── package.json
├── package-lock.json
├── readme.md
├── server.js
```

## Funcionalidades

-   Gerenciamento de usuários (criação, listagem, atualização)
-   Gerenciamento de tarefas (criação, listagem, atualização, exclusão)
-   Gerenciamento de categorias
-   Organização de tarefas por usuário e categoria

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

Para documentação detalhada dos endpoints, consulte o arquivo [WAD.md](documents/wad.md).

## Testes

Para executar os testes:

```bash
# Executar todos os testes
yarn test
# Executar testes com coverage
yarn run test:coverage
# Executar testes em modo watch
yarn run test:watch
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é parte do curso de Ciência da Computação do Inteli e está sujeito aos termos e condições da instituição.

---

## Configuração do Ambiente

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

### Inicialização do Banco de Dados

```bash
npm run init-db
```

### Inicialização do Servidor

```bash
npm start
```
