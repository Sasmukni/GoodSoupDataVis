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
            <div className="col-12">
                <h1 className="display-4 fw-bold text-primary mb-3">Third-level education rates across Europe</h1>
                <h2 className="h5 text-secondary mt-3">Gender analysis and comparison regarding third-level education students</h2>
            </div>
        </header>
        <div className="container-fluid my-3">
            <div className='row white '>
                <div className='col-4  border_right border_external_left'>
                <h2 className="text-primary fw-bold mb-3">Introduction</h2>
                <h4>A general view of the data</h4>
                    <p>
                    Turkey has the highest number of students, likely due to its appeal to students from Asia compared to other European countries.
                    Following Turkey, the United Kingdom (up to 2019, before Brexit) stands out, probably because of the accessibility of English as its official language.
                    After these two, countries with large populations and/or popularity as tourist destinations dominate, while smaller or less popular countries rank lower.
                    </p>
                    <p>
                    In terms of gender, most countries show an almost equal number of male and female students, although there is a slight tendency toward more female students in many cases. 
                    Regarding working time, most students in all countries are full-time, though some countries, like Poland, have a significant proportion of part-time students.
                    </p>
                    <p>
                    For education levels, bachelor’s programs are the most popular, followed by master’s and doctoral programs, respectively.
                    Short-cycle programs are less common in most countries, with Turkey being an exception, where the numbers are significant.
                    </p>
                </div>
                <div className='col-8 border_external_right'>
                    <StackedBarChart colors={colorsType} width={window.innerWidth - 0.35 * window.innerWidth}/>
                </div>
            </div>
            <div className='barrier'></div>
            <div className='row white'>
                <div className='col-8 border_right border_external_left'>
                    <StackedAreaChart colors={colorsType}width={window.innerWidth - 0.35 * window.innerWidth} height={window.innerHeight* 4/10}/>
                </div>
                <div className='col-4 border_external_right'>
                    <h2 className="text-primary fw-bold mb-3">Number of students has increased across Europe</h2>
                    <h4 className='text-secondary'>Stacked area chart</h4>
                    <p>
                    The number of students decreased in 2019, but it is likely due to the absence of the United Kingdom after BREXIT. 
                    </p>
                    <p>
                    The numbers both for male and female students have increased at a consistent pace over time before 2019 and again after 2019.
                    </p>
                </div>
            </div>
            <div className='barrier'></div>
            
            <SwitchDiag colorsType={colorsType}/>
            
            <div className='barrier'></div>
            <div className="col-12 Project-header">
                <h2 className="display-4 fw-bold text-primary mb-3">Main visualization - Third-level students in Europe</h2>
                <h3 className="h5 text-secondary mt-3">A detailed view for each European country</h3>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <ChoroplethMap width={window.innerWidth - 0.2 * window.innerWidth} height={window.innerHeight* 3/4} colors={colorsType}/>
                </div>
                <div className="container my-3 white border_external_left border_external_right">
                <h2 className="text-primary fw-bold mb-3">Understanding the data - Tertiary education</h2>
                <p className="text-muted text-start fs-5 px-3">
                Turkey consistently has the highest number of students, nearly doubling since 2013, far surpassing other European countries. Up to 2019, the United Kingdom ranked second, though its numbers remained stable, potentially due to Brexit. Western European countries generally have more students than Eastern European ones, likely due to larger populations and their appeal to international students.</p>
            </div>
            <div className='barrier'></div>
            <div className='barrier'></div>
            </div>
            
            <div className="col-12 Project-header">
                <h2 className="display-4 fw-bold text-primary mb-3">Getting into the details</h2>
                <h3 className="h5 text-secondary mt-3">More specific visualizations</h3>
            </div>
            <div className='row white'>
                <div className='col-3 border_right border_external_left'>
                
                <h2 className="text-primary fw-bold mb-3">The flow of students in higher education</h2>
                <h4 className='text-secondary'>Sankey chart</h4>
                    <p>Turkey has the highest number of students, followed by countries with large populations or those popular with international students, and finally smaller countries. Overall, there are slightly more female students than male students in Europe. The bachelor’s level is the most common education level, followed by master’s, short-cycle, and doctoral levels.
                    </p>
                    <p>Male students are more likely to enroll in short-cycle and bachelor’s programs, while female students tend to favour master’s programs. At the doctoral level, men outnumber women. Across all levels, most students are full-time.
                    </p>
                </div>
                <div className='col-9 border_external_right'>
                    <AlluvialChart colors={colorsType} width={window.innerWidth - 0.3 * window.innerWidth} height={window.innerHeight* 7/10}/>
                </div>
            </div>
            <div className='barrier'></div>
            <div className='row white'>
                <div className='col-9 border_right border_external_left'>
                    <BubbleChart colors={colorsType} width={window.innerWidth - 0.3 * window.innerWidth} height={window.innerHeight* 7/10}/>
                </div>
                <div className='col-3 border_external_right'>
                    <h2 className="text-primary fw-bold mb-3">Female doctoral students in Europe</h2>
                    <h4 className='text-secondary'>Bubble chart</h4>
                    <p>Up until 2019, the United Kingdom, Germany, and Turkey had the highest number of female doctoral students. The number of female doctoral students is generally proportional to the population size of each country.</p>

                </div>
            </div>
            <div className='barrier'></div>
            <div className='row white'>
            <div className='col-3 border_right border_external_left'>
                    <h2 className="text-primary fw-bold mb-3">The ranking of European nations according to the number of female students
                    </h2>
                    <h4 className='text-secondary'>Bar chart</h4>
                    <p>Using the average number of female students per country. Again, we see Turkey as the country with most female students, followed by other European countries in order of population and appeal to students.
                    </p>
                </div>
                <div className='col-9 border_external_right padding_top'>
                    <BarChart colors={colorsType} width={window.innerWidth - 0.33 * window.innerWidth} height={window.innerHeight* 5/8}/>
                </div>
            </div>
        </div>
        
    </div>);
};

export default ProjectHome;
