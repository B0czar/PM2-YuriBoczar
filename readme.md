# Gerenciador de Tarefas

Um sistema de gerenciamento de tarefas desenvolvido com Node.js, Express e PostgreSQL, seguindo a arquitetura MVC.

## Tecnologias Utilizadas

-   Node.js
-   Express.js
-   PostgreSQL
-   pg (cliente PostgreSQL para Node.js)
-   dotenv (gerenciamento de variáveis de ambiente)

## Estrutura do Projeto

```
.
├── config/
│   └── database.js      # Configuração do banco de dados
├── controllers/
│   └── TaskController.js # Controlador de tarefas
├── models/
│   └── TaskModel.js     # Modelo de tarefas
├── routes/
│   └── index.js         # Definição das rotas
├── scripts/
│   └── init.sql         # Script de inicialização do banco
├── .env                 # Variáveis de ambiente
├── package.json
└── server.js           # Ponto de entrada da aplicação
```

## Configuração do Ambiente

1. Clone o repositório:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```
    DB_HOST=seu_host
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=nome_do_banco
    ```

4. Inicialize o banco de dados:

    ```bash
    npm run init-db
    ```

5. Inicie o servidor:
    ```bash
    npm start
    ```

## API Endpoints

### Tarefas

-   `POST /api/tasks` - Criar uma nova tarefa

    ```json
    {
        "title": "Título da tarefa",
        "description": "Descrição da tarefa",
        "status": "pending",
        "user_id": "uuid-do-usuario",
        "category_id": "uuid-da-categoria",
        "due_date": "2024-03-20"
    }
    ```

-   `GET /api/tasks` - Listar todas as tarefas

-   `GET /api/tasks/:id` - Buscar uma tarefa específica

-   `PUT /api/tasks/:id` - Atualizar uma tarefa

    ```json
    {
        "title": "Novo título",
        "description": "Nova descrição",
        "status": "completed",
        "user_id": "uuid-do-usuario",
        "category_id": "uuid-da-categoria",
        "due_date": "2024-03-21"
    }
    ```

-   `DELETE /api/tasks/:id` - Deletar uma tarefa

-   `GET /api/users/:userId/tasks` - Listar tarefas de um usuário específico

## Arquitetura MVC

O projeto segue a arquitetura MVC (Model-View-Controller):

-   **Model (TaskModel.js)**: Responsável pela lógica de negócios e interação com o banco de dados
-   **View**: Neste projeto, a view é representada pela API REST
-   **Controller (TaskController.js)**: Gerencia as requisições HTTP e coordena a interação entre Model e View

## Testes

Para executar os testes:

```bash
npm test
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request
