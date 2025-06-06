// Função para carregar todas as tarefas
async function loadTasks() {
    try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        
        if (data.success) {
            const tbody = document.querySelector('#tasksTable tbody');
            tbody.innerHTML = '';
            
            data.data.forEach(task => {
                tbody.innerHTML += `
                    <tr>
                        <td>${task.title}</td>
                        <td>${task.description || '-'}</td>
                        <td>${task.status}</td>
                        <td>${task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}</td>
                        <td>
                            <button class="btn btn-sm btn-primary me-1" onclick="editTask(${task.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteTask(${task.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        } else {
            showAlert('Erro ao carregar tarefas: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao carregar tarefas: ' + error.message, 'danger');
    }
}

// Função para salvar tarefa (criar ou atualizar)
async function saveTask(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const taskData = {
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status'),
        due_date: formData.get('due_date'),
        category_id: formData.get('category_id'),
        user_id: formData.get('user_id')
    };
    
    const taskId = formData.get('taskId');
    const url = taskId ? `/api/tasks/${taskId}` : '/api/tasks';
    const method = taskId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Tarefa salva com sucesso!', 'success');
            form.reset();
            form.querySelector('[name="taskId"]').value = '';
            bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
            loadTasks();
        } else {
            showAlert('Erro ao salvar tarefa: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao salvar tarefa: ' + error.message, 'danger');
    }
}

// Função para editar tarefa
async function editTask(id) {
    try {
        const response = await fetch(`/api/tasks/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const task = data.data;
            const form = document.getElementById('taskForm');
            
            form.querySelector('[name="taskId"]').value = task.id;
            form.querySelector('[name="title"]').value = task.title;
            form.querySelector('[name="description"]').value = task.description || '';
            form.querySelector('[name="status"]').value = task.status;
            form.querySelector('[name="due_date"]').value = task.due_date ? task.due_date.split('T')[0] : '';
            form.querySelector('[name="category_id"]').value = task.category_id || '';
            form.querySelector('[name="user_id"]').value = task.user_id || '';
            
            const modal = new bootstrap.Modal(document.getElementById('taskModal'));
            modal.show();
        } else {
            showAlert('Erro ao carregar tarefa: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao carregar tarefa: ' + error.message, 'danger');
    }
}

// Função para deletar tarefa
async function deleteTask(id) {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Tarefa excluída com sucesso!', 'success');
            loadTasks();
        } else {
            showAlert('Erro ao excluir tarefa: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao excluir tarefa: ' + error.message, 'danger');
    }
}

// Função para mostrar alertas
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Carregar tarefas quando a página carregar
document.addEventListener('DOMContentLoaded', loadTasks); 