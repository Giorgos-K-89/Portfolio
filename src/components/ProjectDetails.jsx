import { Link, useParams } from "react-router-dom";
import projects from "../data/projects";
import Navbar from "./Navbar";
import Squares from "./Squares";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const project = projects.find((p) => String(p.id) === projectId);

  const total = projects.length;
  const prevId = project.id === 1 ? total : project.id - 1;
  const nextId = project.id === total ? 1 : project.id + 1;

  if (!project) {
    return <div className="p-8 text-center">Project not found.</div>;
  }

  return (
    <main className="bg-black w-full min-h-screen pt-40 pb-10 text-white">
      <Navbar />
      <Squares
        speed={0.5}
        squareSize={40}
        direction="diagonal" // up, down, left, right, diagonal
        borderColor="#fff"
        hoverFillColor="#222"
      />
      <div className="relative w-[90vw] max-w-screen-2xl mx-auto z-10">
        <p className="text-base italic mb-2 text-[var(--accentOrange)]">
          {project.descriptionTitle}
        </p>
        <div className="flex flex-col lg::flex-row w-full justify-between">
          <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-7xl font-bold mb-8 tracking-wider">
            {project.title}
          </h2>
          <div className="flex items-center gap-4 mb-1">
            <Link
              to={`/project/${prevId}`}
              className="cursor-pointer hover:underline hover:text-[var(--primaryBlue)] text-sm md:text-base"
            >
              Previous Project
            </Link>
            <Link
              to={`/project/${nextId}`}
              className="cursor-pointer hover:underline hover:text-[var(--primaryBlue)] text-sm md:text-base"
            >
              Next Project
            </Link>
          </div>
        </div>
        {project.previewImg && (
          <img
            src={project.previewImg}
            alt={project.title}
            className="w-full rounded-lg mb-4 border-2 border-neutral-700"
          />
        )}
        <div className="max-w-screen-lg mx-auto">
          <div className="flex justify-center flex-wrap gap-2 mb-10">
            {project.stack.map((tech, index) => (
              <p
                key={index}
                className="bg-[var(--primaryBlue)] px-3 py-1 rounded-full text-xs font-semibold tracking-wider capitalize"
              >
                {tech}
              </p>
            ))}
          </div>

          <p className="mb-10 text-neutral-300">{project.description}</p>

          {/* My Contribution */}
          {project.contribution && (
            <div className="mb-10">
              <h3 className="text-3xl font-semibold text-[var(--primaryBlue)] mb-2">
                My Contribution
              </h3>
              <p className="text-neutral-300">{project.contribution}</p>
            </div>
          )}

          {/* What I Learned */}
          {project.learned && (
            <div className="mb-10">
              <h3 className="text-3xl font-semibold text-[var(--primaryBlue)] mb-2">
                What I Learned
              </h3>
              <p className="text-neutral-300">{project.learned}</p>
            </div>
          )}

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
      </div>
    </main>
  );
}
