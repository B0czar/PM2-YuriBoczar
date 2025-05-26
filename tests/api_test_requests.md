# Test Requests for API Endpoints

## Users Endpoints

### Create User (POST)
POST http://localhost:3000/api/users
Content-Type: application/json

{
    "name": "Test User",
    "email": "test@example.com"
}

### List All Users (GET)
GET http://localhost:3000/api/users

### Update User (PUT)
PUT http://localhost:3000/api/users/{user_id}
Content-Type: application/json

{
    "name": "Updated User Name",
    "email": "updated@example.com"
}

### Delete User (DELETE)
DELETE http://localhost:3000/api/users/{user_id}

## Categories Endpoints

### Create Category (POST)
POST http://localhost:3000/api/categories
Content-Type: application/json

{
    "name": "Test Category"
}

### List All Categories (GET)
GET http://localhost:3000/api/categories

### Update Category (PUT)
PUT http://localhost:3000/api/categories/{category_id}
Content-Type: application/json

{
    "name": "Updated Category Name"
}

### Delete Category (DELETE)
DELETE http://localhost:3000/api/categories/{category_id}

## Tasks Endpoints

### Create Task (POST)
POST http://localhost:3000/api/tasks
Content-Type: application/json

{
    "name": "Test Task",
    "description": "This is a test task description",
    "status": "pending",
    "user_id": "{user_id}",
    "category_id": "{category_id}",
    "due_date": "2024-12-31"
}

### List All Tasks (GET)
GET http://localhost:3000/api/tasks

### Update Task (PUT)
PUT http://localhost:3000/api/tasks/{task_id}
Content-Type: application/json

{
    "name": "Updated Task Name",
    "description": "Updated task description",
    "status": "completed",
    "user_id": "{user_id}",
    "category_id": "{category_id}",
    "due_date": "2024-12-31"
}

### Delete Task (DELETE)
DELETE http://localhost:3000/api/tasks/{task_id}

Notes:
- Replace {user_id}, {category_id}, and {task_id} with actual UUIDs from your database
- All timestamps (created_at, updated_at) are automatically handled by the database
- Make sure to create a user and category before creating tasks, as they are required foreign keys
- The status field in tasks should be one of: "pending", "in_progress", "completed", or "cancelled" 