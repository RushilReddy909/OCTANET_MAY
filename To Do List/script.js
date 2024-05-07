document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    var lists = document.getElementById("task_list");
    var task = document.getElementById("taskInput");
    if(task.value !== "")
    {
        listItem = `<li>
                <p>${task.value}</p>
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
}

function delTask(button) {
    var listItem = button.parentElement;
    listItem.remove();
}