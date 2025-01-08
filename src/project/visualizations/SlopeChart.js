import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from "../data/Project_secondsection181920charts_data"; 

export default function SlopeChart({
  width = 800,
  height = 500,
  marginTop = 60,
  marginBottom = 40,
  marginLeft = 100,
  marginRight = 100,
  colors = { males: "steelblue", females: "coral" }
}) {
  const svgRef = useRef();
  const [selectedNation, setSelectedNation] = useState("North Macedonia");
  const [leftYear, setLeftYear] = useState(2013);
  const [rightYear, setRightYear] = useState(2022);

  const nations = Array.from(new Set(studentData.map(d => d.nation)));
  const years = Array.from(new Set(studentData.map(d => d.year))).sort(d3.ascending);

  useEffect(() => {
    const filteredData = studentData.filter(
      d => d.nation === selectedNation && (d.year === leftYear || d.year === rightYear)
    );

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const xPositions = [marginLeft, width - marginRight];
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => Math.max(d.tot_males, d.tot_females))])
      .range([height - marginBottom, marginTop + 50]);

    const malePoints = filteredData.map(d => ({
      year: d.year,
      value: d.tot_males,
      x: d.year === leftYear ? xPositions[0] : xPositions[1]
    }));

    const femalePoints = filteredData.map(d => ({
      year: d.year,
      value: d.tot_females,
      x: d.year === leftYear ? xPositions[0] : xPositions[1]
    }));

    const drawLine = (data, color) => {
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", d3.line()
          .x(d => d.x)
          .y(d => yScale(d.value))
        );

      data.forEach(d => {
        svg.append("circle")
          .attr("cx", d.x)
          .attr("cy", yScale(d.value))
          .attr("r", 4)
          .attr("fill", color);

        svg.append("text")
          .attr("x", d.x + (d.x === xPositions[0] ? -10 : 10))
          .attr("y", yScale(d.value))
          .attr("dy", "0.35em")
          .attr("text-anchor", d.x === xPositions[0] ? "end" : "start")
          .text(`${d.value}%`);
      });
    };

    drawLine(malePoints, colors.males);
    drawLine(femalePoints, colors.females);

    const legendX = width - marginRight + 20;
    const legendY = 20;

    svg.append("circle")
      .attr("cx", legendX)
      .attr("cy", legendY)
      .attr("r", 5)
      .attr("fill", colors.males);

    svg.append("text")
      .attr("x", legendX + 10)
      .attr("y", legendY)
      .attr("dy", "0.35em")
      .text("Males");

    svg.append("circle")
      .attr("cx", legendX)
      .attr("cy", legendY + 20)
      .attr("r", 5)
      .attr("fill", colors.females);

    svg.append("text")
      .attr("x", legendX + 10)
      .attr("y", legendY + 20)
      .attr("dy", "0.35em")
      .text("Females");
  }, [selectedNation, leftYear, rightYear, width, height, marginTop, marginBottom, marginLeft, marginRight, colors]);

  return (
    <div>
      <label htmlFor="nation-selector">Select a Nation: </label>
      <select
        id="nation-selector"
        value={selectedNation}
        onChange={(e) => setSelectedNation(e.target.value)}
      >
        {nations.map(nation => (
          <option key={nation} value={nation}>
            {nation}
          </option>
        ))}
      </select>

      <label htmlFor="left-year-selector"> Select Left Year: </label>
      <select
        id="left-year-selector"
        value={leftYear}
        onChange={(e) => setLeftYear(parseInt(e.target.value))}
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label htmlFor="right-year-selector"> Select Right Year: </label>
      <select
        id="right-year-selector"
        value={rightYear}
        onChange={(e) => setRightYear(parseInt(e.target.value))}
      >
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
}
