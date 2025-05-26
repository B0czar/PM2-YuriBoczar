# Requisições de Teste para os Endpoints da API

## Endpoints de Usuários

### Criar Usuário (POST)

**URL:**

```
http://localhost:3000/api/users
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
    "name": "Usuário Teste",
    "email": "teste@exemplo.com"
}
```

### Listar Todos os Usuários (GET)

**URL:**

```
http://localhost:3000/api/users
```

### Atualizar Usuário (PUT)

**URL:**

```
http://localhost:3000/api/users/{user_id}
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
    "name": "Nome Atualizado",
    "email": "atualizado@exemplo.com"
}
```

### Excluir Usuário (DELETE)

**URL:**

```
http://localhost:3000/api/users/{user_id}
```

## Endpoints de Categorias

### Criar Categoria (POST)

**URL:**

```
http://localhost:3000/api/categories
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
    "name": "Categoria Teste"
}
```

### Listar Todas as Categorias (GET)

**URL:**

```
http://localhost:3000/api/categories
```

### Atualizar Categoria (PUT)

**URL:**

```
http://localhost:3000/api/categories/{category_id}
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
    "name": "Nome da Categoria Atualizado"
}
```

### Excluir Categoria (DELETE)

**URL:**

```
http://localhost:3000/api/categories/{category_id}
```

## Endpoints de Tarefas

### Criar Tarefa (POST)

**URL:**

```
http://localhost:3000/api/tasks
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
    "name": "Tarefa Teste",
    "description": "Esta é uma descrição de tarefa de teste",
    "status": "pendente",
    "user_id": "{user_id}",
    "category_id": "{category_id}",
    "due_date": "2024-12-31"
}
```

### Listar Todas as Tarefas (GET)

**URL:**

```
http://localhost:3000/api/tasks
```

### Atualizar Tarefa (PUT)

**URL:**

```
http://localhost:3000/api/tasks/{task_id}
```

**Headers:**

```
Content-Type: application/json
```

**Body (raw JSON):**

```json
{
    "name": "Nome da Tarefa Atualizado",
    "description": "Descrição atualizada da tarefa",
    "status": "concluida",
    "user_id": "{user_id}",
    "category_id": "{category_id}",
    "due_date": "2024-12-31"
}
```

### Excluir Tarefa (DELETE)

**URL:**

```
http://localhost:3000/api/tasks/{task_id}
```

## Observações

-   Substitua `{user_id}`, `{category_id}` e `{task_id}` pelos UUIDs reais do seu banco de dados
-   Todos os timestamps (created_at, updated_at) são gerenciados automaticamente pelo banco de dados
-   Certifique-se de criar um usuário e uma categoria antes de criar tarefas, pois são chaves estrangeiras obrigatórias
-   O campo status das tarefas deve ser um dos seguintes: "pendente", "em_andamento", "concluida" ou "cancelada"

## Como usar no Postman

1. Para cada requisição:
    - Copie a URL e cole no campo de URL do Postman
    - Selecione o método HTTP correto (POST, GET, PUT, DELETE)
    - Para requisições com body:
        - Vá na aba "Body"
        - Selecione "raw"
        - Selecione "JSON" no dropdown
        - Cole o conteúdo do Body (apenas o JSON, sem os marcadores ```json)
    - Para requisições com headers:
        - Vá na aba "Headers"
        - Adicione o header Content-Type: application/json

## Dicas para evitar erros

1. Certifique-se de copiar apenas o conteúdo JSON, sem os marcadores de código
2. Não deixe espaços extras ou caracteres invisíveis
3. Verifique se todas as chaves e aspas estão corretamente fechadas
4. Se o erro persistir, tente criar um novo request no Postman e copiar o JSON novamente
