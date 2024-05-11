import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import { useNavigate } from "react-router-dom";


export function Decision() {
  const location = useLocation();
  /*Guardamos las variables que hemos recibido de la página anterior*/
  const totalRent = location.state?.totalRent;
  const totalOccupants = location.state?.totalOccupants;
  const occupantNames = location.state?.occupantNames;
  const apiData = location.state?.apiData; //PARA ACCEDER A LOS DATOS RECIBIDOS POR LA API CREAR const apiData desde Inicio.js
  const navigate = useNavigate(); 
  const decision = 0;

  useEffect(() => {
    const { lNodos, lAristas, nodo } = apiData; // Extrae solo los atributos necesarios de apiData
    fetch('http://localhost:8000/Decision', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiData, decision}),
    })
    .then(response => response.json())
    .then(data => {
      // Aquí puedes usar los datos devueltos por la API
      navigate(`/Inicio/${occupantNames[decision]}`, {
        state: { apiData: data },
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [decision]); // Este efecto se ejecutará cada vez que 'indice' cambie

 

  const handleDecision = () => {};
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
              <button onClick={handleDecision}></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Decision;
