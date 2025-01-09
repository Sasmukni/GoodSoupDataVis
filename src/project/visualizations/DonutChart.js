import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function DonutChart({
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 10,
  marginBottom = 30,
  marginLeft = 10,
  colors = ["pink", "blue"],
  data = [
    { label: "Female", value: 600 },
    { label: "Male", value: 400 }, 
  ]
}) {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const totalStudents = data.reduce((acc, curr) => acc + curr.value, 0);

    // Create SVG canvas
    const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
      
    svg.attr("width", width)
      .attr("height", height)
      .style("font-family", "sans-serif");

    const radius = Math.min(width, height) / 2 - marginTop; // Donut radius

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc()
      .innerRadius(radius / 2) // Inner radius
      .outerRadius(radius);     // Outer radius

    const colorScale = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(colors);

    const chartGroup = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Create the donut chart segments
    chartGroup.selectAll(".arc")
      .data(pie(data))
      .enter().append("path")
      .attr("class", "arc")
      .attr("d", arc)
      .attr("fill", d => colorScale(d.data.label))
      .on("mouseover", function (event, d) {
        // Highlight the hovered segment and dim others
        d3.selectAll(".arc")
          .style("opacity", 0.3);
        d3.select(this)
          .style("opacity", 1);

        // Show the tooltip
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("position", "absolute")
          .style("background", "black")
          .style("color", "white")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none")
          .style("opacity", 1)
          .html(`${d.data.label}: ${d.data.value}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        // Reset the opacity
        d3.selectAll(".arc")
          .style("opacity", 1);

        // Hide the tooltip
        d3.select(tooltipRef.current).style("opacity", 0);
      });

    // Add total number of students in the center of the donut
    chartGroup.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em") // Vertical align in the center
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text(Intl.NumberFormat().format(totalStudents));

    // Add labels for the segments
    chartGroup.selectAll(".label")
      .data(pie(data))
      .enter().append("text")
      .attr("transform", d => {
        const centroid = arc.centroid(d);
        return `translate(${centroid})`;
      })
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "white")
      .text(d => `${d.data.label}`);
  }, [width, height, marginTop, marginRight, marginBottom, marginLeft, colors]);

  return (
    <>
      <svg ref={svgRef}></svg>
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
    </>
  );
}