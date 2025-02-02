import "./MainPage.css";
import { useState, useEffect } from "react";

const MainPage = () => {
  const [countries, setCountries] = useState({});
  const [randomCountry, setRandomCountry] = useState(null);
  const [excludedCountries, setExcludedCountries] = useState([]);
  const [finished, setFinished] = useState(false);

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

  return (
    <section className="main_page">
      {randomCountry && (
        <div>
          <h2>Random Country</h2>
          <p>
            <b>{randomCountry.name}</b> - {randomCountry.capital}{" "}
            <img
              src={randomCountry.flag}
              alt={`Flag of ${randomCountry.name}`}
              width="20"
              height="15"
            />
          </p>
          <button
            onClick={() => getRandomCountry(countries)}
            disabled={finished}
          >
            Next
          </button>
        </div>
      )}
      {finished && <h2>Finished</h2>}
    </section>
  );
};

export default MainPage;
