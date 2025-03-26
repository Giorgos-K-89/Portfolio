import OrbitalCarousel from "../components/OrbitalCarousel";

export default function Projects() {
  return (
    <section className="relative w-full min-h-screen text-white flex pt-[220px] pb-[420px] z-10 overflow-hidden">
      <span className="absolute top-[160px] left-[5vw] opacity-15 text-8xl md:text-9xl">
        03
      </span>
      <div className="w-full">
        <h2 className="text-center text-5xl md:text-6xl mb-32 md:mb-40">
          MISSIONS
        </h2>
        <OrbitalCarousel />
      </div>
    </section>
  );
}
