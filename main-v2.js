let container = document.querySelector(".container")
let form = document.querySelector(".form")
let input = document.querySelector(".input")
let add = document.querySelector(".add")
let tasks = document.querySelector(".tasks")
let count = document.querySelector(".count")
let tasksCount = document.querySelector(".tasksCount")
let completedCount = document.querySelector(".completedCount")
let tasksCircle = document.querySelector(".tasksCircle")
let completedCircle = document.querySelector(".completedCircle")
let tasksCountTxt = document.querySelector(".tasksCountTxt")
let compCountTxt = document.querySelector(".compCountTxt")

// Header
let head = document.createElement("h1")
head.textContent = "TO DO LIST"
head.style.cssText = "text-align:center; color:red;"
document.body.prepend(head)

// CSS TEXT
container.style.cssText = "width:350px; background-color:#eee; margin:50px auto; padding:20px; border-radius:5px; position:relative; box-sizing:border-box;"
form.style.cssText = "display:flex; align-items:center; justify-content:center"
input.style.cssText = "width:50%; padding:10px; border:none; border-radius:5px; outline:none;"
add.style.cssText = "background-color:red; color:white; border-radius:5px; height:30px; width:100px; margin-left:20px; cursor:pointer; display:flex; align-items:center; justify-content:center;"
tasks.style.cssText = "background-color:#eee; position:absolute; top:100px; width:100%; left:0; padding:20px; box-sizing:border-box; border-radius:5px; display:grid; gap:20px; "
// count of Tasks css style
count.style.cssText = "display:flex; justify-content:space-evenly;"
tasksCount.style.cssText = "display:flex;"
completedCount.style.cssText = "display:flex;"
tasksCircle.style.cssText = "max-width:10px; max-height:10px; padding:10px; box-sizing:border-box; border-radius:50%; background-color:red; color:white; display:flex; justify-content:center; align-items:center; margin-left:5px"
completedCircle.style.cssText = "max-width:10px; max-height:10px; padding:10px; box-sizing:border-box; border-radius:50%; background-color:red; color:white; display:flex; justify-content:center; align-items:center; margin-left:5px"
tasksCountTxt.style.cssText = "color: gray;"
compCountTxt.style.cssText = "color: gray;"
// new Task css style
let taskStyle = "padding:15px; background-color:white; border-radius:5px; display:grid; grid-template-columns:2fr 1fr 0.3fr; position:relative; "
// edit button css style
let editStyle = "padding:5px; background-color:red; color:white; border-radius:5px; cursor:pointer; border:none; max-height:25px; font-size:12px; box-sizing:border-box;"
// delete button css style
let deleteStyle = "background-color:red; color:white; border-radius:50%; cursor:pointer; border:none; position:absolute; right:0; top:0; transform:translate(50%, -50%); width:20px; height:20px; text-align:center; box-sizing:border-box;"
// completed button css style
let compeleteStyle = "padding:5px; background-color:grey; color:white; border-radius:5px; cursor:pointer; border:none; width:90%; font-size:12px; max-height:25px; text-align:center; box-sizing:border-box;"

// JS


// declare varaibles
let task;
let deleteBtn;
let completedBtn;
let editBtn;
let idCount;
let arrOfTasks = JSON.parse(window.localStorage.getItem("ToDoList"));


if(arrOfTasks && arrOfTasks.length > 0){
    idCount = +Object.keys(arrOfTasks[arrOfTasks.length-1]).join("").match(/\d/ig).join("")
    for ( let oneTask of arrOfTasks){
        createEls()
        let taskId = Object.keys(oneTask).join("").match(/ID-\d+/ig).join("")
        task.setAttribute("id", taskId)
        let tasktxtNode = oneTask[taskId]
        task.prepend(tasktxtNode)
        if (oneTask["status"] === "completed"){
            completedBtn = document.querySelector(`#${taskId} .done`)
            completedBtn.style.backgroundColor = "green"
            completedBtn.textContent = "Completed"
            completedBtn.classList.remove("pending")
            completedBtn.classList.add("completed")
            noOfCompleted()
        }
    }
}else {
    arrOfTasks = []
    idCount = 0;
    noTaskToShow();
}
add.addEventListener("click", function(e){
    if(input.value !== "") {
        idCount++ 
        let taskObj = {
            [`ID-${idCount}`] : input.value ,
            status : "Pending"
        }
        arrOfTasks.push(taskObj)
        window.localStorage.setItem( "ToDoList" , JSON.stringify(arrOfTasks))
        createEls()
        task.setAttribute("id",`ID-${idCount}`)
        let tasktxtNode = input.value
        task.prepend(tasktxtNode)
        input.value = ""
    }
})

// Mark Completed
document.addEventListener("click", function(e){
    if(e.target.classList.contains("done") && e.target.classList.contains("pending")) {
        e.target.style.backgroundColor = "green"
        e.target.textContent = "Completed"
        e.target.classList.remove("pending")
        e.target.classList.add("completed")
        noOfCompleted()
        let parentId = e.target.parentNode.id
            for (let oneTask of arrOfTasks){
                if (oneTask.hasOwnProperty(parentId)){
                    oneTask["status"] = "completed"
                    window.localStorage.setItem( "ToDoList" , JSON.stringify(arrOfTasks))
                }
            }
    }else if(e.target.classList.contains("done") && e.target.classList.contains("completed")){
        e.target.style.backgroundColor = "grey"
        e.target.textContent = "Pending";
        e.target.classList.remove("completed")
        e.target.classList.add("pending")
        noOfCompleted()
        let parentId = e.target.parentNode.id
            for (let oneTask of arrOfTasks){
                if (oneTask.hasOwnProperty(parentId)){
                    oneTask["status"] = "pending"
                    window.localStorage.setItem( "ToDoList" , JSON.stringify(arrOfTasks))
                }
            }
    }
})

// Edit Task
document.addEventListener("click" , function(e){
    if (e.target.className === "edit"){
        let editedPrompt = prompt("Edit Task",`${e.target.parentNode.firstChild.wholeText}`);
        if(editedPrompt !== null) {
            let editedTxt = document.createTextNode(editedPrompt)
            e.target.parentNode.firstChild.remove()
            e.target.parentNode.prepend(editedTxt)
            let parentId = e.target.parentNode.id
            for (let oneTask of arrOfTasks){
                if (oneTask.hasOwnProperty(parentId)){
                    oneTask[parentId] = editedTxt.wholeText
                    window.localStorage.setItem( "ToDoList" , JSON.stringify(arrOfTasks))
                }
            }
        }
    }
})

// delete task
document.addEventListener("click", function(e){
    if (e.target.className === "delete") {
        if(confirm("Are You Sure?")){
            e.target.parentNode.remove()
            let parentId = e.target.parentNode.id
            for (let oneTask of arrOfTasks){
                if (oneTask.hasOwnProperty(parentId)){
                    arrOfTasks.splice(arrOfTasks.indexOf(oneTask), 1)
                    window.localStorage.setItem( "ToDoList" , JSON.stringify(arrOfTasks))
                }
            }
            noTaskToShow()
            noOfTasks()
            noOfCompleted()
        }
    }
})


// Functions 

function noTaskToShow() {
    if(tasks.childElementCount == 0) {
        let noTask = document.createElement("div")
        noTask.className = "noTask"
        noTask.textContent = "NO TASKS TO SHOW"
        noTask.style.cssText = taskStyle
        noTask.style.color = "grey"
        noTask.style.fontSize = "10px"
        tasks.appendChild(noTask)
    }
}

function createEls() {
    task = document.createElement("div")
    editBtn = document.createElement("div")
    deleteBtn = document.createElement("div")
    completedBtn = document.createElement("div")
    task.style.cssText = taskStyle
    editBtn.style.cssText = editStyle
    deleteBtn.style.cssText = deleteStyle
    completedBtn.style.cssText = compeleteStyle
    editBtn.textContent = "Edit"
    deleteBtn.textContent = "x"
    completedBtn.textContent = "Pending"
    task.setAttribute("class","task")
    editBtn.setAttribute("class","edit")
    deleteBtn.setAttribute("class", "delete")
    completedBtn.setAttribute("class", "done")
    completedBtn.classList.add("pending")
    task.append(completedBtn ,editBtn ,deleteBtn)
    tasks.prepend(task)
    noOfTasks()
    if (document.body.contains(document.querySelector(".noTask"))) {
        let noTask = document.querySelector(".noTask")
        noTask.remove()
        }
    
} 


function noOfTasks() {
    let num = document.querySelectorAll(".task").length
    tasksCircle.innerHTML = num
}
function noOfCompleted() {
    let num = document.querySelectorAll(".completed").length
    completedCircle.innerHTML = num
}
