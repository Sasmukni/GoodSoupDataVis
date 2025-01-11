import './App.css';
import { Routes, Route, Link} from "react-router-dom";
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
import ProjectHome from "./project/routes/projectHome";
import SubsidiaryPage from "./project/routes/subsidiaryPage";

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
        <Route path="/project" element={<ProjectHome/>}/>
        <Route path="/project/NEET" element={<SubsidiaryPage/>}/>
      </Routes>
      <footer class="bg-body-tertiary text-center text-lg-start">
        <div class="text-center p-3 bg-primary" >
          <div style={{display:'flex', flexDirection:'row', justifyContent:"space-around"}}>
            <div className="text-light fw-semibold">Alluto Enrico</div>
            <div className="text-light fw-semibold">Capani Samuele</div>
            <div className="text-light fw-semibold">Fuciarelli Laura</div>
            <div className="text-light fw-semibold">Siddi Yryskeldi</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
