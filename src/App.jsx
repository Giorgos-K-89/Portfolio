import DangerMarquee from "./components/WARNINGMarquee";
import About from "./sections/About";
import Landing from "./sections/Hero";
import Contact from "./sections/Contact";
import Skills from "./sections/Skills";
import BackToTop from "./components/BackToTopRocket";
import Particles from "./components/Particles";
import OrbitalCarousel from "./sections/Projects";

export default function App() {
  return (
    <>
      <Landing />
      <div style={{ width: "100%", height: "auto", position: "relative" }}>
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
      <OrbitalCarousel />
      <Contact />
      <BackToTop />
    </>
  );
}
