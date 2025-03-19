import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export default function Globe() {
  const canvasRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    let phi = 0;
    const canvas = canvasRef.current;

    // Update the canvas intrinsic size based on container dimensions.
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      return { width: canvas.width, height: canvas.height, dpr };
    };

    // Initialize the globe
    const initGlobe = () => {
      const { width, height, dpr } = updateCanvasSize();
      globeRef.current = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width,
        height,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 50000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        opacity: 0.8,
        markers: [
          { location: [37.7595, -122.4367], size: 0.03 },
          { location: [40.7128, -74.006], size: 0.1 },
        ],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.01;
        },
      });
    };

    // Create the initial globe
    initGlobe();

    // Set up a ResizeObserver to reinitialize on container resize
    const resizeObserver = new ResizeObserver(() => {
      // Destroy current globe if it exists
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      // Reinitialize the globe with new dimensions
      initGlobe();
    });

    resizeObserver.observe(canvas);

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: 1,
        display: "block",
      }}
    />
  );
}
