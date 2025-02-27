import CountUp from "./CountUp";

// eslint-disable-next-line react/prop-types
export default function AboutCard({ title, percentage }) {
  return (
    <div className="whitespace-nowrap">
      <p className="text-2xl lg:text-4xl xl:text-5xl tracking-wider">
        {title}
        <CountUp
          from={0}
          to={percentage}
          separator=","
          direction="up"
          duration={1}
          className="count-up-text"
        />
        <span>%</span>
      </p>
    </div>
  );
}
