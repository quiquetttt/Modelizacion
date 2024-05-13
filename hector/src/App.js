import React, { useState, useRef } from "react";
import "./App.css";


//* QUÉ PODEMOS IMPLEMENTAR AL CLICKAR EN EL BOTON INTERROGACION?? *//
//* ENDPOINT API CREAR = http://localhost:8000/Crear
//* ENDPOINT API DECISION = http://localhost:8000/Decision

function App() {
  const [showMessage, setShowMessage] = useState(false);// Variable para mostrar el mensaje de ayuda si no se han rellenado todos los nombres de los ocupantes
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Variable para navegar entre páginas
  const [totalRent, setTotalRent] = useState(1000);// Variable para guardar el precio total del alquiler
  const [totalOccupants, setTotalOccupants] = useState(0);// Variable para guardar el número total de ocupantes
  const [occupantNames, setOccupantNames] = useState([]);// Variable para guardar los nombres de los ocupantes
  const [showError, setShowError] = useState(false);// Variable para mostrar el mensaje de error
  const [showRoomsError, setShowRoomsError] = useState(false);// Variable para mostrar el mensaje de error

  // Función para cambiar el precio total del alquiler
  const handleTotalRentChange = (e) => {
    setTotalRent(parseFloat(e.target.value));
  };

  // Función para cambiar el número total de ocupantes
  const handleTotalOccupantsChange = (occupants) => {
    setTotalOccupants(occupants);
    setOccupantNames(Array(occupants).fill(""));
  };

  // Función para cambiar el nombre de un ocupante
  const handleOccupantNameChange = (index, name) => {
    const newOccupantNames = [...occupantNames];
    newOccupantNames[index] = name;
    setOccupantNames(newOccupantNames);
  };

  // Función para mostrar u ocultar el mensaje de ayuda si no se han rellenado todos los nombres de los ocupantes
  const toggleMessage = () => {
    setShowMessage(!showMessage);
    if (!showMessage && dropdownRef.current) {
      setTimeout(() => {
        dropdownRef.current.focus();
      }, 0);
    }
  };

  //Funcion para manejar el boton de interrogacion
  const handleDropdownClick = () => {
    setShowMessage(!showMessage);
  };

  // Función para navegar a la siguiente página
  const handleNavigate = () => {
    // Verifica si todos los nombres de los ocupantes han sido rellenados
    const allNamesFilled = occupantNames.every(
      (name) => name && name.trim() !== ""
    );
    // Si no todos los nombres han sido rellenados, muestra el mensaje de error
    if (!allNamesFilled) {
      // Si no todos los nombres han sido rellenados, muestra el mensaje de error
      setShowError(true);
    } 
    else if(totalOccupants === 0){
      setShowRoomsError(true);
    }
    else {
      // Si todos los nombres han sido rellenados, navega a la siguiente página
        navigate("/Inicio", {
          state: { totalRent, totalOccupants, occupantNames, },
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
        <p>"Introducción"</p>
      </header>
      <div className="calculator-container">
        <div className="calculator-inputs">
          <label>Total Rent: </label>
          <input
            type="text"
            value={`${totalRent}€`}
            onChange={handleTotalRentChange}
            className="input-field"
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
        {showRoomsError && (
          <div className="error-message">
            Por favor, selecciona el número de habitaciones.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
