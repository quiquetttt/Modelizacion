import React, { useState, useRef } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [totalRent, setTotalRent] = useState(1000);
  const [totalOccupants, setTotalOccupants] = useState(0);
  const [occupantNames, setOccupantNames] = useState([]);
  const [showError, setShowError] = useState(false);

  const handleTotalRentChange = (e) => {
    setTotalRent(parseFloat(e.target.value));
  };

  const handleTotalOccupantsChange = (occupants) => {
    setTotalOccupants(occupants);
    setOccupantNames(Array(occupants).fill(""));
  };

  const handleOccupantNameChange = (index, name) => {
    const newOccupantNames = [...occupantNames];
    newOccupantNames[index] = name;
    setOccupantNames(newOccupantNames);
  };

  const toggleMessage = () => {
    setShowMessage(!showMessage);
    if (!showMessage && dropdownRef.current) {
      setTimeout(() => {
        dropdownRef.current.focus();
      }, 0);
    }
  };

  const handleNavigate = () => {
    // Verifica si todos los nombres de los ocupantes han sido rellenados
    const allNamesFilled = occupantNames.every(
      (name) => name && name.trim() !== ""
    );

    if (!allNamesFilled) {
      // Si no todos los nombres han sido rellenados, muestra el mensaje de error
      setShowError(true);
    } else {
      // Si todos los nombres han sido rellenados, navega a la siguiente página
      navigate("/Inicio", {
        state: { totalRent, totalOccupants, occupantNames },
      });
    }
  };

  return (
    <div className="App">
      <header>
        <div className="title-container">
          <h1>AL-KILA</h1>
          <div className="icon-container">
            <button className="dropbtn" onClick={toggleMessage}>
              <div className="icon">&#63;</div>
            </button>
          </div>
        </div>
        <p>Calculadora de división de alquiler</p>
      </header>
      <div className="calculator-container">
        <div className="calculator-inputs">
          <label>Total Rent: </label>
          <input
            type="text"
            value={`${totalRent}€`}
            onChange={handleTotalRentChange}
            className="input-field"
            step="100"
          />
        </div>
        <div className="calculator-occupants">
          <p>Select Total Rooms:</p>
          <div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <button key={num} onClick={() => handleTotalOccupantsChange(num)}>
                {num}
              </button>
            ))}
          </div>
          {Array.from({ length: totalOccupants }, (_, index) => (
            <input
              key={index}
              type="text"
              value={occupantNames[index]}
              onChange={(e) => handleOccupantNameChange(index, e.target.value)}
              placeholder={`Occupant ${index + 1} Name`}
              className="input-field"
            />
          ))}
        </div>
      </div>
      <div className="calculate-button">
        <button onClick={handleNavigate}>Calcular</button>
        {showError && (
          <div className="error-message">
            Por favor, rellena los nombres de los ocupantes.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
