import "./Header.css";
import github from "../../assets/github.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header_p">
        <div className="header_p1">
          <h1>Capitalizer</h1>
        </div>
        <div className="header_p2">
          <div className="mode">All countries</div>
          <div className="mode">Flags</div>
          <div className="mode">1 of 4</div>
          <div className="mode">Continents</div>
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
