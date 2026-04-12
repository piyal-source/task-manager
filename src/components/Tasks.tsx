import type { TaskType } from "../types/projects.type";

const Tasks = ({
  projectTasks,
  projectId,
  onUpdateTasks,
}: {
  projectTasks: TaskType[];
  projectId: string;
  onUpdateTasks: (updatedTasks: TaskType[], projectId: string) => void;
}) => {
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = projectTasks.filter(
      (task: TaskType) => task.id !== taskId,
    );
    onUpdateTasks(updatedTasks, projectId);
  };
  const handleTaskCheckbox = (taskId: string) => {
    const updatedTasks = projectTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    onUpdateTasks(updatedTasks, projectId);
  };

  return (
    <ul>
      {projectTasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleTaskCheckbox(task.id)}
          />{" "}
          <span>{task.title}</span>{" "}
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
export default Tasks;
