export default function RotatingCircles() {
  return (
    <div className="circle-container">
      {/* Outer Circle */}
      <div className="circle outer-circle">
        <div className="icon react">
          <img src="/icons/react.png" />
        </div>
        <div className="icon git">
          <img src="/icons/git.png" />
        </div>
        <div className="icon postgres">
          <img src="/icons/sql.png" />
        </div>
      </div>

      {/* Inner Circle */}
      <div className="circle inner-circle">
        <div className="icon html">
          <img src="/icons/html.png" />
        </div>
        <div className="icon css">
          {" "}
          <img src="/icons/css.png" />
        </div>
        <div className="icon js">
          <img src="/icons/js.png" />
        </div>
      </div>
    </div>
  );
}
