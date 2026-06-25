// Selecting elements
const input = document.querySelector("input");
const addButton = document.querySelector(".input-section button");
const container = document.querySelector(".container");
const journalBtn = document.querySelector("#journalBtn");

let firstTaskAdded = false;

// -----------------------------
// Add Task
// -----------------------------
addButton.addEventListener("click", addTask);

// Press Enter to add task
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Remove dummy tasks only once
    if (!firstTaskAdded) {
        document.querySelectorAll(".dummy").forEach(function (task) {
            task.remove();
        });

        firstTaskAdded = true;
    }

    // Create task
    const task = document.createElement("div");
    task.classList.add("task");

    task.innerHTML = `
        <p>${taskText}</p>

        <div class="buttons">
            <button class="com">Completed</button>
            <button class="update">Update</button>
            <button class="del">Delete</button>
        </div>
    `;

    // Insert BEFORE journal button
    const journalSection = document.querySelector(".journal-section");
    container.insertBefore(task, journalSection);

    input.value = "";

    attachEvents(task);
}

// -----------------------------
// Attach button events
// -----------------------------
function attachEvents(task) {

    const completeBtn = task.querySelector(".com");
    const updateBtn = task.querySelector(".update");
    const deleteBtn = task.querySelector(".del");

    // -------------------------
    // Completed
    // -------------------------
    completeBtn.addEventListener("click", function () {

        task.classList.add("completed");

        // Move task to bottom
        const journalSection = document.querySelector(".journal-section");
        container.insertBefore(task, journalSection);

        completeBtn.disabled = true;
        completeBtn.textContent = "Completed";
    });

    // -------------------------
    // Delete
    // -------------------------
    deleteBtn.addEventListener("click", function () {
        task.remove();
    });

    // -------------------------
    // Update
    // -------------------------
    updateBtn.addEventListener("click", function () {

        const paragraph = task.querySelector("p");

        const updatedText = prompt(
            "Update your task:",
            paragraph.textContent
        );

        if (updatedText === null) {
            return;
        }

        if (updatedText.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }

        paragraph.textContent = updatedText.trim();

    });

}

// -----------------------------
// Existing dummy tasks
// -----------------------------
document.querySelectorAll(".task").forEach(function (task) {
    attachEvents(task);
});

// -----------------------------
// Journal Button
// -----------------------------
journalBtn.addEventListener("click", function () {
    window.location.href = "journal.html";
});