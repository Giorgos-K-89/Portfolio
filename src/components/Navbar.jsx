export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 w-full px-5 md:px-12 py-6 flex flex-col gap-6 md:flex-row  items-center justify-between z-40 text-white">
      <div id="logo" className="flex items-center gap-2">
        <img
          className="w-8 md:w-10 pointer-events-none"
          src="/logo.png"
          alt="Giorgos Konstas' logo"
        />
        <span className="text-lg sm:text-xl md:text-2xl tracking-wider">
          GIORGOS KONSTAS
        </span>
      </div>
      <div className="flex gap-2 text-sm sm:text-base">
        <div className="flex gap-4 items-center">
          <span>Status :</span>
          <span id="available"></span>{" "}
        </div>
        <h3 className="open-to-work">Open to work</h3>
      </div>
    </div>
  );
}
