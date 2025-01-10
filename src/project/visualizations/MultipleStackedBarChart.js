import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from "../data/Project_multistackedbarchart_data";
import Select from "react-select";

export default function StackedMultipleBarPlot({
  data = studentData,
  width = 860,
  height = 600,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 40,
  marginLeft = 100,
  colors = {}
}) {
  const [year, setYear] = useState(2013);
  const [tooltip, setTooltip] = useState({ visible: false, value: '', nation: '', x: 0, y: 0 });
  const svgRef = useRef();

  const years = [
      ...[...new Set(studentData.map(d => d.year))].map(year => ({
        value: year,
        label: year.toString(),
      })),
    ];

  const filteredData = data.filter(d => d.year === year);


  useEffect(() => {
    const mouseleave = function () {
      d3.selectAll(".myRect").style("opacity", 0.8);
      setTooltip({ ...tooltip, visible: false });
    };

    const w = width - marginLeft - marginRight;
    const h = height - marginTop - marginBottom;

    const nations = filteredData.map(d => d.nation).sort((a, b) => {
      const aTot = filteredData.find(d => d.nation === a).tot_neets;
      const bTot = filteredData.find(d => d.nation === b).tot_neets;
      return bTot - aTot;
    });

    const y = d3.scaleBand().domain(nations).range([marginTop, marginTop + h]).padding(0.2);

    const maxTotal = d3.max(filteredData, d => Math.max(d.tot_females, d.tot_males));
    const xScale = d3.scaleLinear()
      .domain([0, maxTotal])
      .range([0, (w / 2) - 10]);

    const femaleOffset = marginLeft;

    const plot = d3.select(svgRef.current);
    plot.selectAll("*").remove();

    plot.append("g")
      .attr("transform", `translate(${femaleOffset}, 0)`)
      .call(d3.axisLeft(y));

    const categories = [
      { key: "tot_females", label: "Females", color: colors["Females"], offset: femaleOffset },
      { key: "tot_males", label: "Males", color: colors["Males"], offset: marginLeft + xScale(maxTotal) + 20 }
    ];

    categories.forEach(group => {
      plot.append("text")
        .attr("x", group.offset + (xScale(maxTotal) / 2))
        .attr("y", marginTop / 2)
        .attr("text-anchor", "middle")
        .style("fill", group.color)
        .style("font-weight", "bold")
        .text(group.label);

      plot.append("g")
        .selectAll("rect")
        .data(filteredData)
        .enter().append("rect")
        .attr("x", group.offset)
        .attr("y", d => y(d.nation))
        .attr("height", y.bandwidth())
        .attr("width", d => xScale(d[group.key]))
        .attr("fill", group.color)
        .attr("class", "myRect " + group.key)
        .attr("stroke", "grey")
        .on("mouseover", function (event, d) {
          d3.selectAll(".myRect").style("opacity", 0.2);
          d3.selectAll("." + group.key).style("opacity", 1);

          setTooltip({
            visible: true,
            value: `${d[group.key]}%`,
            nation: d.nation,
            x: event.pageX,
            y: event.pageY,
          });
        })
        .on("mouseleave", mouseleave);
    });
  }, [year, data]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <label htmlFor="year-select">Select Year: </label>
          <div className='container my-3 filters-bar d-flex justify-content-center gap-3'>  
        <Select
          style={{ marginBottom: '10px' }}
          className={window.innerWidth > 1024 ? "w-25" : "w-50"}
          defaultValue={years.find(y => y.value === year)}
          onChange={(e) => setYear(e.value)}
          options={years}
        />
      </div>
      <svg width={width} height={height} ref={svgRef} />
      {tooltip.visible && (
        <div style={{
          position: 'absolute',
          left: tooltip.x,
          top: tooltip.y,
          background: 'white',
          border: '1px solid black',
          padding: '5px',
          pointerEvents: 'none',
        }}>
          {tooltip.nation}: {tooltip.value}
        </div>
      )}
      </div>
    </>
  );
}
