import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from '../data/Project_radarchart_data';
import Select from "react-select";

function calculateMeanMale(data, selectedYear) {
  const filteredData = selectedYear === "average" ? data : data.filter(d => d.year.toString() === selectedYear);

  // Calculate the mean for each category
  const means = {
    short_cycle_mean: d3.mean(filteredData, d => d.tot_male_short_cycle),
    bachelor_mean: d3.mean(filteredData, d => d.tot_male_bachelor),
    master_mean: d3.mean(filteredData, d => d.tot_male_master),
    doctoral_mean: d3.mean(filteredData, d => d.tot_male_doctoral)
  };

  return [means.short_cycle_mean, means.bachelor_mean, means.master_mean, means.doctoral_mean];
}

function calculateMeanFemale(data, selectedYear) {
  const filteredData = selectedYear === "average" ? data : data.filter(d => d.year.toString() === selectedYear);

  // Calculate the mean for each category
  const means = {
    short_cycle_mean: d3.mean(filteredData, d => d.tot_fem_short_cycle),
    bachelor_mean: d3.mean(filteredData, d => d.tot_fem_bachelor),
    master_mean: d3.mean(filteredData, d => d.tot_fem_master),
    doctoral_mean: d3.mean(filteredData, d => d.tot_fem_doctoral)
  };

  return [means.short_cycle_mean, means.bachelor_mean, means.master_mean, means.doctoral_mean];
}

export default function RadarChart({
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 10,
  colors = ["blue"]
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


  const dataMale = calculateMeanMale(studentData, selectedYear);
  const dataFem = calculateMeanFemale(studentData, selectedYear);
  const labels = ["Short Cycle", "Bachelor", "Master", "Doctoral"];

  useEffect(() => {
    const radius = Math.min(width, height) / 2 - Math.max(marginTop, marginRight, marginBottom, marginLeft);
    const center = { x: width / 2, y: height / 2 };

    // Clear any previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .append("g")
      .attr("transform", `translate(${center.x},${center.y})`);

    // Scales
    const maxValue = d3.max(dataMale.concat(dataFem));
    const angleSlice = (Math.PI * 2) / dataMale.length;
    const scaleRadius = d3.scaleLinear().domain([0, maxValue]).nice().range([0, radius]);

    // Axes
    labels.forEach((label, i) => {
      const angle = i * angleSlice - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Draw axis lines
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "gray")
        .attr("stroke-width", 1);

      // Add labels
      svg.append("text")
        .attr("x", x * 1.2)
        .attr("y", y * 1.1)
        .attr("dy", "0.35em")
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .text(label);
    });

    // Grid lines
    const levels = 5; // Number of concentric circles
    for (let level = 1; level <= levels; level++) {
      const gridRadius = (radius / levels) * level;
      const gridValue = Math.ceil((scaleRadius.domain()[1] / levels) * level);

      svg.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", gridRadius)
        .attr("fill", "none")
        .attr("stroke", "lightgray")
        .attr("stroke-width", 0.5);

      // Add numeric labels for each grid line
      svg.append("text")
      .attr("x", 0)
      .attr("y", -gridRadius)
      .attr("dy", "-0.2em")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .text(gridValue.toFixed(0));
    }

    // Radar area male
    const radarLineMale = d3.lineRadial()
      .radius((d) => scaleRadius(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    const radarDataMale = dataMale.map((value, i) => ({ value, angle: i * angleSlice }));

    svg.append("path")
      .datum(radarDataMale)
      .attr("d", radarLineMale)
      .attr("fill", "none")
      .attr("stroke", colors["Males"])
      .attr("stroke-width", 2);

    // Points male
    svg.selectAll(".radar-point-male")
      .data(radarDataMale)
      .join("circle")
      .attr("class", "radar-point")
      .attr("cx", (d) => Math.cos(d.angle - Math.PI / 2) * scaleRadius(d.value))
      .attr("cy", (d) => Math.sin(d.angle - Math.PI / 2) * scaleRadius(d.value))
      .attr("r", 8)
      .attr("fill", colors["Males"])
      .on("mouseover", function (event, d) {
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("position", "absolute")
          .style("background", "black")
          .style("color", "white")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none")
          .style("opacity", 1)
          .text(Intl.NumberFormat().format(d.value))
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        d3.select(tooltipRef.current).style("opacity", 0);
      });

    // Radar area female
    const radarLineFem = d3.lineRadial()
      .radius((d) => scaleRadius(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    const radarDataFem = dataFem.map((value, i) => ({ value, angle: i * angleSlice }));

    svg.append("path")
      .datum(radarDataFem)
      .attr("d", radarLineFem)
      .attr("fill", "none")
      .attr("stroke", colors["Females"])
      .attr("stroke-width", 2);

    // Points female
    svg.selectAll(".radar-point-fem")
      .data(radarDataFem)
      .join("circle")
      .attr("class", "radar-point")
      .attr("cx", (d) => Math.cos(d.angle - Math.PI / 2) * scaleRadius(d.value))
      .attr("cy", (d) => Math.sin(d.angle - Math.PI / 2) * scaleRadius(d.value))
      .attr("r", 8)
      .attr("fill", colors["Females"])
      .on("mouseover", function (event, d) {
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("position", "absolute")
          .style("background", "black")
          .style("color", "white")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none")
          .style("opacity", 1)
          .text(Intl.NumberFormat().format(d.value))
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        d3.select(tooltipRef.current).style("opacity", 0);
      });
    
    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width/5},${-height/2 + 10})`);

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", colors["Males"]);

    legend.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text("Male")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 30)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", colors["Females"]);

    legend.append("text")
      .attr("x", 30)
      .attr("y", 45)
      .text("Female")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

  }, [width, height, marginTop, marginRight, marginBottom, marginLeft, colors, selectedYear]);

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
