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
   
    const yearOptions = [
        {label : 2013, value: data2013},
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
    const height = window.innerHeight * 1;
    //const margin = { top: 40, right: window.innerWidth < 1024 ? 20 : 80, bottom: 400, left: window.innerWidth < 1024 ? 20 : 80 };
    const [topSelected, setTopSelected] = useState(data2022);

    return (
        <div className="App">
            <header className="text-center py-4">
                <h1 className="display-4 fw-bold text-primary mb-3">Emissions flow</h1>
                <h2 className="h5 text-secondary mt-3">Continents' 2013-2022 CO₂ emissions divided by categories</h2>
            </header>

            <div className="container my-3">
                <h2 className="text-center mb-4 fw-semibold fs-4">Reading the visualization</h2>
                <p className="text-muted text-start fs-5 px-3">
                    This alluvial visualization allows you to compare fossil fuel and land-use CO₂ emissions (in tonnes) of all continents across different countries in a decade (2013-2022).
                </p>
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
            </div>
            <AlluvialDiagram 
                width={width}
                height={height}
                data={topSelected} 
                //margin={margin}    
            />
            <div className="container my-3">
                <h2 className="text-center my-4 fw-semibold fs-4">Understanding the data</h2>
                <p className="text-muted text-start fs-5 px-3">
                 The continent responsible of most of the global CO₂ emissions is Asia, with a percentage of 59.62% in 2022, especially due to China, which represents most of its percentage (34.30% in 2022). Asia is also the greatest contributor in the "others" category.
                 Alongside with China, the United States and India were consistently in the top 3 emitters. Russia, Indonesia and Brazil often appears in the top emitters as well. All these nations in the top 10 nations in terms of population size.
                 Around 80% of the total global CO₂ emissions were fossil over the decade.
                </p>
            </div>
        </div>
    );
}

export default AlluvialPage;
