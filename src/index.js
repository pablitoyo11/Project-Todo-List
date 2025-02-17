import "./styles.css";


import * as ch from './calendarhandler';


document.addEventListener('DOMContentLoaded', () => {
  ch.appendCalendarOnLoad("mainCalendarContainer","dateMainCalendar");
});

document.getElementById("dateMainCalendar").addEventListener('change', () => {
  ch.mainCalendarGenerateOnAction("mainCalendarContainer","dateMainCalendar");
  });