import React from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export function Inicio() {
  const navigate = useNavigate();
  const location = useLocation();

  /*Guardamos las variables que hemos recibido de la página anterior*/
  const totalRent = location.state?.totalRent;
  const totalOccupants = location.state?.totalOccupants;
  const occupantNames = location.state?.occupantNames;
  const apiData = location.state?.apiData; //PARA ACCEDER A LOS DATOS RECIBIDOS POR LA API CREAR const apiData desde App.js
  //SIENDO apiData:   
   //lNodos: List[Tuple[int,Dict[str,Any]]]
   // lAristas: List[Tuple[int,int]]
   //nodo : int
   //jugador : int
  //precios : List[int]

  //Definir el indice
  const decision = 0;

  /*Navega al inicio*/
  const handleNavigate = () => {
    navigate("/");
  };

  /*Navega a la página de decisión*/
const handleNavigate2 = () => {
  const { lNodos, lAristas, nodo } = apiData; // Extrae solo los atributos necesarios de apiData
  fetch('http://localhost:8000/Decision', {
    method: 'POST', // Cambiado a POST porque estamos enviando datos
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(apiData, decision),
  })
  .then(response => response.json())
  .then(data => {
    // Aquí puedes usar los datos devueltos por la API
    navigate(`/Inicio/${occupantNames[decision]}`, {
      state: { apiData: data, decision },
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  }); 
};



  return (
    <div>
      <div className="title-container">
        <h1>Resumen de los datos</h1>
      </div>
      <div class="vertical-bar left-bar"></div>
      <div class="vertical-bar right-bar"></div>
      {totalRent && (
        <div className="total-rent-box">
          <h2>Precio Total del Alquiler</h2>
          <p>{totalRent}€</p>
        </div>
      )}
      <div className="occupant-names-box">
        <h2>Los nombres de los inquilinos son:</h2>
        {occupantNames.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
      </div>
      <div className="confirmation-question-box">
        <h3>¿Son correctos los datos que has proporcionado?</h3>
      </div>
      <div className="change-button">
        <button onClick={handleNavigate}>Cambiar datos</button>
      </div>
      <div className="continue-button">
        <button onClick={handleNavigate2}>Continuar</button>
      </div>
    </div>
  );
}

export default Inicio;
