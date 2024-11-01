import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import FossilLandData from '../data/fossil_land_2022_heatmap_1.json';

function HeatMap() {
    const svgRef = useRef();
    const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });

    // Process the data to get the top 10 countries
    const data = FossilLandData;

    // Aggregate and sort the data by country
    const aggregatedData = data.reduce((acc, d) => {
        const existing = acc.find(item => item.country === d.country);
        const value = d.category === 'fossil' ? d.fossil : d.land_use;
        if (existing) {
            existing.value += value;
        } else {
            acc.push({ country: d.country, value });
        }
        return acc;
    }, []);

    // Sort by total emissions, take top 10, then sort alphabetically
    const top10Countries = aggregatedData
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
        .sort((a, b) => a.country.localeCompare(b.country));

    // Map to D3-friendly format
    const formattedData = top10Countries.flatMap(({ country }) => {
        return data.filter(d => d.country === country).map(d => ({
            country: d.country,
            category: d.category,
            value: d.category === 'fossil' ? d.fossil : d.land_use
        }));
    });

    const countries = Array.from(new Set(formattedData.map(d => d.country)));
    const categories = Array.from(new Set(formattedData.map(d => d.category)));
    const maxValue = Math.max(...formattedData.map(d => d.value));

    const getColor = (value) => {
        const intensity = Math.round((255 * value) / maxValue);
        return `rgba(255, ${255 - intensity}, ${255 - intensity}, 0.8)`; // Shades of red
    };

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const width = 800;
        const height = 400;
        const margin = { top: 40, right: 30, bottom: 30, left: 30 };
        const cellSize = 30;

        svg.attr('width', width).attr('height', height);

        const heatmapWidth = width - margin.left - margin.right;
        const heatmapHeight = height - margin.top - margin.bottom;

        const heatmapGroup = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleBand()
            .domain(categories)
            .range([0, heatmapWidth])
            .padding(0);

        const yScale = d3.scaleBand()
            .domain(countries)
            .range([0, heatmapHeight])
            .padding(0);

        heatmapGroup.selectAll('.cell')
            .data(formattedData)
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('x', d => xScale(d.category))
            .attr('y', d => yScale(d.country))
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', d => getColor(d.value))
            .on('mouseover', function (event, d) {
                d3.selectAll('.cell').attr('fill', (cellData) => {
                    return cellData === d ? getColor(cellData.value) : 'lightgray';
                });
                setTooltip({
                    visible: true,
                    value: `${d.category}: ${d.value}`,
                    x: event.pageX,
                    y: event.pageY
                });
            })
            .on('mouseout', function () {
                d3.selectAll('.cell')
                    .attr('fill', d => getColor(d.value));
                setTooltip({ ...tooltip, visible: false });
            });

        heatmapGroup.append('g').attr('class', 'category-labels')
            .selectAll('.category-label')
            .data(categories)
            .enter()
            .append('text')
            .attr('class', 'category-label')
            .attr('x', (d, i) => xScale(d) + xScale.bandwidth() / 2)
            .attr('y', -10)
            .attr('dy', '.35em')
            .text(d => d)
            .style('text-anchor', 'middle');

        heatmapGroup.append('g').attr('class', 'country-labels')
            .selectAll('.country-label')
            .data(countries)
            .enter()
            .append('text')
            .attr('class', 'country-label')
            .attr('x', -5)
            .attr('y', d => yScale(d) + yScale.bandwidth() / 2)
            .attr('dy', '.35em')
            .text(d => d)
            .style('text-anchor', 'end');

        const legendWidth = 15;
        const legendHeight = height - margin.top - margin.bottom;
        const legend = svg.append('g')
            .attr('transform', `translate(${margin.left + heatmapWidth + 10}, ${margin.top + 20})`);

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

    }, [formattedData, countries, categories, maxValue]);

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
