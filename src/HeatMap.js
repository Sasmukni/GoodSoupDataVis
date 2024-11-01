import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function HeatMap() {
    const svgRef = useRef();
    const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });

    const data = [
        { country: 'USA', category: 'fossil', value: 100 },
        { country: 'USA', category: 'land-use', value: 50 },
        { country: 'China', category: 'fossil', value: 150 },
        { country: 'China', category: 'land-use', value: 70 },
        { country: 'India', category: 'fossil', value: 80 },
        { country: 'India', category: 'land-use', value: 30 },
        // Aggiungi altri paesi e valori qui
    ];

    const countries = Array.from(new Set(data.map(d => d.country)));
    const categories = Array.from(new Set(data.map(d => d.category)));
    const maxValue = Math.max(...data.map(d => d.value));

    const getColor = (value) => {
        const intensity = Math.round((255 * value) / maxValue);
        return `rgba(255, ${255 - intensity}, ${255 - intensity}, 0.8)`; // Sfumature di rosso
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 800;  // Dimensioni ridotte
        const height = 400;  // Dimensioni ridotte
        const margin = { top: 40, right: 30, bottom: 30, left: 30 };
        const cellSize = 30;  // Dimensione delle celle ridotta

        svg.attr('width', width).attr('height', height);

        const heatmapWidth = width - margin.left - margin.right;
        const heatmapHeight = height - margin.top - margin.bottom;

        // Creazione della heatmap
        const heatmapGroup = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Scali per le categorie e i paesi
        const xScale = d3.scaleBand()
            .domain(categories)
            .range([0, heatmapWidth])
            .padding(0);  // Senza padding

        const yScale = d3.scaleBand()
            .domain(countries)
            .range([0, heatmapHeight])
            .padding(0);  // Senza padding

        // Creazione delle celle della heatmap
        heatmapGroup.selectAll('.cell')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('x', d => xScale(d.category)) // Usa la scala per le categorie
            .attr('y', d => yScale(d.country)) // Usa la scala per i paesi
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', d => getColor(d.value))
            .on('mouseover', function (event, d) {
                // Cambiare il colore delle celle
                d3.selectAll('.cell').attr('fill', (cellData) => {
                    return cellData === d ? getColor(cellData.value) : 'lightgray';
                });

                // Mostrare il tooltip
                setTooltip({
                    visible: true,
                    value: `${d.category}: ${d.value}`,
                    x: event.pageX,
                    y: event.pageY
                });
            })
            .on('mouseout', function () {
                // Ripristina il colore originale delle celle
                d3.selectAll('.cell')
                    .attr('fill', d => getColor(d.value));

                // Nascondere il tooltip
                setTooltip({ ...tooltip, visible: false });
            });

        // Creazione delle etichette delle categorie (sopra la heatmap)
        heatmapGroup.append('g').attr('class', 'category-labels')
            .selectAll('.category-label')
            .data(categories)
            .enter()
            .append('text')
            .attr('class', 'category-label')
            .attr('x', (d, i) => xScale(d) + xScale.bandwidth() / 2) // Centrare l'etichetta
            .attr('y', -10) // Spostare sopra la heatmap
            .attr('dy', '.35em')
            .text(d => d)
            .style('text-anchor', 'middle');

        // Creazione delle etichette dei paesi (a sinistra)
        heatmapGroup.append('g').attr('class', 'country-labels')
            .selectAll('.country-label')
            .data(countries)
            .enter()
            .append('text')
            .attr('class', 'country-label')
            .attr('x', -5) // Posizionamento a sinistra
            .attr('y', d => yScale(d) + yScale.bandwidth() / 2) // Centrare verticalmente
            .attr('dy', '.35em')
            .text(d => d)
            .style('text-anchor', 'end');

        // Creazione della legenda
        const legendWidth = 15; // Dimensione della larghezza della legenda
        const legendHeight = height - margin.top - margin.bottom; // Altezza della legenda
        const legend = svg.append('g')
            .attr('transform', `translate(${margin.left + heatmapWidth + 10}, ${margin.top + 20})`); // Spostato vicino alla heatmap

        const legendScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([legendHeight, 0]);

        legend.selectAll('.legend-rect')
            .data(d3.range(0, maxValue + 1, maxValue / 10))
            .enter()
            .append('rect')
            .attr('class', 'legend-rect')
            .attr('x', 0)
            .attr('y', d => legendScale(d))
            .attr('width', legendWidth)
            .attr('height', legendHeight / 10)
            .attr('fill', d => getColor(d));

        legend.selectAll('.legend-text')
            .data(d3.range(0, maxValue + 1, maxValue / 10))
            .enter()
            .append('text')
            .attr('class', 'legend-text')
            .attr('x', legendWidth + 5)
            .attr('y', d => legendScale(d) + legendHeight / 20)
            .text(d => d);

    }, [data, countries, categories, maxValue]);

    return (
        <>
            <svg ref={svgRef} />
            {tooltip.visible && (
                <div style={{
                    position: 'absolute',
                    left: tooltip.x,
                    top: tooltip.y,
                    background: 'white',
                    border: '1px solid black',
                    padding: '5px',
                    pointerEvents: 'none'
                }}>
                    {tooltip.value}
                </div>
            )}
        </>
    );
}

export default HeatMap;
