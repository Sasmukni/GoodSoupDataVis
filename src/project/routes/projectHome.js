import React from 'react';
import '../../App.css';
import StackedBarChart from '../visualizations/stackedBarChart'; 
import AlluvialChart from '../visualizations/AlluvialChart';
import BarChart from '../visualizations/BarChart';
import BubbleChart from '../visualizations/BubbleChart';
import StackedAreaChart from '../visualizations/stackedAreaChart';
import RadarChart from '../visualizations/radarChart';
import PieChart from '../visualizations/pieChart';
import TreeMapChart from '../visualizations/treeMapChart';
import DonutChart from '../visualizations/DonutChart';
import ChoroplethMap from '../visualizations/ChoroplethMap';

function ProjectHome() {
    return(
    <div className="App">
        <header className="text-center py-4">
            <h1 className="display-4 fw-bold text-primary mb-3">Temperature timeline</h1>
            <h2 className="h5 text-secondary mt-3">Linechart showing max, average and min temperature over time</h2>
        </header>
        <div className="container my-3">
            <h2>First Section</h2>
            <div className='row'>
                <div className='col-12'>
                    <StackedBarChart/>
                </div>
                <div className='col-12'>
                    <StackedAreaChart/>
                </div>
                <div className='col-12'>
                    <RadarChart/>
                </div>
                <div className='col-12'>
                    <PieChart/>
                </div>
                <div className='col-12'>
                    <TreeMapChart/>
                </div>
            </div>
            <h2>Second Section</h2>
            <div className='row'>
                <div className='col-12'>
                    <ChoroplethMap width={window.innerWidth - 0.3 * window.innerWidth} height={window.innerHeight* 3/4}/>
                </div>
            </div>
            <h2>Third Section</h2>
            <div className='row'>
                <div className='col-12'>
                    <AlluvialChart/>
                </div>
                <div className='col-12'>
                    <BubbleChart/>
                </div>
                <div className='col-12'>
                    <BarChart/>
                </div>
            </div>
        </div>
        <div className="container my-3">
            <h2 className="text-center my-4 fw-semibold fs-4">Understanding the data</h2>
            <p className="text-muted text-start fs-5 px-3">
             As expected, the temperatures in Texas are consistently higher during the months corresponding to the Northern hemisphere summer (June to August) and decrease during winter (December to February).
             It is also possible to notice that most the recent years' temperatures were overall higher when compared to previous years, although it was not always the case.
             In general, there is a difference of more or less 10 °F between min, average and max temperatures corresponding to the same month. All temperatures measured were between the range of around 20 °F to 100 °F.
            </p>
        </div>
    </div>);
};

export default ProjectHome;
