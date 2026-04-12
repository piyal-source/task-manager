import { useRef, useState } from "react";
import type { ProjectType, TaskType } from "../types/projects.type";
import Tasks from "./Tasks";

export default function ProjectDetails({
  selectedProject,
  onUpdateTasks,
  onDeleteProject,
  onUpdateProject,
}: {
  selectedProject: ProjectType;
  onUpdateTasks: (updatesTasks: TaskType[], projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onUpdateProject: (projectId: string, updatedProject: ProjectType) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const taskInputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = () => {
    if (!taskInputRef.current || taskInputRef.current.value.trim() === "")
      return;
    const newTask = {
      id: crypto.randomUUID(),
      title: taskInputRef.current.value,
      completed: false,
    };
    onUpdateTasks([...selectedProject.tasks, newTask], selectedProject.id);
    taskInputRef.current.value = "";
  };
  const handleEditProject = () => {
    if (isEditing && titleRef.current) {
      const updatedTitle = titleRef.current?.value;
      if (updatedTitle.trim() === "") return;
      onUpdateProject(selectedProject.id, {
        ...selectedProject,
        title: updatedTitle,
      });
    }
    setIsEditing((prev) => !prev);
  };

  return (
    <>
      <div className="text-right">
        <button onClick={handleEditProject}>
          {isEditing ? "Save" : "Edit"}
        </button>
        <button onClick={() => onDeleteProject(selectedProject.id)}>
          Delete
        </button>
      </div>
      {isEditing ? (
        <input
          type="text"
          defaultValue={selectedProject.title}
          ref={titleRef}
        />
      ) : (
        <h1>{selectedProject.title}</h1>
      )}
      {selectedProject.dueDate && (
        <p>Due Date: {selectedProject.dueDate.toLocaleDateString()}</p>
      )}
      <p>{selectedProject.description}</p>
      <hr />
      <h2>Tasks</h2>
      <p>
        <input type="text" placeholder="Add a new task..." ref={taskInputRef} />
        <button onClick={handleAddTask}>Add Task</button>
      </p>
      {selectedProject.tasks.length === 0 ? (
        <p>This project does not have any tasks added yet.</p>
      ) : (
        <Tasks
          projectTasks={selectedProject.tasks}
          projectId={selectedProject.id}
          onUpdateTasks={onUpdateTasks}
        />
      )}
    </>
  );
}
