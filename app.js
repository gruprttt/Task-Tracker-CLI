
const [,,commands,...args] = process.argv;
console.log(commands);
console.log(args);

function addTask({description}){

}

function deleteTask({id}){

}

function updateTask({id,description}){

}

function markTask({id,status}){

}

function listTask({subcategory}){

}

switch(commands){
    case 'add':
        const description = args.join('');
        addTask(description);
        console.log(`Task Added : ${description}`);
        break;

    case 'delete' :
        const id = args[0];
        deleteTask(id);
        console.log(`Task Deleted with id : ${id}`);
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

        const id2 = parseInt(args[0]);
        const status = args[1];
        markTask(id2,status);
        console.log(`Task Marked with id : ${id2} and status : ${status}`);
        break;

    
}