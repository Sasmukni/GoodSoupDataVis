import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function HeatMap({ data, width = 640 }) {
    const svgRef = useRef();
    const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });

    useEffect(() => {
        if (!data || data.length === 0 || !svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const height = 400;
        const margin = { top: 40, right: 80, bottom: 80, left: 100 };

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const legendHeight =12;

        const countries = Array.from(new Set(data.map(d => d.country)));
        const categories = ['fossil', 'land-use'];

        const fossilValues = data.map(d => d.fossil);
        const landUseValues = data.map(d => d.land_use);
        const maxValue = Math.max(...fossilValues, ...landUseValues);
        const minValue = Math.min(...fossilValues, ...landUseValues);

        const fossilColorScale = d3.scaleSequential(d3.interpolateReds).domain([minValue, maxValue]);
        const landUseColorScale = d3.scaleSequential(d3.interpolateBlues).domain([minValue, maxValue]);

        svg.attr('width', width).attr('height', height);

        const heatmapGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleBand().domain(categories).range([0, innerWidth - 80]).padding(0);
        const yScale = d3.scaleBand().domain(countries).range([0, innerHeight]).padding(0);

        const cells = heatmapGroup.selectAll('.cell')
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
            .attr('fill', d => d.category === 'fossil' ? fossilColorScale(d.value) : landUseColorScale(d.value))
            .style('opacity', 1) 
            .on('mouseover', function (event, d) {
                const originalWidth = xScale.bandwidth();
                const originalHeight = yScale.bandwidth();
                const enlargedWidth = originalWidth * 1.1;
                const enlargedHeight = originalHeight * 1.1;

                cells.style('opacity', 0.3);

                d3.select(this)
                    .style('stroke', 'black')
                    .style('stroke-width', '2px')
                    .attr('width', enlargedWidth)
                    .attr('height', enlargedHeight)
                    .style('opacity', 1)
                    .raise();

                setTooltip({ visible: true, value: `${d.category}: ${d.value}`, x: event.pageX, y: event.pageY });
            })
            .on('mouseout', function () {
                const originalWidth = xScale.bandwidth();
                const originalHeight = yScale.bandwidth();

                cells.style('opacity', 1);

                d3.select(this)
                    .style('stroke', 'none')
                    .attr('width', originalWidth)
                    .attr('height', originalHeight);

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
            .style('text-anchor', 'middle')
            .style('font-size', '10px');

        heatmapGroup.append('g').attr('class', 'country-labels')
            .selectAll('.country-label')
            .data(countries)
            .enter()
            .append('text')
            .attr('class', 'country-label')
            .attr('x', -10)
            .attr('y', d => yScale(d) + yScale.bandwidth() / 2)
            .text(d => d)
            .style('text-anchor', 'end')
            .style('font-size', '10px');

        const legendGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top + innerHeight + 20})`);

        const fossilLegend = legendGroup.append('g')
            .attr('class', 'legend fossil-legend')
            .attr('transform', 'translate(0, 0)');

        fossilLegend.append('text')
            .attr('x', 0)
            .attr('y', +3)
            .text('Fossil')
            .style('font-size', '12px')
            .style('font-weight', 'bold');

        fossilLegend.append('rect')
            .attr('x', 0)
            .attr('y', 10)
            .attr('width', innerWidth -80)
            .attr('height', legendHeight)
            .style('fill', 'url(#fossilGradient)');

        const fossilGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'fossilGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        fossilGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', fossilColorScale(minValue))
            .attr('stop-opacity', 1);

        fossilGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', fossilColorScale(maxValue))
            .attr('stop-opacity', 1);

        const landUseLegend = legendGroup.append('g')
            .attr('class', 'legend land-use-legend')
            .attr('transform', `translate(0, ${legendHeight + 20})`);

        landUseLegend.append('text')
            .attr('x', 0)
            .attr('y', +5)
            .text('Land Use')
            .style('font-size', '12px')
            .style('font-weight', 'bold');

        landUseLegend.append('rect')
            .attr('x', 0)
            .attr('y', 10)
            .attr('width', innerWidth - 80)
            .attr('height', legendHeight)
            .style('fill', 'url(#landUseGradient)');

        const landUseGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'landUseGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        landUseGradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', landUseColorScale(minValue))
            .attr('stop-opacity', 1);

        landUseGradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', landUseColorScale(maxValue))
            .attr('stop-opacity', 1);

    }, [data]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <svg ref={svgRef} />
            {tooltip.visible && (
                <div
                    style={{
                        position: 'absolute',
                        left: tooltip.x,
                        top: tooltip.y,
                        background: 'white',
                        padding: '5px',
                        border: '1px solid black',
                        pointerEvents: 'none'
                    }}>
                    {tooltip.value}
                </div>
            )}
        </div>
    );
}

export default HeatMap;
