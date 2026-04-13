import { useRef, useState } from "react";
import type { ProjectType, TaskType } from "../types/projects.type";
import Tasks from "./Tasks.tsx";

export default function ProjectDetails({
  selectedProject,
  onUpdateTasks,
  onDeleteProject,
  onUpdateProject,
}: {
  selectedProject: ProjectType;
  onUpdateTasks: (updatesTasks: TaskType[]) => void;
  onDeleteProject: () => void;
  onUpdateProject: (updatedProject: ProjectType) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const handleEditProject = () => {
    if (isEditing) {
      const updatedTitle = titleRef.current?.value;
      if (updatedTitle?.trim() === "") {
        setShowEmptyError(true);
        return;
      }
      const updatedDescription = descriptionRef.current?.value;
      const updatedDueDateValue = dueDateRef.current?.value;
      const updatedDueDate = updatedDueDateValue
        ? new Date(updatedDueDateValue)
        : undefined;
      onUpdateProject({
        ...selectedProject,
        title: updatedTitle || selectedProject.title,
        description: updatedDescription,
        dueDate: updatedDueDate,
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
        <button onClick={onDeleteProject}>Delete</button>
      </div>
      {isEditing ? (
        <p>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            defaultValue={selectedProject.title}
            ref={titleRef}
            required
          />
          {showEmptyError && (
            <p style={{ color: "red" }}>
              Project title is required to continue.
            </p>
          )}
        </p>
      ) : (
        <h1>{selectedProject.title}</h1>
      )}
      {isEditing ? (
        <p>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            id="dueDate"
            type="date"
            defaultValue={
              selectedProject.dueDate
                ? selectedProject.dueDate.toISOString().split("T")[0]
                : ""
            }
            ref={dueDateRef}
          />
        </p>
      ) : (
        selectedProject.dueDate && (
          <p>Due Date: {selectedProject.dueDate.toLocaleDateString()}</p>
        )
      )}
      {isEditing ? (
        <p>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            defaultValue={selectedProject.description}
            placeholder="Add project details"
            ref={descriptionRef}
          />
        </p>
      ) : (
        selectedProject.description && (
          <p className="whitespace-pre-wrap">{selectedProject.description}</p>
        )
      )}
      <hr />
      <Tasks selectedProject={selectedProject} onUpdateTasks={onUpdateTasks} />
    </>
  );
}
