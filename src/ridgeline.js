import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function RidgelineChart({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 150 * data.length; // Adjust height for each year
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr('width', width).attr('height', height);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = 100; // Height of each ridgeline

    // Scale setup
    const x = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d3.min(d.values)),
        d3.max(data, (d) => d3.max(d.values))
      ])
      .range([0, chartWidth]);

    const kde = (kernel, thresholds, data) =>
      thresholds.map((t) => [t, d3.mean(data, (d) => kernel(t - d))]);

    const kernelEpanechnikov = (k) => (v) =>
      Math.abs(v /= k) <= 1 ? (0.75 * (1 - v * v)) / k : 0;

    const density = data.map((yearData) => {
      const thresholds = x.ticks(40);
      return kde(kernelEpanechnikov(3), thresholds, yearData.values).map(
        ([xVal, densityVal]) => ({ x: xVal, density: densityVal })
      );
    });

    // Clear previous content
    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    data.forEach((yearData, i) => {
      const yDensity = d3
        .scaleLinear()
        .domain([0, d3.max(density[i], (d) => d.density)])
        .range([chartHeight, 0]);

      const group = g.append('g').attr('transform', `translate(0, ${i * (chartHeight + margin.top)})`);

      // Draw ridgeline
      group
        .append('path')
        .datum(density[i])
        .attr('fill', 'steelblue')
        .attr('opacity', 0.7)
        .attr('stroke', 'black')
        .attr('stroke-width', 0.5)
        .attr('d',
          d3
            .line()
            .curve(d3.curveBasis)
            .x((d) => x(d.x))
            .y((d) => yDensity(d.density))
        );

      // Add x-axis
      group
        .append('g')
        .attr('transform', `translate(0, ${chartHeight})`) // Position x-axis at the bottom of each ridgeline
        .call(d3.axisBottom(x));

      // Add year label
      group
        .append('text')
        .attr('x', 0)
        .attr('y', -10)
        .style('font-size', '12px')
        .style('font-weight', 'bold')
        .text(yearData.year);
    });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default RidgelineChart;
