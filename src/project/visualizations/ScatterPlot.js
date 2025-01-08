import * as d3 from "d3";
import { useRef, useState, useEffect } from "react";
import studentData from "../data/Project_scatterplot_data.json"; // Assuming data is in JSON format

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
  const [year, setYear] = useState(2013); // State for selected year

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous renderings

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
      .attr("y", marginLeft - 30)
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
      .attr("fill", colors[0])
      .append("title")
      .text(d => `${d.nation}: Males ${d.tot_males}%, Females ${d.tot_females}%`);

    // Hover effect: Darken the hovered circle and fade others
    circles
      .on("mouseover", function (event, d) {
        d3.selectAll("circle")
          .attr("fill", (d) => (d === event.target.__data__ ? "darkslateblue" : "lightsteelblue"));
        d3.select(this)
          .attr("fill", "darkslateblue");
        svg.append("text")
          .attr("id", "tooltip")
          .attr("x", width / 2)
          .attr("y", height - 10)
          .attr("text-anchor", "middle")
          .style("font-size", "14px")
          .text(d.nation);
      })
      .on("mouseout", function () {
        d3.selectAll("circle")
          .attr("fill", colors[0]); // Reset to original color
        d3.select("#tooltip").remove();
      });

  }, [width, height, marginTop, marginRight, marginBottom, marginLeft, year, colors]);

  // Year selection handler
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
    </div>
  );
}
