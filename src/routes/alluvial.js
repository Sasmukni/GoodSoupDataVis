import React from 'react';
import '../App.css';
import AlluvialDiagram from '../alluvial';

function AlluvialPage() {
    const data = {
        nodes: [
            { name: 'Asia', layer: 'continent', value: 100 },
            { name: 'Europe', layer: 'continent', value: 60 },
            // Altri continenti...
            { name: 'China', layer: 'nation', value: 70, continent: 'Asia' },
            { name: 'India', layer: 'nation', value: 30, continent: 'Asia' },
            // Altre nazioni (top 2 per continente)...
            { name: 'fossil', layer: 'category', value: 80 },
            { name: 'land use', layer: 'category', value: 20 }
        ],
        links: [
            { source: 'Asia', target: 'China', value: 70 },
            { source: 'Asia', target: 'India', value: 30 },
            { source: 'China', target: 'fossil', value: 80 },
            { source: 'China', target: 'land use', value: 20 },
            // Altri link per ogni continente e nazione...
        ]
    };   

    const width = window.innerWidth - 0.1 * window.innerWidth;
    const height = window.innerHeight - 0.1 * window.innerHeight;
    const margin = { top: 40, right: window.innerWidth < 1024 ? 0 : 80, bottom: 80, left: 100 };

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

            <AlluvialDiagram 
                width={width}
                height={height}
                data={data} 
                margin={margin}    
            />
        </div>
    );
}

export default AlluvialPage;
