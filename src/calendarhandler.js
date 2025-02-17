//creating calendar

function getSelectedDate(selectedDayInput) {
    const selectedDay = new Date(selectedDayInput || new Date());
   /* if selectedDayInput=null {
        const selectedDay = new Date();
    }
    else{
        const selectedDay = new Date(selectedDayInput);
    }*/
    const year = selectedDay.getUTCFullYear();
    const month = String(selectedDay.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(selectedDay.getUTCDate()).padStart(2, '0');
    return { year, month, day };
}

function addStyleSelectedDays(calendarId,selectedDayId) {
    const calendarContainer = document.getElementById(calendarId);
    const allDays = calendarContainer.querySelectorAll('.day');
    allDays.forEach(day => {
        day.classList.remove('selectedDay');
    });
    const selectedDayElement = calendarContainer.querySelector(`#${selectedDayId}`);
    if (selectedDayElement) {
        selectedDayElement.classList.add('selectedDay');
    }
}


function generateCalendar(year,month){
    /*day will be used to mark that day as selected default is no day selected*/
    /*
    create div container -> year month and days container
    days should be created with a function
    and fill spaces like a regular calendar 
    to start in the right position with the number 1 day
    */
    const calendarContainer = document.createElement("div");
    calendarContainer.setAttribute("class", "calendarContainer");

    const calendarYear = document.createElement("span");
    calendarYear.setAttribute("class", "calendarYearSpan");
    calendarYear.innerText = year;
    calendarContainer.appendChild(calendarYear);
    

    const calendarMonth = document.createElement("span");
    calendarMonth.setAttribute("class", "calendarMonthSpan");
    calendarMonth.innerText = month;
    calendarContainer.appendChild(calendarMonth);


    function generateMonthDays (year,month){
        let monthDaysDivArray=[];
        const startingDate = new Date(year,month-1,1);
       // monthDaysDivArray = startingDate.getDay() // returns 0 to 6 number
        while (startingDate.getMonth() === month-1) {
            const calendarDays = document.createElement("div");
            calendarDays.setAttribute("class", "calendarDay");
            let dayNumber=startingDate.getDate()
            calendarDays.setAttribute("id", `day${String(dayNumber).padStart(2, '0')}`);
            monthDaysDivArray.push(calendarDays);
            calendarDays.innerText = (dayNumber);
            startingDate.setDate(startingDate.getDate()+1);
        }
        return monthDaysDivArray;
    }

    function generatePreviousMonthDays (year,month){
        let prevmonthDaysDivArray=[];
        const startingDate = new Date(year,month-1,1);
        const startingDayOfWeek = startingDate.getDay();

        for (let index = 0; index < startingDayOfWeek; index++) {
            const calendarDays = document.createElement("div");
            calendarDays.setAttribute("class", "calendarDay");
            calendarDays.setAttribute("id", `dayPreviousMonth`);
            prevmonthDaysDivArray.push(calendarDays);
        }
        return prevmonthDaysDivArray;
    }

    const calendarDaysContainer = document.createElement("div");
    calendarDaysContainer.setAttribute("class", "calendarDaysContainer");
    let daysToAdd=generateMonthDays(year,month)
    daysToAdd.unshift(...generatePreviousMonthDays(year,month))
    daysToAdd.forEach(day => {
        calendarDaysContainer.appendChild(day);
    });
    calendarContainer.appendChild(calendarDaysContainer);

    return calendarContainer;
}

function addStyleMainCalendar(calendarContainer) {
    const style = document.createElement('style');
    style.innerHTML = `
        .calendarYear {
            color: var(--secondary-color);
        }

        .calendarMonth {
            color: var(--secondary-color);
        }

        .calendarDay {
            background-color: white;  
            border: 2px solid black; 
            padding: 10px;
            margin: 5px;
            text-align: center;
            cursor: pointer;
        }

        .calendarDay.prevMonth {
            background-color: transparent;
            border: 2px solid transparent; 
        }

        .selecteddayid {
            background-color: yellow !important;
            border: 2px solid orange !important;
        }
    `;
    calendarContainer.append(style);
    return calendarContainer;
}

function appendCalendarOnLoad(calendarId) {
    let calendarElement = document.getElementById(calendarId);
    let dateInputObj = getSelectedDate(); 
    const generatedCalendar = generateCalendar(dateInputObj.year, dateInputObj.month);
    const styledCalendar = addStyleMainCalendar(generatedCalendar);
    calendarElement.innerHTML = '';
    calendarElement.appendChild(styledCalendar);
}

function mainCalendarGenerateOnAction(calendarId,dateInputId) {
    let calendarElement = document.getElementById(calendarId);
    let dateInputElement = document.getElementById(dateInputId);
    let dateInputObj = getSelectedDate(dateInputElement.value);
    const generatedCalendar = generateCalendar(dateInputObj.year, dateInputObj.month);
    const styledCalendar = addStyleMainCalendar(generatedCalendar);
    calendarElement.innerHTML = '';
    calendarElement.appendChild(styledCalendar);
    addStyleSelectedDays(calendarId,`day${dateInputObj.day}`) 
}
export {appendCalendarOnLoad,mainCalendarGenerateOnAction};