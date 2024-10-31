
const [,,commands,...args] = process.argv;
const path = require('path');
const fs = require('fs');

// console.log(commands);
// console.log(args);

function loadTasks() {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const filePath = path.join(__dirname,'tasks.join');

function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}


function generateId(tasks) {
    return tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
}


function addTask(description){

    const tasks = loadTasks();
    const newTask = {
        id: generateId(tasks),
        description,
        status: 'todo',
        createdAt: new Date(),
        updatedAt: new Date()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    console.log('Task added:', newTask);


}

function deleteTask(id){

    const tasks = loadTasks();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    const deletedTask = tasks.splice(index, 1)[0];
    saveTasks(tasks);
    console.log('Task deleted:', deletedTask);

}

function updateTask(id,description){

    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    task.description = description;
    task.updatedAt = new Date();
    saveTasks(tasks);
    console.log('Task updated:', task);

}

function markTask(id,status){

    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }
    task.status = status;
    task.updatedAt = new Date();
    saveTasks(tasks);
    console.log(`Task ${status}:`, task);

}

function listTask(status = null){

    const tasks = loadTasks();
    const filteredTasks = status ? tasks.filter(task => task.status === status) : tasks;
    console.log(`Listing tasks${status ? ` (${status})` : ''}:`);
    filteredTasks.forEach(task => console.log(task));

}

switch(commands){
    case 'add':
        const description = args.join('');
        addTask(description);
        console.log(`Task Added : ${description}`);
        break;

    case 'delete' :
        const id = args[0];
        deleteTask(parseInt(id));
        break;

    case 'update' :
        const ids = parseInt(args[0]);
        const tempDescription = args[1];
        
        updateTask(ids,tempDescription);
        break;
    
    case 'list' :
        const subcategory = args[0] || null;
        listTask(subcategory);
        break;
    
    case 'mark' :

    const [markId, status] = args;
    if (['todo', 'in-progress', 'done'].includes(status)) {
        markTask(parseInt(markId), status);
    } else {
        console.log('Invalid status. Use: todo, in-progress, or done.');
    }
        break;

    default : 
      
        console.log(`Unknown command: ${command}`);
        console.log('Commands: add, update, delete, mark -[ todo , in-progress , done ], list');

    
}