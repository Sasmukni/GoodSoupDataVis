import React from 'react';
import '../../App.css';
import StackedBarChart from '../visualizations/stackedBarChart'; 
import AlluvialChart from '../visualizations/AlluvialChart';
import BarChart from '../visualizations/BarChart';
import BubbleChart from '../visualizations/BubbleChart';
import StackedAreaChart from '../visualizations/stackedAreaChart';
import DonutChart from '../visualizations/DonutChart';
import ChoroplethMap from '../visualizations/ChoroplethMap';
import GaugeChart from '../visualizations/GaugeChart';
import SwitchDiag from '../visualizations/SwitchDiag';

import {useState} from "react";

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
    gender: ["#0AD3FF", "#FF85EB"],
    arc: ["#D6D6D7", "red"]
}

function ProjectHome() {
    return(
    <div className="App">
        
        <header className="Project-header text-left py-4">
            <div className="col-8">
                <h1 className="display-4 fw-bold text-primary mb-3">Temperature timeline</h1>
                <h2 className="h5 text-secondary mt-3">Linechart showing max, average and min temperature over time</h2>
            </div>
            <div className="col-3"></div>
        </header>
        <div className="container my-3">
            <div className='row'>
                <div className='col-8'>
                    <h2 className="text-primary fw-bold mb-3">Introduction</h2>
                    <h4>A general view of the data</h4>
                </div>
                <div className='col-4'></div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <p>
                    Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                    Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                    amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                    Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.
                    Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                    Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                    amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                    Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.
                    </p>
                </div>
                <div className='col-12'>
                    <StackedBarChart colors={colorsType} width={window.innerWidth - 0.3 * window.innerWidth}/>
                </div>
            </div>
            <div className='barrier'></div>
            <div className='row'>
                <div className='col-8'>
                    <StackedAreaChart colors={colorsType}width={window.innerWidth - 0.6 * window.innerWidth} height={window.innerHeight* 4/10}/>
                </div>
                <div className='col-4'>
                    <p>
                        Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                        Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                        sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                        amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                        Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.
                        Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                        Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    </p>
                </div>
            </div>
            <div className='barrier'></div>
            
            <SwitchDiag colorsType={colorsType}/>
            
            <div className='barrier'></div>
            
            <h2 className="text-primary fw-bold mb-3">Main visualization</h2>
            <h4>A detailed view for each European country</h4>
            <div className='row'>
                <div className='col-12'>
                    <ChoroplethMap width={window.innerWidth - 0.2 * window.innerWidth} height={window.innerHeight* 3/4} colors={colorsType}/>
                </div>
            </div>
            <h2 className="text-primary fw-bold mb-3">Getting into the details</h2>
            <h4>More specific visualizations</h4>
            <div className='row'>
                <div className='col-12'>
                    <AlluvialChart colors={colorsType} width={window.innerWidth - 0.2 * window.innerWidth} height={window.innerHeight* 7/8}/>
                </div>
                <div className='col-12'>
                    <BubbleChart colors={colorsType} width={window.innerWidth - 0.2 * window.innerWidth} height={window.innerHeight* 7/8}/>
                </div>
                <div className='col-12'>
                    <BarChart colors={colorsType} width={window.innerWidth - 0.2 * window.innerWidth} height={window.innerHeight* 7/8}/>
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

export default ProjectHome;
