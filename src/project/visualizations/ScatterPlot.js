import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";
import studentData from "../data/Project_scatterplot_data.json";

export default function ScatterPlot({
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 40,
  colors = ["steelblue"]
}) {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [year, setYear] = useState(2013);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const filteredData = studentData.filter(d => d.year === year);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.tot_males)])
      .range([marginLeft, width - marginRight]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.tot_females)])
      .range([height - marginBottom, marginTop]);

    const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d => d + "%");
    const yAxis = d3.axisLeft(yScale).ticks(10).tickFormat(d => d + "%");

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis);

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("NEET % - Males");

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", marginLeft - 31)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("NEET % - Females");

    const circles = svg.selectAll("circle")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.tot_males))
      .attr("cy", d => yScale(d.tot_females))
      .attr("r", 5)
      .attr("fill", colors["Nation2"]);

    svg.selectAll("circle")
      .on("mouseover", function (event, d) {
        d3.selectAll("circle")
          .transition().duration(200)
          .attr("opacity", 0.3);
        d3.select(this)
          .transition().duration(200)
          .attr("opacity", 1)
          .attr("fill", "darkslateblue");
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("position", "absolute")
          .style("background", "black")
          .style("color", "white")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none")
          .style("opacity", 1)
          .html( `${d.nation}: Males ${d.tot_males}%, Females ${d.tot_females}%`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        d3.selectAll("circle")
          .transition().duration(200)
          .attr("opacity", 1)
          .attr("fill", colors["Nation2"]);
        d3.select(tooltipRef.current).style("opacity", 0);
      });

  }, [width, height, marginTop, marginRight, marginBottom, marginLeft, year, colors]);

  const handleYearChange = (event) => {
    setYear(Number(event.target.value));
  };

  return (
    <div>
      <div>
        <label htmlFor="year-select">Select Year: </label>
        <select id="year-select" value={year} onChange={handleYearChange}>
          {[...Array(2023 - 2013).keys()].map(i => {
            const yearOption = 2013 + i;
            return (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            );
          })}
        </select>
      </div>
      <svg ref={svgRef} width={width} height={height}></svg>
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
    </div>
  );
}
