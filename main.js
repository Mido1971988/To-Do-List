let container = document.querySelector(".container")
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
input.style.cssText = "width:50%; padding:10px; border:none; border-radius:5px; outline:none;"
add.style.cssText = "background-color:red; color:white; border:none; border-radius:5px; height:30px; width:100px; margin-left:20px; cursor:pointer;"
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
let taskStyle = "padding:15px; background-color:white; border-radius:5px; display:grid; grid-template-columns:2fr 1fr 0.3fr; "
// delete button css style
let deleteStyle = "padding:5px; background-color:red; color:white; border-radius:5px; cursor:pointer; border:none; "
// completed button css style
let compeleteStyle = "padding:5px; background-color:grey; color:white; border-radius:5px; cursor:pointer; border:none; width:90%; font-size:12px"

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
    appendFunc()
}

// restore completed 
for([index, value] of sortedArr) {
    if(isNaN(index)) {
        let compEl = document.querySelector(`#${index} .done`)
        compEl.style.backgroundColor = "green"
        compEl.textContent = "Completed"
        compEl.classList.add("completed")
    }
}

// no. of Tasks
noOfTasks()
// no. of completed
noOfCompleted()

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
    if (e.target.classList.contains("done")) {
        if (e.target.classList.contains("notCompleted")) {
        e.target.style.backgroundColor = "green"
        e.target.textContent = "Completed"
        e.target.classList.remove("notCompleted")
        e.target.classList.add("completed")
        noOfCompleted()
        window.localStorage.setItem(e.target.parentNode.id, "done")
        } else if(e.target.classList.contains("completed")) {
        e.target.style.backgroundColor = "grey"
        e.target.textContent = "Pending";
        e.target.classList.remove("completed")
        e.target.classList.add("notCompleted")
        noOfCompleted()
        window.localStorage.removeItem(e.target.parentNode.id, "done")
        }
    }
})

// delete task
document.addEventListener("click", function(e){
    if (e.target.className === "delete") {
        if(confirm("Are You Sure?")){
            e.target.parentNode.remove()
            let parentId = e.target.parentNode.id
            idNum = +(parentId.match(/\d+/g).join(""))
            window.localStorage.removeItem(idNum)
            window.localStorage.removeItem(parentId)
            noTaskToShow()
            noOfTasks()
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
    deleteBtn = document.createElement("button")
    completedBtn = document.createElement("button")
    task.style.cssText = taskStyle
    deleteBtn.style.cssText = deleteStyle
    completedBtn.style.cssText = compeleteStyle
    deleteBtn.textContent = "Delete"
    completedBtn.textContent = "Pending"
    task.setAttribute("class","task")
    deleteBtn.setAttribute("class", "delete")
    completedBtn.setAttribute("class", "done")
    completedBtn.classList.add("notCompleted")
} 

function appendFunc(){
    task.append(completedBtn ,deleteBtn)
    tasks.prepend(task)
    noOfTasks()
}

function noOfTasks() {
    let x = document.querySelectorAll(".task").length
    tasksCircle.innerHTML = x
}
function noOfCompleted() {
    let x = document.querySelectorAll(".completed").length
    completedCircle.innerHTML = x
}
