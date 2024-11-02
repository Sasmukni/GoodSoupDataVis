import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from "./routes/home";
import CO2Emissions from "./routes/C02Emissions";
import Navbar from './navbar';
import HeatMapPage from './routes/HeatMapPage';
import CO2EmissionsDecade from './routes/CO2EmissionsDecade';
import StackedBarPlotPage from './routes/StackedCO2Emissions';
import StackedMultipleBarPlotPage from './routes/StackedMultipleCO2Emissions';
import StackedBarPlotPercentilePage from './routes/StackedCO2EmissionsPercentile';
function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emissions" element={<CO2Emissions />} />
        <Route path="/emissionsDecade" element={<CO2EmissionsDecade />} />
        <Route path="/heatmap" element={<HeatMapPage/>}/>
        <Route path="/stacked" element={<StackedBarPlotPage/>}/>
        <Route path="/stackedMultiple" element={<StackedMultipleBarPlotPage/>}/>
        <Route path="/stackedPercentile" element={<StackedBarPlotPercentilePage/>}/>
      </Routes>
    </>
  );
}

export default App;
