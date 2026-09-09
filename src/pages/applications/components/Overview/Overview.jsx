import ApplicationInfo from '../ApplicationInfo/ApplicationInfo';
import TaskList from '../TaskList/TaskList';
import styles from './Overview.module.css';

export default function Overview() {
  return (
    <section className={styles['overview-grid']}>
      <ApplicationInfo />
      {/* Next Steps */}
      <TaskList
        title="Tasks"
        items={[
          { id: 1, text: 'Do this', date: 'May 12, 2026' },
          { id: 2, text: 'Do that', date: 'May 12, 2026', completed: true },
        ]}
      />
      <h1>3</h1>
      {/* Notes */}
      <TaskList
        title="Notes"
        showCheckbox={false}
        buttonLabel="Add Note"
        items={[
          { id: 1, text: 'Do this', date: 'May 12, 2026' },
          { id: 2, text: 'Do that', date: 'May 12, 2026' },
          {
            id: 2,
            text: 'Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that',
            date: 'May 12, 2026',
          },
          {
            id: 3,
            text: 'Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that',
            date: 'May 12, 2026',
          },
        ]}
      />
    </section>
  );
}
