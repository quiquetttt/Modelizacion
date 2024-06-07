import React, { useState, useRef } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

//* QUÉ PODEMOS IMPLEMENTAR AL CLICKAR EN EL BOTON INTERROGACION?? *//
//* ENDPOINT API CREAR = http://localhost:8000/Crear
//* ENDPOINT API DECISION = http://localhost:8000/Decision
function App() {
  const [showMessage, setShowMessage] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [totalRent, setTotalRent] = useState(1000);
  const [totalOccupants, setTotalOccupants] = useState(0);
  const [occupantNames, setOccupantNames] = useState([]);
  const [errorModalContent, setErrorModalContent] = useState("");

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

  const handleNavigate = () => {
    const allNamesFilled = occupantNames.every(
      (name) => name && name.trim() !== ""
    );
    if (!allNamesFilled) {
      setErrorModalContent("Por favor, rellena los nombres de los ocupantes.");
      setShowMessage(true);
    } else if (totalOccupants === 0) {
      setErrorModalContent("Por favor, selecciona el número de habitaciones.");
      setShowMessage(true);
    } else {
      navigate("/Inicio", {
        state: { totalRent, totalOccupants, occupantNames },
      });
    }
  };

  const handleCloseModal = () => {
    setShowMessage(false);
    setErrorModalContent("");
  };

  return (
    <div className="App">
      <header>
        <div className="title-container">
          <img src="/bitmap.png" alt="Logo" className="logo" />
          <div className="main-title-container">
            <h1 className="main-title">AL-KILA</h1>
          </div>
        </div>
      </header>

      <div className="roof-background">
        <div className="calculator-container">
          <div className="calculator-inputs">
            <label className="total-rent-text">Total Rent: </label>
            <input
              type="text"
              value={`${totalRent}€`}
              onChange={handleTotalRentChange}
              className="input-field"
              onInput={(e) => {
                const inputValue = e.target.value.replace("€", "");
                if (inputValue === "") {
                  e.target.value = "0€";
                  setTotalRent(0);
                } else {
                  const numericValue = parseInt(inputValue, 10);
                  if (isNaN(numericValue)) {
                    e.target.value = "0€";
                    setTotalRent(0);
                  } else {
                    e.target.value = `${numericValue}€`;
                    setTotalRent(numericValue);
                  }
                }
              }}
            />
          </div>

          <div className="calculator-occupants">
            <p className="select-total-rooms-text">Select Total Rooms:</p>
            <div className="room-buttons">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => handleTotalOccupantsChange(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="occupant-inputs">
              {Array.from({ length: totalOccupants }, (_, index) => (
                <input
                  key={index}
                  type="text"
                  value={occupantNames[index]}
                  onChange={(e) =>
                    handleOccupantNameChange(index, e.target.value)
                  }
                  placeholder={`Occupant ${index + 1} Name`}
                  className="input-field"
                />
              ))}
            </div>
          </div>

          <div className="calculate-button">
            <button onClick={handleNavigate}>Calcular</button>
          </div>
        </div>
      </div>

      {/* Modal de error */}
      {showMessage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p>{errorModalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
