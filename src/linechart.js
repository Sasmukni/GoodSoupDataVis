import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineChart ({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        // Dimensions and margins
        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 50, left: 50 };

        // Parse data and group by year
        const years = Array.from(new Set(data.map(d => d.year)));
        const colorScale = d3.scaleOrdinal()
            .domain(years)
            .range(d3.schemeCategory10);

        const xScale = d3.scalePoint()
            .domain(data.map(d => d.month))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.min), d3.max(data, d => d.max)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        // Select and clear SVG
        const svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .style("overflow", "visible");

        svg.selectAll("g").remove();

        // Draw Axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        // Plot lines and scatter points
        years.forEach(year => {
            const yearData = data.filter(d => d.year === year);

            const lineGenerator = d3.line()
                .x(d => xScale(d.month))
                .y(d => yScale(d.min));

            svg.append("path")
                .datum(yearData)
                .attr("fill", "none")
                .attr("stroke", colorScale(year))
                .attr("stroke-width", 1.5)
                .attr("d", lineGenerator);

            lineGenerator.y(d => yScale(d.max));
            svg.append("path")
                .datum(yearData)
                .attr("fill", "none")
                .attr("stroke", d3.color(colorScale(year)).brighter(1))
                .attr("stroke-width", 1.5)
                .attr("d", lineGenerator);

            svg.selectAll(`circle-${year}`)
                .data(yearData)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d.month))
                .attr("cy", d => yScale(d.mean))
                .attr("r", 4)
                .attr("fill", colorScale(year));
        });
    }, [data]);

    return <svg ref={svgRef}></svg>;
};

export default LineChart;
