# Base do projeto: 
```
Boilerplate MVC em Node.js com PostgreSQL

Este projeto é um boilerplate básico para uma aplicação Node.js seguindo o padrão MVC (Model-View-Controller), utilizando PostgreSQL como banco de dados.
```

## Opção 1: Gerenciador de tarefas para organização e produtividade.

## Descrição do Sistema Escolhido
Este repositório contém um sistema de gerenciamento de tarefas que visa auxiliar na organização e aumentar a produtividade do usuário. O projeto utiliza Node.js com o padrão MVC e integra um banco de dados PostgreSQL para armazenar e manipular as informações.

## Estrutura de Pastas e Arquivos
A estrutura do projeto foi organizada para facilitar a manutenção e escalabilidade. Por exemplo:
- **/controllers:** Lógica de controle e manipulação de dados.
- **/models:** Definições de esquema e interação com o banco de dados.
- **/views:** Templates responsáveis pela interface do usuário.
- **/routes:** Definição das rotas da aplicação.
- **/config:** Arquivos de configuração e variáveis de ambiente.
- **/public:** Recursos estáticos, como CSS, JavaScript e imagens.

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

