import "./styles.css";


import * as ch from './calendarhandler';
import  * as tm from './taskmanager';

document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('dateMainCalendar').value = today;
  ch.mainCalendarGenerateOnAction("mainCalendarContainer","dateMainCalendar");
});

document.getElementById("dateMainCalendar").addEventListener('change', () => {
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
  ch.markCalendarDays('mainCalendarContainer', document.getElementById("dateMainCalendar").value, tm.Task.tasksArray[e.target.closest('.taskInfoListContainer').id].dueDate);
  //fill task card below calendar with this task info
  console.log(tm.Task.tasksArray[e.target.closest('.taskInfoListContainer').id]);
  tm.fillFormWithtask(tm.Task.tasksArray[e.target.closest('.taskInfoListContainer').id]);
});

document.getElementById("taskForm").addEventListener("submit", (e)=>{
  e.preventDefault();
  //save tasks in local? in server? idk
  //clear form
});


  

// Create some tasks
const task1 = new tm.Task("Task 1", "Project A", "Description for task 1", "2025-03-01", 3);
const task2 = new tm.Task("Task 2", "Project A", "Description for task 2", "2025-03-05", 2);
const task3 = new tm.Task("Task 3", "Project B", "Description for task 3", "2025-03-01", 1);
const task4 = new tm.Task("Task 4", "Project C", "Description for task 4", "2025-03-10", 3);
const task5 = new tm.Task("Task 5", "Project A", "Description for task 5", "2025-03-01", 2);
tm.listProjectsByName("Project A");

