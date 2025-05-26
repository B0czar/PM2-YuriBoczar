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
        render[Render\n(Composição de páginas HTML)]

        %% Views
        subgraph Views
            viewList[List]
            viewHeader[Header]
            viewCarrossel[Carrossel]
            viewForm[Form]
        end

        %% Controllers
        subgraph Controllers
            ctrlUsers[Users\n- Listar\n- Gravar\n- Deletar\n- Procurar]
            ctrlTasks[Tasks\n- Listar\n- Gravar\n- Deletar\n- Procurar]
            ctrlCategories[Categories\n- Listar\n- Gravar\n- Deletar\n- Procurar]
        end

        %% Models
        subgraph Models
            modelUser[User\nid\nnome\nemail]
            modelTask[Task\nid\ntitle\ndescription\nstatus\nuserId\ncategoryId]
            modelCategory[Category\nid\nname]
        end
    end

    %% Banco de Dados
    subgraph Banco_de_Dados
        db[(PostgreSQL)]
    end

    %% Fluxo Cliente -> Servidor
    browser -- HTTP Request --> render
    render -- Renderiza --> viewList
    render -- Renderiza --> viewHeader
    render -- Renderiza --> viewCarrossel
    render -- Renderiza --> viewForm

    %% Views -> Controllers
    viewList -- Chama --> ctrlTasks
    viewHeader -- Chama --> ctrlUsers
    viewCarrossel -- Chama --> ctrlTasks
    viewForm -- Chama --> ctrlTasks

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
-   **Views**: Componentes de apresentação (List, Header, Carrossel, Form).
-   **Controllers**: Implementam a lógica de negócio, recebem requisições, validam dados e coordenam as operações (Users, Tasks, Categories).
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
