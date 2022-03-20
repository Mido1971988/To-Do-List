let container = document.querySelector(".container")
let input = document.querySelector(".input")
let add = document.querySelector(".add")
let tasks = document.querySelector(".tasks")

// Header
let head = document.createElement("h1")
head.textContent = "TO DO LIST"
head.style.cssText = "text-align:center; color:red;"
document.body.prepend(head)

// CSS TEXT
container.style.cssText = "width:350px; background-color:#eee; margin:50px auto; padding:20px; border-radius:5px; position:relative; box-sizing:border-box;"
input.style.cssText = "width:50%; padding:10px; border:none; border-radius:5px; outline:none;"
add.style.cssText = "background-color:red; color:white; border:none; border-radius:5px; height:30px; width:100px; margin-left:20px; cursor:pointer;"
tasks.style.cssText = "background-color:#eee; position:absolute; top:100px; width:100%; left:0; padding:20px; box-sizing:border-box; border-radius:5px; display:grid; gap:20px; "
// new Task css style
let taskStyle = "padding:15px; background-color:white; border-radius:5px; display:grid; grid-template-columns:1fr 1.5fr 0.3fr; "
// delete button css style
let deleteStyle = "padding:5px; background-color:red; color:white; border-radius:5px; cursor:pointer; border:none; "
// completed button css style
let compeleteStyle = "padding:5px; background-color:grey; color:white; border-radius:5px; cursor:pointer; border:none; width:50%; font-size:12px"

// JS

// restore last i from LocalStorage
let keysArr = Object.keys(window.localStorage)
let onlyNums = keysArr.filter(el => !isNaN(el))
let sortOnlyNums = onlyNums.sort((el, el2) => el - el2)
let lastNum = +(sortOnlyNums.reverse()[0])


// Restore old tasks
localArrs = Object.entries(window.localStorage)
let numsArr = localArrs.filter(([index, value]) => !isNaN(index))
let strArr = localArrs.filter(([index, value]) => isNaN(index))
let numsSorted = numsArr.sort(([index1, value1], [index2, value2]) => index1 - index2)
let strSorted = strArr.sort(([index1, value1], [index2, value2]) => index1 - index2)
let sortedArr = numsSorted.concat(strSorted)
let oldTasksArr= [];

// declare varaibles
let task;
let deleteBtn;
let completedBtn;

for([index, value] of sortedArr) {
    if(!isNaN(index)) {
        oldTasksArr.push([index , value])
    }
}
for (oldTask of oldTasksArr) {
    createEls()
    task.setAttribute("id", `ID-${oldTask[0]}`)
    task.textContent = oldTask[1]
    if (completedBtn.classList.contains("completed")) {
        completedBtn.style.backgroundColor = "green"
        completedBtn.textContent = "Completed"
    }
    appendFunc()
}

// restore completed 
for([index, value] of sortedArr) {
    if(isNaN(index)) {
        let compEl = document.querySelector(`#${index} .done`)
        compEl.style.backgroundColor = "green"
        compEl.textContent = "Completed"
    }
}

// no Tasks to show
noTaskToShow();

// add new task
let i;
if (!isNaN(lastNum)){
    i = lastNum
} else {
    i = 0
}
add.addEventListener("click", function(e){
    if(input.value !== "") {
        i++
        window.localStorage.setItem(i , input.value)
        createEls()
        task.setAttribute("id", `ID-${i}`)
        task.textContent = input.value
        appendFunc()
        input.value = ""
        if (document.body.contains(document.querySelector(".noTask"))) {
        let noTask = document.querySelector(".noTask")
        noTask.remove()
        }
    }
})

// Mark Completed
document.addEventListener("click", function(e){
    if (e.target.className === "done") {
        if (e.target.textContent === "Pending") {
        e.target.style.backgroundColor = "green"
        e.target.textContent = "Completed"
        window.localStorage.setItem(e.target.parentNode.id, "done")
        } else if(e.target.textContent === "Completed") {
        e.target.style.backgroundColor = "grey"
        e.target.textContent = "Pending"
        window.localStorage.removeItem(e.target.parentNode.id, "done")
        }
    }
})

// delete task
document.addEventListener("click", function(e){
    if (e.target.className === "delete") {
        e.target.parentNode.remove()
        let parentId = e.target.parentNode.id
        idNum = +(parentId.match(/\d+/g).join(""))
        window.localStorage.removeItem(idNum)
        window.localStorage.removeItem(parentId)
        noTaskToShow()
    }
})


// Functions 

function noTaskToShow() {
    if(window.localStorage.length === 0) {
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
    deleteBtn = document.createElement("button")
    completedBtn = document.createElement("button")
    task.style.cssText = taskStyle
    deleteBtn.style.cssText = deleteStyle
    completedBtn.style.cssText = compeleteStyle
    deleteBtn.textContent = "Delete"
    completedBtn.textContent = "Pending"
    deleteBtn.setAttribute("class", "delete")
    completedBtn.setAttribute("class", "done")
} 

function appendFunc(){
    task.append(completedBtn ,deleteBtn)
    tasks.append(task)
}