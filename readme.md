# Base do projeto: 
```
Boilerplate MVC em Node.js com PostgreSQL

Este projeto é um boilerplate básico para uma aplicação Node.js seguindo o padrão MVC (Model-View-Controller), utilizando PostgreSQL como banco de dados.
```

## Opção 1: Gerenciador de tarefas para organização e produtividade.

## Descrição do Sistema Escolhido
Este repositório contém um sistema de gerenciamento de tarefas que visa auxiliar na organização e aumentar a produtividade do usuário. O projeto utiliza Node.js com o padrão MVC e integra um banco de dados PostgreSQL para armazenar e manipular as informações.

## Estrutura de Pastas e Arquivos
```
PM2-YURIBOCZAR/
├── config/
│ └── db.js # Conexão e configuração do banco de dados
│
├── assets/    
|   └── modelo-banco.png # Diagrama relacional exportado
|
├── controllers/
│ ├── eventController.js # Lógica de eventos (criar, listar, detalhes)
│ └── userController.js # Lógica de usuários e autenticação
│
├── models/
│ ├── eventModel.js # Definição das tabelas de evento
│ ├── userModel.js # Definição da tabela de usuário
│ └── ... # demais modelos (reminders, attendees, etc.)
│
├── routes/
│ ├── eventRoutes.js # Endpoints relacionados a eventos
│ ├── userRoutes.js # Endpoints de usuário e integração
│ └── index.js # Importa todas as rotas no Express
│
├── services/
│ └── calendarService.js # Comunicação com APIs externas (Google, Outlook)
│
├── documents/
| └── WAD.md # Wireframes e diagrama de dados
|
├── views/
│ ├── layouts/ # Cabeçalho, rodapé e templates gerais (.ejs)
│ └── pages/ # dashboard.ejs, details.ejs, login.ejs…
│
├── public/
│ ├── assets/ # Imagens, ícones
│ ├── scripts/ # JS do front-end
│ └── styles/ # CSS / SCSS
│
├── tests/
│ └── example.test.js # Testes unitários (Jest)
│
├── .gitignore
├── .env.example # Variáveis de ambiente (sem valores reais)
├── jest.config.js
├── package.json
├── package-lock.json
├── server.js # Pontapé inicial do Express
├── rest.http # Coleção para testar endpoints
├── README.md # Este documento

```

## Como Executar o Projeto Localmente
Siga os passos abaixo para rodar o projeto em seu ambiente:
1. Clone o repositório:
    ```
    git clone <URL_DO_REPOSITORIO>
    ```
2. Instale as dependências:
    ```
    npm install
    ```
3. Configure as variáveis de ambiente, criando um arquivo `.env` com as configurações necessárias (como dados do PostgreSQL e porta do servidor).
4. Execute as migrações do banco de dados, se aplicável:
    ```
    npm run migrate
    ```
5. Inicie o servidor:
    ```
    npm start
    ```
6. Acesse a aplicação através do seu navegador, utilizando a URL e a porta configuradas.

