import logo from './logo.svg';
import './App.scss';
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Inicio from './components/Inicio/Inicio';
import Personajes from './components/Personajes/Personajes';
import Casas from './components/Casas/Casas';
import Cronologia from './components/Cronologia/Cronologia';
import Personajes_Details from './components/Personajes_Details/Personajes_Details';
import Casas_Details from './components/Casas_Details/Casas_Details'
import { useState, useEffect } from 'react';
import HousesContext from "./shared/HousesContext";
import axios from "axios";

function App() {

  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/houses")
      .then((response) => {
        setHouses(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <HousesContext.Provider value={houses}>
      <Router>
        <div className='main'>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/personajes" element={<Personajes />} />
            <Route path="/personajes/:id" element={<Personajes_Details />} />
            <Route path="/casas" element={<Casas />} />
            <Route path="/casas/:id" element={<Casas_Details />} />
            <Route path="/cronologia" element={<Cronologia />} />
          </Routes>
        </div>
      </Router>
    </HousesContext.Provider>
  );
}

export default App;
