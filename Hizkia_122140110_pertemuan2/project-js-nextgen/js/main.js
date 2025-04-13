import { TaskManager, ScheduleManager, NoteManager } from './modules/data.js';
import { createElementWithClass, formatDate } from './modules/utils.js';

// Initialize task, schedule, and note managers
const taskManager = new TaskManager();
const scheduleManager = new ScheduleManager();
const noteManager = new NoteManager();

// Function to initialize the application
export const initApp = () => {
    // Initialize all components
    initTasks();
    initSchedule();
    initNotes();
};

// Task Section Functionality
const initTasks = () => {
    const tasksList = document.getElementById('tasks-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');

    // Render existing tasks
    const renderTasks = () => {
        tasksList.innerHTML = '';
        
        taskManager.getTasks().forEach(task => {
            const taskItem = createElementWithClass('li', 'task-item');
            
            const taskContent = document.createElement('div');
            taskContent.className = `task-content ${task.completed ? 'task-complete' : ''}`;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                toggleTaskCompletion(task.id);
            });
            
            const taskText = document.createElement('span');
            taskText.textContent = task.title;
            
            taskContent.appendChild(checkbox);
            taskContent.appendChild(taskText);
            
            const actionBtns = document.createElement('div');
            
            const editBtn = createElementWithClass('button', 'edit-btn');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => {
                editTask(task.id);
            });
            
            const deleteBtn = createElementWithClass('button', 'delete-btn');
            deleteBtn.textContent = 'Hapus';
            deleteBtn.addEventListener('click', () => {
                deleteTask(task.id);
            });
            
            actionBtns.appendChild(editBtn);
            actionBtns.appendChild(deleteBtn);
            
            taskItem.appendChild(taskContent);
            taskItem.appendChild(actionBtns);
            
            tasksList.appendChild(taskItem);
        });
    };

    // Toggle task completion status
    const toggleTaskCompletion = (taskId) => {
        taskManager.toggleTaskCompletion(taskId);
        renderTasks();
    };

    // Delete a task
    const deleteTask = (taskId) => {
        taskManager.deleteTask(taskId);
        renderTasks();
    };

    // Edit a task
    const editTask = (taskId) => {
        const task = taskManager.getTaskById(taskId);
        if (task) {
            const newTitle = prompt('Edit tugas:', task.title);
            if (newTitle !== null && newTitle.trim() !== '') {
                taskManager.updateTask(taskId, newTitle);
                renderTasks();
            }
        }
    };

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskTitle = newTaskInput.value.trim();
        if (taskTitle) {
            taskManager.addTask(taskTitle);
            newTaskInput.value = '';
            renderTasks();
        }
    });

    // Add task on Enter key
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    // Initial render
    renderTasks();
};

// Schedule Section Functionality
const initSchedule = () => {
    const scheduleList = document.getElementById('schedule-list');
    const courseNameInput = document.getElementById('course-name');
    const courseDayInput = document.getElementById('course-day');
    const courseTimeInput = document.getElementById('course-time');
    const courseRoomInput = document.getElementById('course-room');
    const addScheduleBtn = document.getElementById('add-schedule-btn');

    // Render existing schedules
    const renderSchedules = () => {
        scheduleList.innerHTML = '';
        
        scheduleManager.getSchedules().forEach(schedule => {
            const row = document.createElement('tr');
            
            const courseCell = document.createElement('td');
            courseCell.textContent = schedule.courseName;
            
            const dayCell = document.createElement('td');
            dayCell.textContent = schedule.day;
            
            const timeCell = document.createElement('td');
            timeCell.textContent = schedule.time;
            
            const roomCell = document.createElement('td');
            roomCell.textContent = schedule.room;
            
            const actionCell = document.createElement('td');
            
            const editBtn = createElementWithClass('button', 'edit-btn');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => {
                editSchedule(schedule.id);
            });
            
            const deleteBtn = createElementWithClass('button', 'delete-btn');
            deleteBtn.textContent = 'Hapus';
            deleteBtn.addEventListener('click', () => {
                deleteSchedule(schedule.id);
            });
            
            actionCell.appendChild(editBtn);
            actionCell.appendChild(deleteBtn);
            
            row.appendChild(courseCell);
            row.appendChild(dayCell);
            row.appendChild(timeCell);
            row.appendChild(roomCell);
            row.appendChild(actionCell);
            
            scheduleList.appendChild(row);
        });
    };

    // Delete a schedule
    const deleteSchedule = (scheduleId) => {
        scheduleManager.deleteSchedule(scheduleId);
        renderSchedules();
    };

    // Edit a schedule
    const editSchedule = (scheduleId) => {
        const schedule = scheduleManager.getScheduleById(scheduleId);
        if (schedule) {
            courseNameInput.value = schedule.courseName;
            courseDayInput.value = schedule.day;
            courseTimeInput.value = schedule.time;
            courseRoomInput.value = schedule.room;
            
            // Change the button to update mode
            addScheduleBtn.textContent = 'Update';
            addScheduleBtn.dataset.mode = 'edit';
            addScheduleBtn.dataset.scheduleId = scheduleId;
        }
    };

    // Add or update schedule
    addScheduleBtn.addEventListener('click', () => {
        const courseName = courseNameInput.value.trim();
        const day = courseDayInput.value.trim();
        const time = courseTimeInput.value.trim();
        const room = courseRoomInput.value.trim();
        
        if (courseName && day && time) {
            if (addScheduleBtn.dataset.mode === 'edit') {
                // Update existing schedule
                const scheduleId = addScheduleBtn.dataset.scheduleId;
                scheduleManager.updateSchedule(scheduleId, courseName, day, time, room);
                
                // Reset button to add mode
                addScheduleBtn.textContent = 'Tambah';
                delete addScheduleBtn.dataset.mode;
                delete addScheduleBtn.dataset.scheduleId;
            } else {
                // Add new schedule
                scheduleManager.addSchedule(courseName, day, time, room);
            }
            
            // Clear inputs
            courseNameInput.value = '';
            courseDayInput.value = '';
            courseTimeInput.value = '';
            courseRoomInput.value = '';
            
            renderSchedules();
        }
    });

    // Initial render
    renderSchedules();
};

// Notes Section Functionality
const initNotes = () => {
    const notesList = document.getElementById('notes-list');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');
    const addNoteBtn = document.getElementById('add-note-btn');

    // Render existing notes
    const renderNotes = () => {
        notesList.innerHTML = '';
        
        noteManager.getNotes().forEach(note => {
            const noteCard = createElementWithClass('div', 'note-card');
            
            const noteHeader = document.createElement('h3');
            noteHeader.textContent = note.title;
            
            const noteDate = createElementWithClass('small', 'note-date');
            noteDate.textContent = formatDate(note.timestamp);
            
            const noteText = document.createElement('p');
            noteText.textContent = note.content;
            
            const noteActions = createElementWithClass('div', 'note-actions');
            
            const editBtn = createElementWithClass('button', 'edit-btn');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => {
                editNote(note.id);
            });
            
            const deleteBtn = createElementWithClass('button', 'delete-btn');
            deleteBtn.textContent = 'Hapus';
            deleteBtn.addEventListener('click', () => {
                deleteNote(note.id);
            });
            
            noteActions.appendChild(editBtn);
            noteActions.appendChild(deleteBtn);
            
            noteCard.appendChild(noteHeader);
            noteCard.appendChild(noteDate);
            noteCard.appendChild(noteText);
            noteCard.appendChild(noteActions);
            
            notesList.appendChild(noteCard);
        });
    };

    // Delete a note
    const deleteNote = (noteId) => {
        noteManager.deleteNote(noteId);
        renderNotes();
    };

    // Edit a note
    const editNote = (noteId) => {
        const note = noteManager.getNoteById(noteId);
        if (note) {
            noteTitleInput.value = note.title;
            noteContentInput.value = note.content;
            
            // Change the button to update mode
            addNoteBtn.textContent = 'Update';
            addNoteBtn.dataset.mode = 'edit';
            addNoteBtn.dataset.noteId = noteId;
        }
    };

    // Add or update note
    addNoteBtn.addEventListener('click', () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();
        
        if (title && content) {
            if (addNoteBtn.dataset.mode === 'edit') {
                // Update existing note
                const noteId = addNoteBtn.dataset.noteId;
                noteManager.updateNote(noteId, title, content);
                
                // Reset button to add mode
                addNoteBtn.textContent = 'Tambah';
                delete addNoteBtn.dataset.mode;
                delete addNoteBtn.dataset.noteId;
            } else {
                // Add new note
                noteManager.addNote(title, content);
            }
            
            // Clear inputs
            noteTitleInput.value = '';
            noteContentInput.value = '';
            
            renderNotes();
        }
    });

    // Initial render
    renderNotes();
};