import { TaskManager, ScheduleManager, NoteManager } from './modules/data.js';
import { createElementWithClass, formatDate } from './modules/utils.js';

const taskManager = new TaskManager();
const scheduleManager = new ScheduleManager();
const noteManager = new NoteManager();

export const initApp = () => {
    initTasks();
    initSchedule();
    initNotes();
};

const initTasks = () => {
    const tasksList = document.getElementById('tasks-list');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');

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

    const toggleTaskCompletion = (taskId) => {
        taskManager.toggleTaskCompletion(taskId);
        renderTasks();
    };

    const deleteTask = (taskId) => {
        taskManager.deleteTask(taskId);
        renderTasks();
    };

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

    addTaskBtn.addEventListener('click', () => {
        const taskTitle = newTaskInput.value.trim();
        if (taskTitle) {
            taskManager.addTask(taskTitle);
            newTaskInput.value = '';
            renderTasks();
        }
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    renderTasks();
};

const initSchedule = () => {
    const scheduleList = document.getElementById('schedule-list');
    const courseNameInput = document.getElementById('course-name');
    const courseDayInput = document.getElementById('course-day');
    const courseTimeInput = document.getElementById('course-time');
    const courseRoomInput = document.getElementById('course-room');
    const addScheduleBtn = document.getElementById('add-schedule-btn');

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

    const deleteSchedule = (scheduleId) => {
        scheduleManager.deleteSchedule(scheduleId);
        renderSchedules();
    };

    const editSchedule = (scheduleId) => {
        const schedule = scheduleManager.getScheduleById(scheduleId);
        if (schedule) {
            courseNameInput.value = schedule.courseName;
            courseDayInput.value = schedule.day;
            courseTimeInput.value = schedule.time;
            courseRoomInput.value = schedule.room;
            
            addScheduleBtn.textContent = 'Update';
            addScheduleBtn.dataset.mode = 'edit';
            addScheduleBtn.dataset.scheduleId = scheduleId;
        }
    };

    addScheduleBtn.addEventListener('click', () => {
        const courseName = courseNameInput.value.trim();
        const day = courseDayInput.value.trim();
        const time = courseTimeInput.value.trim();
        const room = courseRoomInput.value.trim();
        
        if (courseName && day && time) {
            if (addScheduleBtn.dataset.mode === 'edit') {
                const scheduleId = addScheduleBtn.dataset.scheduleId;
                scheduleManager.updateSchedule(scheduleId, courseName, day, time, room);
                
                addScheduleBtn.textContent = 'Tambah';
                delete addScheduleBtn.dataset.mode;
                delete addScheduleBtn.dataset.scheduleId;
            } else {
                scheduleManager.addSchedule(courseName, day, time, room);
            }
            
            courseNameInput.value = '';
            courseDayInput.value = '';
            courseTimeInput.value = '';
            courseRoomInput.value = '';
            
            renderSchedules();
        }
    });

    renderSchedules();
};

const initNotes = () => {
    const notesList = document.getElementById('notes-list');
    const noteTitleInput = document.getElementById('note-title');
    const noteContentInput = document.getElementById('note-content');
    const addNoteBtn = document.getElementById('add-note-btn');

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

    const deleteNote = (noteId) => {
        noteManager.deleteNote(noteId);
        renderNotes();
    };

    const editNote = (noteId) => {
        const note = noteManager.getNoteById(noteId);
        if (note) {
            noteTitleInput.value = note.title;
            noteContentInput.value = note.content;
            
            addNoteBtn.textContent = 'Update';
            addNoteBtn.dataset.mode = 'edit';
            addNoteBtn.dataset.noteId = noteId;
        }
    };

    addNoteBtn.addEventListener('click', () => {
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();
        
        if (title && content) {
            if (addNoteBtn.dataset.mode === 'edit') {
                const noteId = addNoteBtn.dataset.noteId;
                noteManager.updateNote(noteId, title, content);
                
                addNoteBtn.textContent = 'Tambah';
                delete addNoteBtn.dataset.mode;
                delete addNoteBtn.dataset.noteId;
            } else {
                noteManager.addNote(title, content);
            }
            
            noteTitleInput.value = '';
            noteContentInput.value = '';
            
            renderNotes();
        }
    });

    renderNotes();
};