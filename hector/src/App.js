import './App.css';
//Importa de carpeta componentes de src
import RentDivisionCalculator from './componentes/RentDivisionCalculator.js';
  function App() {
    return (
      <div className="App">
       
        <RentDivisionCalculator /> {/* Agrega el componente RentDivisionCalculator aquí */}
      </div>
    );
  }
  
  export default App;