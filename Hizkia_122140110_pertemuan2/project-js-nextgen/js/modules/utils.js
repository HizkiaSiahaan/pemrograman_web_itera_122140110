export const createElementWithClass = (tag, className) => {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    return element;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const showNotification = async (message, type = 'info') => {
    const notification = createElementWithClass('div', `notification ${type}`);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        notification.classList.remove('show');
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    } catch (error) {
        console.error('Notification error:', error);
    }
};

export const buttonLoadingState = (button, isLoading = true) => {
    const originalText = button.textContent;
    
    if (isLoading) {
        button.disabled = true;
        const loadingSpinner = createElementWithClass('span', 'loading');
        button.textContent = '';
        button.appendChild(loadingSpinner);
        button.dataset.originalText = originalText;
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || originalText;
    }
    
    return originalText;
};

export const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};