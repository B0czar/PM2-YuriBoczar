// Função para carregar todos os usuários
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        if (data.success) {
            const tbody = document.querySelector('#usersTable tbody');
            tbody.innerHTML = '';
            
            data.data.forEach(user => {
                tbody.innerHTML += `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.role || 'Usuário'}</td>
                        <td>
                            <button class="btn btn-sm btn-primary me-1" onclick="editUser(${user.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        } else {
            showAlert('Erro ao carregar usuários: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao carregar usuários: ' + error.message, 'danger');
    }
}

// Função para salvar usuário (criar ou atualizar)
async function saveUser(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const userData = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: formData.get('role')
    };
    
    const userId = formData.get('userId');
    const url = userId ? `/api/users/${userId}` : '/api/users';
    const method = userId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Usuário salvo com sucesso!', 'success');
            form.reset();
            form.querySelector('[name="userId"]').value = '';
            bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
            loadUsers();
        } else {
            showAlert('Erro ao salvar usuário: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao salvar usuário: ' + error.message, 'danger');
    }
}

// Função para editar usuário
async function editUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const user = data.data;
            const form = document.getElementById('userForm');
            
            form.querySelector('[name="userId"]').value = user.id;
            form.querySelector('[name="name"]').value = user.name;
            form.querySelector('[name="email"]').value = user.email;
            form.querySelector('[name="role"]').value = user.role || 'user';
            
            const modal = new bootstrap.Modal(document.getElementById('userModal'));
            modal.show();
        } else {
            showAlert('Erro ao carregar usuário: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao carregar usuário: ' + error.message, 'danger');
    }
}

// Função para deletar usuário
async function deleteUser(id) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Usuário excluído com sucesso!', 'success');
            loadUsers();
        } else {
            showAlert('Erro ao excluir usuário: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao excluir usuário: ' + error.message, 'danger');
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

// Carregar usuários quando a página carregar
document.addEventListener('DOMContentLoaded', loadUsers); 