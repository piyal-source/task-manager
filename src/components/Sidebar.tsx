import type { ProjectType } from "../types/projects.type";

export default function Sidebar({
  projects,
  selectedProjectId,
  onCreateProject,
  onSelectProject,
  onRemoveSelectedProject,
}: {
  projects: ProjectType[];
  selectedProjectId?: string | null;
  onCreateProject: () => void;
  onSelectProject: (projectId: string) => void;
  onRemoveSelectedProject: () => void;
}) {
  return (
    <aside className="sidebar">
      <h2 onClick={onRemoveSelectedProject}>Projects</h2>
      <button className="create-project-btn" onClick={onCreateProject}>
        + Create New Project
      </button>
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={`list-none ${selectedProjectId === project.id ? "bg-blue-500 text-white" : ""}`}
          >
            <a onClick={() => onSelectProject(project.id)}>{project.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
