// Selecting elements from HTML
const input = document.querySelector("input");
const addButton = document.querySelector(".input-section button");
const container = document.querySelector(".container");

// Add task when Add Task button is clicked
addButton.addEventListener("click", function () {

    // Get the text entered by the user
    const taskText = input.value;

    // Prevent empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create task div
    const task = document.createElement("div");
    task.classList.add("task");

    // Add HTML inside the task div
    task.innerHTML = `
        <p>${taskText}</p>
        <div class="buttons">
            <button class="com">Completed</button>
            <button class="del">Delete</button>
        </div>
    `;

    // Add task to the page
    container.appendChild(task);

    // Clear input box
    input.value = "";

    // Select buttons inside the new task
    const completeBtn = task.querySelector(".com");
    const deleteBtn = task.querySelector(".del");

    // Mark task as completed
    completeBtn.addEventListener("click", function () {
        task.querySelector("p").style.textDecoration = "line-through";
    });

    // Delete task
    deleteBtn.addEventListener("click", function () {
        task.remove();
    });
});

// Existing tasks functionality
const completeButtons = document.querySelectorAll(".com");
const deleteButtons = document.querySelectorAll(".del");

// Completed button for existing tasks
completeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const taskText = button.parentElement.previousElementSibling;
        taskText.style.textDecoration = "line-through";
    });
});

// Delete button for existing tasks
deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        button.closest(".task").remove();
    });
});