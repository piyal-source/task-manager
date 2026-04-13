import { useState, useRef } from "react";
import ProjectDetails from "./ProjectDetails";
import CreateProject from "./CreateProject";
import NoProject from "./NoProject";
import type { ProjectType, TaskType } from "../types/projects.type";
import Sidebar from "./Sidebar";
import Modal from "./Modal";

export default function ProjectManager() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>();

  const deleteProjectModalRef = useRef<HTMLDialogElement>(null);

  const showCreateProject = selectedProjectId === null;

  const handleCreateProject = () => {
    setSelectedProjectId(null);
  };

  const handleAddProject = (
    title: string,
    description: string,
    dueDate?: Date,
  ) => {
    const newProject: ProjectType = {
      id: crypto.randomUUID(),
      title,
      description,
      dueDate,
      tasks: [],
    };
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    setSelectedProjectId(newProject.id);
  };

  const handleUpdateTasks = (updatedTasks: TaskType[]) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProjectId
          ? { ...project, tasks: updatedTasks }
          : project,
      ),
    );
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleRemoveSelectedProject = () => {
    setSelectedProjectId(undefined);
  };

  const handleUpdateProject = (updatedProject: ProjectType) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProjectId ? updatedProject : project,
      ),
    );
  };

  const handleDeleteProject = () => {
    deleteProjectModalRef.current?.showModal();
  };
  const handleConfirmDeleteProject = () => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== selectedProjectId),
    );
    setSelectedProjectId(undefined);
    deleteProjectModalRef.current?.close();
  };

  return (
    <div className="app-container">
      <Sidebar
        projects={projects}
        selectedProjectId={selectedProjectId}
        onCreateProject={handleCreateProject}
        onSelectProject={handleSelectProject}
        onRemoveSelectedProject={handleRemoveSelectedProject}
      />
      <main>
        {selectedProjectId ? (
          <ProjectDetails
            selectedProject={projects.find((p) => p.id === selectedProjectId)!}
            onUpdateTasks={handleUpdateTasks}
            onDeleteProject={handleDeleteProject}
            onUpdateProject={handleUpdateProject}
          />
        ) : showCreateProject ? (
          <CreateProject
            onAddProject={handleAddProject}
            onRemoveSelectedProject={handleRemoveSelectedProject}
          />
        ) : (
          <NoProject onCreateProject={handleCreateProject} />
        )}
      </main>
      <Modal
        ref={deleteProjectModalRef}
        title="Are you sure you want to delete this project?"
        ctaPrimary={{
          label: "Yes",
          onClick: handleConfirmDeleteProject,
        }}
        ctaSecondary={{
          label: "Cancel",
        }}
      />
    </div>
  );
}
