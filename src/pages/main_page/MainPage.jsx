import "./MainPage.css";
import { useState, useEffect } from "react";
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
  const [hintLenght, setHintLenght] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        getRandomCountry(data);
      })
      .catch((error) => console.error("Failed to fetch data", error));
  }, []);

  const getRandomCountry = (data) => {
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

  console.log(excludedCountries);

  const handleAnswer = () => {
    if (inputValue.trim().length < 1) {
      return;
    }
    setDisabled(true);
    if (inputValue.toLowerCase() === randomCountry.capital.toLowerCase()) {
      setIsCorrect(true);
      setScore(score + 100);
    } else {
      setIsIncorrect(true);
      if (score >= 50) {
        setScore(score - 50);
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
    if (hintLenght > randomCountry.capital.length || score < 100) return;
    setHintLenght(hintLenght + 1);
    setInputValue(randomCountry.capital.slice(0, hintLenght));
    setScore(score - 100);
  };
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
                {isCorrect ? "+ 100 pts" : ""}
                {isIncorrect ? "- 50 pts" : ""}
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
                  setHintLenght(1);
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
            </div>
          </div>
          <div className="utilities">
            <div className="hint" onClick={() => handleHint()}>
              <img src={hint} alt="hint" />
              <div className="hint_text">
                <h2>HINT</h2>
                <p>100pts</p>
              </div>
            </div>
            <div className="score">
              <div className="score_p1">{score} pts</div>
              <div className="score_p2">
                {score < 500 && <img src={trophy} />}
                {score >= 500 && score < 1000 && <img src={bronze} />}
                {score >= 1000 && score < 1500 && <img src={silver} />}
                {score >= 1500 && score < 2000 && <img src={gold} />}
                {score >= 2000 && <img src={diamond} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainPage;
