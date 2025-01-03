import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function RidgelineChart({ data }) {
  const svgRef = useRef();
  const [chartWidth, setChartWidth] = useState(800);  // Initial width
  const [chartHeight, setChartHeight] = useState(600); // Initial height

  useEffect(() => {
    // Handle resize for responsiveness
    const handleResize = () => {
      const containerWidth = svgRef.current?.parentNode?.offsetWidth || 800;
      const containerHeight = 5600; // Adjust the height as necessary
      setChartWidth(containerWidth);
      setChartHeight(containerHeight);
    };

    // Set up resize listener
    window.addEventListener('resize', handleResize);
    handleResize(); // Call it once to initialize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };

    // Adjust SVG size dynamically
    svg.attr('width', chartWidth).attr('height', chartHeight);

    const chartWidthAdjusted = chartWidth - margin.left - margin.right;
    const chartHeightPerYear = 100; // Height of each ridgeline

    // Extract unique years
    const years = Array.from(new Set(data.map(d => d.Year)));

    // Organize data by year
    const groupedData = years.map(year => {
      return {
        year,
        maxValues: data.filter(d => d.Year === year).map(d => d["Maximum Temperature"]),
        minValues: data.filter(d => d.Year === year).map(d => d["Minimum Temperature"]),
      };
    });

    // Scale setup
    const x = d3
      .scaleLinear()
      .domain([
        d3.min(groupedData, d => d3.min(d.minValues)) - 20,
        d3.max(groupedData, d => d3.max(d.maxValues)) + 20
      ])
      .range([0, chartWidthAdjusted]);

    const kde = (kernel, thresholds, data) =>
      thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);

    const kernelEpanechnikov = k => v =>
      Math.abs(v /= k) <= 1 ? (0.75 * (1 - v * v)) / k : 0;

    const maxDensity = groupedData.map(yearData => {
      const thresholds = x.ticks(40);
      return kde(kernelEpanechnikov(17), thresholds, yearData.maxValues).map(
        ([xVal, densityVal]) => ({ x: xVal, density: densityVal })
      );
    });

    const minDensity = groupedData.map(yearData => {
      const thresholds = x.ticks(40);
      return kde(kernelEpanechnikov(17), thresholds, yearData.minValues).map(
        ([xVal, densityVal]) => ({ x: xVal, density: densityVal })
      );
    });

    // Clear previous content
    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    groupedData.forEach((yearData, i) => {
      const yDensity = d3
        .scaleLinear()
        .domain([0, Math.max(d3.max(maxDensity[i], d => d.density), d3.max(minDensity[i], d => d.density))])
        .range([chartHeightPerYear, 0]);

      const group = g.append('g').attr('transform', `translate(0, ${i * (chartHeightPerYear + margin.top)})`);

      // Draw ridgelines
      group
        .append('path')
        .datum(maxDensity[i])
        .attr('fill', 'crimson')
        .attr('opacity', 0.7)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('d',
          d3
            .line()
            .curve(d3.curveBasis)
            .x(d => x(d.x))
            .y(d => yDensity(d.density))
        );

      group
        .append('path')
        .datum(minDensity[i])
        .attr('fill', 'steelblue')
        .attr('opacity', 0.7)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('d',
          d3
            .line()
            .curve(d3.curveBasis)
            .x(d => x(d.x))
            .y(d => yDensity(d.density))
        );

      // Add x-axis
      group
        .append('g')
        .attr('transform', `translate(0, ${chartHeightPerYear})`) // Position x-axis at the bottom of each ridgeline
        .call(d3.axisBottom(x));

      // Add year label
      group
        .append('text')
        .attr('x', 0)
        .attr('y', chartHeightPerYear + 30)
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text(yearData.year);
    });

    // Add the main x-axis label
    svg.append('text')
      .attr('text-anchor', 'end')
      .attr('x', chartWidth/2 + 75)
      .attr('y', chartHeight - 20)
      .text('Fahrenheit degrees °F');

    // Add a legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    legend
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 6)
      .style('fill', 'crimson');
    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 0)
      .attr('dy', '.35em')
      .text('Max Temperature');

    legend
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 20)
      .attr('r', 6)
      .style('fill', 'steelblue');
    legend
      .append('text')
      .attr('x', 20)
      .attr('y', 20)
      .attr('dy', '.35em')
      .text('Min Temperature');
  }, [data, chartWidth, chartHeight]);

  return <svg ref={svgRef} viewBox={`0 0 ${chartWidth} ${chartHeight}`} />;
}

export default RidgelineChart;
