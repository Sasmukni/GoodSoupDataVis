import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const AlluvialGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 800)
      .attr('height', 500)
      .append('g')
      .attr('transform', 'translate(50, 50)');

    // Sample data
    const data = [
      { source: 'A', target: 'X', value: 20 },
      { source: 'A', target: 'Y', value: 30 },
      { source: 'B', target: 'X', value: 40 },
      { source: 'B', target: 'Z', value: 50 },
      { source: 'C', target: 'Y', value: 60 },
      { source: 'C', target: 'Z', value: 70 }
    ];

    const nodes = {
      source: ['A', 'B', 'C'],
      target: ['X', 'Y', 'Z']
    };

    // Set up scales for positioning the source and target nodes
    const xScaleSource = d3.scaleBand()
      .domain(nodes.source)
      .range([0, 300])
      .padding(0.2);

    const xScaleTarget = d3.scaleBand()
      .domain(nodes.target)
      .range([400, 700])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([400, 0]);

    // Create links (flows) between source and target
    svg.selectAll('.link')
      .data(data)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d => {
        const sourceX = xScaleSource(d.source) + xScaleSource.bandwidth() / 2;
        const targetX = xScaleTarget(d.target) + xScaleTarget.bandwidth() / 2;
        const yStart = yScale(d.value);
        const yEnd = yScale(0);  // Position at the bottom of the graph

        return `
          M${sourceX},${yStart}
          C${(sourceX + targetX) / 2},${yStart} ${(sourceX + targetX) / 2},${yEnd} ${targetX},${yEnd}
        `;
      })
      .attr('fill', 'none')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 2);

    // Create source nodes (rectangles)
    svg.selectAll('.source')
      .data(nodes.source)
      .enter().append('rect')
      .attr('class', 'source')
      .attr('x', d => xScaleSource(d))
      .attr('width', xScaleSource.bandwidth())
      .attr('y', 0)
      .attr('height', d => yScale(d3.sum(data.filter(link => link.source === d), link => link.value)))
      .attr('fill', '#cce5ff');

    // Create target nodes (rectangles)
    svg.selectAll('.target')
      .data(nodes.target)
      .enter().append('rect')
      .attr('class', 'target')
      .attr('x', d => xScaleTarget(d))
      .attr('width', xScaleTarget.bandwidth())
      .attr('y', d => yScale(d3.sum(data.filter(link => link.target === d), link => link.value)))
      .attr('height', d => 400 - yScale(d3.sum(data.filter(link => link.target === d), link => link.value)))
      .attr('fill', '#ffcc99');

    // Add labels to source nodes
    svg.selectAll('.source-label')
      .data(nodes.source)
      .enter().append('text')
      .attr('class', 'source-label')
      .attr('x', d => xScaleSource(d) + xScaleSource.bandwidth() / 2)
      .attr('y', -10)  // Position above the source node
      .attr('text-anchor', 'middle')
      .text(d => d);

    // Add labels to target nodes
    svg.selectAll('.target-label')
      .data(nodes.target)
      .enter().append('text')
      .attr('class', 'target-label')
      .attr('x', d => xScaleTarget(d) + xScaleTarget.bandwidth() / 2)
      .attr('y', 410)  // Position below the target node
      .attr('text-anchor', 'middle')
      .text(d => d);

  }, []);

  return <svg ref={svgRef}></svg>;
};

export default AlluvialGraph;
