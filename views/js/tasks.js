// Task management functions
async function loadTasks() {
    try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        
        if (data.success) {
            const tbody = document.querySelector('#tasksTable tbody');
            tbody.innerHTML = '';
            
            data.data.forEach(task => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${task.name}</td>
                    <td>${task.description || '-'}</td>
                    <td><span class="badge ${appUtils.getStatusBadgeClass(task.status)}">${appUtils.formatStatus(task.status)}</span></td>
                    <td>${task.category_name || '-'}</td>
                    <td>${appUtils.formatDate(task.due_date)}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editTask(${task.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            appUtils.showAlert('Erro ao carregar tarefas', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        
        if (data.success) {
            const select = document.getElementById('categoryId');
            select.innerHTML = '<option value="">Selecione uma categoria</option>';
            
            data.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function saveTask(event) {
    event.preventDefault();
    
    if (!appUtils.validateForm('taskForm')) return;
    
    const formData = new FormData(event.target);
    const taskData = {
        name: formData.get('name'),
        description: formData.get('description'),
        status: formData.get('status'),
        category_id: formData.get('categoryId'),
        due_date: formData.get('dueDate')
    };
    
    const taskId = formData.get('taskId');
    const url = taskId ? `/api/tasks/${taskId}` : '/api/tasks';
    const method = taskId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            appUtils.showAlert(`Tarefa ${taskId ? 'atualizada' : 'criada'} com sucesso!`);
            bootstrap.Modal.getInstance(document.getElementById('taskModal')).hide();
            loadTasks();
        } else {
            appUtils.showAlert(data.message || 'Erro ao salvar tarefa', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function editTask(id) {
    try {
        const response = await fetch(`/api/tasks/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const task = data.data;
            const form = document.getElementById('taskForm');
            
            form.taskId.value = task.id;
            form.name.value = task.name;
            form.description.value = task.description || '';
            form.status.value = task.status;
            form.categoryId.value = task.category_id || '';
            form.dueDate.value = task.due_date ? task.due_date.split('T')[0] : '';
            
            const modal = new bootstrap.Modal(document.getElementById('taskModal'));
            modal.show();
        } else {
            appUtils.showAlert('Erro ao carregar tarefa', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function deleteTask(id) {
    const confirmed = await appUtils.confirmAction('Tem certeza que deseja excluir esta tarefa?');
    
    if (!confirmed) return;
    
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            appUtils.showAlert('Tarefa excluída com sucesso!');
            loadTasks();
        } else {
            appUtils.showAlert(data.message || 'Erro ao excluir tarefa', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadCategories();
    
    // Form reset on modal close
    document.getElementById('taskModal').addEventListener('hidden.bs.modal', () => {
        document.getElementById('taskForm').reset();
        document.getElementById('taskForm').taskId.value = '';
        document.getElementById('taskForm').classList.remove('was-validated');
    });
}); 