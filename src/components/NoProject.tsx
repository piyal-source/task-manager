export default function NoProject({
  onCreateProject,
}: {
  onCreateProject: () => void;
}) {
  return (
    <div>
      <h1>No Project Selected</h1>
      <button onClick={onCreateProject}>Create a new project</button>
    </div>
  );
}
