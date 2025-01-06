import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function LineChart({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const legendMargin = 50;

        const parsedData = data.map(d => ({
            year: d.Year,
            month: d.Month,
            min: d["Minimum Temperature"],
            max: d["Maximum Temperature"],
            mean: d["Average Temperature"],
        }));

        const years = Array.from(new Set(parsedData.map(d => d.year)));
        const colorScale = d3.scaleSequential([0, years.length - 1], d3.interpolateTurbo);

        const xScale = d3.scalePoint()
            .domain(d3.range(1, 13))
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([
                d3.min(parsedData, d => d.min),
                d3.max(parsedData, d => d.max),
            ])
            .nice()
            .range([height - margin.bottom, margin.top + legendMargin]);

        const svg = d3.select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .style("overflow", "visible");

        svg.selectAll("g").remove();

        const tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("visibility", "hidden")
            .style("background", "#fff")
            .style("border", "1px solid #ccc")
            .style("padding", "5px")
            .style("border-radius", "4px")
            .style("font-size", "12px");

        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).tickFormat(d => d3.timeFormat("%b")(new Date(2000, d - 1, 1))));

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale));

        years.forEach((year, index) => {
            const yearData = parsedData.filter(d => d.year === year);

            const lineGenerator = d3.line()
                .x(d => xScale(d.month))
                .y(d => yScale(d.min));

            const minLine = svg.append("path")
                .datum(yearData)
                .attr("fill", "none")
                .attr("stroke", d3.color(colorScale(index)).brighter(-1))
                .attr("stroke-width", 1.5)
                .attr("d", lineGenerator)
                .on("mousemove", (event, d) => {
                    tooltip.style("visibility", "visible")
                        .html(`Year: ${year}<br>Minimum temperature`)
                        .style("top", `${event.pageY - 10}px`)
                        .style("left", `${event.pageX + 10}px`);
                })
                .on("mouseout", () => {
                    tooltip.style("visibility", "hidden");
                    resetOpacity(); 
                })
                .on("mouseover", () => {
                    svg.selectAll("path").attr("opacity", 0.2);
                    svg.selectAll("circle").attr("opacity", 0.2);
                    minLine.attr("opacity", 1);
                    svg.selectAll(`circle-${year}`).attr("opacity", 1);
                });

            lineGenerator.y(d => yScale(d.max));
            const maxLine = svg.append("path")
                .datum(yearData)
                .attr("fill", "none")
                .attr("stroke", d3.color(colorScale(index)).brighter(1))
                .attr("stroke-width", 1.5)
                .attr("d", lineGenerator)
                .on("mousemove", (event, d) => {
                    tooltip.style("visibility", "visible")
                        .html(`Year: ${year}<br>Maximum temperature`)
                        .style("top", `${event.pageY - 10}px`)
                        .style("left", `${event.pageX + 10}px`);
                })
                .on("mouseout", () => {
                    tooltip.style("visibility", "hidden");
                    resetOpacity(); 
                })
                .on("mouseover", () => {
                    svg.selectAll("path").attr("opacity", 0.2);
                    svg.selectAll("circle").attr("opacity", 0.2);
                    maxLine.attr("opacity", 1);
                    svg.selectAll(`circle-${year}`).attr("opacity", 1);
                });

            svg.selectAll(`circle-${year}`)
                .data(yearData)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d.month))
                .attr("cy", d => yScale(d.mean))
                .attr("r", 4)
                .attr("fill", colorScale(index))
                .on("mousemove", (event, d) => {
                    tooltip.style("visibility", "visible")
                        .html(`Year: ${year}<br>Average temperature`)
                        .style("top", `${event.pageY - 10}px`)
                        .style("left", `${event.pageX + 10}px`);
                })
                .on("mouseout", () => {
                    tooltip.style("visibility", "hidden");
                    resetOpacity();  
                })
                .on("mouseover", (event, d) => {
                    svg.selectAll("path").attr("opacity", 0.2);
                    svg.selectAll("circle").attr("opacity", 0.2);
                    minLine.attr("opacity", 1);
                    maxLine.attr("opacity", 1); 
                    d3.select(event.target).attr("opacity", 1);
                });

            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width / 2)
                .attr("y", height - 10)
                .text("Months");

            svg.append("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("y", 20)
                .attr("x", -height / 3)
                .text("Fahrenheit degrees °F");
        });

        const legendWidth = 300;
        const legendHeight = 20;
        const legend = svg.append("g")
            .attr("transform", `translate(${width / 3}, ${margin.top})`);

        years.sort().forEach((year, index) => {
            const rectWidth = legendWidth / years.length;
            legend.append("rect")
                .attr("x", rectWidth * index)
                .attr("y", 0)
                .attr("width", rectWidth)
                .attr("height", legendHeight)
                .attr("fill", colorScale(index));

            if (index === 0 || index === years.length - 1) {
                legend.append("text")
                    .attr("x", rectWidth * index + rectWidth / 2)
                    .attr("y", legendHeight + 12)
                    .attr("text-anchor", "middle")
                    .attr("fill", "black")
                    .text(year);
            }
        });

        function resetOpacity() {
            svg.selectAll("path").attr("opacity", 1);
            svg.selectAll("circle").attr("opacity", 1);
        }

    }, [data]);

    return <svg ref={svgRef}></svg>;
}

export default LineChart;
