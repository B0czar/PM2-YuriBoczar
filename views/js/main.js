// Common utility functions
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(alertDiv);
        alert.close();
    }, 5000);
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    
    return true;
}

// API error handling
function handleApiError(error) {
    console.error('API Error:', error);
    showAlert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.', 'danger');
}

// Date formatting
function formatDate(dateString) {
    if (!dateString) return '';
    
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Status formatting
function formatStatus(status) {
    const statusMap = {
        'pendente': 'Pendente',
        'em_andamento': 'Em Andamento',
        'concluida': 'Concluída'
    };
    return statusMap[status] || status;
}

// Status badge class
function getStatusBadgeClass(status) {
    const classMap = {
        'pendente': 'bg-warning text-dark',
        'em_andamento': 'bg-info text-dark',
        'concluida': 'bg-success text-white'
    };
    return classMap[status] || 'bg-secondary text-white';
}

// Confirm dialog
function confirmAction(message) {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmação</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="confirmButton">Confirmar</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const modalInstance = new bootstrap.Modal(modal);
        
        modal.querySelector('#confirmButton').addEventListener('click', () => {
            modalInstance.hide();
            resolve(true);
        });
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
            resolve(false);
        });
        
        modalInstance.show();
    });
}

// Export functions for use in other scripts
window.appUtils = {
    showAlert,
    validateForm,
    handleApiError,
    formatDate,
    formatStatus,
    getStatusBadgeClass,
    confirmAction
}; 