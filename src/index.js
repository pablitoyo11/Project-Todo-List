import "./styles.css";


import { appendCalendarOnClick } from './calendarhandler';


document.addEventListener('DOMContentLoaded', () => {
  appendCalendarOnClick("mainCalendarContainer","dateMainCalendar");
});

document.getElementById("dateMainCalendar").addEventListener('change', () => {
    appendCalendarOnClick("mainCalendarContainer","dateMainCalendar");
  });