// Task Manager Class
export class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
    
    // Get all tasks
    getTasks = () => {
        return this.tasks;
    }
    
    // Get a specific task by ID
    getTaskById = (id) => {
        return this.tasks.find(task => task.id === id);
    }
    
    // Add a new task
    addTask = (title) => {
        const newTask = {
            id: Date.now().toString(),
            title,
            completed: false,
            timestamp: new Date().toISOString()
        };
        
        this.tasks.push(newTask);
        this._saveTasks();
        return newTask;
    }
    
    // Update a task
    updateTask = (id, title) => {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].title = title;
            this._saveTasks();
            return true;
        }
        return false;
    }
    
    // Toggle task completion status
    toggleTaskCompletion = (id) => {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
            this._saveTasks();
            return true;
        }
        return false;
    }
    
    // Delete a task
    deleteTask = (id) => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this._saveTasks();
    }
    
    // Save tasks to localStorage
    _saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

// Schedule Manager Class
export class ScheduleManager {
    constructor() {
        this.schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    }
    
    // Get all schedules
    getSchedules = () => {
        return this.schedules;
    }
    
    // Get a specific schedule by ID
    getScheduleById = (id) => {
        return this.schedules.find(schedule => schedule.id === id);
    }
    
    // Add a new schedule
    addSchedule = (courseName, day, time, room) => {
        const newSchedule = {
            id: Date.now().toString(),
            courseName,
            day,
            time,
            room,
            timestamp: new Date().toISOString()
        };
        
        this.schedules.push(newSchedule);
        this._saveSchedules();
        return newSchedule;
    }
    
    // Update a schedule
    updateSchedule = (id, courseName, day, time, room) => {
        const scheduleIndex = this.schedules.findIndex(schedule => schedule.id === id);
        if (scheduleIndex !== -1) {
            this.schedules[scheduleIndex] = {
                ...this.schedules[scheduleIndex],
                courseName,
                day,
                time,
                room
            };
            this._saveSchedules();
            return true;
        }
        return false;
    }
    
    // Delete a schedule
    deleteSchedule = (id) => {
        this.schedules = this.schedules.filter(schedule => schedule.id !== id);
        this._saveSchedules();
    }
    
    // Save schedules to localStorage
    _saveSchedules = () => {
        localStorage.setItem('schedules', JSON.stringify(this.schedules));
    }
}

// Note Manager Class
export class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    }
    
    // Get all notes
    getNotes = () => {
        return this.notes;
    }
    
    // Get a specific note by ID
    getNoteById = (id) => {
        return this.notes.find(note => note.id === id);
    }
    
    // Add a new note
    addNote = (title, content) => {
        const newNote = {
            id: Date.now().toString(),
            title,
            content,
            timestamp: new Date().toISOString()
        };
        
        this.notes.push(newNote);
        this._saveNotes();
        return newNote;
    }
    
    // Update a note
    updateNote = (id, title, content) => {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            this.notes[noteIndex] = {
                ...this.notes[noteIndex],
                title,
                content,
                timestamp: new Date().toISOString() // Update timestamp when edited
            };
            this._saveNotes();
            return true;
        }
        return false;
    }
    
    // Delete a note
    deleteNote = (id) => {
        this.notes = this.notes.filter(note => note.id !== id);
        this._saveNotes();
    }
    
    // Save notes to localStorage
    _saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}