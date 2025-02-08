import "./OneOfFour.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const OneOfFour = () => {
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
    setSelected("1-of-4");
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
    getRandomAnswers();
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

  console.log(excludedCountries);

  const handleAnswer = (capital) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedCapital(capital);
    if (capital === randomCountry.capital) {
      setIsCorrect(true);
      setScore(score + 200);
    } else {
      setIsIncorrect(true);
      if (score < 100) {
        setScore(0);
      }
      if (score >= 100) {
        setScore(score - 100);
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
    <section className="one_of_four">
      {randomCountry && (
        <div className="one_of_four_form">
          <div className="one_of_four_country_name">
            <h1>{randomCountry.name}</h1>
          </div>
          <div
            className={`one_of_four_score_status ${
              isCorrect ? "correct" : ""
            } ${isIncorrect ? "incorrect" : ""}`}
          >
            {isCorrect ? "+ 200 pts" : ""}
            {isIncorrect && score ? "- 100 pts" : ""}
            {score === 0 && isIncorrect ? "0 pts" : ""}
          </div>
          <div className="one_of_four_p2">
            {randomAnswers.length > 0 &&
              randomAnswers.map((country) => (
                <button
                  key={country.capital}
                  className={`one_of_four_answer ${
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
                  <p>{country.capital}</p>
                </button>
              ))}
          </div>
          {finished && (
            <div className="one_of_four_status">No countries left</div>
          )}
          <div className="one_of_four_score">{score} pts</div>
        </div>
      )}
    </section>
  );
};

export default OneOfFour;
