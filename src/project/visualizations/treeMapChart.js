import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from "../data/Project_treemapchart_data";
import Select from "react-select";

function calculteMean(data, selectedYear) {
  const filteredData = selectedYear === "average" ? data : data.filter(d => d.year.toString() === selectedYear);

  // Calculate the mean for each category
  const means = {
    fem_public_sector_mean: d3.mean(filteredData, d => d.fem_public_sector),
    male_public_sector_mean: d3.mean(filteredData, d => d.male_public_sector),
    fem_private_sector_mean: d3.mean(filteredData, d => d.fem_private_sector),
    male_private_sector_mean: d3.mean(filteredData, d => d.male_private_sector),
  };

  const newData = {
    name: "Total Students",
    children: [
      {
        name: "Female",
        children: [
          { name: "Public", value: means.fem_public_sector_mean },
          { name: "Private", value: means.fem_private_sector_mean },
        ],
      },
      {
        name: "Male",
        children: [
          { name: "Public", value: means.male_public_sector_mean },
          { name: "Private", value: means.male_private_sector_mean },
        ],
      },
    ],
  };
  return newData;
}

export default function TreeMapChart({
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 10,
  colors = ["blue", "pink"]
}) {
  const svgRef = useRef();
  const tooltipRef = useRef();

  const [selectedYear, setSelectedYear] = useState("average");
  const years = [
    { value: "average", label: "Average" },
    ...[...new Set(studentData.map(d => d.year.toString()))].map(year => ({
      value: year,
      label: year,
    })),
  ];

  useEffect(() => {
    const data = calculteMean(studentData, selectedYear);

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    // Create a hierarchical structure from the data
    const root = d3
      .hierarchy(data)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    // Create a treemap layout
    d3.treemap()
      .size([width, height])
      .paddingInner(2)
      .round(true)(root);

    // Create an SVG element
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("font-family", "sans-serif");

    // Select the tooltip element
    const tooltip = d3.select(tooltipRef.current);

    // Add groups for each node
    const nodes = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("class", "my-tree") // Apply 'my-tree' class
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    // Add rectangles for each node
    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => colors[d.parent.data.name === "Male" ? "Males" : "Females"]) // Base color
      .attr("stroke", "#fff")
      .on("mouseover", function (event, d) {
        // Change color on hover
        d3.select(this).attr(
          "fill",
          d3.color(colors[d.parent.data.name === "Male" ? "Males" : "Females"])
        );

        // Show the tooltip
        tooltip
          .style("position", "absolute")
          .style("background", "black")
          .style("color", "white")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none")
          .style("opacity", 1)
          .html(`${d.parent.data.name} - ${d.data.name}: ${Intl.NumberFormat().format(d.data.value.toFixed(0))}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);

        // Reduce opacity of other bars except the hovered one
        d3.selectAll(".my-tree rect").style("opacity", 0.2);
        d3.select(this).style("opacity", 1);
      })
      .on("mousemove", (event) => {
        // Update tooltip position
        tooltip
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function (event, d) {
        // Revert to base color
        d3.select(this).attr(
          "fill",
          colors[d.parent.data.name === "Male" ? "Males" : "Females"]
        );

        // Hide the tooltip
        tooltip.style("opacity", 0);

        // Reset opacity for all bars
        d3.selectAll(".my-tree rect").style("opacity", 1); // Reset opacity
      });

    // Add text labels
    nodes
      .append("text")
      .attr("x", 4)
      .attr("y", 20)
      .attr("fill", "white")
      .style("font-size", "20px")
      .text((d) => `${d.parent.data.name} - ${d.data.name}`);
  }, [selectedYear, width, height, colors]);

  return (
    <div  style={{ textAlign: "center" }}>
      <div className='container my-3 filters-bar d-flex justify-content-center gap-3'>
        <Select
          style={{ marginBottom: '10px' }}
          className={window.innerWidth > 1024 ? "w-25" : "w-50"}
          defaultValue={years.find(y => y.value === selectedYear)}
          onChange={(e) => setSelectedYear(String(e.value))}
          options={years}
        />
      </div>
      <div className='container d-flex justify-content-center'>
        <svg ref={svgRef} width={width} height={height}></svg>
      </div>
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

