import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from "./routes/home";
import CO2Emissions from "./routes/C02Emissions";
import Navbar from './navbar';
import ScrollToTop from './scroll';
import HeatMapPage from './routes/HeatMapPage';
import CO2EmissionsDecade from './routes/CO2EmissionsDecade';
import StackedBarPlotPage from './routes/StackedCO2Emissions';
import StackedMultipleBarPlotPage from './routes/StackedMultipleCO2Emissions';
import StackedBarPlotPercentilePage from './routes/StackedCO2EmissionsPercentile';
import AboutUs from './routes/aboutus';
import Assignment1 from './routes/assignment1';
import Assignment4 from './routes/assignment4';
import AlluvialPage from './routes/alluvial';
import {StillMap } from './routes/Map';
import LinechartPage from './routes/linechart';
import RadarChartPage from './routes/radarchart';
import RidgelinePage from './routes/ridgeline';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BackButton from './backbutton';

function App() {
  return (
    <>
    <ScrollToTop />
    <BackButton/>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assignment1" element={<Assignment1/>}/>
        <Route path="/assignment4" element={<Assignment4/>}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/assignment1/emissions" element={<CO2Emissions />} />
        <Route path="/assignment1/emissionsDecade" element={<CO2EmissionsDecade />} />
        <Route path="/assignment1/heatmap" element={<HeatMapPage/>}/>
        <Route path="/assignment1/stacked" element={<StackedBarPlotPage/>}/>
        <Route path="/assignment1/stackedMultiple" element={<StackedMultipleBarPlotPage/>}/>
        <Route path="/assignment1/stackedPercentile" element={<StackedBarPlotPercentilePage/>}/>
        <Route path="/alluvial" element={<AlluvialPage/>}/>
        <Route path="/map" element={<StillMap/>}/>
        <Route path="/assignment4/linechart" element={<LinechartPage/>}/>
        <Route path="/assignment4/radarchart" element={<RadarChartPage/>}/>
        <Route path="/assignment4/ridgeline" element={<RidgelinePage/>}/>
      </Routes>
    </>
  );
}

export default App;
