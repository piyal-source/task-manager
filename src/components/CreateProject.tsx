import { useRef } from "react";

export default function CreateProject({
  onAddProject,
  onRemoveSelectedProject,
}: {
  onAddProject: (title: string, description: string, dueDate?: Date) => void;
  onRemoveSelectedProject: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (titleRef.current?.value) {
      const title = titleRef.current?.value;
      const description = descriptionRef.current?.value || "";
      const dueDate = dueDateRef.current?.value;
      onAddProject(title, description, dueDate ? new Date(dueDate) : undefined);
      titleRef.current.value = "";
      if (descriptionRef.current) {
        descriptionRef.current.value = "";
      }
      if (dueDateRef.current) {
        dueDateRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <h2>Create Project</h2>
      <div>
        <p>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" ref={titleRef} />
        </p>
        <p>
          <label htmlFor="description">Description:</label>
          <textarea id="description" ref={descriptionRef}></textarea>
        </p>
        <p>
          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" id="dueDate" ref={dueDateRef} />
        </p>
        <p>
          <button onClick={handleSave}>Save</button>
          <button onClick={onRemoveSelectedProject}>Cancel</button>
        </p>
      </div>
    </div>
  );
}
