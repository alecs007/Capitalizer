import "./Header.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import github from "../../assets/github.png";

const Header = ({ selected, setSelected }) => {
  const [showNotification, setShowNotification] = useState(false);

  const handleSelect = (event) => {
    setSelected(event);
  };

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setTimeout(() => {
        setShowNotification(true);
      }, 600);
    }
    setTimeout(() => {
      setShowNotification(false);
      localStorage.setItem("hasVisited", "true");
    }, 5000);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 715,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          speed: 150,
        },
      },
    ],
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
          <Slider {...settings}>
            <Link
              to="/all-countries"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => handleSelect("all-countries")}
            >
              <div
                className={`mode ${
                  selected === "all-countries" ? "active" : ""
                }`}
              >
                All countries
              </div>
            </Link>
            <Link
              to="/one-of-four"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => handleSelect("one-of-four")}
            >
              <div
                className={`mode ${selected === "one-of-four" ? "active" : ""}`}
              >
                1 of 4
              </div>
            </Link>
            <Link
              to="/flags"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => handleSelect("flags")}
            >
              <div className={`mode ${selected === "flags" ? "active" : ""}`}>
                Flags
              </div>
            </Link>
            <Link
              to="/reverse"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => handleSelect("reverse")}
            >
              <div className={`mode ${selected === "reverse" ? "active" : ""}`}>
                Reverse
              </div>
            </Link>
          </Slider>
        </div>
      </div>
      <div className="header_p3">
        <a href="https://github.com/alecs007/Capitalizer" target="_blank">
          <img src={github} alt="github" />
        </a>
      </div>
      {showNotification && (
        <div className="notification">
          <p>Click on the mode to change it</p>
          <button
            className="notification_close"
            onClick={() => setShowNotification(false)}
          ></button>
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  selected: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
};

export default Header;
