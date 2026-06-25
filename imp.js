const input=document.querySelector("input");
const addButton=document.querySelector(".input-section button");
const container=document.querySelector(".container");
const journalBtn=document.querySelector("#journalBtn");
let firstTaskAdded=false;

function saveTasks(){
    const tasks=[];
    document.querySelectorAll(".task").forEach(task=>{
        if(task.classList.contains("dummy")) return;
        tasks.push({
            text:task.querySelector("p").textContent,
            completed:task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function createTask(taskText,completed=false){
    const task=document.createElement("div");
    task.classList.add("task");
    if(completed) task.classList.add("completed");

    task.innerHTML=`
        <p>${taskText}</p>
        <div class="buttons">
            <button class="com">Completed</button>
            <button class="update">Update</button>
            <button class="del">Delete</button>
        </div>
    `;

    const journalSection=document.querySelector(".journal-section");

    if(completed){
        container.insertBefore(task,journalSection);
    }else{
        const completedTasks=document.querySelectorAll(".completed");
        if(completedTasks.length>0){
            container.insertBefore(task,completedTasks[0]);
        }else{
            container.insertBefore(task,journalSection);
        }
    }

    attachEvents(task);

    if(completed){
        task.querySelector(".com").disabled=true;
    }
}

function loadTasks(){
    const savedTasks=JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks===null) return;

    document.querySelectorAll(".dummy").forEach(task=>task.remove());
    firstTaskAdded=true;

    savedTasks
        .filter(task=>!task.completed)
        .forEach(task=>createTask(task.text,false));

    savedTasks
        .filter(task=>task.completed)
        .forEach(task=>createTask(task.text,true));
}

function addTask(){
    const taskText=input.value.trim();

    if(taskText===""){
        alert("Please enter a task!");
        return;
    }

    if(!firstTaskAdded){
        document.querySelectorAll(".dummy").forEach(task=>task.remove());
        firstTaskAdded=true;
    }

    createTask(taskText,false);
    saveTasks();
    input.value="";
}

function attachEvents(task){
    const completeBtn=task.querySelector(".com");
    const updateBtn=task.querySelector(".update");
    const deleteBtn=task.querySelector(".del");

    if(task.classList.contains("completed")){
        completeBtn.disabled=true;
    }

    completeBtn.addEventListener("click",function(){
        task.classList.add("completed");
        const journalSection=document.querySelector(".journal-section");
        container.insertBefore(task,journalSection);
        completeBtn.disabled=true;
        saveTasks();
    });

    updateBtn.addEventListener("click",function(){
        const paragraph=task.querySelector("p");
        const updatedText=prompt("Update your task:",paragraph.textContent);

        if(updatedText===null) return;

        if(updatedText.trim()===""){
            alert("Task cannot be empty!");
            return;
        }

        paragraph.textContent=updatedText.trim();
        saveTasks();
    });

    deleteBtn.addEventListener("click",function(){
        task.remove();
        saveTasks();
    });
}

addButton.addEventListener("click",addTask);

input.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addTask();
    }
});

document.querySelectorAll(".task").forEach(task=>attachEvents(task));

journalBtn.addEventListener("click",function(){
    window.location.href="journal.html";
});

loadTasks();