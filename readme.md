# Gerenciador de Tarefas

Um sistema de gerenciamento de tarefas desenvolvido como parte do projeto individual do Módulo 2 do curso de Ciência da Computação do Inteli. O sistema é construído com Node.js, Express e PostgreSQL, seguindo a arquitetura MVC. Permite o gerenciamento completo de tarefas, incluindo criação, atualização, exclusão e consulta de tarefas, além de suporte a categorias e usuários.

## Tecnologias Utilizadas

- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL
  - pg (cliente PostgreSQL para Node.js)
  - dotenv (gerenciamento de variáveis de ambiente)
  - UUID (para geração de IDs únicos)

- **Testes**:
  - Jest (framework de testes)
  - Supertest (para testes de API)

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

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
    ```
    DB_HOST=seu_host
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_DATABASE=nome_do_banco
    PORT=3000
    NODE_ENV=development
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

### Usuários (Users)

- `POST /api/users` - Criar um novo usuário
- `GET /api/users` - Listar todos os usuários
- `GET /api/users/:id` - Buscar um usuário específico
- `PUT /api/users/:id` - Atualizar um usuário

### Tarefas (Tasks)

- `POST /api/tasks` - Criar uma nova tarefa
- `GET /api/tasks` - Listar todas as tarefas
- `GET /api/tasks/:id` - Buscar uma tarefa específica
- `PUT /api/tasks/:id` - Atualizar uma tarefa
- `DELETE /api/tasks/:id` - Deletar uma tarefa
- `GET /api/users/:userId/tasks` - Listar tarefas de um usuário específico

### Categorias (Categories)

- `POST /api/categories` - Criar uma nova categoria
- `GET /api/categories` - Listar todas as categorias
- `GET /api/categories/:id` - Buscar uma categoria específica
- `PUT /api/categories/:id` - Atualizar uma categoria
- `DELETE /api/categories/:id` - Deletar uma categoria

Para documentação detalhada dos endpoints, incluindo formatos de requisição e resposta, consulte o arquivo [WAD.md](documents/wad.md).

## Arquitetura MVC

O projeto segue a arquitetura MVC (Model-View-Controller):

- **Model (TaskModel.js)**: Responsável pela lógica de negócios e interação com o banco de dados
- **View**: Neste projeto, a view é representada pela API REST
- **Controller (TaskController.js)**: Gerencia as requisições HTTP e coordena a interação entre Model e View

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

- [WAD.md](documents/wad.md) - Documento de arquitetura web com detalhes sobre a estrutura do sistema, banco de dados e API
- [README.md](README.md) - Este arquivo, contendo instruções de instalação e uso

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é parte do curso de Ciência da Computação do Inteli e está sujeito aos termos e condições da instituição.
