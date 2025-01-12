import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function GaugeChart({
  data = {male: 30, female: 25},
  width = 1200,
  height = 400,
  colors = {},
}) {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = Math.min(width, height) / 2 - 10;
    const innerRadius = radius * 0.7;

    const centerX = width/2;
    const centerY = height/2;

    // Male gauge
    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle((Math.PI) * (data.male/ 100) - Math.PI / 2); 

    const backgroundArc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    // Gauge background
    svg.append("path")
      .attr("d", backgroundArc())
      .attr("fill", colors["Neutral"])
      .attr("transform", `translate(${centerX},${centerY})`);

    // Select the tooltip element
    const tooltip = d3.select(tooltipRef.current);

    // Active gauge arc
    svg.append("path")
      .attr("d", arc())
      .attr("fill", colors["Males"])
      .attr("transform", `translate(${centerX},${centerY})`)
      .on("mouseover", function (event, d) {
        // Show tooltip
        tooltip
          .style("position", "absolute")
          .style("background", "black")
          .style("color", "white")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none")
          .style("opacity", 1)
          .text(`Male: ${data.male}%`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);;
      })
      .on("mouseout", function (event, d) {
        // Hide the tooltip
        tooltip.style("opacity", 0);
      });
      
    // Red vertical line at 50%
    svg.append("line")
       .attr("x1", centerX)
       .attr("y1", centerY - radius)
       .attr("x2", centerX)
       .attr("y2", centerY - (radius - innerRadius) * 2)
       .attr("stroke", colors.arc[1])
       .attr("stroke-width", 2)
       .attr("stroke-dasharray", "4,2");
    
    // Percentage labels
    svg.append("text")
      .attr("x", centerX)
      .attr("y", centerY - (radius - innerRadius) * 2 + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text("50%");

    svg.append("text")
      .attr("x", centerX)
      .attr("y", centerY-radius/10)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-weight", "bold")
      .text(`Male: ${data.male}%`);

    // Female gauge

    const arcFemale = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle((Math.PI) * (data.female/ 100) - Math.PI / 2);

    const backgroundArcFemale = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    // Gauge background
    svg.append("path")
      .attr("d", backgroundArcFemale())
      .attr("fill", colors.arc[0])
      .attr("transform", `translate(${centerX },${centerY+ radius})`);

    // Active gauge arc
    svg.append("path")
      .attr("d", arcFemale())
      .attr("fill", colors["Females"])
      .attr("transform", `translate(${centerX },${centerY+ radius})`)
      .on("mouseover", function (event, d) {
        // Show tooltip
        tooltip
          .style("position", "absolute")
          .style("background", "black")
          .style("color", "white")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none")
          .style("opacity", 1)
          .text(`Female: ${data.female}%`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);;
      })
      .on("mouseout", function (event, d) {
        // Hide the tooltip
        tooltip.style("opacity", 0);
      });

     // Red vertical line at 50%
     svg.append("line")
       .attr("x1", centerX)
       .attr("y1", centerY)
       .attr("x2", centerX)
       .attr("y2", centerY + radius - (radius - innerRadius) * 2)
       .attr("stroke", colors.arc[1])
       .attr("stroke-width", 2)
       .attr("stroke-dasharray", "4,2");
    
    // Percentage labels
    svg.append("text")
      .attr("x", centerX )
      .attr("y", centerY + radius - (radius - innerRadius) * 2 + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text("50%");
 
    svg.append("text")
      .attr("x", centerX)
      .attr("y", centerY + 9/10*radius)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("font-weight", "bold")
      .text(`Female: ${data.female}%`);
  }, [data, width, height, colors]);

  return <>
      <svg ref={svgRef} width={width} height={height} />
      <p style={{textAlign:"left"}}>
      In Western European countries, the gap between male and female NEET percentages is present but not pronounced, as seen in Germany. However, in Eastern Europe, such as Romania, the gap is much more noticeable.
      </p>
      <div
      ref={tooltipRef}
      style={{
        position: "absolute",
        background: "#333",
        color: "#fff",
        padding: "5px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 0.2s",
      }}
    ></div>
  </>;
}
