import { Routes, Route } from "react-router-dom";
import DangerMarquee from "./components/WARNINGMarquee";
import About from "./sections/About";
import Landing from "./sections/Hero";
import Contact from "./sections/Contact";
import Skills from "./sections/Skills";
import BackToTop from "./components/BackToTopRocket";
import Particles from "./components/Particles";
import Projects from "./sections/Projects";
import ProjectDetails from "./components/ProjectDetails";

export default function App() {
  return (
    <Routes>
      {/* Main portfolio page */}
      <Route
        path="/"
        element={
          <>
            <Landing />
            <div
              style={{ width: "100%", height: "auto", position: "relative" }}
            >
              <Particles
                particleColors={["#ffffff", "#ffffff"]}
                particleCount={800}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={50}
                moveParticlesOnHover={false}
                alphaParticles={true}
                disableRotation={false}
              />
            </div>
            <About />
            <DangerMarquee />
            <Skills />
            <Projects />
            <Contact />
            <BackToTop />
          </>
        }
      />
      {/* Project Details Page */}
      <Route path="/project/:projectId" element={<ProjectDetails />} />
    </Routes>
  );
}
