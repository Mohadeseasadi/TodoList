// get html element 
var works = document.getElementById("todo-input");
var buuton = document.getElementById("todo-button");
var ul = document.getElementById("todo-list");

// addeventlistener
buuton.addEventListener("click",toDo)


// func for added works
function toDo(event){

    // create html elemnt for added done and delete buttons and li
    event.preventDefault()
    var todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create element li
    const li = document.createElement("li");
    li.innerText = works.value;
    todoDiv.appendChild(li)
    li.classList.add("todo-item")
    saveLocal(works.value); // call func(save in storage)
    works.value = "" // clear input

    // create button for done works
    var completedBtn = document.createElement("button");
    completedBtn.innerHTML = "<i class='fas fa-check'></i>";
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn)

    // create button for trash works
    var trashBtn = document.createElement("button");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn)

    ul.appendChild(todoDiv)
}

// func for done and delete
function deleteComplete(event){
    let item = event.target;
    item = item.parentElement;

    // trash
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        removeLocal(todo) //call func(remove of storage)
        todo.remove();
    }

    // complete
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

// func to save works in localstorage
function saveLocal(todo){
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos" , JSON.stringify(todos))
}

// func to remove works from localstorage
function removeLocal(todo){
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos =[]
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos))

}

// func for get data from localstorage
function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    };
    todos.forEach(function (todo) {
    
        // create html elemnt for added done and delete buttons and li
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // create element li
        const li = document.createElement("li");
        li.innerText = todo;
        li.classList.add("todo-item")
        todoDiv.appendChild(li)


        // create button for done works
        const completedBtn = document.createElement("button");
        completedBtn.innerHTML = "<i class='fas fa-check'></i>";
        completedBtn.classList.add("complete-btn");
        todoDiv.appendChild(completedBtn)

        // create button for trash works
        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn)

        ul.appendChild(todoDiv)
    });
}