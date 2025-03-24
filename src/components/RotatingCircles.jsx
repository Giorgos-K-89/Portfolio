export default function RotatingCircles() {
  return (
    <div className="circle-container">
      {/* Outer Circle */}
      <div className="circle outer-circle">
        <div className="icon react">
          <img src="/icons/react.png" alt="React logo" />
        </div>
        <div className="icon git">
          <img src="/icons/git.png" alt="Git logo" />
        </div>
        <div className="icon postgres">
          <img src="/icons/sql.png" alt="PostrgreSQL logo" />
        </div>
      </div>

      {/* Inner Circle */}
      <div className="circle inner-circle">
        <div className="icon html">
          <img src="/icons/html.png" alt="HTML logo" />
        </div>
        <div className="icon css" alt="CSS logo">
          {" "}
          <img src="/icons/css.png" />
        </div>
        <div className="icon js">
          <img src="/icons/js.png" alt="Javascript logo" />
        </div>
      </div>
    </div>
  );
}
