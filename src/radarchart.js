import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function RadarChart({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        // Dimensions and margins
        const width = 600;
        const height = 600;
        const margin = 50;
        const radius = Math.min(width, height) / 2 - margin;

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const years = Array.from(new Set(data.map(d => d.Year))); // Get unique years

        // Color scale for years
        const colorScale = d3.scaleOrdinal()
            .domain(years)
            .range(d3.schemeCategory10);

        // Scales
        const angleScale = d3.scaleBand()
            .domain(months)
            .range([0, 2 * Math.PI])
            .padding(0.1); // Add padding between the months to avoid overlap

        // Aggregate data by year and month
        const aggregatedData = years.map(year => {
            const yearData = data.filter(d => d.Year === year);
            return {
                year,
                data: months.map((month, i) => {
                    const monthData = yearData.filter(d => d.Month === i + 1); // Match month number
                    return {
                        month,
                        mean: monthData.length > 0 ? d3.mean(monthData, d => d["Average Temperature"]) : 0, // Average temperature per month
                    };
                }),
            };
        });

        // Determine the max mean temperature for proper scaling
        const maxMean = d3.max(aggregatedData, yearData =>
            d3.max(yearData.data, d => d.mean)
        );

        const valueScale = d3.scaleLinear()
            .domain([0, maxMean]) // Set domain for all years
            .range([0, radius]);

        // Clear previous SVG
        const svg = d3.select(svgRef.current)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .style("overflow", "visible");

        svg.selectAll("g").remove(); // Remove previous chart elements

        const g = svg.append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        // Draw gridlines and labels
        const gridLevels = 4; // Reduce the number of grid levels
        const gridLayer = g.append("g");

        Array.from({ length: gridLevels }).forEach((_, i) => {
            const r = (i + 1) * (radius / gridLevels);
            gridLayer.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", r)
                .attr("fill", "none")
                .attr("stroke", "gray")
                .attr("stroke-dasharray", "2,2");

            gridLayer.append("text")
                .attr("x", 5)
                .attr("y", -r - 5)
                .attr("fill", "gray")
                .text(Math.round((r / radius) * maxMean));
        });

        // Draw axes
        const axisLayer = g.append("g");

        months.forEach(month => {
            const angle = angleScale(month);
            const x = radius * Math.sin(angle);
            const y = -radius * Math.cos(angle);

            axisLayer.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", x)
                .attr("y2", y)
                .attr("stroke", "gray");

            axisLayer.append("text")
                .attr("x", x * 1.15) // Add more space here
                .attr("y", y * 1.15)
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .attr("fill", "black")
                .text(month);
        });

        // Draw lines for each year
        aggregatedData.forEach(yearData => {
            const lineGenerator = d3.lineRadial()
                .angle(d => angleScale(d.month))
                .radius(d => valueScale(d.mean));

            g.append("path")
                .datum(yearData.data)
                .attr("fill", "none")
                .attr("stroke", colorScale(yearData.year))
                .attr("stroke-width", 2)
                .attr("d", lineGenerator);
        });

        // Add legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - margin * 2}, ${margin})`);

        years.forEach((year, i) => {
            legend.append("rect")
                .attr("x", 0)
                .attr("y", i * 20)
                .attr("width", 15)
                .attr("height", 15)
                .attr("fill", colorScale(year));

            legend.append("text")
                .attr("x", 20)
                .attr("y", i * 20 + 12)
                .text(year);
        });
    }, [data]);

    return <svg ref={svgRef}></svg>;
}

export default RadarChart;
