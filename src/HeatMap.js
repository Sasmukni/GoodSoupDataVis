import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function HeatMap({ data, width = 640, margin = { top: 40, right: 20, bottom: 80, left: 100 } }) {
    const svgRef = useRef();
    const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });

    const formatValue = (value) => {
        return `${(value).toExponential(2)} tonnes`;
    };

    useEffect(() => {
        if (!data || data.length === 0 || !svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const height = 480;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const legendHeight = 12;

        const countries = Array.from(new Set(data.map(d => d.country)));
        const categories = ['fossil', 'land-use', 'total'];

        const fossilValues = data.map(d => d.fossil);
        const landUseValues = data.map(d => d.land_use);
        const totalValues = data.map(d => d.fossil + d.land_use);

        const maxFossil = Math.max(...fossilValues);
        const maxLandUse = Math.max(...landUseValues);
        const maxTotal = Math.max(...totalValues);
        const minFossil = Math.min(...fossilValues);
        const minLandUse = Math.min(...landUseValues);
        const minTotal = Math.min(...totalValues);
        const min = Math.min(...fossilValues, ...landUseValues, ...totalValues);

        const percGreenFossil = (-min / (maxFossil - min)) * 100;
        const percGreenLandUse = (-min / (maxLandUse - min)) * 100;
        const percGreenTotal = (-min / (maxTotal - min)) * 100;

        const fossilColorScale = d3.scaleLinear()
            .domain([min, 0, maxFossil])
            .range(['#008800', '#FFFFFF', '#880000']);

        const landUseColorScale = d3.scaleLinear()
            .domain([min, 0, maxLandUse])
            .range(['#008800', '#FFFFFF', '#000088']);

        const totalColorScale = d3.scaleLinear()
            .domain([min, 0, maxTotal])
            .range(['#800080', '#FFFFFF', '#ff00ff']);

        svg.attr('width', width).attr('height', height);

        const heatmapGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleBand().domain(categories).range([0, innerWidth]).padding(0);
        const yScale = d3.scaleBand().domain(countries).range([0, innerHeight]).padding(0);

        const cells = heatmapGroup.selectAll('.cell')
            .data(data.flatMap(({ country, fossil, land_use }) => [
                { country, category: 'fossil', value: fossil },
                { country, category: 'land-use', value: land_use },
                { country, category: 'total', value: fossil + land_use }
            ]))
            .enter()
            .append('rect')
            .attr('class', 'cell')
            .attr('x', d => xScale(d.category))
            .attr('y', d => yScale(d.country))
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', d => {
                if (d.category === 'fossil') return fossilColorScale(d.value);
                if (d.category === 'land-use') return landUseColorScale(d.value);
                return totalColorScale(d.value);
            })
            .style('opacity', 1)
            .on('mouseover', function (event, d) {
                cells.style('opacity', 0.3);

                d3.select(this)
                    .style('stroke', 'black')
                    .style('stroke-width', '2px')
                    .attr('width', xScale.bandwidth() + 3)
                    .attr('height', yScale.bandwidth() + 3)
                    .attr('x', xScale(d.category) - 3)
                    .attr('y', yScale(d.country) - 3)
                    .style('opacity', 1)
                    .raise();

                setTooltip({ visible: true, value: `${d.category}: ${formatValue(d.value)}`, x: event.pageX, y: event.pageY });
            })
            .on('mouseout', function (event, d) {
                const originalWidth = xScale.bandwidth();
                const originalHeight = yScale.bandwidth();

                cells.style('opacity', 1);

                d3.select(this)
                    .style('stroke', 'none')
                    .attr('width', originalWidth)
                    .attr('height', originalHeight)
                    .attr('x', xScale(d.category))
                    .attr('y', yScale(d.country));

                setTooltip({ ...tooltip, visible: false });
            });

        heatmapGroup.append('g').attr('class', 'category-labels')
            .selectAll('.category-label')
            .data(categories)
            .enter()
            .append('text')
            .attr('class', 'category-label')
            .attr('x', d => xScale(d) + xScale.bandwidth() / 2)
            .attr('y', -15)
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
            .attr('y', +15) 
            .text('Fossil')
            .style('font-size', '12px')
            .style('font-weight', 'bold');

        fossilLegend.append('rect')
            .attr('x', 0)
            .attr('y', 20) 
            .attr('width', innerWidth / 3)
            .attr('height', legendHeight)
            .style('fill', 'url(#fossilGradient)');

        fossilLegend.append('text')
            .attr('x', 2)
            .attr('y', legendHeight + 32)
            .text(minFossil.toExponential(2) + "t")
            .style('font-size', '10px')
            .style('text-anchor', 'start');

        fossilLegend.append('text')
            .attr('x', (innerWidth / 3) - 2)
            .attr('y', legendHeight + 32)
            .text(maxFossil.toExponential(2) + "t")
            .style('font-size', '10px')
            .style('text-anchor', 'end');

        const landUseLegend = legendGroup.append('g')
            .attr('class', 'legend land-use-legend')
            .attr('transform', `translate(${innerWidth / 3}, 0)`);

        landUseLegend.append('text')
            .attr('x', 0)
            .attr('y', +15)
            .text('Land Use')
            .style('font-size', '12px')
            .style('font-weight', 'bold');

        landUseLegend.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', innerWidth / 3)
            .attr('height', legendHeight)
            .style('fill', 'url(#landUseGradient)');
        
        landUseLegend.append('text')
            .attr('x', 2)
            .attr('y', legendHeight + 32)
            .text(minLandUse.toExponential(2) + "t")
            .style('font-size', '10px')
            .style('text-anchor', 'start');

        landUseLegend.append('text')
            .attr('x', (innerWidth / 3) - 2)
            .attr('y', legendHeight + 32)
            .text(maxLandUse.toExponential(2) + "t")
            .style('font-size', '10px')
            .style('text-anchor', 'end');

        const totalLegend = legendGroup.append('g')
            .attr('class', 'legend total-legend')
            .attr('transform', `translate(${2 * (innerWidth / 3)}, 0)`);

        totalLegend.append('text')
            .attr('x', 0)
            .attr('y', +15) 
            .text('Total')
            .style('font-size', '12px')
            .style('font-weight', 'bold');

        totalLegend.append('rect')
            .attr('x', 0)
            .attr('y', 20)
            .attr('width', innerWidth / 3)
            .attr('height', legendHeight)
            .style('fill', 'url(#totalGradient)');
        
        totalLegend.append('text')
            .attr('x', 2)
            .attr('y', legendHeight + 32)
            .text(minTotal.toExponential(2) + "t")
            .style('font-size', '10px')
            .style('text-anchor', 'start');

        totalLegend.append('text')
            .attr('x', (innerWidth / 3) - 2)
            .attr('y', legendHeight + 32)
            .text(maxTotal.toExponential(2) + "t")
            .style('font-size', '10px')
            .style('text-anchor', 'end');

        const fossilGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'fossilGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        fossilGradient.selectAll('stop')
            .data([{
                offset: '0%', color: '#008800'
            }, {
                offset: `${percGreenFossil}%`, color: '#FFFFFF'
            }, {
                offset: '100%', color: '#880000'
            }])
            .enter().append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color);

        const landUseGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'landUseGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        landUseGradient.selectAll('stop')
            .data([{
                offset: '0%', color: '#008800'
            }, {
                offset: `${percGreenLandUse}%`, color: '#FFFFFF'
            }, {
                offset: '100%', color: '#000088'
            }])
            .enter().append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color);

        const totalGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'totalGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '100%')
            .attr('y2', '0%');

        totalGradient.selectAll('stop')
            .data([{
                offset: '0%', color: '#800080'
            }, {
                offset: `${percGreenTotal}%`, color: '#FFFFFF'
            }, {
                offset: '100%', color: '#ff00ff'
            }])
            .enter().append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color);

    }, [data]);

    return (
        <div>
            <svg ref={svgRef}></svg>
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
