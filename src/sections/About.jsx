import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AboutCard from "../components/AboutCard";
import ShapeBlur from "../components/ShapeBlur";
import TiltedCard from "../components/TiltedCard";

export default function About() {
  const [showID, setShowID] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [resumeHovered, setResumeHovered] = useState(false);
  const [buttonState, setButtonState] = useState("idle");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showID) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showID]);

  // Overlay fade-in variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  // Card tilt-in-fwd variants
  const cardVariants = {
    hidden: { opacity: 0, translateY: 120 },
    visible: {
      opacity: 1,
      translateY: 0,
      transition: { duration: 0.8, delay: 0.8 }, // delay ensures the bg fade-in completes first
    },
  };

  const handleResumeClick = () => {
    // Open resume page in a new tab (adjust the URL as needed)
    window.open("/resume.png", "_blank");
  };

  return (
    <section className="relative w-full min-h-screen text-white flex px-[5vw] py-[220px]">
      <span className="absolute top-[160px] left-[5vw] opacity-15 text-8xl md:text-9xl">
        01
      </span>
      <div className="relative w-full">
        <h2 className="text-center text-5xl md:text-6xl mb-32 md:mb-40">
          ABOUT
        </h2>
        <div className="relative flex items-center justify-center">
          <div className="hidden md:block shader relative ">
            <div className="absolute w-full h-full">
              <ShapeBlur
                variation={0}
                pixelRatioProp={window.devicePixelRatio || 1}
                shapeSize={1.4}
                roundness={0}
                borderSize={0.02}
                circleSize={0.5}
                circleEdge={0.6}
              />
            </div>
            <img
              className="pointer-events-none"
              src="/me-astro.png"
              alt="Giorgos Konstas in astronaut suit"
            />
            <div className="shader__layer specular">
              <div className="shader__layer mask"></div>
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full md:w-fit">
            <AboutCard title="Front - End Skills......" percentage="96%" />
            <AboutCard title="Eye for Design......" percentage="90%" />
            <AboutCard title="ON time......" percentage="87%" />
            <AboutCard title="Teamwork......" percentage="92%" />
            <AboutCard title="Loremipsum......" percentage="50%" />
            <AboutCard title="Coffee addiction......" percentage="100%" />
            <motion.button
              onClick={() => {
                if (buttonState === "idle") {
                  setButtonState("asking");
                  setTimeout(() => {
                    setButtonState("granted");
                  }, 2000);
                  setTimeout(() => {
                    setShowID(true);
                  }, 3000);
                }
              }}
              className={`px-6 mt-12 py-3 tracking-widest rounded-md font-bold transition ${
                buttonState === "granted"
                  ? "bg-green-600 hover:bg-green-500"
                  : "border-2 border-[var(--primaryBlue)] text-[var(--primaryBlue)] hover:bg-[var(--primaryBlue)] hover:text-black"
              }`}
            >
              {buttonState === "idle" && "Check Classified File"}
              {buttonState === "asking" && (
                <div className="flex items-center justify-center gap-2">
                  <span>Asking permission for access...</span>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                </div>
              )}
              {buttonState === "granted" && "Access granted"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showID && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setShowID(false)}
          >
            <button
              className="absolute top-10 left-10 tracking-wider flex items-center cursor-pointer z-50"
              onClick={() => {
                setButtonState("idle");
                setIsOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
              </svg>
              Back
            </button>
            {/* modal container */}
            <div className="w-full h-full overflow-hidden">
              {/* Prevent click propagation so clicking on the card doesn't close it */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="relative min-h-screen"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  id="folder"
                  className="w-[90vw] min-h-[100vh] flex flex-col justify-center items-center mx-auto"
                >
                  {/* Bottom folder layer */}
                  <div
                    className={`absolute bottom-0 w-[95vw] h-[400px] bg-[#D2703D] bg-[url(beige-paper.png)] bg-center rounded transition-transform duration-[1200ms] ${
                      isOpen ? "translate-y-full" : ""
                    }`}
                  ></div>
                  {/* Resume image */}
                  <div
                    className={`absolute z-10 transition-all duration-[1200ms] ${
                      isOpen
                        ? "top-1/2 -translate-y-1/2 left-[20vw] rotate-90 w-[400px]"
                        : "top-full -translate-y-[380px] w-[90vw]"
                    }`}
                    onMouseEnter={() => setResumeHovered(true)}
                    onMouseLeave={() => setResumeHovered(false)}
                    onClick={isOpen ? handleResumeClick : undefined}
                  >
                    <img
                      id="resume"
                      className={`w-full cursor-pointer ${
                        resumeHovered && isOpen
                          ? "outline outline-4 outline-blue-700"
                          : ""
                      }`}
                      src="resume-rotated.png"
                      alt="Resume"
                    />
                    {/* Tooltip for resume */}
                    {resumeHovered && isOpen && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                        Open Cv
                      </div>
                    )}
                  </div>
                  {/* TiltedCard with interaction disabled until isOpen === true */}
                  <TiltedCard isOpen={isOpen} disableInteraction={!isOpen} />
                  {/* Top folder layer with cardboard texture */}
                  <div
                    className={`absolute bottom-0 w-[95vw] h-[350px] bg-[url(beige-paper.png)] bg-[#E39E78] bg-center rounded border-t border-black z-50 transition-transform duration-700 ${
                      isOpen ? "translate-y-full" : ""
                    }`}
                  >
                    <img
                      className="absolute top-4 left-10 pointer-events-none"
                      src="confidential.png"
                      alt="confidential stamp"
                    />
                    {!isOpen && (
                      <button
                        className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-700 px-4 py-8 rounded-full"
                        onClick={() => setIsOpen(true)}
                      >
                        OPEN
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
