import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function GaugeChart({
  data = {male: 30, female: 25},
  width = 1200,
  height = 400,
  colors = {},
}) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2 - 10;
    const innerRadius = radius * 0.8;

    const centerX = width/2;
    const centerY = height/2;

    // Male gauge
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle((Math.PI / 2) * (data.male/ 100) - Math.PI / 2);

    const backgroundArc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    // Append the gauge background
    svg.append("path")
      .attr("d", backgroundArc())
      .attr("fill", colors.arc[0])
      .attr("transform", `translate(${centerX},${centerY})`);

    // Append the active gauge arc
    svg.append("path")
      .attr("d", arc())
      .attr("fill", colors.gender[0])
      .attr("transform", `translate(${centerX},${centerY})`);

 
     // Append the red vertical marker line at 50%
     svg.append("line")
       .attr("x1", centerX)
       .attr("y1", centerY - radius)
       .attr("x2", centerX)
       .attr("y2", (radius - innerRadius) * 2)
       .attr("stroke", colors.arc[1])
       .attr("stroke-width", 2)
       .attr("stroke-dasharray", "4,2");
    
    // Add percentage labels
    svg.append("text")
      .attr("x", centerX)
      .attr("y", (radius - innerRadius) * 2 + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text("50%");

    svg.append("text")
      .attr("x", centerX)
      .attr("y", centerY)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text(`${data.male}%`);

    // Female gauge

    const arcFemale = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle((Math.PI / 2) * (data.female/ 100) - Math.PI / 2);

    const backgroundArcFemale = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    // Append the gauge background
    svg.append("path")
      .attr("d", backgroundArcFemale())
      .attr("fill", colors.arc[0])
      .attr("transform", `translate(${centerX + 2*radius},${centerY})`);

    // Append the active gauge arc
    svg.append("path")
      .attr("d", arcFemale())
      .attr("fill", colors.gender[1])
      .attr("transform", `translate(${centerX + 2*radius},${centerY})`);

     // Append the red vertical marker line at 50%
     svg.append("line")
       .attr("x1", centerX + 2*radius)
       .attr("y1", centerY - radius)
       .attr("x2", centerX + 2*radius)
       .attr("y2", (radius - innerRadius) * 2)
       .attr("stroke", colors.arc[1])
       .attr("stroke-width", 2)
       .attr("stroke-dasharray", "4,2");
    
    // Add percentage labels
    svg.append("text")
      .attr("x", centerX + 2*radius)
      .attr("y", (radius - innerRadius) * 2 + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text("50%");
 
    svg.append("text")
      .attr("x", centerX + 2*radius)
      .attr("y", centerY)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text(`${data.female}%`);
  }, [data, width, height, colors]);

  return <svg ref={svgRef} width={width} height={height} />;
}
