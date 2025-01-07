import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from '../data/Project_stackedbarchart_data';

export default function StackedBarChart({
  data = studentData,
  width = 800,
  height = 400,
  marginTop = 20,
  marginRight = 50,
  marginBottom = 30,
  marginLeft = 150
}) {
  const svgRef = useRef();
  const [category, setCategory] = useState("gender");
  const [selectedYear, setSelectedYear] = useState(2013);

  const margin = { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const colorScheme = {
    gender: ["blue", "pink"],
    sector: ["green", "orange"],
    workingTime: ["green", "orange"],
    educationLevel: ["green", "orange", "red", "purple"]
  };

  useEffect(() => {
    const filteredData = data.filter(d => d.year === selectedYear);

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "black")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("visibility", "hidden");

    const yScale = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.nation))
      .range([0, innerHeight])
      .padding(0.1);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.tot_students)])
      .nice()
      .range([0, innerWidth]);

    const color = d3.scaleOrdinal().range(colorScheme[category]);

    let keys = [];
    let labels = [];
    switch (category) {
      case "gender":
        keys = ["tot_males", "tot_females"];
        labels = ["Males", "Females"];
        break;
      case "sector":
        keys = ["tot_public_sector", "tot_private_sector"];
        labels = ["Public Sector", "Private Sector"];
        break;
      case "workingTime":
        keys = ["tot_full_time", "tot_part_time"];
        labels = ["Full Time", "Part Time"];
        break;
      case "educationLevel":
        keys = ["tot_short_cycle_type", "tot_bachelor_type", "tot_master_type", "tot_doctoral_type"];
        labels = ["Short Cycle", "Bachelor", "Master", "Doctoral"];
        break;
      default:
        keys = [];
    }

    const stackedData = d3.stack().keys(keys)(filteredData);

    const rects = svg
      .append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", (d, i) => color(i))
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("y", (d) => yScale(d.data.nation))
      .attr("x", (d) => xScale(d[0]))
      .attr("width", (d) => xScale(d[1]) - xScale(d[0]))
      .attr("height", yScale.bandwidth());

    rects
      .on("mousemove", (event, d) => {
        const nation = d.data.nation;
        const value = d[1] - d[0];

        rects
          .attr("opacity", (rectD) => (rectD === d ? 1 : 0.3))
          .attr("stroke", (rectD) => (rectD === d ? "black" : "none"))
          .attr("stroke-width", (rectD) => (rectD === d ? 2 : 0));

        tooltip.style("visibility", "visible")
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`)
          .text(`${nation}: ${Intl.NumberFormat().format(value)}`);
      })
      .on("mouseout", () => {
        rects
          .attr("opacity", 1)
          .attr("stroke", "none")
          .attr("stroke-width", 0);

        tooltip.style("visibility", "hidden");
      });

    svg
      .append("g")
      .attr("transform", `translate(0,0)`)
      .call(d3.axisLeft(yScale).tickSize(0)) // Aggiunta tickSize per evitare linee di separazione tra le etichette
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "12px"); // Modificata la dimensione del testo per adattarsi meglio

    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));

    svg
      .append("g")
      .selectAll("text")
      .data(filteredData)
      .join("text")
      .attr("x", -5)
      .attr("y", (d) => yScale(d.nation) + yScale.bandwidth() / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "end") // Allineato a destra per un miglior posizionamento
      .style("font-size", "12px")
      .text((d) => d.nation);

    const legend = svg
      .append("g")
      .attr("transform", `translate(${innerWidth + 10}, 0)`);

    legend
      .selectAll("rect")
      .data(labels)
      .join("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * 20)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => color(i));

    legend
      .selectAll("text")
      .data(labels)
      .join("text")
      .attr("x", 24)
      .attr("y", (d, i) => i * 20 + 9)
      .attr("dy", "0.35em")
      .text((d) => d);

    return () => {
      tooltip.style("visibility", "hidden");
    };
  }, [data, category, selectedYear]);

  return (
    <div>
      <div>
        <button onClick={() => setCategory("gender")}>Gender</button>
        <button onClick={() => setCategory("sector")}>Sector</button>
        <button onClick={() => setCategory("workingTime")}>Working Time</button>
        <button onClick={() => setCategory("educationLevel")}>Education Level</button>
      </div>
      <div>
        <label htmlFor="year-select">Select Year: </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i} value={2013 + i}>
              {2013 + i}
            </option>
          ))}
        </select>
      </div>
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`} />
      </svg>
    </div>
  );
}
