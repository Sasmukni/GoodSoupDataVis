import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from '../data/Project_piechart_data';

export default function PieChart({
  data = studentData,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 10,
  colors = {
    male: ["blue", "lightblue"],
    female: ["pink", "purple"]
  }
}) {
  const svgRef = useRef();
  const [selectedYear, setSelectedYear] = useState("average");

  const years = ["average", ...new Set(data.map(d => d.year.toString()))];

  useEffect(() => {
    const filteredData = selectedYear === "average" ? data : data.filter(d => d.year.toString() === selectedYear);
    const totalYears = filteredData.length;

    const averageMaleFullTime = d3.mean(filteredData, d => d.tot_male_full_time);
    const averageMalePartTime = d3.mean(filteredData, d => d.tot_male_part_time);
    const averageFemaleFullTime = d3.mean(filteredData, d => d.tot_female_full_time);
    const averageFemalePartTime = d3.mean(filteredData, d => d.tot_female_part_time);

    const totalMales = averageMaleFullTime + averageMalePartTime;
    const totalFemales = averageFemaleFullTime + averageFemalePartTime;

    const aggregatedMaleData = [
      { category: "Full-Time", value: averageMaleFullTime },
      { category: "Part-Time", value: averageMalePartTime }
    ];
    const aggregatedFemaleData = [
      { category: "Full-Time", value: averageFemaleFullTime },
      { category: "Part-Time", value: averageFemalePartTime }
    ];

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("g").remove(); // Clear previous content

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "black")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("visibility", "hidden");

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 4);

    const liftSlice = d => {
      const [x, y] = arc.centroid(d);
      return `translate(${x * 0.1}, ${y * 0.1})`;
    };

    const resetSlice = () => `translate(0, 0)`;

    const maleGroup = svg.append("g")
      .attr("transform", `translate(${width / 4}, ${height / 2})`);

    maleGroup.append("text")
      .text("Male")
      .attr("y", -height / 3.5)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("fill", colors.male[0]);

    maleGroup.selectAll('path')
      .data(pie(aggregatedMaleData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors.male[i])
      .attr("stroke", "#fff")
      .attr("stroke-width", "2")
      .attr("transform", resetSlice)
      .on("mousemove", function (event, d) {
        const percentage = Math.round((d.data.value / totalMales) * 100);
        tooltip.style("visibility", "visible")
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`)
          .text(`${d.data.category}: ${d.data.value.toFixed(2)} (${percentage}%)`);
        d3.select(this).transition().duration(200).attr("transform", liftSlice(d));
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
        d3.select(this).transition().duration(200).attr("transform", resetSlice);
      });

    const femaleGroup = svg.append("g")
      .attr("transform", `translate(${3 * width / 4}, ${height / 2})`);

    femaleGroup.append("text")
      .text("Female")
      .attr("y", -height / 3.5)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("fill", colors.female[0]);

    femaleGroup.selectAll('path')
      .data(pie(aggregatedFemaleData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => colors.female[i])
      .attr("stroke", "#fff")
      .attr("stroke-width", "2")
      .attr("transform", resetSlice)
      .on("mousemove", function (event, d) {
        const percentage = Math.round((d.data.value / totalFemales) * 100);
        tooltip.style("visibility", "visible")
          .style("top", `${event.pageY + 10}px`)
          .style("left", `${event.pageX + 10}px`)
          .text(`${d.data.category}: ${d.data.value.toFixed(2)} (${percentage}%)`);
        d3.select(this).transition().duration(200).attr("transform", liftSlice(d));
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
        d3.select(this).transition().duration(200).attr("transform", resetSlice);
      });

    return () => {
      tooltip.remove();
    };
  }, [data, width, height, colors, selectedYear]);

  return (
    <div style={{ textAlign: "center" }}>
      <label htmlFor="year-select">Select Year: </label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <svg ref={svgRef} />
    </div>
  );
}
