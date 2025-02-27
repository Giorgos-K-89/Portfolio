import { useState, useEffect, useRef } from "react";

export default function WARNINGMarquee() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect;
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="w-full relative font-sans z-10">
      <div
        className={`bg-yellow-400 py-1 rotate-6 origin-center -mx-2 transition-transform duration-[1200ms] ${
          inView ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex overflow-hidden gap-12 w-full text-center border-t-8 border-b-8 border-dashed border-black text-2xl sm:text-4xl md:text-5xl font-bold">
          <div className="flex shrink-0 justify-around min-w-full gap-12 animate-marquee">
            <p className="whitespace-nowrap">WARNING</p>
            <p className="whitespace-nowrap">WARNING</p>
            <p className="whitespace-nowrap">WARNING</p>
          </div>
          <div
            className="flex shrink-0 justify-around min-w-full gap-12 animate-marquee"
            aria-hidden="true"
          >
            <p className="whitespace-nowrap">WARNING</p>
            <p className="whitespace-nowrap">WARNING</p>
            <p className="whitespace-nowrap">WARNING</p>
          </div>
        </div>
      </div>
      <div
        className={`bg-yellow-400 py-1 -rotate-6 origin-center -mx-2 transition-transform duration-[1200ms] ${
          inView ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex overflow-hidden gap-12 w-full text-center border-t-8 border-b-8 border-dashed border-black text-2xl sm:text-4xl md:text-5xl font-bold">
          <div className="flex shrink-0 justify-around min-w-full gap-12 animate-marquee-reverse">
            <p className="whitespace-nowrap">WARNING</p>
            <p className="whitespace-nowrap">WARNING</p>
            <p className="whitespace-nowrap">WARNING</p>
          </div>
          <div
            className="flex shrink-0 justify-around min-w-full gap-12 animate-marquee-reverse"
            aria-hidden="true"
          >
            <p className="whitespace-nowrap">WARNING</p>
            <p className="whitespace-nowrap">WARNING</p>
            <p className="whitespace-nowrap">WARNING</p>
          </div>
        </div>
      </div>
    </div>
  );
}
