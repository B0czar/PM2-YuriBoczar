// Common utility functions
const appUtils = {
    showAlert(message, type = 'success') {
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
    },

    validateForm(formId) {
        const form = document.getElementById(formId);
        if (!form) return true;
        
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return false;
        }
        
        return true;
    },

    handleApiError(error) {
        console.error('API Error:', error);
        this.showAlert('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.', 'danger');
    },

    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    },

    formatStatus(status) {
        const statusMap = {
            'pendente': 'Pendente',
            'em_andamento': 'Em Andamento',
            'concluida': 'Concluída'
        };
        return statusMap[status] || status;
    },

    // New utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    getStatusBadgeClass(status) {
        const statusMap = {
            'pendente': 'status-pendente',
            'em_andamento': 'status-em_andamento',
            'concluida': 'status-concluida'
        };
        return statusMap[status] || 'status-pendente';
    },

    confirmAction(message = 'Tem certeza que deseja realizar esta ação?') {
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
};

// Export for use in other scripts
window.appUtils = appUtils; 