import React from 'react';
import '../../App.css';
import WaffleChart from '../visualizations/WaffleChart';
import Histogram from '../visualizations/Histogram';
import ScatterPlot from '../visualizations/ScatterPlot';
import DualLineChart from '../visualizations/DualLineChart';
import MultipleStackedBarchart from '../visualizations/MultipleStackedBarChart';
import GaugeChart from '../visualizations/GaugeChart';
import ChoroplethMap from '../visualizations/ChoroplethMap';
import ChoroplethMapNEET from '../visualizations/ChoroplethMapNEET';

const colorsType = {
    Neutral: "#D6D6D7",
    Males: "#0AD3FF",
    Females: "#FF85EB",
    "Males-opaque": "#00B7E0",
    "Females-opaque": "#FFC3F5",
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
        <header className=" Project-header text-left py-4">
            <div className='col-12'>
            <h1 className="display-4 fw-bold text-primary mb-3">Temperature timeline</h1>
            <h2 className="h5 text-secondary mt-3">Linechart showing max, average and min temperature over time</h2>
            </div>
        </header>
        <div className="container-fluid my-3">
            
            <div className='row white'>
                <div className='col-4 border_right border_external_left'>
                <h2 className="text-primary fw-bold mb-3">Europe is seeing a decline in the NEET phenomenon.</h2>
                <h3 className="h5 text-secondary mt-3">A general view of the data</h3>
                <h3 className="h5 text-secondary mt-3">Waffle Chart</h3>
                <p>In Europe, 16.4% of the population is classified as NEETs (Not in Education, Employment, or Training). Among females, 18% are NEETs, compared to 14.8% for males. But the phenomenon of NEETs seems to decrease over the decade 2013-2022.</p>
                </div>
                <div className='col-8 border_external_right'>
                    <WaffleChart width={window.innerWidth - 0.4 * window.innerWidth} height={window.innerHeight* 1.4/4} colors={colorsType}/>
                </div>
            </div>
           
            <div className='row white border_top'>
                <div className='col-9 border_right border_external_left'>
                    <DualLineChart width={window.innerWidth - 0.4 * window.innerWidth} height={window.innerHeight* 1.5/4} colors={colorsType}/>
                </div>
                <div className='col-3 border_external_right'>
                <h4 className='text-secondary'>Dual Line Chart</h4>
                    <p>The percentage of NEETs has steadily declined over the years for both genders, albeit slowly. Female NEET percentages have consistently been higher than male percentages. The gap widened slightly between 2016 and 2018 but began to narrow after 2019. A sharp increase occurred in 2019, likely due to the COVID-19 pandemic, but this was temporary, as percentages resumed their previous decline after 2021.</p>
                </div>
            </div>
            <div className='barrier'></div>
            <div className='row white'>
                <div className='col-12 border_external_left border_external_right'>
                <div className='col-9'>
                    <h2 className="text-primary fw-bold mb-3">Most NEETs are in Eastern Europe and are mostly female.</h2>
                    <h4 className='text-secondary'>Histogram - Scatter Plot</h4>
                    <p>Higher percentages of NEETs are observed among females, particularly in Eastern European countries like Turkey and Serbia. Over time, the percentage of NEETs has decreased for both genders. Higher percentage bins were omitted, as they were consistently empty for both genders.</p>
                    <p>Most countries cluster along a steep imaginary line, where the percentage of female NEETs is slightly higher than male NEETs. However, there are exceptions like Iceland, where male NEETs exceed females, and Turkey, where the gap is unusually wide. North Macedonia lies at the far end, with high NEET percentages for both genders.</p>
                </div>
                </div>

                <div className='col-6 border_right border_top border_external_left'>
                    <Histogram width={window.innerWidth - 0.6 * window.innerWidth} height={window.innerHeight* 1.7/4} colors={colorsType}/>
                </div>
                <div className='col-6 border_top border_external_right'>
                    <ScatterPlot width={window.innerWidth - 0.6 * window.innerWidth} height={window.innerHeight* 1.5/4} colors={colorsType}/>
                </div>
            </div>
            <div className='barrier'></div>
            <div className="col-12 Project-header">
                <h2 className="display-4 fw-bold text-primary mb-3">Main visualization - NEETs percentage in Europe</h2>
                <h3 className="h5 text-secondary mt-3">A detailed view for each European country</h3>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <ChoroplethMapNEET width={window.innerWidth - 0.2 * window.innerWidth} height={window.innerHeight* 3/4} colors={colorsType}/>
                </div>
            </div>
            <div className="container my-3">
                <h2 className="text-primary fw-bold mb-3">Understanding the data - NEETs</h2>
                <p className="text-muted text-start fs-5 px-3">North Macedonia and Turkey have historically had the highest NEET percentages, hovering around 30%. While North Macedonia’s NEET percentage has declined, Turkey’s has increased. Italy also ranks high in NEET percentages, with a significant gap compared to other Western European countries. Nordic countries, like Sweden and Iceland, have the lowest percentages.</p>
            </div>
            <div className='barrier'></div>
            <div className='row white'>
                <div className='col-3 border_right border_external_left'>
                    <h2 className="text-primary fw-bold mb-3">Turkey has the greatest gender imbalance among NEETs.</h2>
                    <h4 className='text-secondary'>Multiple Stacked Bar Chart
                    </h4>                    
                    <p>North Macedonia has the highest overall NEET percentage relative to its population, while Turkey has the largest percentage of female NEETs, with a significant gender imbalance. Northern European countries are more balanced and have smaller NEET percentages for both genders.</p>
                </div>
                <div className='col-9 border_external_right'>
                    <MultipleStackedBarchart width={window.innerWidth - 0.3 * window.innerWidth} height={window.innerHeight* 3/5} colors={colorsType}/>
                </div>
            </div>
        </div>
        
    </div>);
};

export default SubsidiaryPage;
