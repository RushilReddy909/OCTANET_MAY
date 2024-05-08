document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    var lists = document.getElementById("task_list");
    var task = document.getElementById("taskInput");
    var date = document.getElementById("dueDate");
    var priority = document.getElementById("priorityList");
    if(task.value.trim() !== "" && date.value !== "" && priority.value !== "")
    {
        listItem = `<li>
                <div class="color"></div>
                <div class="task_info">
                    <p>${task.value.trim()}</p>
                    <p class="secondary">Due Date: ${date.value}</p>
                    <p class="secondary">Priority: ${priority.value}</p>
                </div>
                <button onclick="completeTask(this)"><i class="fa-solid fa-check"></i></button>
                <button onclick="delTask(this)"><i class="fa-solid fa-trash"></i></button>
            </li>`
        lists.insertAdjacentHTML("beforeend", listItem);
        task.value = "";
        task.focus();
    }
}

function completeTask(button) {
    var para = button.parentElement.querySelector("p");
    para.style.textDecoration = "line-through";
    para.style.textDecorationThickness = "2px"

    var colour = button.parentElement.querySelector("div");
    colour.style.backgroundColor = "#a7c957";
}

function delTask(button) {
    var listItem = button.parentElement;
    listItem.remove();
}

function sortList(type) {
    const list = document.getElementById("task_list");
    var listItem = list.querySelectorAll("li");

    var buttons = document.getElementById("sortBtns").querySelectorAll("button");
    buttons.forEach(btn => {
        if(btn.classList.contains("active"))
        {btn.classList.remove("active");}
    })
    
    listItem.forEach(item => {
        const para = item.querySelector(".task_info p");
        const style = window.getComputedStyle(para);
        const textDecoration = style.getPropertyValue("text-decoration");

        if(type === "all")
        {
            item.style.display = "flex";
        }
        else if(type === "complete")
        {
            document.getElementById("complete").classList.add("active");
            if (textDecoration.includes("line-through"))
            { 
                item.style.display = "flex";
            } 
            else 
            {
                item.style.display = "none";
            }
        }
        else if(type === "incomplete")
        {
            document.getElementById("incomplete").classList.add("active");
            if (!textDecoration.includes("line-through")) 
            { 
                item.style.display = "flex";
            } 
            else 
            {
                item.style.display = "none";
            }
        }
        else if (type === "priority") 
        {
            document.getElementById("priority").classList.add("active");
        
            listItem.sort((a, b) => {
                const priorityA = parseInt(a.querySelector('.task_info p:nth-of-type(3)').textContent.trim().split(":")[0].trim());
                const priorityB = parseInt(b.querySelector('.task_info p:nth-of-type(3)').textContent.trim().split(":")[0].trim());
                return priorityA - priorityB;
            });
        
            listItem.forEach(item => {
                list.appendChild(item);
                item.style.display = "flex";
            });
        }
        else if(type === "clear")
        {
            item.remove();
        }
        else
        {
            console.log("Invalid type\n");
        }
    })
}