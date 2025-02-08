import "./OneOfFour.css";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const OneOfFour = () => {
  const { setSelected } = useOutletContext();

  useEffect(() => {
    setSelected("1-of-4");
  }, []);

  return (
    <div className="one_of_four">
      <div className="one_of_four_p1">
        <h1>1 of 4</h1>
      </div>
      <div className="one_of_four_p2">
        <h1>1 of 4</h1>
      </div>
    </div>
  );
};

export default OneOfFour;
