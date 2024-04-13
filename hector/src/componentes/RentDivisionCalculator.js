import React, { useState } from 'react';
import App from '../App';
 // Importa el archivo App.css

 function RentDivisionCalculator() {
    const [totalRent, setTotalRent] = useState(1000); // Establece el valor predeterminado en $1000
    const [totalOccupants, setTotalOccupants] = useState(0);
    const [fairShare, setFairShare] = useState(0);
    const [occupantShares, setOccupantShares] = useState([]);
    const [occupantNames, setOccupantNames] = useState([]);
    const [totalRooms, setTotalRooms] = useState(1);
  
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
      setTotalRooms(parseInt(e.target.value));
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
  
    return (
      <div className="calculator-container">
        <div className="calculator-inputs">
          <label>Total Rent: </label>
          <input type="number" value={totalRent} onChange={handleTotalRentChange} />
          <label>Total Rooms: </label>
          <input type="number" value={totalRooms} onChange={handleTotalRoomsChange} />
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