export default function Footer() {
  return (
    <footer className="relative w-full h-screen overflow-hidden bg-black">
      <img
        src="space.gif"
        alt="Space background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-[1px] brightness-75 pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <img
          src="astronaut-on-planet.png"
          alt="Astronaut on Planet"
          className="absolute bottom-0 left-0 w-full grayscale-[0.24] pointer-events-none"
        />
        <p className="text-black absolute bottom-2">
          Made entirely by ME for fun © 2025
        </p>
        <div className="mt-2 space-x-4">
          <a href="#!" className="text-white hover:underline">
            Link 1
          </a>
          <a href="#!" className="text-white hover:underline">
            Link 2
          </a>
          <a href="#!" className="text-white hover:underline">
            Link 3
          </a>
        </div>
      </div>
    </footer>
  );
}
