import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import github from "../../assets/github.png";

const Header = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (event) => {
    setSelected(event);
  };

  return (
    <div className="header">
      <div className="header_p">
        <div className="header_p1">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => handleSelect(null)}
          >
            <h1>Capitalizer</h1>
          </Link>
        </div>
        <div className="header_p2">
          <Link
            to="/all-countries"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => handleSelect("all-countries")}
          >
            <div
              className={`mode ${selected === "all-countries" ? "active" : ""}`}
            >
              All countries
            </div>
          </Link>
          <Link
            to="/1-of-4"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => handleSelect("1-of-4")}
          >
            <div className="mode">1 of 4</div>
          </Link>
          <Link
            to="/flags"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => handleSelect("flags")}
          >
            <div className="mode">Flags</div>
          </Link>
          <Link
            to="/continents"
            style={{ textDecoration: "none", color: "inherit" }}
            onClick={() => handleSelect("continents")}
          >
            <div className="mode">Continents</div>
          </Link>
        </div>
      </div>
      <div className="header_p3">
        <a href="https://github.com/alecs007/Capitalizer" target="_blank">
          <img src={github} alt="github" />
        </a>
      </div>
    </div>
  );
};

export default Header;
