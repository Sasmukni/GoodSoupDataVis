import * as d3 from "d3";
import { useRef, useEffect } from "react";
import studentData from '../data/Project_radarchart_data';

function calculateMeanMale(data) {
  // Initialize an object to hold the totals for each category
  const totals = {
    short_cycle: 0,
    bachelor: 0,
    master: 0,
    doctoral: 0,
  };

  // Iterate through the data to sum up the values for each category
  data.forEach((entry) => {
    totals.short_cycle += entry.tot_male_short_cycle;
    totals.bachelor += entry.tot_male_bachelor;
    totals.master += entry.tot_male_master;
    totals.doctoral += entry.tot_male_doctoral;
  });

  // Calculate the mean for each category
  const yearsCount = data.length;
  const means = {
    short_cycle_mean: totals.short_cycle / yearsCount,
    bachelor_mean: totals.bachelor / yearsCount,
    master_mean: totals.master / yearsCount,
    doctoral_mean: totals.doctoral / yearsCount,
  };

  return [means.short_cycle_mean, means.bachelor_mean, means.master_mean, means.doctoral_mean];
}

function calculateMeanFemale(data) {
  // Initialize an object to hold the totals for each category
  const totals = {
    short_cycle: 0,
    bachelor: 0,
    master: 0,
    doctoral: 0,
  };

  // Iterate through the data to sum up the values for each category
  data.forEach((entry) => {
    totals.short_cycle += entry.tot_fem_short_cycle;
    totals.bachelor += entry.tot_fem_bachelor;
    totals.master += entry.tot_fem_master;
    totals.doctoral += entry.tot_fem_doctoral;
  });

  // Calculate the mean for each category
  const yearsCount = data.length;
  const means = {
    short_cycle_mean: totals.short_cycle / yearsCount,
    bachelor_mean: totals.bachelor / yearsCount,
    master_mean: totals.master / yearsCount,
    doctoral_mean: totals.doctoral / yearsCount,
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
  colors = ["blue", "pink"]
}) {
  const svgRef = useRef();

  const dataMale = calculateMeanMale(studentData);
  const dataFem = calculateMeanFemale(studentData);
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
    const scaleRadius = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

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
      const gridValue = Math.ceil((maxValue / levels) * level);

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
      .text(gridValue.toFixed(1));
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
      .attr("stroke", colors[0])
      .attr("stroke-width", 2);

    // Points male
    svg.selectAll(".radar-point-male")
      .data(radarDataMale)
      .join("circle")
      .attr("class", "radar-point")
      .attr("cx", (d) => Math.cos(d.angle - Math.PI / 2) * scaleRadius(d.value))
      .attr("cy", (d) => Math.sin(d.angle - Math.PI / 2) * scaleRadius(d.value))
      .attr("r", 3)
      .attr("fill", colors[0]);

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
      .attr("stroke", colors[1])
      .attr("stroke-width", 2);

    // Points female
    svg.selectAll(".radar-point-fem")
      .data(radarDataFem)
      .join("circle")
      .attr("class", "radar-point")
      .attr("cx", (d) => Math.cos(d.angle - Math.PI / 2) * scaleRadius(d.value))
      .attr("cy", (d) => Math.sin(d.angle - Math.PI / 2) * scaleRadius(d.value))
      .attr("r", 3)
      .attr("fill", colors[1]);
    
    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width/5},${-height/2 + 10})`);

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", colors[0]);

    legend.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text("Males")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

    legend.append("rect")
      .attr("x", 0)
      .attr("y", 30)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", colors[1]);

    legend.append("text")
      .attr("x", 30)
      .attr("y", 45)
      .text("Females")
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");

  }, [width, height, marginTop, marginRight, marginBottom, marginLeft, colors]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
}
