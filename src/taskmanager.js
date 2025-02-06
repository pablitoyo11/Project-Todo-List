//creating a new task
class Task {
    constructor (title,project,description,dueDate,priority){
    this.title = title;
    this.project = project;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
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

}