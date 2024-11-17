import React from 'react';
import '../App.css';
import AlluvialDiagram from '../alluvial';
import Select from "react-select";
import {useState} from "react";
//import { link } from 'd3';
import nodes_2013 from '../data/nodes_2013.json'
import links_2013 from '../data/links_2013.json'
import nodes_2014 from '../data/nodes_2014.json'
import links_2014 from '../data/links_2014.json'
import nodes_2015 from '../data/nodes_2015.json'
import links_2015 from '../data/links_2015.json'
import nodes_2016 from '../data/nodes_2016.json'
import links_2016 from '../data/links_2016.json'
import nodes_2017 from '../data/nodes_2017.json'
import links_2017 from '../data/links_2017.json'
import nodes_2018 from '../data/nodes_2018.json'
import links_2018 from '../data/links_2018.json'
import nodes_2019 from '../data/nodes_2019.json'
import links_2019 from '../data/links_2019.json'
import nodes_2020 from '../data/nodes_2020.json'
import links_2020 from '../data/links_2020.json'
import nodes_2021 from '../data/nodes_2021.json'
import links_2021 from '../data/links_2021.json'
import nodes_2022 from '../data/nodes_2022.json'
import links_2022 from '../data/links_2022.json'

function AlluvialPage() {
    const data2013 = {
        nodes: nodes_2013,
        links: links_2013
    }
    const data2014 = {
        nodes: nodes_2014,
        links: links_2014
    }
    const data2015 = {
        nodes: nodes_2015,
        links: links_2015
    }
    const data2016 = {
        nodes: nodes_2016,
        links: links_2016
    }
    const data2017 = {
        nodes: nodes_2017,
        links: links_2017
    }
    const data2018 = {
        nodes: nodes_2018,
        links: links_2018
    }
    const data2019 = {
        nodes: nodes_2019,
        links: links_2019
    }
    const data2020 = {
        nodes: nodes_2020,
        links: links_2020
    }
    const data2021 = {
        nodes: nodes_2021,
        links: links_2021
    }
    const data2022 = {
        nodes: nodes_2022,
        links: links_2022
    }
    /*const data2022 = {
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
    };*/   
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
    const height = window.innerHeight;
    const margin = { top: 40, right: window.innerWidth < 1024 ? 20 : 80, bottom: 400, left: window.innerWidth < 1024 ? 20 : 80 };
    const [topSelected, setTopSelected] = useState(data2022);

    return (
        <div className="App">
            <header className="text-center py-4">
                <h1 className="display-4 fw-bold text-primary mb-3">CO₂ emissions across the globe</h1>
                <h2 className="h5 text-secondary mt-3">Continents' 2013-2022 emissions divided by categories</h2>
            </header>

            <div className="container my-3">
                <h2 className="text-center mb-4 fw-semibold fs-4">Description</h2>
                <p className="text-muted text-center fs-5 px-3">
                    Compare fossil fuel and land-use CO₂ emissions among all continents (in tonnes) across different countries in a decade (2013-2022).
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
