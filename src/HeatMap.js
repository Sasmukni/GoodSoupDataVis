import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function HeatMap({ data }) {
    const svgRef = useRef();
    const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });

    useEffect(() => {
        if (!data || data.length === 0 || !svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const width = 640;
        const height = 400; 
        const margin = { top: 40, right: 60, bottom: 40, left: 40 }; // Adjust right margin for the legend

        const countries = Array.from(new Set(data.map(d => d.country)));
        const categories = ['fossil', 'land-use'];

        const values = data.flatMap(({ fossil, land_use }) => [fossil, land_use]);
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);

        const colorScale = d3.scaleSequential(d3.interpolateReds)
            .domain([minValue, maxValue]);

        svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);

        const heatmapGroup = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleBand()
            .domain(categories)
            .range([0, width - margin.left - margin.right - 50])
            .padding(0);

        const yScale = d3.scaleBand()
            .domain(countries)
            .range([0, height - margin.top - margin.bottom])
            .padding(0);

        heatmapGroup.selectAll('.cell')
            .data(data.flatMap(({ country, fossil, land_use }) => [
                { country, category: 'fossil', value: fossil },
                { country, category: 'land-use', value: land_use },
            ]))
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('x', d => xScale(d.category))
            .attr('y', d => yScale(d.country))
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', d => colorScale(d.value))
            .on('mouseover', function (event, d) {
                d3.selectAll('.cell').attr('fill', cellData => cellData === d ? colorScale(cellData.value) : 'lightgray');
                setTooltip({ visible: true, value: `${d.category}: ${d.value}`, x: event.pageX, y: event.pageY });
            })
            .on('mouseout', function () {
                d3.selectAll('.cell').attr('fill', d => colorScale(d.value));
                setTooltip({ ...tooltip, visible: false });
            });

        heatmapGroup.append('g').attr('class', 'category-labels')
            .selectAll('.category-label')
            .data(categories)
            .enter()
            .append('text')
            .attr('class', 'category-label')
            .attr('x', d => xScale(d) + xScale.bandwidth() / 2)
            .attr('y', -10)
            .text(d => d)
            .style('text-anchor', 'middle');

        heatmapGroup.append('g').attr('class', 'country-labels')
            .selectAll('.country-label')
            .data(countries)
            .enter()
            .append('text')
            .attr('class', 'country-label')
            .attr('x', -10)
            .attr('y', d => yScale(d) + yScale.bandwidth() / 2)
            .text(d => d)
            .style('text-anchor', 'end');

        const legendHeight = height - margin.top - margin.bottom; // Use the height of the heatmap for the legend
        const legendWidth = 20; // Fixed width for the legend

        const legendGroup = svg.append('g')
            .attr('transform', `translate(${width - margin.right + 10}, ${margin.top})`); // Position legend to the right and center vertically

        const legendScale = d3.scaleLinear()
            .domain([minValue, maxValue])
            .range([legendHeight, 0]); // Invert the range for vertical gradient

        const legendAxis = d3.axisRight(legendScale)
            .ticks(5)
            .tickFormat(d3.format('.0f'));

        legendGroup.append('g')
            .attr('class', 'legend')
            .attr('transform', 'translate(0, 0)')
            .call(legendAxis);

        // Create gradient for legend
        const gradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%') // Set for vertical gradient
            .attr('y2', '100%');

        gradient.selectAll('stop')
            .data([
                { offset: '0%', color: colorScale(maxValue) },
                { offset: '100%', color: colorScale(minValue) },
            ])
            .enter()
            .append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color);

        legendGroup.append('rect')
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'url(#gradient)');

    }, [data]);

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
