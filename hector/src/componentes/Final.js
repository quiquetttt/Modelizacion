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
      <p>Dan Puterisimo</p>
      <p>Resultado Final: {final}</p>
    </div>
  )
}

export default Final;