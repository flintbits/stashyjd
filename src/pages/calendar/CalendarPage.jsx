import PageShell from '../../layouts/PageShell/PageShell';
import PageHeader from '../../components/PageHeader/PageHeader';
import Calendar from '../../components/Calendar/Calendar';
import styles from './CalendarPage.module.css';

export default function CalendarPage() {
  return (
    <PageShell>
      <PageHeader
        title="Calendar "
        subtitle="Manage your interviews,tasks and deadlines in one place"
      ></PageHeader>

      <section className={styles['calendar-page-main']}>
        <Calendar />
      </section>
    </PageShell>
  );
}
