let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all"
let filterList = []
let underLine = document.getElementById("under-line")
let menus = document.querySelectorAll("div.task-tabs div")

menus.forEach(menu=>menu.addEventListener("mouseover",(e)=>horizontalIndicator(e)))

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function(e){
  if (e.keyCode == 13){
    e.preventDefault(e);
    addTask(e);
    console.log(e);
  }
})

for(let i=1;i<tabs.length;i++){
  tabs[i].addEventListener("click",function (event){
    filter(event)})
}

function horizontalIndicator(e){
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px-1";
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let list=[]
  if (mode === "all"){
    list = taskList
  } else if (mode === "ongoing" || mode === "done"){
    list = filterList
  }  
  
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
      break;
    }
  }
  render();
  console.log(taskList)
}

function filter(event){
  mode=event.target.id
  filterList =[]
  if(mode === "all"){
    render()
  } else if(mode === "ongoing"){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete === false){
        filterList.push(taskList[i])
      }
    }
    render()
    console.log("진행중",filterList)
  } else if (mode === "done"){
    for(let i = 0;i<taskList.length;i++){
      if(taskList[i].isComplete ===true){
        filterList.push(taskList[i])
      }
    }
    render()
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

