import React from "react";

const projects = [
  { id: 1, title: "Project One", image: "/planets/1.png", url: "/project-one" },
  { id: 2, title: "Project Two", image: "/planets/2.png", url: "/project-two" },
  {
    id: 3,
    title: "Project Three",
    image: "/planets/3.png",
    url: "/project-three",
  },
  {
    id: 4,
    title: "Project Four",
    image: "/planets/4.png",
    url: "/project-four",
  },
  {
    id: 5,
    title: "Project Five",
    image: "/planets/5.png",
    url: "/project-five",
  },
  { id: 6, title: "Project Six", image: "/planets/6.png", url: "/project-six" },
];

export default function OrbitalCarousel() {
  return (
    // Outer container with perspective
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden py-[220px]"
      style={{ perspective: "1000px" }}
    >
      {/* Inner carousel container with preserve-3d */}
      <div
        className="absolute w-60 h-60 rounded-full animate-spin-slow left-[calc(50%-144px)]"
        style={{ transformStyle: "preserve-3d" }}
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
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-full shadow-lg"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
