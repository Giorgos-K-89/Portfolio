import ContactDashboard from "../components/ContactDashboard/ContactDashboard";

export default function Contact() {
  return (
    <section className="relative w-full min-h-screen text-white flex px-[5vw] pt-[220px] pb-5">
      <span className="absolute top-[160px] right-[5vw] opacity-15 text-8xl md:text-9xl">
        04
      </span>
      <div className="w-full">
        <h2 className="text-center text-5xl md:text-6xl mb-32 md:mb-40">
          CONTACT
        </h2>
        <div className="relative flex flex-col justify-center gap-8">
          <ContactDashboard />
        </div>
      </div>
    </section>
  );
}
