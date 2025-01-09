import * as d3 from "d3";
import {useRef, useEffect, useState} from "react";

export default function Heatmap({
  data = [{gender:"Male",partTime:1000,fullTime:2000},{gender:"Female",partTime:1000,fullTime:2000}],
  width = 640,
  height = 400,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 80,
  marginLeft = 40,
  colors = ["#660000","#BB0000"]
}) {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });

  useEffect(() => {
          if (!data || data.length === 0 || !svgRef.current) return;
  
          const svg = d3.select(svgRef.current);
          svg.selectAll('*').remove();
  
          const innerWidth = width - marginLeft - marginRight;
          const innerHeight = height - marginTop - marginBottom;
          const legendHeight = 12;
  
          const genders = Array.from(new Set(data.map(d => d.gender)));
          const categories = ['Part-Time', 'Full-Time'];
  
          const partTimeValues = data.map(d=>d.partTime);
          const fullTimeValues = data.map(d=>d.fullTime);
  
          const maxValue = Math.max(...partTimeValues,...fullTimeValues);
          const minValue = Math.min(...partTimeValues,...fullTimeValues);
  
          const colorScale = d3.scaleLinear()
              .domain([minValue, maxValue])
              .range([colors[0],colors[1]]);
  
          svg.attr('width', width).attr('height', height);
  
          const heatmapGroup = svg.append('g').attr('transform', `translate(${marginLeft}, ${marginTop})`);
  
          const xScale = d3.scaleBand().domain(categories).range([0, innerWidth]).padding(0);
          const yScale = d3.scaleBand().domain(genders).range([0, innerHeight]).padding(0);
  
          const cells = heatmapGroup.selectAll('.cell')
              .data(data.flatMap(({gender, partTime, fullTime }) => [
                  { gender, category: 'Part-Time', value: partTime },
                  { gender, category: 'Full-Time', value: fullTime }
              ]))
              .enter()
              .append('rect')
              .attr('class', 'cell')
              .attr('x', d => xScale(d.category))
              .attr('y', d => yScale(d.gender))
              .attr('width', xScale.bandwidth())
              .attr('height', yScale.bandwidth())
              .attr('fill', d => {
                  return colorScale(d.value);
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
                      .attr('y', yScale(d.gender) - 3)
                      .style('opacity', 1)
                      .raise();
                  setTooltip({ visible: true, value: `${d.gender} ${d.category}: ${d.value} students`, x: event.pageX, y: event.pageY });
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
                      .attr('y', yScale(d.gender));
  
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
  
          heatmapGroup.append('g').attr('class', 'gender-labels')
              .selectAll('.gender-label')
              .data(genders)
              .enter()
              .append('text')
              .attr('class', 'gender-label')
              .attr('x', -10)
              .attr('y', d => yScale(d) + yScale.bandwidth() / 2)
              .text(d => d)
              .style('text-anchor', 'end')
              .style('font-size', '10px');


          const legendGroup = svg.append('g').attr('transform', `translate(${marginLeft}, ${marginTop + innerHeight + 20})`); 
  
          const totalLegend = legendGroup.append('g')
              .attr('class', 'legend total-legend')
              .attr('transform', `translate(${1 * (innerWidth / 3)}, 0)`);
  
          totalLegend.append('text')
              .attr('x', 0)
              .attr('y', +15) 
              .text('Students')
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
              .text(minValue)
              .style('font-size', '10px')
              .style('text-anchor', 'start');
  
          totalLegend.append('text')
              .attr('x', (innerWidth / 3) - 2)
              .attr('y', legendHeight + 32)
              .text(maxValue)
              .style('font-size', '10px')
              .style('text-anchor', 'end');
  
          const totalGradient = svg.append('defs')
              .append('linearGradient')
              .attr('id', 'totalGradient')
              .attr('x1', '0%')
              .attr('y1', '0%')
              .attr('x2', '100%')
              .attr('y2', '0%');
  
          totalGradient.selectAll('stop')
              .data([{
                  offset: '0%', color: colors[0]
              }, {
                  offset: '100%', color: colors[1]
              }])
              .enter().append('stop')
              .attr('offset', d => d.offset)
              .attr('stop-color', d => d.color);
  
      }, [data]);
  
      return (
          <div>
              <svg ref={svgRef} width={width} height={height}></svg>
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