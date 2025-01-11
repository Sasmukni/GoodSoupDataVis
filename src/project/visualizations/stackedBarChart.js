import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from '../data/Project_stackedbarchart_data';
import Select from "react-select";

export default function StackedBarChart({
  data = studentData,
  width = 800,
  height = 400,
  marginTop = 20,
  marginRight = 100,
  marginBottom = 30,
  marginLeft = 140,
  colors = ["pink"]
}) {
  const svgRef = useRef();
  const [category, setCategory] = useState("gender");
  const [selectedYear, setSelectedYear] = useState("2013");
  const years = [
      ...[...new Set(studentData.map(d => d.year.toString()))].map(year => ({
        value: year,
        label: year,
      })),
  ];
  
  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  const colorScheme = {
    gender: [colors["Males"], colors["Females"]],
    sector: [colors["Public"], colors["Private"]],
    workingTime: [colors["Full time"], colors["Part time"]],
    educationLevel: [colors["Short cycle"], colors["Bachelor"], colors["Master"], colors["Doctoral"]]
  };

  useEffect(() => {
    const filteredData = data.filter(d => String(d.year) === selectedYear);

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
      .attr("height", yScale.bandwidth())
      .attr("transform", `translate(${marginLeft},0)`);

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
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yScale).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "end")
      .style("font-size", "12px");

    svg
      .append("g")
      .attr("transform", `translate(${marginLeft},${innerHeight})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0));
      
      svg
      .append("text")
      .attr("transform", `translate(${marginLeft + innerWidth / 2}, ${innerHeight + marginBottom})`)
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text("Total Number of Students");

    const legend = svg
      .append("g")
      .attr("transform", `translate(${innerWidth + marginLeft + 10}, 0)`);

    legend
      .selectAll("rect")
      .data(labels)
      .join("rect")
      .attr("x", -innerWidth/3)
      .attr("y", (d, i) => i * 20 + (2*innerHeight/3))
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d, i) => color(i));

    legend
      .selectAll("text")
      .data(labels)
      .join("text")
      .attr("x", -innerWidth/3 + 20)
      .attr("y", (d, i) => i * 20 + (2*innerHeight/3) + 9)
      .attr("dy", "0.35em")
      .text((d) => d);

    return () => {
      tooltip.style("visibility", "hidden");
    };
  }, [data, category, selectedYear]);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", margin: "20px 0" }}>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onClick={() => setCategory("gender")}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Gender
      </button>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onClick={() => setCategory("workingTime")}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Working Time
      </button>
      <button
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onClick={() => setCategory("educationLevel")}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Education Level
      </button>
    </div>
      <div className='container my-3 filters-bar d-flex justify-content-center gap-3'>
        <Select
          style={{ marginBottom: '10px' }}
          className={window.innerWidth > 1024 ? "w-25" : "w-50"}
          defaultValue={years.find(y => y.value === selectedYear)}
          onChange={(e) => setSelectedYear(String(e.value))}
          options={years}
        />
      </div>
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${marginLeft},${marginTop})`} />
      </svg>
    </div>
  );
}
