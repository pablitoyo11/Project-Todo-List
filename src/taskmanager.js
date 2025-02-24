//creating a new task
class Task {
    static tasksArray = []; //array to store  all tasks
    constructor (title,project,description,dueDate,priority){
    this.title = title;
    this.project = project;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
    Task.tasksArray.push(this);// push it to the array after created
    this.taskArrayPosition = Task.tasksArray.indexOf(this);
    }

    //method to add or change title
    changeTitle(newTitle) {
        this.title = newTitle;
        console.log(`Task New Title: "${this.title}"`);
    }

    //method to add or change project
    changeProject(newProject) {
        this.project = newProject;
        console.log(`Task: "${this.title}", added to project: "${this.project}"`);
    }


    //method to add or change description
    changeDescription(newDescription) {
        this.description = newDescription;
        console.log(`"${this.title}", updated description: ${this.description}`);
    }
    
    //method to add or change DueDate
    changeDueDate(newDueDate) {
        this.dueDate = newDueDate;
        console.log(`"${this.title}", due date updated: ${this.dueDate}`);
    }

    //method to add or change priority 
    changePriority(newPriority) {
        const priorityLevels = {
            3: 'High',
            2: 'Medium',
            1: 'Low'
        };

        if (priorityLevels[newPriority]) {
            this.priority = priorityLevels[newPriority];
            console.log(`"${this.title}", priority changed to ${this.priority}.`);
        } else {
            console.log(`Priority must be a number, 1 (Low) - 2(Medium) - 3 (High).`);
        }
    }

    //method to mark a task as completed or uncompleted
    toggleCompleted() {
        this.completed = !this.completed;
        console.log(`Task "${this.title}", is now ${this.completed ? "completed" : "not completed"}.`);
    }

    //method to search task at a specific day
    static searchAllTasks(searchObject){
        // tasksArray.filter(task => task[searchIn] === searchFor)
        return Task.tasksArray.filter(task => {
            for (let key in searchObject) {
                if (task[key] !== searchObject[key]){
                    return false;
                }               
            }
            return true; //to avoid undefined
        });
    }        

}

//WORKING ON DOM
//method to filter and list projects on DOM based on project value
function listProjectsByName(projectName) {
    let listedByProject = Task.searchAllTasks({"project":projectName});
    let mainTaskTitleContainer = document.getElementById('mainTaskTitleContainer'); 
    mainTaskTitleContainer.innerHTML="";
    listedByProject.forEach(task => {
        mainTaskTitleContainer.appendChild(generateProjectDOMelement(task));
    });

    function generateProjectDOMelement(task){
        const taskInfoListContainer = document.createElement("div");
        taskInfoListContainer.setAttribute("class", "taskInfoListContainer");
        taskInfoListContainer.setAttribute("id", task.taskArrayPosition);
        const taskTitleList = document.createElement("div");
        taskTitleList.setAttribute("class", "taskTitleList");
        taskTitleList.innerText = task.title;
        taskInfoListContainer.appendChild(taskTitleList);
        const taskDueDateList = document.createElement("div");
        taskDueDateList.setAttribute("class", "taskDueDateList");
        taskDueDateList.innerText = task.dueDate;
        taskInfoListContainer.appendChild(taskDueDateList);
        return taskInfoListContainer;
    }; 

}

function fillFormWithtask(taskArrayId){
    let taskSelected=taskArrayId;
    // fill the form with the selected task
    document.getElementById("taskProjectInput").value = taskSelected.project;
    document.getElementById("taskTitleInput").value = taskSelected.title;
    document.getElementById("taskDueDateInput").value = taskSelected.dueDate;
    document.getElementById("taskDescriptionInput").value = taskSelected.description;
    document.getElementById("taskPriorityInput").value = taskSelected.priority;
    document.getElementById("completedCheckboxInput").checked = taskSelected.completed;
}


export {Task,listProjectsByName,fillFormWithtask};