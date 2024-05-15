import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import { useNavigate } from "react-router-dom";



export function Decision() {
  const location = useLocation();
  /*Guardamos las variables que hemos recibido de la página anterior*/
  const occupantNames = location.state?.occupantNames;
  const apiData = location.state?.apiData; //PARA ACCEDER A LOS DATOS RECIBIDOS POR LA API CREAR desde Inicio.js
  // lNodos: List[Tuple[int,Dict[str,Any]]]
  //lAristas: List[Tuple[int,int]]
  //nodo : int
  //jugador : int
  //precios : List[int]
  //height : int
  const navigate = useNavigate(); 

  const decisor = location.state?.decisor;

 
  const handleDecision = (index) => {
    // Extrae solo los atributos necesarios de apiData
    const { lNodos, lAristas, nodo, height } = apiData;
    fetch('http://localhost:8000/Decision/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiData, decision: index }),
    })
    .then(response => response.json())
    .then(data => {
      const final = data.final; // Extrae solo los atributos necesarios de data
      const decisor = data.jugador;
      if (final === null) {
        // Si la respuesta es null, recarga la página con los outputs de la API
        navigate(`/Inicio/${decisor}`, {
          state: { apiData: data },
        });
      } else {
        // Si la respuesta no es null, navega a Final.js
        navigate('/Final', {
          state: { final },
        });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };


  if (!occupantNames) return null;
  return (
    <div>
      <div className="title-container-Decision">
        <h1>Es hora calcular la renta!</h1>
      </div>
      <div className="decision-box">
        <h2>{occupantNames[0]}, elige la opcion que mas te convenga</h2>
        {occupantNames.map((occupant, index) => (
          <div key={index}>
            <h3>OPCION {index + 1}</h3>
            <p>Habitación {index + 1} por Precio</p>

            <div className="button-decision">
              <button onClick={() => handleDecision(index)}>Elegir opcion(index+1)</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Decision;
