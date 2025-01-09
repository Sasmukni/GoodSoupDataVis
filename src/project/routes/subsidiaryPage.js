import React from 'react';
import '../../App.css';
import WaffleChart from '../visualizations/WaffleChart';
import Histogram from '../visualizations/Histogram';
import ScatterPlot from '../visualizations/ScatterPlot';
import DualLineChart from '../visualizations/DualLineChart';
import MultipleStackedBarchart from '../visualizations/MultipleStackedBarChart';
import GaugeChart from '../visualizations/GaugeChart';
import ChoroplethMap from '../visualizations/ChoroplethMap';

const colorsType = {
    Neutral: "#D6D6D7",
    Males: "#0AD3FF",
    Females: "#FFC3F5",
    "Males-opaque": "#00B7E0",
    "Females-opaque": "#FF85EB",
    "Full time": "#fedb72",
    "Part time": "#DB504A",
    "Short cycle" : "#D7F2BA",
    Bachelor : "#BDE4A8",
    Master : "#679436",
    Doctoral : "#45503B",
    Public: "#cff27e",
    Private: "#faa300",
    Privategovdep: "#e57c04",
    Privategovind: "#ff6201",
    Nation1 : "#E3F2FD",//used in d3scale function nation1 > nation2 
    Nation2 : "#0D47A1",
    male: ["#0AD3FF","#0D47A1"],
    female: ["#FFC3F5", "purple"],
    gender: ["#0AD3FF", "#FFC3F5"],
    arc: ["#D6D6D7", "red"]
}

function SubsidiaryPage() {
    return(
    <div className="App">
        <header className="text-center py-4">
            <h1 className="display-4 fw-bold text-primary mb-3">Temperature timeline</h1>
            <h2 className="h5 text-secondary mt-3">Linechart showing max, average and min temperature over time</h2>
        </header>
        <div className="container my-3">
            <h2 className="text-primary fw-bold mb-3">Introduction</h2>
            <h4>A general view of the data</h4>
            <div className='row'>
                <div className='col-12'>
                    <WaffleChart colors={colorsType}/>
                </div>
                <div className='col-12'>
                    <Histogram colors={colorsType}/>
                </div>
                <div className='col-12'>
                    <ScatterPlot colors={colorsType}/>
                </div>
                <div className='col-12'>
                    <DualLineChart colors={colorsType}/>
                </div>
                <div className='col-12'>
                    <MultipleStackedBarchart colors={colorsType}/>
                </div>
            </div>
            <h2 className="text-primary fw-bold mb-3">Main visualization</h2>
            <h4>A detailed view for each European country</h4>
            <div className='row'>
                <div className='col-4'>
                    <GaugeChart colors={colorsType}/>
                </div>
                <div className='col-8'>
                    <ChoroplethMap colors={colorsType}/>
                </div>
            </div>
        </div>
        <div className="container my-3">
            <h2 className="text-primary fw-bold mb-3">Understanding the data</h2>
            <p className="text-muted text-start fs-5 px-3">
             As expected, the temperatures in Texas are consistently higher during the months corresponding to the Northern hemisphere summer (June to August) and decrease during winter (December to February).
             It is also possible to notice that most the recent years' temperatures were overall higher when compared to previous years, although it was not always the case.
             In general, there is a difference of more or less 10 °F between min, average and max temperatures corresponding to the same month. All temperatures measured were between the range of around 20 °F to 100 °F.
            </p>
        </div>
    </div>);
};

export default SubsidiaryPage;
