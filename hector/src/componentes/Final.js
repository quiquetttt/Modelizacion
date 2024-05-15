import React from "react";
import { useLocation } from "react-router-dom";

export function Final() {
  const location = useLocation();
  const apiData = location.state?.apiData;
  const occupantNames = apiData?.occupantNames;
  const final = apiData?.final;

  if (!occupantNames || !final) return null;
  return (
    <div>
      <div className="title-container">
        <h1>Enhorabuena, aqui tienes la distribución justa de la renta</h1>
      </div>
      <div class="vertical-bar left-bar"></div>
      <div class="vertical-bar right-bar"></div>
      <div className="final-message-box">
        <h3>Resultado Final: {final}</h3>
      </div>
    </div>
  );
}

export default Final;
