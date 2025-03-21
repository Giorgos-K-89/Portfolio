import { useState } from "react";
import projects from "../data/projects.js";

export default function OrbitalCarousel() {
  const [paused, setPaused] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    // Outer container with perspective
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: "500px" }}
    >
      {/* Inner carousel container with preserve-3d */}
      <div
        className="absolute w-60 h-60 rounded-full left-[calc(50%-144px)] transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          animation: "spin-slow 30s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {projects.map((project, index) => {
          // Calculate the angle based on the index
          const angle = (360 / projects.length) * index;
          return (
            <a
              key={project.id}
              href={project.url}
              className="absolute inset-0"
              style={{
                transform: `rotateY(${angle}deg) translateZ(550px)`,
              }}
              onMouseEnter={() => {
                setPaused(true);
                setHoveredProject(project);
              }}
              onMouseLeave={() => {
                setPaused(false);
                // setHoveredProject(null);
              }}
            >
              <img
                src={project.planet}
                alt={project.title}
                className="w-full object-cover rounded-full shadow-lg"
              />
            </a>
          );
        })}
      </div>
      {/* Info Panel: shows details of hovered project */}
      {hoveredProject && (
        <div className="absolute w-[90vw] max-w-screen-md flex-1 bg-gray-900 bg-opacity-70 backdrop-blur-lg p-8 rounded-lg text-white z-10 flex flex-col gap-4">
          <span
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => setHoveredProject(null)}
          >
            x
          </span>
          <img
            src={hoveredProject.previewImg}
            alt="Project's Preview image Not found"
            className="w-full rounded-lg"
          />
          <div className="flex gap-2 items-center">
            <h3 className="text-2xl font-bold tracking-wide">
              {hoveredProject.title}
            </h3>
            {hoveredProject.liveUrl && (
              <a
                href={hoveredProject.liveUrl}
                className="cursor-pointer hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e3e3e3"
                  className="hover:fill-[var(--primaryBlue)] transition-all duration-300"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
                </svg>
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {hoveredProject.stack.map((s, index) => (
              <p
                key={index}
                className="bg-[var(--primaryBlue)] px-3 py-1 rounded-full text-xs font-semibold tracking-wider"
              >
                {s}
              </p>
            ))}
          </div>

          <p className="text-sm">{hoveredProject.description}</p>

          <a
            href={hoveredProject.overviewUrl}
            className="group flex items-center text-sm gap-2 cursor-pointer border border-white w-fit px-4 py-2 rounded-full transition-all duration-300 hover:bg-white hover:text-gray-900"
          >
            Overview
            <svg
              className="transition-transform duration-300 transform group-hover:translate-x-2"
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
