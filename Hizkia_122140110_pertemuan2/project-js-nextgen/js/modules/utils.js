// Utility function to create an element with a class
export const createElementWithClass = (tag, className) => {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    return element;
};

// Format date for display
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

// Generate unique ID
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Helper function to show simple notification
export const showNotification = async (message, type = 'info') => {
    // Create notification element
    const notification = createElementWithClass('div', `notification ${type}`);
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 3 seconds
    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        notification.classList.remove('show');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    } catch (error) {
        console.error('Notification error:', error);
    }
};

// Add loading indicator to button during async operations
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

// Debounce function to limit how often a function can be called
export const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};