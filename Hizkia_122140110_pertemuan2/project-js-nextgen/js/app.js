// Main entry point for the application
import { TaskManager } from './modules/data.js';
import { ScheduleManager } from './modules/data.js';
import { NoteManager } from './modules/data.js';
import { createElementWithClass, formatDate } from './modules/utils.js';
import { initApp } from './main.js';

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});