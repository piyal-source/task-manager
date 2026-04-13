import { useState } from "react";
import type { ProjectType, TaskType } from "../types/projects.type";
import TaskList from "./TaskList.tsx";

export default function Tasks({
  selectedProject,
  onUpdateTasks,
}: {
  selectedProject: ProjectType;
  onUpdateTasks: (updatedTasks: TaskType[]) => void;
}) {
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    if (taskInput?.trim() === "") return;
    const newTask = {
      id: crypto.randomUUID(),
      title: taskInput,
      completed: false,
    };
    onUpdateTasks([...selectedProject.tasks, newTask]);
    setTaskInput("");
  };

  return (
    <>
      <h2>Tasks</h2>
      <p>
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </p>
      {selectedProject.tasks.length === 0 ? (
        <p>This project does not have any tasks added yet.</p>
      ) : (
        <TaskList
          projectTasks={selectedProject.tasks}
          projectId={selectedProject.id}
          onUpdateTasks={onUpdateTasks}
        />
      )}
    </>
  );
}
