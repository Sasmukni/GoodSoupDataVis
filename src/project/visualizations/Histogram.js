import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from "../data/Project_multistackedbarchart_data";

export default function Histogram({
  data = studentData,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 80,
  marginLeft = 50,
  colors = ["steelblue", "orange"],
}) {
  const svgRef = useRef();
  const [year, setYear] = useState(2013);

  const filteredData = data.filter(d => d.year === year);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const innerWidth = width - marginLeft - marginRight;
    const innerHeight = height - marginTop - marginBottom;

    const maleData = filteredData.map((d) => ({ value: d.tot_males, nation: d.nation }));
    const femaleData = filteredData.map((d) => ({ value: d.tot_females, nation: d.nation }));

    const binThresholds = d3.range(0, 101, 10);

    const maleBins = d3.bin()
      .value(d => d.value)
      .domain([0, 100])
      .thresholds(binThresholds)(maleData);

    const femaleBins = d3.bin()
      .value(d => d.value)
      .domain([0, 100])
      .thresholds(binThresholds)(femaleData);

    const xScale = d3.scaleBand()
      .domain(binThresholds.map((d, i) => `${d}-${binThresholds[i + 1] || 100}%`))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max([...maleBins, ...femaleBins], (d) => d.length)])
      .nice()
      .range([innerHeight, 0]);

    const g = svg.append("g").attr("transform", `translate(${marginLeft},${marginTop})`);

    const tooltip = d3.select("body").append("div")
      .style("position", "absolute")
      .style("background", "#f9f9f9")
      .style("border", "1px solid white")
      .style("padding", "5px")
      .style("display", "none")
      .style("pointer-events", "none");

    g.selectAll(".bar-male")
      .data(maleBins)
      .join("rect")
      .attr("class", "bar-male")
      .attr("x", (d, i) => xScale(`${binThresholds[i]}-${binThresholds[i + 1] || 100}%`))
      .attr("y", (d) => yScale(d.length))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => innerHeight - yScale(d.length))
      .attr("fill", colors[0])
      .on("mouseover", (event, d) => {
        const nationList = d.map(item => item.nation).join(", ");
        tooltip.style("display", "block").html(`Male: ${d.length}<br>Countries: ${nationList}`);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", `${event.pageX + 5}px`).style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => tooltip.style("display", "none"));

    g.selectAll(".bar-female")
      .data(femaleBins)
      .join("rect")
      .attr("class", "bar-female")
      .attr("x", (d, i) => xScale(`${binThresholds[i]}-${binThresholds[i + 1] || 100}%`) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.length))
      .attr("width", xScale.bandwidth() / 2)
      .attr("height", (d) => innerHeight - yScale(d.length))
      .attr("fill", colors[1])
      .on("mouseover", (event, d) => {
        const nationList = d.map(item => item.nation).join(", ");
        tooltip.style("display", "block").html(`Female: ${d.length}<br>Countries: ${nationList}`);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", `${event.pageX + 5}px`).style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => tooltip.style("display", "none"));

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    g.append("g").call(d3.axisLeft(yScale).ticks(6));

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - marginBottom + 55)
      .attr("text-anchor", "middle")
      .text("NEET Percentage Bins (10% intervals)");

    svg.append("text")
      .attr("x", -height / 2)
      .attr("y", marginLeft / 3)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Number of Countries");

    const legend = svg.append("g").attr("transform", `translate(${width - 120}, 20)`);

    legend.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", colors[0]);

    legend.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text("Male");

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 20)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", colors[1]);

    legend.append("text")
      .attr("x", 20)
      .attr("y", 32)
      .text("Female");
  }, [filteredData, width, height, marginTop, marginRight, marginBottom, marginLeft, colors]);

  return (
    <div>
      <label htmlFor="year-selector">Select Year: </label>
      <select
        id="year-selector"
        value={year}
        onChange={(e) => setYear(parseInt(e.target.value, 10))}
      >
        {[...new Set(data.map((d) => d.year))].sort().map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
}
