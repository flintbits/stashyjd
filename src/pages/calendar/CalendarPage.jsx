import PageHeader from '../../components/PageHeader/PageHeader';
import styles from './CalendarPage.module.css';

export default function CalendarPage() {
  return (
    <div className={styles['calendar-page']}>
      <PageHeader
        title="Calendar "
        subtitle="Manage your interviews,tasks and deadlines in one place"
      ></PageHeader>
    </div>
  );
}
