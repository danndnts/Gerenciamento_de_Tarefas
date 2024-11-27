document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const filters = {
        all: document.getElementById('filter-all'),
        completed: document.getElementById('filter-completed'),
        pending: document.getElementById('filter-pending'),
        sortPriority: document.getElementById('sort-priority'),
        sortDate: document.getElementById('sort-date'),
    };

    let tasks = [];

    function renderTasks(filteredTasks = tasks) {
        taskList.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.className += isUrgent(task) ? ' urgent' : '';
            li.innerHTML = `
                <span>${task.name} - ${task.date} - ${task.priority}</span>
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
                <button data-index="${index}" class="edit">Editar</button>
                <button data-index="${index}" class="delete">Deletar</button>
            `;
            taskList.appendChild(li);
        });
    }

    function isUrgent(task) {
        const today = new Date().toISOString().split('T')[0];
        return !task.completed && task.date === today;
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('task-name').value;
        const date = document.getElementById('task-date').value;
        const priority = document.getElementById('task-priority').value;

        tasks.push({ name, date, priority, completed: false });
        taskForm.reset();
        renderTasks();
    });

    taskList.addEventListener('change', (e) => {
        const index = e.target.dataset.index;
        if (e.target.type === 'checkbox') {
            tasks[index].completed = e.target.checked;
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('delete')) {
            tasks.splice(index, 1);
            renderTasks();
        } else if (e.target.classList.contains('edit')) {
            // Implementar edição de tarefas.
        }
    });

    filters.completed.addEventListener('click', () => {
        const completedTasks = tasks.filter((task) => task.completed);
        renderTasks(completedTasks);
    });

    filters.pending.addEventListener('click', () => {
        const pendingTasks = tasks.filter((task) => !task.completed);
        renderTasks(pendingTasks);
    });

    filters.all.addEventListener('click', () => renderTasks());

    filters.sortPriority.addEventListener('click', () => {
        tasks.sort((a, b) => a.priority.localeCompare(b.priority));
        renderTasks();
    });

    filters.sortDate.addEventListener('click', () => {
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        renderTasks();
    });
});
