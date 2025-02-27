/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

export default function ZeroGravityChamber({
  gravityY = 0, // default gravity
  addTextBodies = false,
  text = "",
}) {
  const [canvasKey, setCanvasKey] = useState(0); // Trigger re-render with a unique key
  const engineRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef([]);

  const initializeScene = () => {
    const {
      Engine,
      Render,
      Runner,
      Bodies,
      World,
      Mouse,
      MouseConstraint,
      Events,
      Body,
      Composite,
    } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    // Adjust gravity for a subtle floating effect (slightly upward here)
    engine.gravity.y = gravityY;

    const canvas = canvasRef.current;
    // Get the actual displayed size of the canvas:
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Set the canvas element's intrinsic size to match its display size:
    canvas.width = width;
    canvas.height = height;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        showAngleIndicator: false,
        background: "#e1dcd6",
      },
    });

    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    const wallStyle = {
      fillStyle: "transparent",
      strokeStyle: "transparent",
      lineWidth: 0,
    };
    const wallOptions = {
      isStatic: true,
      render: wallStyle,
      restitution: 0.9,
      density: 1,
      frictionStatic: 10,
      inverseInertia: 0,
      frictionAir: 0,
    };

    const boundaries = [
      // Top wall
      Bodies.rectangle(width / 2, -25, width, 50, wallOptions),
      // Bottom wall
      Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions),
      // Left wall
      Bodies.rectangle(-25, height / 2, 50, height, wallOptions),
      // Right wall
      Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions),
    ];
    World.add(world, boundaries);

    const skills = [
      { texture: "/icons/react.png", border: "#61dafb", background: "#20232a" },
      {
        texture: "/icons/tailwind.png",
        border: "#61dafb",
        background: "#20232a",
      },
      { texture: "/icons/js.png", border: "#EFD104", background: "#2e2e2e" },
      { texture: "/icons/node.png", border: "#76B45F", background: "#fff" },
      { texture: "/icons/css.png", border: "#663399", background: "#ffffff" },
      { texture: "/icons/html.png", border: "#d13438", background: "#ffffff" },
      { texture: "/icons/sql.png", border: "#00618a", background: "#e5e5e5" },
      { texture: "/icons/git.png", border: "#f05032", background: "#2e2e2e" },
      { texture: "/icons/figma.png", border: "#ccc", background: "#2e2e2e" },
    ];

    const baselineScreenWidth = 1000;
    const scaleFactor = Math.min(width / baselineScreenWidth, 1);
    // Maximum dimensions
    const baselineIconSize = 200 * scaleFactor;
    const innerDiameter = 55 * scaleFactor;
    const outerDiameter = innerDiameter + 60;
    const outerRadius = outerDiameter / 2;
    const innerRadius = innerDiameter / 2;

    // Create 6 compound bodies ("bubbles")
    const skillBodies = skills.map((skill) => {
      // Ensure the body is fully within the screen (using the outer diameter as margin)
      const x = Math.random() * (width - outerDiameter * 2) + outerDiameter;
      const y = Math.random() * (height - outerDiameter * 2) + outerDiameter;

      // Outer circle (the bubble's border)
      const outer = Bodies.circle(x, y, outerRadius, {
        render: {
          fillStyle: skill.background,
          strokeStyle: skill.border,
          lineWidth: 4,
        },
      });

      // Inner circle (the icon's background with the image)
      const inner = Bodies.circle(x, y, innerRadius, {
        render: {
          fillStyle: skill.background,
          sprite: {
            texture: skill.texture,
            // Scale the image to exactly fit the inner circle while maintaining 1:1 aspect ratio
            xScale: innerDiameter / baselineIconSize,
            yScale: innerDiameter / baselineIconSize,
          },
        },
      });

      // Create a compound body with both circles.
      const compound = Body.create({
        parts: [outer, inner],
        friction: 0.0001,
        restitution: 0.4,
        density: 0.01,
        frictionAir: 0.0001,
      });
      // Clear parent's render so each part's style is used.
      compound.render = { visible: true };
      return compound;
    });
    World.add(world, skillBodies);

    // Add mouse control for desktop only
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      element: canvas,
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    // Prevent mouse wheel events from interfering with scroll
    mouse.element.removeEventListener("wheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    World.add(world, mouseConstraint);

    //Wrap bodies around edges
    const allBodies = Composite.allBodies(world);
    allBodies.forEach((body) => {
      if (!body.isText) {
        body.plugin.wrap = {
          min: { x: -100, y: -100 },
          max: { x: width + 100, y: height + 100 },
        };
      }
    });

    // Create falling text bodies if requested.
    let textBodiesArray = [];
    if (addTextBodies && text) {
      const words = text.split(" ");
      const dynamicFontSize = Math.max(1.4, 2 * scaleFactor);
      const font = `400 ${dynamicFontSize}rem Orbitron`;
      const offscreenCanvas = document.createElement("canvas");
      const offscreenCtx = offscreenCanvas.getContext("2d");
      offscreenCtx.font = font;

      // Use margins to avoid drawing too close to the canvas edge.
      const marginX = 50;
      const marginRight = 50; // right margin
      const spacing = 10 * scaleFactor; // space between words
      const lineHeight = Math.max(40, 70 * scaleFactor); // height for each line
      const wordHeight = 30 * scaleFactor; // approximated word height

      // Get canvas width from the canvas element's rect.
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const canvasWidth = rect.width;

      // Starting positions.
      let x = marginX;
      let y = marginX; // you can adjust the vertical starting position if needed

      textBodiesArray = words.map((word) => {
        // Measure the width of the word.
        const metrics = offscreenCtx.measureText(word);
        const wordWidth = metrics.width + 10 + scaleFactor;
        // Approximating the height from the font size.

        // Check if adding the next word exceeds the canvas width.
        if (x + wordWidth > canvasWidth - marginRight) {
          // Move to the next line.
          x = marginX;
          y += lineHeight;
        }

        // Calculate the center position for the Matter body.
        const centerX = x + wordWidth / 2;
        const centerY = y + wordHeight / 2;

        // Prepare for the next word.
        x += wordWidth + spacing;

        const body = Bodies.rectangle(centerX, centerY, wordWidth, wordHeight, {
          render: {
            fillStyle: "transparent",
            strokeStyle: "transparent",
          },
          label: word, // Store the word for later drawing.
        });
        body.isText = true; // Flag to indicate it's a text body.
        Matter.Body.setStatic(body, true);

        return body;
      });
      textRef.current = { textBodiesArray };
      World.add(world, textBodiesArray);
    }

    Events.on(render, "afterRender", () => {
      const context = render.context;
      context.textAlign = "center";
      context.textBaseline = "middle";
      const dynamicFontSize = Math.max(1.4, 2 * scaleFactor);
      textBodiesArray.forEach((body) => {
        const word = body.label;
        const pos = body.position;
        // Style: black letters, but if the word is "WOW", change font and color.
        if (word.toUpperCase() === "WOW") {
          context.font = `900 ${dynamicFontSize}rem Orbitron`;
          context.fillStyle = "#ff4500"; // for example, orange-red
        } else if (word === "and") {
          context.fillStyle = "#ff4500";
        } else {
          context.font = `400 ${dynamicFontSize}rem Orbitron`;
          context.fillStyle = "#000000";
        }
        context.fillText(word, pos.x, pos.y);
      });
    });
    // Store references for cleanup.
    engineRef.current = { engine, render, runner, world };
  };

  // Update gravity and update text bodies when gravity changes.
  useEffect(() => {
    if (engineRef.current) {
      const { engine } = engineRef.current;
      engine.world.gravity.y = gravityY;
      // When gravity is restored, update text bodies.
      if (gravityY > 0) {
        textRef.current.textBodiesArray.forEach((body) => {
          // Change from static to dynamic.
          Matter.Body.setStatic(body, false);
          Matter.Body.set(body, {
            restitution: 0.8, // Lower bounciness
            frictionAir: 0.01,
            friction: 0.2, // Increase friction to slow sliding
            density: 0.01,
          });
        });
      }
    }
  }, [gravityY]);

  const destroyScene = () => {
    const { engine, render, runner, world } = engineRef.current || {};

    if (render) {
      Matter.Render.stop(render);
      render.textures = {};
    }

    if (runner) {
      Matter.Runner.stop(runner);
    }

    if (world) {
      Matter.World.clear(world, false);
    }

    if (engine) {
      Matter.Engine.clear(engine);
    }

    engineRef.current = null;
  };

  useEffect(() => {
    initializeScene();

    return () => {
      destroyScene(); // Cleanup when the component is unmounted or re-rendered
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasKey]); // Re-initialize when `canvasKey` changes

  useEffect(() => {
    const resizeHandler = () => {
      destroyScene();
      setCanvasKey((prevKey) => prevKey + 1); // Trigger re-render by incrementing the key
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <canvas
      key={canvasKey} // Ensures React fully re-renders the canvas
      ref={canvasRef}
      id="landing-page-blocks"
      style={{
        position: "relative",
        width: "100%",
        height: "600px",
        display: "block",
        margin: "0",
        padding: "0",
        zIndex: 0,
        borderRadius: "1rem",
      }}
    ></canvas>
  );
}
