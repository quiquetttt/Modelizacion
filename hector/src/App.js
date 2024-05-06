import React, { useState, useRef } from 'react';
import RentDivisionCalculator from './componentes/RentDivisionCalculator.js';
import './App.css';

function App() {
    const [showMessage, setShowMessage] = useState(false);
    const [selectedVariance, setSelectedVariance] = useState('');
    const dropdownRef = useRef(null);
  
    const toggleMessage = () => {
      setShowMessage(!showMessage);
      if (!showMessage && dropdownRef.current) {
        setTimeout(() => {
          dropdownRef.current.focus();
        }, 0);
      }
    };
  
    const handleVarianceChange = (e) => {
      const value = e.target.value; // Obtiene el valor actual
      if (value.length <= 2 && /^\d*$/.test(value)) {
        // Verifica si el valor tiene máximo dos dígitos y solo contiene dígitos
        setSelectedVariance(value);
      }
    };
  
    const handleConfirmVariance = () => {
      if (selectedVariance) {
        toggleMessage(); // Cierra la ventana desplegable si se ha seleccionado una varianza
      }
    };
  
    const handleCalculate = () => {
      if (!selectedVariance) {
        setShowMessage(true);
      } else {
        setShowMessage(false);
        // Lógica para calcular aquí, o puedes pasar la varianza a otro componente para realizar el cálculo
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
          <div className={`dropdown-content ${showMessage ? 'show' : ''}`}>
            <span className="close" onClick={toggleMessage}>&times;</span>
            <p>Seleccione la varianza en euros:</p>
            <input
              ref={dropdownRef}
              type="number"
              value={selectedVariance}
              onChange={handleVarianceChange}
              min={0}
              step={1}
              maxLength={2} // Limita la entrada a dos dígitos
            />
            <button onClick={handleConfirmVariance}>Confirmar</button> {/* Botón para confirmar la varianza */}
            <p>Por favor, seleccione una varianza antes de calcular.</p>
          </div>
        </header>
        <RentDivisionCalculator selectedVariance={selectedVariance} onCalculate={handleCalculate} />
      </div>
    );
  }
  
  export default App;