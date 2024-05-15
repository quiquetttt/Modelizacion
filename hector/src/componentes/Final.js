import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export const Final = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const final = location.state?.apiData?.final;
  return (
    <div>
      <p>Dan Puterisimo</p>
      <p>Resultado Final: {final}</p>
    </div>
  )
}

export default Final;