# Arquitetura MVC do Sistema de Gerenciamento de Tarefas

```mermaid
flowchart TB
    %% Cliente
    subgraph Cliente
        user[Usuário]
        browser[Navegador Web]
        user -- Interage --> browser
    end

    %% Servidor
    subgraph Servidor
        render[Render<br>Composicao de paginas HTML]

        %% Views
        subgraph Views
            viewTaskList[TaskList]
            viewTaskForm[TaskForm]
            viewUserList[UserList]
            viewCategoryList[CategoryList]
        end

        %% Controllers
        subgraph Controllers
            ctrlUsers[UsersController<br>- Listar<br>- Gravar<br>- Deletar<br>- Procurar]
            ctrlTasks[TasksController<br>- Listar<br>- Gravar<br>- Deletar<br>- Procurar]
            ctrlCategories[CategoriesController<br>- Listar<br>- Gravar<br>- Deletar<br>- Procurar]
        end

        %% Models
        subgraph Models
            modelUser[User<br>id<br>nome<br>email]
            modelTask[Task<br>id<br>name<br>description<br>status<br>userId<br>categoryId]
            modelCategory[Category<br>id<br>name]
        end
    end

    %% Banco de Dados
    subgraph Banco_de_Dados
        db[(PostgreSQL)]
    end

    %% Fluxo Cliente -> Servidor
    browser -- HTTP Request --> render
    render -- Renderiza --> viewTaskList
    render -- Renderiza --> viewTaskForm
    render -- Renderiza --> viewUserList
    render -- Renderiza --> viewCategoryList

    %% Views -> Controllers
    viewTaskList -- Chama --> ctrlTasks
    viewTaskForm -- Chama --> ctrlTasks
    viewUserList -- Chama --> ctrlUsers
    viewCategoryList -- Chama --> ctrlCategories

    %% Controllers -> Models
    ctrlUsers -- CRUD --> modelUser
    ctrlTasks -- CRUD --> modelTask
    ctrlCategories -- CRUD --> modelCategory

    %% Models -> Banco de Dados
    modelUser -- SQL --> db
    modelTask -- SQL --> db
    modelCategory -- SQL --> db
```

## Descrição dos Componentes

### Cliente

-   **Usuário**: Pessoa que interage com o sistema via navegador ou ferramenta de API.
-   **Navegador Web**: Interface HTTP para o usuário.

### Servidor (Node.js/Express)

-   **Render**: Responsável por compor e devolver as páginas HTML (ou respostas da API).
-   **Views**: Componentes de apresentação (TaskList, TaskForm, UserList, CategoryList).
-   **Controllers**: Implementam a lógica de negócio, recebem requisições, validam dados e coordenam as operações (UsersController, TasksController, CategoriesController).
-   **Models**: Representam as entidades do banco de dados e executam operações SQL (User, Task, Category).

### Banco de Dados

-   **PostgreSQL**: Armazena dados persistentes das entidades (Users, Tasks, Categories).

## Fluxo de Dados

1. Usuário interage com o Navegador Web.
2. Navegador faz requisições HTTP para o Servidor.
3. Render compõe a resposta e aciona as Views.
4. Views acionam os Controllers conforme a ação.
5. Controllers processam a lógica e interagem com os Models.
6. Models executam operações no Banco de Dados.
7. Respostas são devolvidas ao Navegador e apresentadas ao Usuário.
