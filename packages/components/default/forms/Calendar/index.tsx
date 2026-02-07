import React from 'react';
import moment from 'moment';
import { CalendarGrid } from './styles';

const Calendar = () => {
  const daysOfWeek = moment.weekdaysShort();

  const getCalendarGrid = () => {
    const today = moment();
    const startDate = today.clone().startOf('month').startOf('week');
    const totalDays = 42;

    const calendarCells: JSX.Element[] = [];
    const currentDate = startDate.clone();

    for (let index = 0; index < totalDays; index++) {
      const isCurrentMonth = currentDate.month() === today.month();
      const cellClass = isCurrentMonth ? 'day-cell' : 'day-cell prev-month';
      const formattedDate = currentDate.format('D');

      calendarCells.push(
        <div key={currentDate.format('YYYY-MM-DD')} className={cellClass}>
          {formattedDate}
        </div>
      );

      currentDate.add(1, 'day');
    }

    return calendarCells;
  };

  return (
    <CalendarGrid>
      {daysOfWeek.map((day) => (
        <div key={day} className="header-cell">{day}</div>
      ))}
      {getCalendarGrid()}
    </CalendarGrid>
  );
};

export default Calendar;
