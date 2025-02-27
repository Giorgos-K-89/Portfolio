import { useEffect, useState } from "react";
import "../styles/rocket.css";

export default function BackToTopRocket() {
  const [launching, setLaunching] = useState(false);
  const [flyOut, setFlyOut] = useState(false);
  const [visible, setVisible] = useState(false);
  const [superFlame, setSuperFlame] = useState(false);

  // Listen to window scroll to update rocket visibility.
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else if (window.scrollY < 350 && launching) {
        setFlyOut(true);
        setTimeout(() => {
          setLaunching(false);
        }, 700);
      } else {
        setFlyOut(false);
        setVisible(false);
        setSuperFlame(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Check on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [flyOut, visible, launching]);

  const handleClick = () => {
    setLaunching(true);

    // Keep flame visible for 2 seconds until scroll finishes.
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setSuperFlame(true);
    }, 2000);
  };

  return (
    <div
      className={`back-to-top ${visible ? "visible" : "hidden"} ${
        flyOut ? "fly-out" : ""
      }`}
      onClick={handleClick}
    >
      <div className={`rocket ${launching ? "launching" : ""}`}>
        <div className="rocket-shadow"></div>
        <div className="rocket-body-top">
          <div className="rocket-body-top-pointer"></div>
          <div className="rocket-body-top-pointer-edge"></div>
          <div className="rocket-window"></div>
        </div>
        <div className="rocket-body-bottom"></div>
        <div className="rocket-down-fins"></div>
        <div className="rocket-body-launcher"></div>
        <div className="rocket-fin rocket-fin-left">
          <div className="rocket-fin-extra rocket-fin-extra-left">
            <div className="rocket-fin-point rocket-fin-point-left"></div>
          </div>
        </div>
        <div className="rocket-fin rocket-fin-right">
          <div className="rocket-fin-extra rocket-fin-extra-right">
            <div className="rocket-fin-point rocket-fin-point-right"></div>
          </div>
        </div>
        <div className={`rocket-flame ${superFlame ? "super-flame" : ""}`}>
          <div className="flame flame-1"></div>
          <div className="flame flame-2"></div>
          <div className="flame flame-3"></div>
        </div>
        {launching && (
          <>
            <img
              src="cloud-left.png"
              alt="Cloud Left"
              className="rocket-cloud rocket-cloud-left"
            />
            <img
              src="cloud-left.png"
              alt="Cloud Left"
              className="rocket-cloud rocket-cloud-left-2"
            />
            <img
              src="cloud-right.png"
              alt="Cloud Right"
              className="rocket-cloud rocket-cloud-right"
            />
            <img
              src="cloud-right.png"
              alt="Cloud Right"
              className="rocket-cloud rocket-cloud-right-2"
            />
          </>
        )}
      </div>
    </div>
  );
}
