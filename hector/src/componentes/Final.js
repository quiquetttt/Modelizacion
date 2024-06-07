import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Final() {
  const location = useLocation();
  const navigate = useNavigate();
  const apiData = location.state?.apiData;
  const occupantNames = apiData?.occupantNames;
  const final = apiData?.final;

  /*Navega al inicio*/
  const handleNavigate = () => {
    navigate("/");
  };

  if (!occupantNames || !final) return null;
  return (
    <div className="Final">
      <header>
        <div className="title-container-Final">
          <h1>Enhorabuena, aqui tienes la distribución justa de la renta</h1>
        </div>
      </header>
      <div className="final-background">
        <div className="vertical-bar left-bar"></div>
        <div className="vertical-bar right-bar"></div>
        <div className="final-message-box">
          <h3>Resultado Final:</h3>
          {final.map((item, index) => (
            <p key={index}>
              Jugador: {occupantNames[item.jugador - 1]}, <strong>Precio: {item.precio}€</strong>,
              Habitación: {item.habitacion + 1}
            </p>
          ))}
        </div>
        <div className="button-final">
          <button onClick={handleNavigate}>Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}

export default Final;