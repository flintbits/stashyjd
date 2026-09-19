import { useState } from 'react';
import TabsComponent from '../TabsComponent/TabsComponent';
import Button from '../Button/Button';
import { NextIcon, PreviousIcon } from '../../assets/icons/icon';
import CalendarEvent from './CalendarEvent';
import styles from './Calendar.module.css';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MIN_YEAR = 2016;

const CALENDAR_TABS = [
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
];

const demoEventDate = new Date();
const demoEventYear = demoEventDate.getFullYear();
const demoEventMonth = String(demoEventDate.getMonth() + 1).padStart(2, '0');
const DEMO_EVENTS = {
  [`${demoEventYear}-${demoEventMonth}-02`]: [
    { title: 'Interview', time: '10:00 AM', type: 'purple' },
  ],
  [`${demoEventYear}-${demoEventMonth}-08`]: [
    { title: 'Update resume', time: '2:00 PM', type: 'green' },
  ],
  [`${demoEventYear}-${demoEventMonth}-15`]: [
    { title: 'Application deadline', time: '9:00 AM', type: 'red' },
    { title: 'Recruiter call', time: '10:00 AM', type: 'blue' },
    { title: 'Portfolio review', time: '11:00 AM', type: 'purple' },
    { title: 'Send follow-up', time: '12:00 PM', type: 'green' },
    { title: 'Technical screen', time: '1:00 PM', type: 'blue' },
    { title: 'Team interview', time: '2:00 PM', type: 'purple' },
    { title: 'Update tracker', time: '3:00 PM', type: 'green' },
    { title: 'Prepare notes', time: '4:00 PM', type: 'purple' },
    { title: 'Submit feedback', time: '5:00 PM', type: 'red' },
    { title: 'Plan tomorrow', time: '6:00 PM', type: 'blue' },
  ],
};

export default function Calendar({ children }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const currentYear = new Date().getFullYear();

  const previousMonth = () => {
    setCurrentDate((prev) => {
      const nextDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      return nextDate.getFullYear() < MIN_YEAR ? prev : nextDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate((prev) => {
      const nextDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      return nextDate.getFullYear() > currentYear ? prev : nextDate;
    });
  };

  const previousPeriod = () => {
    if (view === 'year') {
      setCurrentDate((prev) =>
        prev.getFullYear() <= MIN_YEAR ? prev : new Date(prev.getFullYear() - 1, 0, 1),
      );
      return;
    }

    previousMonth();
  };

  const nextPeriod = () => {
    if (view === 'year') {
      setCurrentDate((prev) =>
        prev.getFullYear() >= currentYear ? prev : new Date(prev.getFullYear() + 1, 0, 1),
      );
      return;
    }

    nextMonth();
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setView('month');
  };

  function getCalendarDays(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // JS: Sunday = 0, Monday = 1...
    // Convert to Monday = 0
    const startDay = (firstDay.getDay() + 6) % 7;

    const days = [];

    // Previous month's trailing days
    const previousMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, previousMonthLastDay - i),
        day: previousMonthLastDay - i,
        currentMonth: false,
      });
    }

    // Current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push({
        date: new Date(year, month, day),
        day,
        currentMonth: true,
      });
    }

    // Next month's leading days
    let nextDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(year, month + 1, nextDay),
        day: nextDay,
        currentMonth: false,
      });

      nextDay++;
    }

    return days;
  }

  function getEventsForDate(date) {
    const dateKey = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
      .map((part, index) => (index === 0 ? part : String(part).padStart(2, '0')))
      .join('-');

    return DEMO_EVENTS[dateKey] || [];
  }

  function isToday(date) {
    const today = new Date();

    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  function renderMonth(month, year, compact = false) {
    const days = getCalendarDays(year, month);

    return (
      <div className={compact ? styles['mini-month'] : styles.calendar}>
        <div className={styles['calendar-weekdays']}>
          {WEEKDAYS.map((day) => (
            <div key={day} className={styles.weekday}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles['calendar-grid']}>
          {days.map((day) => (
            <div
              key={day.date.toISOString()}
              className={`${styles['calendar-day']} ${day.currentMonth ? '' : styles['outside-month']} ${isToday(day.date) ? styles['current-day'] : ''}`}
            >
              <span className={styles['day-number']}>{day.day}</span>
              <div className={styles['day-events']}>
                {getEventsForDate(day.date).map((event) => (
                  <CalendarEvent key={`${event.title}-${event.time}`} event={event} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <section className={styles.toolbar}>
        <div className={styles.navigation}>
          <Button
            // text={view === 'year' ? 'Prev year' : 'Prev'}
            onClick={previousPeriod}
            leftIcon={PreviousIcon}
            className={styles['navigation-arrow']}
            iconOnly
            variant="text"
            disabled={
              view === 'year'
                ? currentDate.getFullYear() <= MIN_YEAR
                : currentDate.getFullYear() <= MIN_YEAR && currentDate.getMonth() === 0
            }
          />

          <Button
            text={`${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
            className={styles['month-year']}
            variant="text"
            onClick={() => setView('month')}
          />

          <Button
            // text={view === 'year' ? 'Next year' : 'Next'}
            onClick={nextPeriod}
            rightIcon={NextIcon}
            className={styles['navigation-arrow']}
            iconOnly
            variant="text"
            disabled={
              view === 'year'
                ? currentDate.getFullYear() >= currentYear
                : currentDate.getFullYear() >= currentYear && currentDate.getMonth() === 11
            }
          />
          <Button
            text="Today"
            className={styles['today-button']}
            variant="text"
            onClick={goToToday}
          />
        </div>
        <TabsComponent
          tabs={CALENDAR_TABS}
          defaultTab="month"
          activeTab={view}
          onChange={setView}
        />
      </section>

      {view === 'month' ? (
        renderMonth(currentDate.getMonth(), currentDate.getFullYear())
      ) : (
        <div className={styles['year-grid']}>
          {MONTHS.map((month, monthIndex) => (
            <button
              type="button"
              className={`${styles['year-month']} ${
                currentDate.getFullYear() === currentYear && monthIndex === new Date().getMonth()
                  ? styles['current-month']
                  : ''
              }`}
              key={month}
              onClick={() => {
                setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
                setView('month');
              }}
            >
              <strong>{month}</strong>
            </button>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
