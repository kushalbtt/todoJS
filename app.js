

class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.tasksList = document.getElementById('tasksList');
        this.taskCount = document.getElementById('taskCount');
        
        this.initializeEventListeners();
        this.renderTasks();
    }

    initializeEventListeners() {
       
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        
        
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        
        this.taskInput.addEventListener('focus', () => {
            this.taskInput.style.borderColor = '#667eea';
        });

        this.taskInput.addEventListener('blur', () => {
            this.taskInput.style.borderColor = '#e1e5e9';
        });
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (taskText === '') {
            this.showNotification('Please enter a task!', 'error');
            return;
        }

        if (taskText.length > 100) {
            this.showNotification('Task is too long! Maximum 100 characters.', 'error');
            return;
        }

        
        this.todos.push(taskText);
        
        
        this.saveToLocalStorage();
        
        
        this.taskInput.value = '';
        
        
        this.renderTasks();
        
        
        this.showNotification(`Task Added: ${taskText}`, 'success');
        
        
        this.taskInput.focus();
    }

    deleteTask(index) {
        const taskText = this.todos[index];
        this.todos.splice(index, 1);
        this.saveToLocalStorage();
        this.renderTasks();
        this.showNotification(`Task deleted: ${taskText}`, 'info');
    }

    renderTasks() {
        
        this.taskCount.textContent = `${this.todos.length} task${this.todos.length !== 1 ? 's' : ''}`;
        
        if (this.todos.length === 0) {
            this.tasksList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No tasks yet. Add your first task above!</p>
                </div>
            `;
            return;
        }

        
        this.tasksList.innerHTML = this.todos.map((task, index) => `
            <div class="task-item" data-index="${index}">
                <div class="task-text">
                    <strong>${index + 1}.</strong> ${this.escapeHtml(task)}
                </div>
                <div class="task-actions">
                    <button class="btn btn-danger" onclick="todoApp.deleteTask(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
       
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#667eea'
        };
        return colors[type] || '#667eea';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});


document.addEventListener('keydown', (e) => {
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        todoApp.addTask();
    }
    
    
    if (e.key === 'Escape') {
        todoApp.taskInput.value = '';
        todoApp.taskInput.blur();
    }
}); 
