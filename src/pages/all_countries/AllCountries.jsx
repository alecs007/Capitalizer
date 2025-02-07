import "./AllCountries.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState({});
  const [inputValues, setInputValues] = useState([]);
  const [disabledInputs, setDisabledInputs] = useState([]);
  const { setSelected } = useOutletContext();

  useEffect(() => {
    setSelected("all-countries");
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);

        const allCountries = Object.values(data).flat();
        setInputValues(Array(allCountries.length).fill(""));
        setDisabledInputs(Array(allCountries.length).fill(false));
      })
      .catch((error) => console.error("Failed to fetch data", error));
  }, []);

  const handleInputChange = (index, value, capital) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    if (value.toLowerCase() === capital.toLowerCase()) {
      setInputValues((prevValues) => {
        const newValues = [...prevValues];
        newValues[index] = capital;
        return newValues;
      });
      setDisabledInputs((prev) => {
        const newDisabled = [...prev];
        newDisabled[index] = true;
        return newDisabled;
      });
    }
  };

  return (
    <div className="all_countries">
      {Object.keys(countries)
        .sort((a, b) => countries[b].length - countries[a].length)
        .map((continent) => (
          <div key={continent}>
            <div className="continent_name">{continent}</div>
            <div className="continent_countries">
              {countries[continent].map((country) => {
                const globalIndex = Object.values(countries)
                  .flat()
                  .indexOf(country);
                return (
                  <div key={country.name} className="countries">
                    <div className="countries_name">{country.name}</div>
                    <input
                      key={country.name}
                      value={inputValues[globalIndex]}
                      type="text"
                      disabled={disabledInputs[globalIndex]}
                      className="countries_input"
                      onChange={(e) =>
                        handleInputChange(
                          globalIndex,
                          e.target.value,
                          country.capital
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllCountries;
