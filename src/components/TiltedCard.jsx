/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  isOpen,
  disableInteraction,
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  tooltipText = "This is my ID Card!",
}) {
  const ref = useRef(null);

  // Mouse tracking & tilt angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);

  // Tooltip animation
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (disableInteraction) return;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    // Quick figcaption tilt effect
    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    if (disableInteraction) return;
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    if (disableInteraction) return;
    scale.set(1);
    opacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`absolute [perspective:800px] w-[90vw] max-w-xs sm:max-w-md md:max-w-lg aspect-[3/4] sm:aspect-[5/3] flex items-center justify-center transition-all duration-[1200ms] z-20 ${
        isOpen
          ? "top-1/2 -translate-y-1/2 right-[20vw]"
          : "rotate-[80deg] right-[10vw] top-full -translate-y-[280px]"
      } ${disableInteraction ? "pointer-events-none" : ""}`}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      {/* 3D container */}
      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d] rounded-xl shadow-lg"
        style={{
          rotateX,
          rotateY,
          scale,
        }}
      >
        {/* Custom ID card content */}
        <div
          className="absolute inset-0 bg-white text-gray-800 rounded-xl overflow-hidden flex flex-col will-change-transform border-2 border-gray-400"
          style={{ transform: "translateZ(0)" }}
        >
          <div className="w-full flex justify-between gap-4 p-4 flex-1">
            <div className="w-full flex sm:flex-row flex-col items-center sm:items-stretch gap-4">
              <img
                className="w-28 sm:w-44 object-cover mb-2 rounded-full sm:rounded-lg"
                src="myphoto.jpg"
                alt="Giorgos photo"
              />
              <div className="flex flex-col gap-2 z-10 items-center sm:items-start">
                <h2 className="text-2xl font-bold">Giorgos Konstas</h2>
                <p>gio.konstas@hotmail.com</p>
                <p>6972900860</p>
                <p>Located in Greece</p>
              </div>
            </div>
            <img
              className="object-contain w-1/3 absolute bottom-16 right-4 sm:top-1/2 sm:-translate-y-1/2 sm:right-4 opacity-70"
              src="/icons/react.png"
              alt="React logo"
            />
          </div>
          <div className="bg-blue-700 w-full p-4">
            <h2 className="text-lg font-bold">Front-End Developer</h2>
          </div>
        </div>
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hidden sm:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {tooltipText}
        </motion.figcaption>
      )}
    </figure>
  );
}
