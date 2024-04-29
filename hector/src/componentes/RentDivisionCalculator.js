import React, { useState } from 'react';

function RentDivisionCalculator() {
  const [totalRent, setTotalRent] = useState(1000); // Establece el valor predeterminado en $1000
  const [totalOccupants, setTotalOccupants] = useState(0);
  const [fairShare, setFairShare] = useState(0);
  const [occupantShares, setOccupantShares] = useState([]);
  const [occupantNames, setOccupantNames] = useState([]);
  const [totalRooms, setTotalRooms] = useState(1);

  // Estado para almacenar la información de las habitaciones
  const [roomInfo, setRoomInfo] = useState([getDefaultRoom()]);

  function getDefaultRoom() {
    return { area: '80m^2', terrace: 'No', pets: 'No' };
  }

  const handleTotalRentChange = (e) => {
    setTotalRent(parseFloat(e.target.value));
  };

  const handleTotalOccupantsChange = (occupants) => {
    setTotalOccupants(occupants);
    setOccupantNames(Array(occupants).fill(''));
  };

  const handleOccupantNameChange = (index, name) => {
    const newOccupantNames = [...occupantNames];
    newOccupantNames[index] = name;
    setOccupantNames(newOccupantNames);
  };

  const handleTotalRoomsChange = (e) => {
    const rooms = parseInt(e.target.value);
    setTotalRooms(rooms);
    // Actualiza la información de las habitaciones con los valores predeterminados para el número seleccionado de habitaciones
    setRoomInfo(Array.from({ length: rooms }, () => getDefaultRoom()));
  };

  const calculateFairShare = () => {
    if (totalRent === 0 || totalOccupants === 0 || totalRooms === 0) {
      setFairShare(0);
      setOccupantShares([]);
    } else {
      const fairShareAmount = totalRent / totalOccupants;
      setFairShare(fairShareAmount);
      const shares = Array(totalOccupants).fill(fairShareAmount);
      setOccupantShares(shares);
    }
  };

  // Establecer información específica para Room 1 y Room 2
  roomInfo[0] = { area: '83m^2', terrace: 'Yes', pets: 'Yes' };
  if (totalRooms >= 2) {
    roomInfo[1] = { area: '43m^2', terrace: 'Yes', pets: 'No' };
  }

  return (
    <div className="calculator-container">
      <div className="calculator-inputs">
        <label>Total Rent: </label>
        <input
  type="text"
  value={`${totalRent}€`} // Añade el símbolo de euro después del valor
  onChange={handleTotalRentChange}
  className="input-field"
  step="100"
/>
<div className="calculator-inputs">
  <label>Total Rooms: </label>
  <input
    type="number"
    value={totalRooms}
    onChange={handleTotalRoomsChange}
    className="input-field"
  />
</div>
      </div>
      {/* Mostrar información de cada habitación */}
      <div className="room-info">
        {roomInfo.map((room, index) => (
          <div key={index} className="room">
            <p>Room {index + 1}</p>
            <input
              type="text"
              value={room.area}
              placeholder={`Area (m^2)`}
              className="input-field"
              disabled // Deshabilita la entrada para que no se pueda cambiar
            />
            <div className="options">
              <label>Terrace:</label>
              <select value={room.terrace} className="input-field" disabled> {/* Deshabilita el select */}
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="options">
              <label>Pets:</label>
              <select value={room.pets} className="input-field" disabled> {/* Deshabilita el select */}
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <div className="calculator-occupants">
        <p>Select Total Occupants:</p>
        <div>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <button key={num} onClick={() => handleTotalOccupantsChange(num)}>{num}</button>
          ))}
        </div>
        {Array.from({ length: totalOccupants }, (_, index) => (
          <input
            key={index}
            type="text"
            value={occupantNames[index]}
            onChange={(e) => handleOccupantNameChange(index, e.target.value)}
            placeholder={`Occupant ${index + 1} Name`}
            className="input-field"
          />
        ))}
      </div>
      <div className="calculator-buttons">
        <button className="button" onClick={calculateFairShare}>Calculate</button>
      </div>
      <div className="calculator-results">
        <h2>Fair Share Per Occupant: ${fairShare.toFixed(2)}</h2>
        <h3>Occupant Shares:</h3>
        <ul>
          {occupantShares.map((share, index) => (
            <li key={index}>{occupantNames[index] || `Occupant ${index + 1}`}: ${share.toFixed(2)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RentDivisionCalculator;