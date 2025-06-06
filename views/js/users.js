// User management functions
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        
        if (data.success) {
            const tbody = document.querySelector('#usersTable tbody');
            tbody.innerHTML = '';
            
            data.data.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.role || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editUser(${user.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteUser(${user.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            appUtils.showAlert('Erro ao carregar usuários', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function saveUser(event) {
    event.preventDefault();
    
    if (!appUtils.validateForm('userForm')) return;
    
    const formData = new FormData(event.target);
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
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            appUtils.showAlert(`Usuário ${userId ? 'atualizado' : 'criado'} com sucesso!`);
            bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
            loadUsers();
        } else {
            appUtils.showAlert(data.message || 'Erro ao salvar usuário', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function editUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const user = data.data;
            const form = document.getElementById('userForm');
            
            form.userId.value = user.id;
            form.name.value = user.name;
            form.email.value = user.email;
            form.role.value = user.role || '';
            form.password.value = ''; // Clear password field for security
            
            const modal = new bootstrap.Modal(document.getElementById('userModal'));
            modal.show();
        } else {
            appUtils.showAlert('Erro ao carregar usuário', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function deleteUser(id) {
    const confirmed = await appUtils.confirmAction('Tem certeza que deseja excluir este usuário?');
    
    if (!confirmed) return;
    
    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            appUtils.showAlert('Usuário excluído com sucesso!');
            loadUsers();
        } else {
            appUtils.showAlert(data.message || 'Erro ao excluir usuário', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    
    // Form reset on modal close
    document.getElementById('userModal').addEventListener('hidden.bs.modal', () => {
        document.getElementById('userForm').reset();
        document.getElementById('userForm').userId.value = '';
        document.getElementById('userForm').classList.remove('was-validated');
    });
}); 