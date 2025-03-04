import "./styles.css";


import * as ch from './calendarhandler';
import  * as tm from './taskmanager';

const taskEditBtn = document.getElementById('taskEditBtn');
const dateMainCalendarElement = document.getElementById("dateMainCalendar");
const formElements = document.querySelectorAll('#taskForm *');
const formElement = document.getElementById('taskForm');


class selectedTaskId {
  static #currentTaskId = null;  // Private field
  static setCurrentTaskId(taskIndex) {
    this.#currentTaskId = taskIndex;
  }
  static getCurrentTaskId() {
    return this.#currentTaskId;
  }
  static clearCurrentTaskId() {
    this.#currentTaskId = null;
  }
};

function taskEditBtnsetEdit(){
  taskEditBtn.classList.remove('saveThisEdit'); 
  taskEditBtn.classList.add('editThisTask'); 
  taskEditBtn.textContent = "Edit this task";
};

function taskEditBtnsetSave(){
  taskEditBtn.classList.remove('editThisTask'); 
  taskEditBtn.classList.add('saveThisEdit'); 
  taskEditBtn.textContent = "Save this edit";
};
     
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  dateMainCalendarElement.value = today;
  ch.mainCalendarGenerateOnAction("mainCalendarContainer","dateMainCalendar");
});

dateMainCalendarElement.addEventListener('change', () => {
  ch.mainCalendarGenerateOnAction("mainCalendarContainer","dateMainCalendar");
});

document.getElementById("projectDropdown").addEventListener('change', (e) => {
  tm.listProjectsByName(e.target.value);
});

document.getElementById("mainTaskTitleContainer").addEventListener('click', (e)=>{
  //highlight the task in the list
  const prevSelectedTask = document.querySelector(".taskInfoListContainerSelected");
  if (prevSelectedTask) {
    prevSelectedTask.classList.remove("taskInfoListContainerSelected");
  }
  e.target.classList.add("taskInfoListContainerSelected");
  //draw line from today, to duedate
  ch.markCalendarDays('mainCalendarContainer', dateMainCalendarElement.value, tm.Task.tasksArray[e.target.closest('.taskInfoListContainer').id].dueDate);
  //fill task card below calendar with this task info
  selectedTaskId.setCurrentTaskId(e.target.closest('.taskInfoListContainer').id);
  tm.fillFormWithtask(tm.Task.tasksArray[selectedTaskId.getCurrentTaskId()]);

  formElements.forEach(element => {
    element.disabled = true;
    if (element.id === "taskEditBtn") {
      element.disabled = false;
    }
  });
  taskEditBtnsetEdit();
});

document.getElementById('addNewTaskBtn').addEventListener('click', function() {
  formElement.reset();
  formElements.forEach(element => {
    element.disabled = false;
    if (element.id === "taskEditBtn") {
      element.disabled = true;
    }
  });
});


taskEditBtn.addEventListener('click', function(){
  if (taskEditBtn.classList.contains("editThisTask")) {
    formElements.forEach(element => {
      element.disabled = false;
      if (element.id === "taskSubmitBtn") {
        element.disabled = true;
      }
    });
    taskEditBtnsetSave();  
    // startEditing();
  } 
  else if (taskEditBtn.classList.contains("saveThisEdit")){
    //save this edit:
    tm.editTaskFromFormEdits(selectedTaskId.getCurrentTaskId(),new FormData(document.querySelector('#taskForm')));
    //clear
    taskEditBtnsetEdit();
    formElement.reset();
    formElements.forEach(element => {
      element.disabled = true;
    });
    selectedTaskId.clearCurrentTaskId();
  };
});





formElement.addEventListener("submit", (e)=>{
  e.preventDefault();

  //save tasks in local? in server? idk
  tm.addTaskFromForm(new FormData(document.querySelector('#taskForm')));
 
  //clear form
  formElement.reset();
  formElements.forEach(element => {
    element.disabled = true;
  });
});







  
window.Task = tm.Task;
// Create some tasks
const task1 = new tm.Task("Task 1", "Project A", "Description for task 1", "2025-03-01", 3);
const task2 = new tm.Task("Task 2", "Project A", "Description for task 2", "2025-03-05", 2);
const task3 = new tm.Task("Task 3", "Project B", "Description for task 3", "2025-03-01", 1);
const task4 = new tm.Task("Task 4", "Project C", "Description for task 4", "2025-03-10", 3);
const task5 = new tm.Task("Task 5", "Project A", "Description for task 5", "2025-03-01", 2);
tm.listProjectsByName("Project A");

