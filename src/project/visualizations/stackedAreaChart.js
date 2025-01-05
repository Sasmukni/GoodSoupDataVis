import * as d3 from "d3";
import { useRef, useEffect } from "react";
import studentData from '../data/Project_stackedareachart_data';

export default function StackedAreaChart({
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 60,
  colors = ["blue", "pink"]
}) {
  const svgRef = useRef();

  useEffect(() => {
    const data = studentData;

    const svg = d3.select(svgRef.current);

    const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "black")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("pointer-events", "none")
      .style("visibility", "hidden");

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([marginLeft, width - marginRight]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.tot_students)]) 
      .nice()
      .range([height - marginBottom, marginTop]);

    const maleArea = d3
      .area()
      .x(d => xScale(d.year))
      .y0(yScale(0))
      .y1(d => yScale(d.tot_males));

    const femaleArea = d3
      .area()
      .x(d => xScale(d.year))
      .y0(d => yScale(d.tot_males))
      .y1(d => yScale(d.tot_students));

    svg.append("path")
      .datum(data)
      .attr("fill", colors[1])
      .attr("d", femaleArea)
      .on("mousemove", (event, d) => {
        const [x] = d3.pointer(event);
        const year = Math.round(xScale.invert(x));
        const entry = data.find(d => d.year === year);
        if (entry) {
          const value = entry.tot_females;
          tooltip.style("visibility", "visible")
            .style("top", `${event.pageY + 10}px`)
            .style("left", `${event.pageX + 10}px`)
            .text(`Year: ${year}, Females: ${value}`);
        }
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));

    svg.append("path")
      .datum(data)
      .attr("fill", colors[0])
      .attr("d", maleArea)
      .on("mousemove", (event, d) => {
        const [x] = d3.pointer(event);
        const year = Math.round(xScale.invert(x));
        const entry = data.find(d => d.year === year);
        if (entry) {
          const value = entry.tot_males;
          tooltip.style("visibility", "visible")
            .style("top", `${event.pageY + 10}px`)
            .style("left", `${event.pageX + 10}px`)
            .text(`Year: ${year}, Males: ${value}`);
        }
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));

    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(xScale).ticks(data.length).tickFormat(d3.format("d")));

      svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(yScale).ticks(10).tickFormat(d => d3.format(",.0f")(d)));    

    const legend = svg.append("g")
      .attr("transform", `translate(${width - marginRight - 120},${marginTop})`);

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

  return <svg ref={svgRef} width={width} height={height}></svg>;
}
