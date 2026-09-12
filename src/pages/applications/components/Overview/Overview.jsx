import { useEffect, useState } from 'react';
import ApplicationInfo from '../ApplicationInfo/ApplicationInfo';
import TaskList from '../TaskList/TaskList';
import styles from './Overview.module.css';
import { taskService } from '../../../../services/taskService';
import { useRequest } from '../../../../app/hooks/useRequest';

export default function Overview({ applicationId }) {
  const { execute } = useRequest();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () =>
    execute({
      request: () => taskService.fetchTasks({ applicationId }),
      onSuccess: (data) =>
        setTasks(
          data.map((task) => ({
            ...task,
            id: task.public_id,
            date: task.created_at,
          })),
        ),
    });

  const handleAddTask = (text) =>
    execute({
      request: () =>
        taskService.createTask({
          applicationId,
          text,
          completed: false,
          priority: 'low',
          dueAt: '',
        }),
      onSuccess: fetchTasks,
      showSuccessToast: true,
    });

  useEffect(() => {
    fetchTasks();
  }, [applicationId]);

  const handleTaskToggle = (task) => {
    execute({
      request: () =>
        taskService.updateTask({
          taskId: task.public_id,
          completed: !task.completed,
        }),
      onSuccess: fetchTasks,
    });
  };

  const handleTaskDelete = (task) =>
    execute({
      request: () => taskService.deleteTask({ taskId: task.public_id }),
      onSuccess: fetchTasks,
      showSuccessToast: true,
    });

  return (
    <section className={styles['overview-grid']}>
      <ApplicationInfo />
      {/* Tasks */}
      <TaskList
        buttonLabel="Add Task"
        title="Tasks"
        items={tasks}
        onAdd={handleAddTask}
        onToggle={handleTaskToggle}
        onDelete={handleTaskDelete}
      />
      {/* Notes */}
      <TaskList
        title="Notes"
        showCheckbox={false}
        buttonLabel="Add Note"
        items={[
          { id: 1, text: 'Do this', date: 'May 12, 2026' },
          { id: 2, text: 'Do that', date: 'May 12, 2026' },
          {
            id: 3,
            text: 'Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that',
            date: 'May 12, 2026',
          },
          {
            id: 4,
            text: 'Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that Do that',
            date: 'May 12, 2026',
          },
        ]}
      />
    </section>
  );
}
