import { useRef } from "react";
const ProjectInputs = ({ isEmptyError }: { isEmptyError: boolean }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <p>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" ref={titleRef} required />
      </p>
      {isEmptyError && (
        <p style={{ color: "red" }}>Project title is required to continue.</p>
      )}
      <p>
        <label htmlFor="description">Description:</label>
        <textarea id="description" ref={descriptionRef}></textarea>
      </p>
      <p>
        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" id="dueDate" ref={dueDateRef} />
      </p>
    </>
  );
};
export default ProjectInputs;
