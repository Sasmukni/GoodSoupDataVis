import * as d3 from "d3";
import { useRef, useEffect } from "react";
import studentData from "../data/Project_duallinechart_data";

export default function DualLineChart({
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 40,
  colors = ["pink", "blue"]
}) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginBottom;

    const xScale = d3
      .scaleBand()
      .domain(studentData.map(d => d.year))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(studentData, d => Math.max(d.tot_females, d.tot_males))])
      .nice()
      .range([innerHeight, 0]);

    const lineFemales = d3
      .line()
      .x(d => xScale(d.year) + xScale.bandwidth() / 2)
      .y(d => yScale(d.tot_females));

    const lineMales = d3
      .line()
      .x(d => xScale(d.year) + xScale.bandwidth() / 2)
      .y(d => yScale(d.tot_males));

    const g = svg
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")))
      .attr("font-size", "12px");

    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d => `${d}%`))
      .attr("font-size", "12px");

    g.append("path")
      .datum(studentData)
      .attr("fill", "none")
      .attr("stroke", colors["Females"])
      .attr("stroke-width", 2)
      .attr("d", lineFemales);

    g.append("path")
      .datum(studentData)
      .attr("fill", "none")
      .attr("stroke", colors["Males"])
      .attr("stroke-width", 2)
      .attr("d", lineMales);

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "4px")
      .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)")
      .style("visibility", "hidden");

    const showTooltip = (event, d, value) => {
      tooltip.style("visibility", "visible")
        .text(`${value.toFixed(2)}%`)
        .style("left", `${event.pageX + 10}px`)
        .style("top", `${event.pageY - 20}px`);
    };

    const hideTooltip = () => tooltip.style("visibility", "hidden");

    g.selectAll(".point-female")
      .data(studentData)
      .enter()
      .append("circle")
      .attr("class", "point-female")
      .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
      .attr("cy", d => yScale(d.tot_females))
      .attr("r", 3)
      .attr("fill", colors["Females-opaque"])
      .on("mouseover", (event, d) => showTooltip(event, d, d.tot_females))
      .on("mouseout", hideTooltip);

    g.selectAll(".point-male")
      .data(studentData)
      .enter()
      .append("circle")
      .attr("class", "point-male")
      .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
      .attr("cy", d => yScale(d.tot_males))
      .attr("r", 3)
      .attr("fill", colors["Males-opaque"])
      .on("mouseover", (event, d) => showTooltip(event, d, d.tot_males))
      .on("mouseout", hideTooltip);

    const legend = svg.append("g")
      .attr("transform", `translate(${width - marginRight - 100}, ${marginTop})`);

    const legendData = [
      { label: "Females", color: colors["Females"] },
      { label: "Males", color: colors["Males"] }
    ];

    legend.selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 20})`)
      .each(function(d) {
        d3.select(this)
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", d.color);

        d3.select(this)
          .append("text")
          .attr("x", 18)
          .attr("y", 10)
          .text(d.label)
          .attr("fill", d.color)
          .attr("font-size", "12px")
          .attr("alignment-baseline", "middle");
      });
  }, [width, height, marginTop, marginRight, marginBottom, marginLeft, colors]);

  return (
    <div className='container my-3 filters-bar d-flex justify-content-center gap-3'>
    <svg ref={svgRef} width={width} height={height}></svg>
    </div>);
}
