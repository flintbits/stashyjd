import { invokeSafe } from '../lib/invokeSafe';

export const taskService = {
  createTask(payload) {
    return invokeSafe('create_task', { request: payload });
  },
  fetchTasks(payload) {
    return invokeSafe('get_tasks', { applicationId: payload?.applicationId });
  },

  updateTask(payload) {
    return invokeSafe('set_task_completed', {
      taskId: payload?.taskId,
      completed: payload?.completed,
    });
  },
  deleteTask(payload) {
    return invokeSafe('delete_task', { taskId: payload?.taskId });
  },
};
