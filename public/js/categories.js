// Função para carregar todas as categorias
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        
        if (data.success) {
            const tbody = document.querySelector('#categoriesTable tbody');
            if (!tbody) {
                console.error('Elemento #categoriesTable tbody não encontrado');
                return;
            }
            
            tbody.innerHTML = '';
            
            data.data.forEach(category => {
                tbody.innerHTML += `
                    <tr>
                        <td>${category.name}</td>
                        <td>${category.description || '-'}</td>
                        <td>
                            <button class="btn btn-sm btn-primary me-1" onclick="editCategory(${category.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteCategory(${category.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
        } else {
            showAlert('Erro ao carregar categorias: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao carregar categorias: ' + error.message, 'danger');
    }
}

// Função para salvar categoria (criar ou atualizar)
async function saveCategory(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const categoryData = {
        name: formData.get('name'),
        description: formData.get('description')
    };
    
    const categoryId = formData.get('categoryId');
    const url = categoryId ? `/api/categories/${categoryId}` : '/api/categories';
    const method = categoryId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Categoria salva com sucesso!', 'success');
            form.reset();
            form.querySelector('[name="categoryId"]').value = '';
            bootstrap.Modal.getInstance(document.getElementById('categoryModal')).hide();
            loadCategories();
        } else {
            showAlert('Erro ao salvar categoria: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao salvar categoria: ' + error.message, 'danger');
    }
}

// Função para editar categoria
async function editCategory(id) {
    try {
        const response = await fetch(`/api/categories/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const category = data.data;
            const form = document.getElementById('categoryForm');
            
            form.querySelector('[name="categoryId"]').value = category.id;
            form.querySelector('[name="name"]').value = category.name;
            form.querySelector('[name="description"]').value = category.description || '';
            
            const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
            modal.show();
        } else {
            showAlert('Erro ao carregar categoria: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao carregar categoria: ' + error.message, 'danger');
    }
}

// Função para deletar categoria
async function deleteCategory(id) {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('Categoria excluída com sucesso!', 'success');
            loadCategories();
        } else {
            showAlert('Erro ao excluir categoria: ' + data.error, 'danger');
        }
    } catch (error) {
        showAlert('Erro ao excluir categoria: ' + error.message, 'danger');
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

// Garantir que o DOM está carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function() {
    // Carregar categorias quando a página carregar
    loadCategories();
    
    // Adicionar validação ao formulário
    const form = document.getElementById('categoryForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    }
}); 