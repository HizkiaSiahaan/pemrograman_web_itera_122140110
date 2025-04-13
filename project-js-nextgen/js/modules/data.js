export class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
    
    getTasks = () => {
        return this.tasks;
    }
    
    getTaskById = (id) => {
        return this.tasks.find(task => task.id === id);
    }
    
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
    
    updateTask = (id, title) => {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].title = title;
            this._saveTasks();
            return true;
        }
        return false;
    }
    
    toggleTaskCompletion = (id) => {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
            this._saveTasks();
            return true;
        }
        return false;
    }
    
    deleteTask = (id) => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this._saveTasks();
    }
    
    _saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

export class ScheduleManager {
    constructor() {
        this.schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    }
    
    getSchedules = () => {
        return this.schedules;
    }
    
    getScheduleById = (id) => {
        return this.schedules.find(schedule => schedule.id === id);
    }
    
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
    
    deleteSchedule = (id) => {
        this.schedules = this.schedules.filter(schedule => schedule.id !== id);
        this._saveSchedules();
    }
    
    _saveSchedules = () => {
        localStorage.setItem('schedules', JSON.stringify(this.schedules));
    }
}

export class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    }
    
    getNotes = () => {
        return this.notes;
    }
    
    getNoteById = (id) => {
        return this.notes.find(note => note.id === id);
    }
    
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
    
    updateNote = (id, title, content) => {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            this.notes[noteIndex] = {
                ...this.notes[noteIndex],
                title,
                content,
                timestamp: new Date().toISOString()
            };
            this._saveNotes();
            return true;
        }
        return false;
    }
    
    deleteNote = (id) => {
        this.notes = this.notes.filter(note => note.id !== id);
        this._saveNotes();
    }
    
    _saveNotes = () => {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }
}