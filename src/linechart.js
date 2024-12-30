import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineChart({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        // Dimensions and margins
        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const legendMargin = 50;
        // Parse data
        const parsedData = data.map(d => ({
            year: d.Year,
            month: d.Month, // Mese numerico
            min: d["Minimum Temperature"],
            max: d["Maximum Temperature"],
            mean: d["Average Temperature"],
        }));

        // Group by year
        const years = Array.from(new Set(parsedData.map(d => d.year)));
        /*const colorScale = d3.scaleOrdinal()
            .domain(years)
            .range(d3.schemeCategory10);*/
        const colorScale = d3.scaleSequential([0, years.length - 1], d3.interpolateTurbo);

        const xScale = d3.scalePoint()
            .domain(d3.range(1, 13)) // Mesi da 1 a 12
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([
                d3.min(parsedData, d => d.min),
                d3.max(parsedData, d => d.max),
            ])
            .nice()
            .range([height - margin.bottom, margin.top + legendMargin]);

        // Select and clear SVG
        const svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .style("overflow", "visible");

        svg.selectAll("g").remove();

        // Draw Axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d => d3.timeFormat("%b")(new Date(2000, d - 1, 1))));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        // Plot lines and scatter points
        years.forEach((year, index) => {
            const yearData = parsedData.filter(d => d.year === year);

            const lineGenerator = d3.line()
                .x(d => xScale(d.month))
                .y(d => yScale(d.min));

            svg.append("path")
                .datum(yearData)
                .attr("fill", "none")
                .attr("stroke", d3.color(colorScale(index)).brighter(-1))
                .attr("stroke-width", 1.5)
                .attr("d", lineGenerator);

            lineGenerator.y(d => yScale(d.max));
            svg.append("path")
                .datum(yearData)
                .attr("fill", "none")
                .attr("stroke", d3.color(colorScale(index)).brighter(1))
                .attr("stroke-width", 1.5)
                .attr("d", lineGenerator);

            svg.selectAll(`circle-${year}`)
                .data(yearData)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d.month))
                .attr("cy", d => yScale(d.mean))
                .attr("r", 4)
                .attr("fill", colorScale(index));
            
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width/2)
                .attr("y", height - 10)
                .text("Months");
            
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("y", 20)
                .attr("x", -height/3)
                .text("Fahrenheit degrees °F")
        });

        // Add the legend below the radar chart
        const legendWidth = 300;
        const legendHeight = 20;
        const legend = svg.append("g")
            .attr("transform", `translate(${width/3}, ${margin.top})`);

        // Add color rectangles for each year
        years.sort().forEach((year, index) => {
            const rectWidth = legendWidth / years.length;
            legend.append("rect")
                .attr("x", rectWidth * index)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", legendHeight)
                .attr("fill", colorScale(index));

            // Add text for extremes
            if(index === 0 || index === years.length-1){
                legend.append("text")
                    .attr("x", rectWidth * index + rectWidth / 2)
                    .attr("y", legendHeight + 12)
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text(year);
            }
        });
    }, [data]);

    return <svg ref={svgRef}></svg>;
}

export default LineChart;
