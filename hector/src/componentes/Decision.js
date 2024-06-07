import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import { useNavigate } from "react-router-dom";

export function Decision() {
  const location = useLocation();
  /*Guardamos las variables que hemos recibido de la página anterior*/
  const occupantNames = location.state?.occupantNames;
  const apiData = location.state?.apiData; //PARA ACCEDER A LOS DATOS RECIBIDOS POR LA API CREAR desde Inicio.js
  const precios = apiData?.precios;
  const decisor = apiData?.jugador; // Obtener el índice del decisor desde apiData

  // lNodos: List[Tuple[int,Dict[str,Any]]]
  //lAristas: List[Tuple[int,int]]
  //nodo : int
  //jugador : int
  //precios : List[int]
  //height : int
  const navigate = useNavigate();
  const [currentDecisionMaker, setCurrentDecisionMaker] = useState("");

  useEffect(() => {
    if (decisor && occupantNames) {
      setCurrentDecisionMaker(occupantNames[decisor - 1]);
    }
  }, [decisor, occupantNames]);

  const handleDecision = (index) => {
    // Verifica que apiData tenga todos los datos necesarios
    if (
      !apiData ||
      !apiData.lNodos ||
      !apiData.lAristas ||
      apiData.nodo === undefined ||
      apiData.height === undefined ||
      apiData.jugador === undefined ||
      !apiData.precios
    ) {
      console.error("Datos incompletos en apiData");
      return;
    }
    const { lNodos, lAristas, nodo, height } = apiData;
    const requestBody = { lNodos, lAristas, nodo, height, decision: index };

    fetch("http://localhost:8000/Decision/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        const final = data.final || [];
        const decisor = data.jugador;

        // Verifica si final es una lista vacía o si el primer elemento tiene jugador -1
        if (
          final.length === 0 ||
          (final.length > 0 && final[0]["jugador"] === -1)
        ) {
          // Si la respuesta es null o el primer elemento tiene jugador -1, recarga la página con los outputs de la API
          navigate(`/Inicio/${occupantNames[decisor - 1]}`, {
            state: { apiData: data, occupantNames },
          });
        } else {
          // Si la respuesta no es null y el primer elemento no tiene jugador -1, navega a Final.js mandando el atributo final
          navigate("/Final", {
            state: {
              apiData: {
                final: data.final,
                occupantNames,
              },
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (!occupantNames || !precios || !decisor) return null; // Agregar la validación para decisor

  return (
    <div className="Decision">
      <header>
        <div className="title-container-Decision">
          <h1>Es hora de calcular la renta!</h1>
        </div>
      </header>
      <div className="decision-background">
        <div className="decision-box">
          <h2>{currentDecisionMaker}, elige la opción que más te convenga</h2>
          {occupantNames.map((occupant, index) => (
            <div key={index}>
              <h3>OPCIÓN {index + 1}</h3>
              <p>
                Habitación {index + 1} por <strong>{precios[index]} € </strong>
              </p>

              <div className="button-decision">
                <button onClick={() => handleDecision(index)}>
                  {precios[index]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Decision;
