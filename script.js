"use strict";
// Data
const toDoList = [
  {
    completed: false,
    task: "Cut firewood",
    dueDate: "05/09/2024",
    description: "cut kindling",
    urgent: false
  },
  {
    completed: false,
    task: "Walk dog",
    dueDate: "06/09/2024",
    description: "go to lake",
    urgent: false
  }
];

// Variables
const addTaskPopUp = document.querySelector(".addtask-popup");
const addTaskBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close");
const form = addTaskPopUp.querySelector("form");
const submitBtn = document.querySelector(".submit");
const table = document.querySelector("table");
const deleteConfirmContainer = document.querySelector(".delete-confirm");
const yesbtn = document.querySelector("#yes");
const nobtn = document.querySelector("#no");

// FUNCTIONS

// Open Task Popup
const openTaskPopUp = function () {
  addTaskPopUp.style.display = "block";
  
};

// Close Button Function
const closePopUp = () => (addTaskPopUp.style.display = "none");

// Load Tasks into Table
const loadTasks = function () {
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";

  // Sort tasks with urgent tasks first
  const sortedTasks = toDoList.slice().sort((a, b) => b.urgent - a.urgent);

  sortedTasks.forEach((task, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><button class="completed"><span class="complete material-symbols-outlined">
      ${task.completed ? "check_box" : "check_box_outline_blank"}
      </span></button></td>
      <td>${task.task}</td>
      <td>${task.dueDate}</td> 
      <td>${task.description}</td>
      <td><button class="delete" data-index="${index}"><span class="material-symbols-outlined delete">delete</span></button></td>
    `;

    // completed tasks
    if (task.completed) {
      newRow.querySelectorAll("td").forEach(td => td.style.textDecoration = "line-through");
    }

    // urgent tasks
    if (task.urgent) {
      newRow.style.fontWeight = "bold";
      newRow.style.fontStyle = "italic";
    }

    tbody.appendChild(newRow);
  });
};

// Submit Button Function
function addTaskToTable(event) {
  event.preventDefault();

  const completed = false;
  const task = form.querySelector(".name").value;
  const dueDate = form.querySelector(".date").value;
  const description = form.querySelector(".description").value;
  const urgent = form.querySelector(".urgent").checked;
  
  const newToDO = { completed, task, dueDate, description, urgent };
  toDoList.push(newToDO);
  console.log(toDoList);

  loadTasks();
  closePopUp();
}

// Completed Button
const completed = function (event) {
  const button = event.target.closest(".completed");
  if (button) {
    const row = button.closest("tr");
    const index = Array.from(row.parentElement.children).indexOf(row);
    toDoList[index].completed = !toDoList[index].completed;
    loadTasks();
  }
};

// Event Listeners
addTaskBtn.addEventListener("click", openTaskPopUp);
closeBtn.addEventListener("click", closePopUp);
form.addEventListener("submit", addTaskToTable);

document.querySelector(".task-list-container").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete")) {
    const parentDivOfClickedBtn = event.target.closest("tr");
    deleteConfirmContainer.style.display = "block";
    document.querySelector("article").style.opacity = 0.2;
    yesbtn.onclick = function () {
      if (parentDivOfClickedBtn) {
        const index = parentDivOfClickedBtn.querySelector(".delete").dataset.index;
        toDoList.splice(index, 1);
        loadTasks();
      }
      deleteConfirmContainer.style.display = "none";
      document.querySelector("article").style.opacity = 1;
    };
    nobtn.onclick = function () {
      deleteConfirmContainer.style.display = "none";
      document.querySelector("article").style.opacity = 1;
    };
  }
});

table.addEventListener("click", completed);

document.addEventListener("DOMContentLoaded", loadTasks);
