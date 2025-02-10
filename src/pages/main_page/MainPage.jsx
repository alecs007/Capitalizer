import "./MainPage.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import arrow from "../../assets/arrow.png";
import hint from "../../assets/hint.png";
import trophy from "../../assets/trophy.png";
import bronze from "../../assets/bronze_trophy.png";
import silver from "../../assets/silver_trophy.png";
import gold from "../../assets/gold_trophy.png";
import diamond from "../../assets/diamond_trophy.png";

const MainPage = () => {
  const [countries, setCountries] = useState({});
  const [randomCountry, setRandomCountry] = useState(null);
  const [excludedCountries, setExcludedCountries] = useState([]);
  const [finished, setFinished] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hintLength, setHintLength] = useState(1);
  const [score, setScore] = useState(0);
  const { setSelected } = useOutletContext();
  const [next, setNext] = useState(false);

  useEffect(() => {
    setSelected(null);
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        getRandomCountry(data);
      })
      .catch((error) => console.error("Failed to fetch data", error));
  }, [setSelected]);

  const getRandomCountry = (data) => {
    if (!data || Object.keys(data).length === 0) {
      setFinished(true);
      return;
    }
    if (excludedCountries.length >= 195) {
      setFinished(true);
      return;
    }
    let randomCountry;
    do {
      const continentKeys = Object.keys(data);
      const randomContinent =
        continentKeys[Math.floor(Math.random() * continentKeys.length)];
      const randomCountryData = data[randomContinent];
      randomCountry =
        randomCountryData[Math.floor(Math.random() * randomCountryData.length)];
    } while (excludedCountries.includes(randomCountry.name));

    setRandomCountry(randomCountry);
    setExcludedCountries((prevExcluded) => [
      ...prevExcluded,
      randomCountry.name,
    ]);
  };

  const handleAnswer = () => {
    if (next === true) {
      setDisabled(true);
      setIsIncorrect(true);
      if (score < 100) {
        setScore(0);
      }
      if (score >= 100) {
        setScore((prevScore) => prevScore - 100);
      }
      setTimeout(() => {
        getRandomCountry(countries);
        setIsIncorrect(false);
        setInputValue("");
        setDisabled(false);
        setNext(false);
      }, 1000);
      return;
    }
    if (inputValue.trim().length < 1) {
      return;
    }
    setDisabled(true);
    if (inputValue.toLowerCase() === randomCountry.capital.toLowerCase()) {
      setIsCorrect(true);
      setScore((prevScore) => prevScore + 200);
    } else {
      setIsIncorrect(true);
      if (score < 100) {
        setScore(0);
      }
      if (score >= 100) {
        setScore((prevScore) => prevScore - 100);
      }
    }
    setTimeout(() => {
      getRandomCountry(countries);
      setIsCorrect(false);
      setIsIncorrect(false);
      setInputValue("");
      setDisabled(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !disabled) {
      handleAnswer();
    }
  };

  const handleHint = () => {
    if (hintLength > randomCountry.capital.length || score < 50) return;
    setHintLength((prevHintLength) => prevHintLength + 1);
    setInputValue(randomCountry.capital.slice(0, hintLength));
    setScore((prevScore) => prevScore - 50);
  };

  useEffect(() => {
    if (next) {
      handleAnswer();
    }
  }, [next]);

  return (
    <section className="main_page">
      {randomCountry && (
        <div className="form">
          <div
            className={`country_name ${isCorrect ? "correct" : ""} ${
              isIncorrect ? "incorrect" : ""
            }`}
          >
            <h1>{randomCountry.name}</h1>
          </div>
          <div className="input_container">
            <div
              className={`score_status ${isCorrect ? "correct" : ""} ${
                isIncorrect ? "incorrect" : ""
              }`}
            >
              <h1>
                {isCorrect ? "+ 200 pts" : ""}
                {isIncorrect && score ? "- 100 pts" : ""}
                {score === 0 && isIncorrect ? "0 pts" : ""}
              </h1>
            </div>
            <div className="input">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
                placeholder="Enter capital name"
                className="main_input"
              />
              <button
                onClick={() => {
                  handleAnswer();
                  setHintLength(1);
                }}
                disabled={disabled}
                className="main_button"
              >
                Submit
              </button>
            </div>
            <div className="status">
              {finished && <h2>No countries left</h2>}
              {isIncorrect && (
                <h2>
                  Correct answer: <span>{randomCountry.capital}</span>{" "}
                </h2>
              )}
              {!isIncorrect && !finished && (
                <div
                  className="next-button"
                  onClick={() => {
                    setNext(true);
                  }}
                >
                  <p>Next</p>
                  <img src={arrow} alt="arrow" />
                </div>
              )}
            </div>
          </div>
          <div className="utilities">
            <div className="hint" onClick={() => handleHint()}>
              <img src={hint} alt="hint" />
              <div className="hint_text">
                <h2>HINT</h2>
                <p>50pts</p>
              </div>
            </div>
            <div className="score">
              <div className="score_p1">{score} pts</div>
              <div className="score_p2">
                {score < 1000 && <img src={trophy} alt="trophy" />}
                {score >= 1000 && score < 3000 && (
                  <img src={bronze} alt="bronze" />
                )}
                {score >= 3000 && score < 5000 && (
                  <img src={silver} alt="silver" />
                )}
                {score >= 5000 && score < 10000 && (
                  <img src={gold} alt="gold" />
                )}
                {score >= 10000 && <img src={diamond} alt="diamond" />}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainPage;
