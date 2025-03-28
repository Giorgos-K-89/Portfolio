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
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 p-5 bg-[var(--secondaryGray)] text-white border border-white rounded-2xl">
      {/* Column 1: Video and Two Panels */}
      <div className="relative flex flex-col gap-4 order-1">
        {/* Video on top */}
        <div className="w-full h-1/2 overflow-hidden rounded-lg">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover saturate-[.8]"
          >
            <source src="spacedust.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Two panels below, equal width */}
        <FrequencyGame onMatch={() => setOnMatch(true)} />
        <p className="bg-blue-950/70 p-4 rounded-xl">
          ** <span className="text-green-600 font-semibold">Match</span> the
          Frequency for contact info.
        </p>
        {showLoader && (
          <div
            style={{ backdropFilter: "blur(4px)" }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg"
          >
            <div className="loader"></div>
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
      <div className="flex flex-col gap-4 order-2 2xl:order-3">
        {/* Top Row: Two Columns */}
        <div className="grid gap-4 h-full">
          <div className="rounded-lg overflow-hidden bg-black/60">
            <Globe />
          </div>
        </div>

        {/* Bottom Row: Three equal panels, each 1:1 */}
        <div className="grid grid-cols-2 md:grid-cols-3 px-2 bg-blue-950/70 rounded-lg">
          <div className="hidden md:flex items-center justify-center aspect-square">
            <Gauge value={75} />
          </div>
          <div className="flex items-center justify-center aspect-square">
            <Gauge value={45} />
          </div>
          <div className="flex items-center justify-center aspect-square">
            <Gauge value={90} />
          </div>
        </div>
      </div>
    </div>
  );
}
