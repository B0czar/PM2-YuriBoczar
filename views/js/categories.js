// Category management functions
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        
        if (data.success) {
            const tbody = document.querySelector('#categoriesTable tbody');
            tbody.innerHTML = '';
            
            data.data.forEach(category => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${category.name}</td>
                    <td>${category.description || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary" onclick="editCategory(${category.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteCategory(${category.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            appUtils.showAlert('Erro ao carregar categorias', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function saveCategory(event) {
    event.preventDefault();
    
    if (!appUtils.validateForm('categoryForm')) return;
    
    const formData = new FormData(event.target);
    const categoryData = {
        name: formData.get('name'),
        description: formData.get('description')
    };
    
    const categoryId = formData.get('categoryId');
    const url = categoryId ? `/api/categories/${categoryId}` : '/api/categories';
    const method = categoryId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            appUtils.showAlert(`Categoria ${categoryId ? 'atualizada' : 'criada'} com sucesso!`);
            bootstrap.Modal.getInstance(document.getElementById('categoryModal')).hide();
            loadCategories();
        } else {
            appUtils.showAlert(data.message || 'Erro ao salvar categoria', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function editCategory(id) {
    try {
        const response = await fetch(`/api/categories/${id}`);
        const data = await response.json();
        
        if (data.success) {
            const category = data.data;
            const form = document.getElementById('categoryForm');
            
            form.categoryId.value = category.id;
            form.name.value = category.name;
            form.description.value = category.description || '';
            
            const modal = new bootstrap.Modal(document.getElementById('categoryModal'));
            modal.show();
        } else {
            appUtils.showAlert('Erro ao carregar categoria', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

async function deleteCategory(id) {
    const confirmed = await appUtils.confirmAction('Tem certeza que deseja excluir esta categoria?');
    
    if (!confirmed) return;
    
    try {
        const response = await fetch(`/api/categories/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            appUtils.showAlert('Categoria excluída com sucesso!');
            loadCategories();
        } else {
            appUtils.showAlert(data.message || 'Erro ao excluir categoria', 'danger');
        }
    } catch (error) {
        appUtils.handleApiError(error);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    
    // Form reset on modal close
    document.getElementById('categoryModal').addEventListener('hidden.bs.modal', () => {
        document.getElementById('categoryForm').reset();
        document.getElementById('categoryForm').categoryId.value = '';
        document.getElementById('categoryForm').classList.remove('was-validated');
    });
}); 