import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import Select from "react-select";

export default function HorizontalBarChart({
  data = [
    { nation: "Türkiye", tot_females: 35874640 },
    { nation: "United Kingdom", tot_females: 19151118 },
    { nation: "France", tot_females: 17184408 },
    { nation: "Germany", tot_females: 15167897 },
    { nation: "Spain", tot_females: 13569595 },
    { nation: "Italy", tot_females: 12283927 },
    { nation: "Poland", tot_females: 11963447 },
    { nation: "Netherlands", tot_females: 5167361 },
    { nation: "Belgium", tot_females: 4596883 },
    { nation: "Greece", tot_females: 3703638 },
    { nation: "Romania", tot_females: 3480525 },
    { nation: "Sweden", tot_females: 2883439 },
    { nation: "Portugal", tot_females: 2330086 },
    { nation: "Finland", tot_females: 2313678 },
    { nation: "Czechia", tot_females: 2305125 },
    { nation: "Austria", tot_females: 2290963 },
    { nation: "Hungary", tot_females: 2033894 },
    { nation: "Norway", tot_females: 1934306 },
    { nation: "Denmark", tot_females: 1775822 },
    { nation: "Switzerland", tot_females: 1761003 },
  ],
  width = 800,
  height = 600,
  marginTop = 50,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 150,
  colors = ["pink"],
}) {
  const svgRef = useRef();
  const [topCount, setTopCount] = useState(10); // Default to top 10
  const [additionalCountries, setAdditionalCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Update filtered data whenever `topCount` or `additionalCountries` changes
  useEffect(() => {
    const sortedData = [...data].sort((a, b) => b.tot_females - a.tot_females);
    const topData = sortedData.slice(0, topCount);
    const additionalData = data.filter((d) =>
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
      .selectAll(".bar")
      .data(filteredData)
      .join("rect")
      .attr("class", "bar")
      .attr("y", (d) => yScale(d.nation))
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .attr("width", (d) => xScale(d.tot_females))
      .attr("fill", colors[0])
      .on("mouseover", function (event, d) {
        d3.select(this).attr("fill", d3.color("pink").brighter(-1));
        const tooltip = svg
          .append("text")
          .attr("x", event.pageX - marginLeft)
          .attr("y", event.pageY - marginTop - 10)
          .attr("class", "tooltip")
          .text(`${d.nation}: ${d.tot_females}`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", colors[0]);
        svg.selectAll(".tooltip").remove();
      });
  }, [filteredData, width, height, marginTop, marginRight, marginBottom, marginLeft, colors]);

  const topOptions = [
    { value: 5, label: "Top 5" },
    { value: 10, label: "Top 10" },
    { value: 20, label: "Top 20" },
  ];

  const stateOptions = data.map((d) => ({
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
              defaultValue={topOptions[1]} // Default to Top 10
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
    </div>
  );
}
