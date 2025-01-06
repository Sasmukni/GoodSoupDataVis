import * as d3 from "d3";
import { useRef, useEffect } from "react";
import studentData from "../data/Project_treemapchart_data";

function calculteMean(data) {
  const totals = {
    fem_public_sector: 0,
    male_public_sector: 0,
    fem_private_sector: 0,
    male_private_sector: 0,
  };

  // Iterate through the data to sum up the values for each category
  data.forEach((entry) => {
    totals.fem_public_sector += entry.fem_public_sector;
    totals.male_public_sector += entry.male_public_sector;
    totals.fem_private_sector += entry.fem_private_sector;
    totals.male_private_sector += entry.male_private_sector;
  });

  // Calculate the mean for each category
  const yearsCount = data.length;
  const means = {
    fem_public_sector_mean: totals.fem_public_sector / yearsCount,
    male_public_sector_mean: totals.male_public_sector / yearsCount,
    fem_private_sector_mean: totals.fem_private_sector / yearsCount,
    male_private_sector_mean: totals.male_private_sector / yearsCount,
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

  useEffect(() => {
    const data = calculteMean(studentData);

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
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

    // Add rectangles for each node
    nodes
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => colors[d.parent.data.name === "Male" ? 0 : 1]) // Base color
      .attr("stroke", "#fff")
      .on("mouseover", function (event, d) {
        // Change color on hover
        d3.select(this).attr(
          "fill",
          d3.color(colors[d.parent.data.name === "Male" ? 0 : 1]).brighter(-1)
        );

        // Show the tooltip
        tooltip
          .style("opacity", 1)
          .html(`${d.parent.data.name} - ${d.data.name}: ${d.data.value.toFixed(2)}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
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
          colors[d.parent.data.name === "Male" ? 0 : 1]
        );

        // Hide the tooltip
        tooltip.style("opacity", 0);
      });

    // Add text labels
    nodes
      .append("text")
      .attr("x", 4)
      .attr("y", 14)
      .attr("fill", "white")
      .style("font-size", "12px")
      .text((d) => `${d.parent.data.name} - ${d.data.name}: ${d.data.value.toFixed(2)}`);
  }, [width, height, colors]);

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
