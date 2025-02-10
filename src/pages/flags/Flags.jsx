import "./Flags.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import trophy from "../../assets/trophy.png";
import bronze from "../../assets/bronze_trophy.png";
import silver from "../../assets/silver_trophy.png";
import gold from "../../assets/gold_trophy.png";
import diamond from "../../assets/diamond_trophy.png";

const Flags = () => {
  const { setSelected } = useOutletContext();
  const [countries, setCountries] = useState({});
  const [excludedCountries, setExcludedCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [finished, setFinished] = useState(false);
  const [randomAnswers, setRandomAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [selectedCapital, setSelectedCapital] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setSelected("flags");
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        getRandomCountry(data);
      })
      .catch((error) => console.error("Failed to fetch data", error));
  }, [setSelected]);

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

  useEffect(() => {
    if (randomCountry) {
      getRandomAnswers();
    }
  }, [randomCountry]);

  const getRandomAnswers = () => {
    if (!randomCountry || Object.keys(countries).length === 0) return;
    const allCountries = Object.values(countries).flat();
    const incorrectAnswers = allCountries
      .filter((country) => country.name !== randomCountry.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const shuffledIncorrectAnswers = [...incorrectAnswers, randomCountry].sort(
      () => Math.random() - 0.5
    );
    setRandomAnswers(shuffledIncorrectAnswers);
  };

  const handleAnswer = (capital) => {
    if (isAnswered || finished) return;

    setIsAnswered(true);
    setSelectedCapital(capital);
    if (capital === randomCountry.capital) {
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
      setSelectedCapital(null);
      setIsCorrect(false);
      setIsIncorrect(false);
      setIsAnswered(false);
    }, 1000);
  };

  return (
    <section className="flags">
      {randomCountry && (
        <div className="flags_form">
          <div className="flags_country_name">
            <h1>{randomCountry.name}</h1>
          </div>
          <div
            className={`flags_score_status ${isCorrect ? "correct" : ""} ${
              isIncorrect ? "incorrect" : ""
            }`}
          >
            {isCorrect ? "+ 200 pts" : ""}
            {isIncorrect && score ? "- 100 pts" : ""}
            {score === 0 && isIncorrect ? "0 pts" : ""}
          </div>
          <div className="flags_p2">
            {randomAnswers.length > 0 &&
              randomAnswers.map((country) => (
                <button
                  key={country.capital}
                  className={`flags_answer ${
                    selectedCapital === country.capital
                      ? country.capital === randomCountry.capital
                        ? "correct"
                        : "incorrect"
                      : ""
                  } ${
                    country.capital === randomCountry.capital &&
                    (isCorrect || isIncorrect)
                      ? "correct"
                      : ""
                  }`}
                  onClick={() => handleAnswer(country.capital)}
                  disabled={finished}
                >
                  <img src={country.flag} alt={country.name} />
                </button>
              ))}
          </div>
          {finished && <div className="flags_status">No countries left</div>}
          <div className="flags_score">
            <div className="flags_score_p">{score} pts</div>
            <div className="flags_score_img">
              {score < 1000 && <img src={trophy} alt="trophy" />}
              {score >= 1000 && score < 3000 && (
                <img src={bronze} alt="bronze" />
              )}
              {score >= 3000 && score < 5000 && (
                <img src={silver} alt="silver" />
              )}
              {score >= 5000 && score < 10000 && <img src={gold} alt="gold" />}
              {score >= 10000 && <img src={diamond} alt="diamond" />}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Flags;
