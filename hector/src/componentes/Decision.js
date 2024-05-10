import React from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import { useNavigate } from "react-router-dom";

export function Decision() {
  const location = useLocation();
  /*Guardamos las variables que hemos recibido de la página anterior*/
  const totalRent = location.state?.totalRent;
  const totalOccupants = location.state?.totalOccupants;
  const occupantNames = location.state?.occupantNames;

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
