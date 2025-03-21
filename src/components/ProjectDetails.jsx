import { useParams } from "react-router-dom";
import projects from "../data/projects";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => String(p.id) === projectId);

  if (!project) {
    return <div className="p-8 text-center">Project not found.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      {project.previewImg && (
        <img
          src={project.previewImg}
          alt={project.title}
          className="w-full rounded-lg mb-4"
        />
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.stack.map((tech, index) => (
          <span
            key={index}
            className="bg-[var(--primaryBlue)] px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="mb-4">{project.description}</p>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Visit Site
        </a>
      )}
    </div>
  );
}
