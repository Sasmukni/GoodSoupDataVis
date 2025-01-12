import * as d3 from "d3";
import {useRef, useEffect} from "react";

export default function GroupedBarChart({
  data = [{level:"Short Cycle",group:"Males",value:10},{level:"Short Cycle",group:"Females",value:12},
    {level:"Bachelor",group:"Males",value:13},{level:"Bachelor",group:"Females",value:15}],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 70,
  colors = ["pink","lightblue"]
}) {
  const svgRef = useRef();
  const tooltipRef = useRef(); // Ref for the tooltip
    useEffect(() => {
      if (!svgRef.current || !data.length) return;
  
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous content
  
      const chartWidth = width - marginLeft - marginRight;
      const chartHeight = height - marginTop - marginBottom;
  
      // Scales
      const yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.level))
        .range([0, chartHeight])
        .padding(0.2);
  
      const ySubScale = d3
        .scaleBand()
        .domain([...new Set(data.map((d) => d.group))])
        .range([0, yScale.bandwidth()])
        .padding(0.1);
      
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value)])
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
        .selectAll(".grouped-bar")
        .data(data)
        .join("rect")
        .attr("class", "grouped-bar")
        .attr("y", (d) => yScale(d.level) + ySubScale(d.group))
        .attr("x", 1)
        .attr("height", ySubScale.bandwidth())
        .attr("width", (d) => xScale(d.value))
        .attr("fill", (d)=> d.group==="Female"?colors["Females"]:colors["Males"])
        .on("mouseover", function (event, d) {
          // Change opacity of bars only in this specific chart
          d3.selectAll(".grouped-bar").style("opacity", 0.2);
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
            .html(`<strong>${d.level}</strong><br/>${d.group}: ${Intl.NumberFormat().format(d.value)}`)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
        })
        .on("mouseout", function () {
          // Reset the opacity for all bars
          d3.selectAll(".grouped-bar").style("opacity", 1);
  
          // Hide the tooltip
          const tooltip = d3.select(tooltipRef.current);
          tooltip.style("opacity", 0);
        });

        // Legend
        const legend = svg.append("g")
        .attr("transform", `translate(${width-marginRight*3.5},${height - marginBottom*3.5})`);

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
    }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft, colors]);
  

  return (
    <div>
      <svg ref={svgRef} width={width} height={height}></svg>
      <p style={{textAlign:"left"}}>Across most countries, bachelor-level programs attract the majority of students. In some, such as Turkey and France, short-cycle programs are also popular, while in others, like Italy, they are uncommon, or there is no data, as with Romania. In Western Europe, many students pursue master’s degrees, such as in France and Italy, whereas in Eastern Europe, this is less common, except for some countries like Romania and Ireland. The number of doctoral students is generally low.
      </p>
      <p style={{textAlign:"left"}}>Regarding gender, women outnumber men up to the master’s level in most countries. However, countries like Germany and Turkey are exceptions. At the doctoral level, even in countries with more female students overall, men tend to dominate, as seen in France.
      </p>
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