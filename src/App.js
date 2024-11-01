import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from "./routes/home";
import CO2Emissions from "./routes/C02Emissions";
import Navbar from './navbar';
import HeatMapPage from './routes/HeatMapPage';
import CO2EmissionsDecade from './routes/CO2EmissionsDecade';

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emissions" element={<CO2Emissions />} />
        <Route path="/emissionsDecade" element={<CO2EmissionsDecade />} />
        <Route path="/heatmap" element={<HeatMapPage/>}/>
      </Routes>
    </>
  );
}

export default App;
