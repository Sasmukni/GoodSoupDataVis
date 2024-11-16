import React from 'react';
import '../App.css';
import AlluvialDiagram from '../alluvial';
import Select from "react-select";
import {useState} from "react";

function AlluvialPage() {
    const data2013 = {};
    const data2014 = {}
    const data2015 = {}
    const data2016 = {}
    const data2017 = {}
    const data2018 = {}
    const data2019 = {}
    const data2020 = {}
    const data2022 = {
        nodes: [
            { name: 'Asia', layer: 'continent', value: 80 },
            { name: 'Europe', layer: 'continent', value: 20 },
            // Altri continenti...
            { name: 'China', layer: 'nation', value: 50, continent: 'Asia' },
            { name: 'India', layer: 'nation', value: 30, continent: 'Asia' },
            { name: 'Germany', layer: 'nation', value: 11, continent: 'Europe' },
            { name: 'France', layer: 'nation', value: 9, continent: 'Europe' },
            // Altre nazioni (top 2 per continente)...
            { name: 'fossil', layer: 'category', value: 80 },
            { name: 'land use', layer: 'category', value: 20 }
        ],
        links: [
            { source: 'Asia', target: 'China', value: 50 },
            { source: 'Asia', target: 'India', value: 30 },
            { source: 'Europe', target: 'Germany', value: 11 },
            { source: 'Europe', target: 'France', value: 9 },
            { source: 'China', target: 'fossil', value: 40 },
            { source: 'China', target: 'land use', value: 10 },
            { source: 'India', target: 'fossil', value: 25 },
            { source: 'India', target: 'land use', value: 5 },
            // Altri link per ogni continente e nazione...
        ]
    };   
    const data2021 = {
        nodes: [
            { name: 'Asia', layer: 'continent', value: 50 },
            { name: 'Europe', layer: 'continent', value: 50 },
            // Altri continenti...
            { name: 'China', layer: 'nation', value: 25, continent: 'Asia' },
            { name: 'India', layer: 'nation', value: 25, continent: 'Asia' },
            { name: 'Germany', layer: 'nation', value: 25, continent: 'Europe' },
            { name: 'France', layer: 'nation', value: 25, continent: 'Europe' },
            // Altre nazioni (top 2 per continente)...
            { name: 'fossil', layer: 'category', value: 80 },
            { name: 'land use', layer: 'category', value: 20 }
        ],
        links: [
            { source: 'Asia', target: 'China', value: 25 },
            { source: 'Asia', target: 'India', value: 25 },
            { source: 'Europe', target: 'Germany', value: 25 },
            { source: 'Europe', target: 'France', value: 25 },
            { source: 'China', target: 'fossil', value: 20 },
            { source: 'China', target: 'land use', value: 5 },
            { source: 'India', target: 'fossil', value: 20 },
            { source: 'India', target: 'land use', value: 5 }
            // Altri link per ogni continente e nazione...
        ]
    };   
    const yearOptions = [{label : 2013, value: data2013},
        {label : 2014, value: data2014},
        {label : 2015, value: data2015},
        {label : 2016, value: data2016},
        {label : 2017, value: data2017},
        {label : 2018, value: data2018},
        {label : 2019, value: data2019},
        {label : 2020, value: data2020},
        {label : 2021, value: data2021},
        {label : 2022, value: data2022}
    ];
    const width = window.innerWidth - 0.1 * window.innerWidth;
    const height = window.innerHeight - 0.1 * window.innerHeight;
    const margin = { top: 40, right: window.innerWidth < 1024 ? 0 : 80, bottom: 80, left: 100 };
    const [topSelected, setTopSelected] = useState(data2022);

    return (
        <div className="App">
            <header className="text-center py-4">
                <h1 className="display-4 fw-bold text-primary mb-3">Countries' CO2 Emissions in year 2022</h1>
                <h2 className="h5 text-secondary mt-3">A Stacked Comparison of 2022 emissions divided by categories</h2>
            </header>

            <div className="container my-3">
                <h2 className="text-center mb-4 fw-semibold fs-4">Description</h2>
                <p className="text-muted text-center fs-5 px-3">
                    Compare fossil fuel and land-use CO₂ emissions among the top ten global emitters for 2022.
                </p>
            </div>
            <div className="filters-bar d-flex justify-content-center gap-3">
                <div className={window.innerWidth > 1024?"w-25":"w-50"}>
                    <Select 
                    options={yearOptions}
                    onChange={(d)=> {
                        setTopSelected(d.value);
                    }} 
                    defaultValue={yearOptions.filter(o => o.value === topSelected)}
                    />
                </div>
            </div>
            <AlluvialDiagram 
                width={width}
                height={height}
                data={topSelected} 
                margin={margin}    
            />
        </div>
    );
}

export default AlluvialPage;
