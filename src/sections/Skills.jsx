import { useEffect, useRef, useState } from "react";
import ZeroGravityChamber from "../components/ZeroGravityChamber";

export default function Skills() {
  //Start gravityY at 0
  const [gravityY, setGravityY] = useState(0);
  const sectionRef = useRef(null);

  // Use IntersectionObserver to detect when the section is visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGravityY(-0.02);
          observer.disconnect(); // Optional: disconnect after triggering once.
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen text-white flex px-[5vw] py-[220px]"
    >
      <span className="absolute top-[160px] right-[5vw] opacity-15 text-8xl md:text-9xl">
        02
      </span>
      <div className="w-full">
        <h2 className="text-center text-5xl md:text-6xl mb-32 md:mb-40">
          SKILLS
        </h2>
        <div className="relative flex flex-col justify-center gap-8">
          <h3 className="text-2xl text-center md:text-left sm:text-2xl md:text-4xl underline">
            ZERO Gravity Chamber
          </h3>

          <ZeroGravityChamber
            gravityY={gravityY}
            addTextBodies={true}
            text="Such WOW skills acquired through experience and training!"
          />
          <p>
            *** DO NOT mess with the button below. Everything will FALL apart !
          </p>
          <button
            className="button-82-pushable"
            role="button"
            onClick={() => setGravityY(1)}
          >
            <span className="button-82-shadow"></span>
            <span className="button-82-edge"></span>
            <span className="button-82-front text">RESTORE GRAVITY</span>
          </button>
        </div>
      </div>
    </section>
  );
}
