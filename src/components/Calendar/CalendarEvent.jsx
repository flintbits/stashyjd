import styles from './CalendarEvent.module.css';

export default function CalendarEvent({ event }) {
  return (
    <div className={`${styles.event} ${styles[event.type]}`}>
      <strong>{event.title}</strong>
      <span>{event.time}</span>
    </div>
  );
}
