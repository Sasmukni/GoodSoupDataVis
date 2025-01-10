import * as d3 from "d3";
import { useRef, useEffect } from "react";

export default function DumbbellPlot({
  data = [
    { gender: "Male", value1: 30, value2: 80 },
    { gender: "Female", value1: 45, value2: 90 }
  ],
  width = 800,
  height = 400,
  marginTop = 30,
  marginRight = 50,
  marginBottom = 50,
  marginLeft = 50,
  colors = ["steelblue", "orange"],
}) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginBottom;

    // Scales
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => Math.min(d.value1, d.value2)) - 10, d3.max(data, (d) => Math.max(d.value1, d.value2)) + 10])
      .nice(1)
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.gender))
      .range([0, innerHeight])
      .padding(0.5);

    const chartGroup = svg
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    // X axis
    chartGroup
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(6))
      .selectAll("text")
      .style("font-size", "12px");

    // Y axis
    chartGroup
      .append("g")
      .call(d3.axisLeft(yScale).tickSize(0))
      .selectAll("text")
      .style("font-size", "12px");

    // Dumbbell lines
    chartGroup
      .selectAll(".line")
      .data(data)
      .join("line")
      .attr("x1", (d) => xScale(d.value1))
      .attr("x2", (d) => xScale(d.value2))
      .attr("y1", (d) => yScale(d.gender) + yScale.bandwidth() / 2)
      .attr("y2", (d) => yScale(d.gender) + yScale.bandwidth() / 2)
      .attr("stroke", "gray")
      .attr("stroke-width", 2);

    // Circles for value1
    chartGroup
      .selectAll(".circle1")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.value1))
      .attr("cy", (d) => yScale(d.gender) + yScale.bandwidth() / 2)
      .attr("r", 6)
      .attr("fill", colors[0]);

    // Circles for value2
    chartGroup
      .selectAll(".circle2")
      .data(data)
      .join("circle")
      .attr("cx", (d) => xScale(d.value2))
      .attr("cy", (d) => yScale(d.gender) + yScale.bandwidth() / 2)
      .attr("r", 6)
      .attr("fill", colors[1]);

    // Labels for value1
    chartGroup
      .selectAll(".label1")
      .data(data)
      .join("text")
      .attr("x", (d) => xScale(d.value1))
      .attr("y", (d) => yScale(d.gender) + 5 + yScale.bandwidth() / 2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text((d) => Intl.NumberFormat().format((d.value1)));

    // Labels for value2
    chartGroup
      .selectAll(".label2")
      .data(data)
      .join("text")
      .attr("x", (d) => xScale(d.value2))
      .attr("y", (d) => yScale(d.gender) + 5 + yScale.bandwidth() / 2)
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .style("font-size", "10px")
      .text((d) => Intl.NumberFormat().format((d.value2)));
    
  // Legend
  const legend = svg.append("g")
    .attr("transform", `translate(${innerWidth - marginRight},${marginTop})`);

  legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", colors[0]);

  legend.append("text")
    .attr("x", 30)
    .attr("y", 15)
    .text("Full Time")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");

  legend.append("rect")
    .attr("x", 0)
    .attr("y", 30)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", colors[1]);

  legend.append("text")
    .attr("x", 30)
    .attr("y", 45)
    .text("Part Time")
    .style("font-size", "12px")
    .attr("alignment-baseline", "middle");
  }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft, colors]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
}