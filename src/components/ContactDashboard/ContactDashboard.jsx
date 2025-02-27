import Globe from "./Globe";
import "../../styles/contactDashboard.css";
import FrequencyGame from "./FrequencyGame";
import Gauge from "./Gauge";
import ContactForm from "./ContactForm";
import { useEffect, useState } from "react";

export default function ContactDashboard() {
  // Overlay states for loader and final overlay
  const [onMatch, setOnMatch] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showFinalOverlay, setShowFinalOverlay] = useState(false);

  useEffect(() => {
    let loaderTimeout, finalOverlayTimeout;
    if (onMatch) {
      loaderTimeout = setTimeout(() => {
        setShowLoader(true);
        // After an additional 2 seconds, hide the loader and show the final overlay
        finalOverlayTimeout = setTimeout(() => {
          setShowLoader(false);
          setShowFinalOverlay(true);
        }, 2000);
      }, 1000);
    } else {
      // Reset overlays if not matched
      setShowLoader(false);
      setShowFinalOverlay(false);
    }
    return () => {
      clearTimeout(loaderTimeout);
      clearTimeout(finalOverlayTimeout);
    };
  }, [onMatch]);

  return (
    <div className="grid grid-cols-3 gap-4 p-5 bg-[var(--secondaryGray)] text-white border border-white">
      {/* Column 1: Video and Two Panels */}
      <div className="relative flex flex-col gap-4">
        {/* Video on top */}
        <div className="w-full h-1/2 overflow-hidden rounded-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="earth.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Two panels below, equal width */}
        <FrequencyGame onMatch={() => setOnMatch(true)} />

        {showLoader && (
          <div
            style={{ backdropFilter: "blur(4px)" }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg"
          >
            <div className="loader">Loading...</div>
          </div>
        )}

        {showFinalOverlay && (
          <div
            style={{ backdropFilter: "blur(4px)" }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg"
          >
            <p className="text-green-500 text-xl">Frequency Matched</p>
          </div>
        )}
      </div>

      {/* Column 2: Contact Form */}
      <ContactForm />
      {/* Column 3: Placeholder for your custom layout */}
      <div className="flex flex-col gap-4">
        {/* Top Row: Two Columns */}
        <div
          className="grid gap-4 h-full"
          style={{ gridTemplateColumns: "400px 1fr" }}
        >
          <div className="rounded-lg overflow-hidden bg-black/60">
            <Globe />
          </div>
          {/* Extra content that fills full height of the Globe container and takes remaining width */}
          <div className="flex items-end justify-around bg-gray-800 rounded-lg">
            <div className="w-1/3 h-1/3 bg-blue-500 rounded-lg"></div>
            <div
              className="w-1/3 h-3/4 rounded-lg"
              style={{
                background:
                  "linear-gradient(0deg, rgba(255,0,14,1) 11%, rgba(187,119,34,1) 41%, rgba(0,255,55,1) 100%)",
              }}
            ></div>
          </div>
        </div>

        {/* Bottom Row: Three equal panels, each 1:1 */}
        <div className="grid grid-cols-3 p-2 bg-blue-950 rounded-lg">
          <div className="flex items-center justify-center aspect-square">
            <Gauge label="Altitude" value={75} duration={3} />
          </div>
          <div className="flex items-center justify-center aspect-square">
            <Gauge label="Velocity" value={45} duration={4} />
          </div>
          <div className="flex items-center justify-center aspect-square">
            <Gauge label="Fuel" value={90} duration={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
