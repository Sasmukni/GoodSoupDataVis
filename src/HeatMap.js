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
        const margin = { top: 40, right: 260, bottom: 40, left: 80 };

        const countries = Array.from(new Set(data.map(d => d.country)));
        const categories = ['fossil', 'land-use'];

        const fossilValues = data.map(d => d.fossil);
        const landUseValues = data.map(d => d.land_use);
        const maxValue = Math.max(...fossilValues, ...landUseValues);
        const minValue = Math.min(...fossilValues, ...landUseValues);

        const fossilColorScale = d3.scaleSequential(d3.interpolateReds).domain([minValue, maxValue]);
        const landUseColorScale = d3.scaleSequential(d3.interpolateBlues).domain([minValue, maxValue]);

        svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);

        const heatmapGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleBand().domain(categories).range([0, width - margin.left - margin.right - 100]).padding(0);
        const yScale = d3.scaleBand().domain(countries).range([0, height - margin.top - margin.bottom]).padding(0);

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
                cells.attr('fill', '#ccc');
                d3.select(this).attr('fill', d.category === 'fossil' ? fossilColorScale(d.value) : landUseColorScale(d.value));
                setTooltip({ visible: true, value: `${d.category}: ${d.value}`, x: event.pageX, y: event.pageY });
            })
            .on('mouseout', function () {
                cells.attr('fill', d => d.category === 'fossil' ? fossilColorScale(d.value) : landUseColorScale(d.value));
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
            .style('font-size', '10px')
            .style('text-overflow', 'ellipsis')
            .style('white-space', 'nowrap');

        const legendHeight = 150;
        const legendWidth = 20;
        const legendSpacing = 20;

        const fossilLegendGroup = svg.append('g')
            .attr('transform', `translate(${width - margin.right + legendSpacing}, ${margin.top})`);

        const fossilLegendScale = d3.scaleLog().domain([minValue, maxValue]).range([legendHeight, 0]);
        const fossilLegendAxis = d3.axisRight(fossilLegendScale).ticks(5).tickFormat(d3.format('.1e'));

        fossilLegendGroup.append('g')
            .attr('class', 'legend')
            .call(fossilLegendAxis)
            .selectAll("text")
            .style("font-size", "12px")
            .style("font-weight", "bold");

        const fossilGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'fossilGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');

        fossilGradient.selectAll('stop')
            .data([
                { offset: '0%', color: fossilColorScale(maxValue) },
                { offset: '100%', color: fossilColorScale(minValue) },
            ])
            .enter()
            .append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color);

        fossilLegendGroup.append('rect')
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'url(#fossilGradient)');

        fossilLegendGroup.append('text')
            .attr('x', legendWidth / 2)
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text('Fossil');

        // const fossilLegendTicks = fossilLegendScale.ticks(5);
        // fossilLegendGroup.selectAll('.fossil-tick')
        //     .data(fossilLegendTicks)
        //     .enter()
        //     .append('text')
        //     .attr('class', 'fossil-tick')
        //     .attr('x', legendWidth + 5)
        //     .attr('y', d => fossilLegendScale(d))
        //     .attr('dy', '0.35em')
        //     .text(d3.format('.1e'))
        //     .style('font-size', '12px')
        //     .style('font-weight', 'bold');

        const landUseLegendGroup = svg.append('g')
            .attr('transform', `translate(${width - margin.right + legendSpacing}, ${margin.top + legendHeight + 60})`);

        const landUseLegendScale = d3.scaleLog().domain([minValue, maxValue]).range([legendHeight, 0]);
        const landUseLegendAxis = d3.axisRight(landUseLegendScale).ticks(5).tickFormat(d3.format('.1e'));

        landUseLegendGroup.append('g')
            .attr('class', 'legend')
            .call(landUseLegendAxis)
            .selectAll("text")
            .style("font-size", "12px")
            .style("font-weight", "bold");

        const landUseGradient = svg.append('defs')
            .append('linearGradient')
            .attr('id', 'landUseGradient')
            .attr('x1', '0%')
            .attr('y1', '0%')
            .attr('x2', '0%')
            .attr('y2', '100%');

        landUseGradient.selectAll('stop')
            .data([
                { offset: '0%', color: landUseColorScale(maxValue) },
                { offset: '100%', color: landUseColorScale(minValue) },
            ])
            .enter()
            .append('stop')
            .attr('offset', d => d.offset)
            .attr('stop-color', d => d.color);

        landUseLegendGroup.append('rect')
            .attr('width', legendWidth)
            .attr('height', legendHeight)
            .style('fill', 'url(#landUseGradient)');

        landUseLegendGroup.append('text')
            .attr('x', legendWidth / 2)
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style('font-size', '12px')
            .style('font-weight', 'bold')
            .text('Land-Use');

        // const landUseLegendTicks = landUseLegendScale.ticks(5);
        // landUseLegendGroup.selectAll('.land-use-tick')
        //     .data(landUseLegendTicks)
        //     .enter()
        //     .append('text')
        //     .attr('class', 'land-use-tick')
        //     .attr('x', legendWidth + 5)
        //     .attr('y', d => landUseLegendScale(d))
        //     .attr('dy', '0.35em')
        //     .text(d3.format('.1e'))
        //     .style('font-size', '12px')
        //     .style('font-weight', 'bold');

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
