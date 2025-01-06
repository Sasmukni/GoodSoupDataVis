import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import Select from "react-select";
import studentData from "../data/Project_barchart_data";

export default function HorizontalBarChart({
  width = 800,
  height = 600,
  marginTop = 50,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 150,
  colors = ["pink"],
}) {
  const svgRef = useRef();
  const tooltipRef = useRef(); // Ref for the tooltip
  const [topCount, setTopCount] = useState(5);
  const [additionalCountries, setAdditionalCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Update filtered data whenever the top countries or additional categories changes
  useEffect(() => {
    const sortedData = [...studentData].sort((a, b) => b.tot_females - a.tot_females);
    const topData = sortedData.slice(0, topCount);
    const additionalData = studentData.filter((d) =>
      additionalCountries.includes(d.nation)
    );

    // Combine and ensure no duplicates
    const combinedData = [
      ...new Map([...topData, ...additionalData].map((item) => [item.nation, item])).values(),
    ];
    setFilteredData(combinedData);
  }, [topCount, additionalCountries]);

  // Render chart with D3
  useEffect(() => {
    if (!svgRef.current || !filteredData.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const chartWidth = width - marginLeft - marginRight;
    const chartHeight = height - marginTop - marginBottom;

    // Scales
    const yScale = d3
      .scaleBand()
      .domain(filteredData.map((d) => d.nation))
      .range([0, chartHeight])
      .padding(0.1);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.tot_females)])
      .nice()
      .range([0, chartWidth]);

    // Append axes
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${marginLeft},${marginTop})`);

    chart
      .append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(xAxis);

    chart.append("g").call(yAxis);

    // Append bars
    chart
      .selectAll(".my-bar")
      .data(filteredData)
      .join("rect")
      .attr("class", "my-bar")
      .attr("y", (d) => yScale(d.nation))
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .attr("width", (d) => xScale(d.tot_females))
      .attr("fill", colors[0])
      .on("mouseover", function (event, d) {
        // Change opacity of bars only in this specific chart
        d3.selectAll(".my-bar").style("opacity", 0.2);
        d3.select(this).style("opacity", 1);

        // Show the tooltip
        const tooltip = d3.select(tooltipRef.current);
        tooltip
          .style("position", "absolute")
          .style("background", "black")
          .style("color", "white")
          .style("padding", "5px")
          .style("border-radius", "5px")
          .style("pointer-events", "none")
          .style("opacity", 1)
          .html(`<strong>${d.nation}</strong><br/>Females: ${Intl.NumberFormat().format(d.tot_females)}`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 20}px`);
      })
      .on("mouseout", function () {
        // Reset the opacity for all bars
        d3.selectAll(".my-bar").style("opacity", 1);

        // Hide the tooltip
        const tooltip = d3.select(tooltipRef.current);
        tooltip.style("opacity", 0);
      });
  }, [filteredData, width, height, marginTop, marginRight, marginBottom, marginLeft, colors]);

  const topOptions = [
    { value: 5, label: "Top 5" },
    { value: 10, label: "Top 10" },
    { value: 20, label: "Top 20" },
  ];

  const stateOptions = studentData.map((d) => ({
    value: d.nation,
    label: d.nation,
  }));

  return (
    <div>
      <div>
        <div className="filters-bar d-flex justify-content-center gap-3">
          <div className={window.innerWidth > 1024 ? "w-25" : "w-50"}>
            <Select
              options={topOptions}
              defaultValue={topOptions[0]}
              onChange={(e) => {
                setTopCount(Number(e.value));
              }}
            />
          </div>
          <div className={window.innerWidth > 1024 ? "w-25" : "w-50"}>
            <Select
              options={stateOptions.sort((a, b) =>
                a.label.localeCompare(b.label)
              )}
              isMulti={true}
              placeholder="Add countries to the plot"
              onChange={(selectedOptions) => {
                const selectedCountries = selectedOptions.map((opt) => opt.value);
                setAdditionalCountries(selectedCountries);
              }}
            />
          </div>
        </div>
      </div>

      <svg ref={svgRef} width={width} height={height}></svg>

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
