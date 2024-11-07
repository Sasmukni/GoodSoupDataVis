import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";

export default function StackedMultipleBarPlot({
  data = [{"Continent":"Asia","Top1_Country":"Qatar","Top1_Emissions":37.601273,"Top1_Percentage":10.8552281296,"Top2_Country":"United Arab Emirates","Top2_Emissions":25.833244,"Top2_Percentage":7.4578793369,"Top3_Country":"Bahrain","Top3_Emissions":25.672274,"Top3_Percentage":7.4114084083,"Top4_Country":"Kuwait","Top4_Emissions":25.578102,"Top4_Percentage":7.3842216015,"Top5_Country":"Brunei","Top5_Emissions":23.950201,"Top5_Percentage":6.9142578126,"Others_Emissions":207.4581446,"Others_Percentage":59.8917352339},{"Continent":"Europe","Top1_Country":"Faroe Islands","Top1_Emissions":14.084624,"Top1_Percentage":5.4180009437,"Top2_Country":"Luxembourg","Top2_Emissions":11.618432,"Top2_Percentage":4.4693188501,"Top3_Country":"Russia","Top3_Emissions":11.416899,"Top3_Percentage":4.391794169,"Top4_Country":"Iceland","Top4_Emissions":9.499798,"Top4_Percentage":3.654333586,"Top5_Country":"Czechia","Top5_Emissions":9.3357525,"Top5_Percentage":3.5912294041,"Others_Emissions":202.3476926,"Others_Percentage":77.8380728842}],
  width = 860,
  height = 500,
  marginTop = 40,
  marginRight = 80,
  marginBottom = 40,
  marginLeft = 80,
}) {
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });
  const svgRef = useRef();
  const gx = useRef();
  const gy = useRef();

  useEffect(() => {
    const mouseleave = function () {
      d3.selectAll(".myRect").style("opacity", 0.8);
      setTooltip({ ...tooltip, visible: false });
    };

    const w = width - marginLeft;
    const h = height - marginBottom;

    const chartGroups = [
      { key: "Top1_Country", label: "Top1 Country", color: "orange" },
      { key: "Top2_Country", label: "Top2 Country", color: "gold" },
      { key: "Top3_Country", label: "Top3 Country", color: "blue" },
      { key: "Others", label: "Others Countries", color: "teal" },
    ];

    const groups = data.map((d) => d.Continent);

    const y = d3.scaleBand().domain(groups).range([marginTop, h]).padding(0.2); 
    const x1 = d3.scaleLinear()
      .domain([0, d3.max(data, (d) =>  d.Top1_Emissions)])
      .range([0, (w - marginRight)/4]);

    const x2 = d3.scaleLinear()
      .domain([0, d3.max(data, (d) =>  d.Top1_Emissions)])
      .range([0, (w - marginRight)/4]);
  
    const x3 = d3.scaleLinear()
    .domain([0, d3.max(data, (d) =>  d.Top1_Emissions)])
    .range([0, (w - marginRight)/4]);

    const x4 = d3.scaleLinear()
    .domain([0, d3.max(data, (d) =>  d.Top1_Emissions)])
    .range([0, (w - marginRight)/4]);

    const plot = d3.select(svgRef.current);
    plot.selectAll("*").remove();

    plot.append("g")
      .attr("transform", `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(y));

    chartGroups.forEach((group, i) => {
      plot.append("text")
        .attr("x", marginLeft + i * (w / 4) + (w / 8))
        .attr("y", marginTop / 2)
        .attr("text-anchor", "middle")
        .style("fill", group.color)
        .style("font-weight", "bold")
        .text(group.label);

      plot.append("g")
        .selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", marginLeft + i * (w / 4))
        .attr("y", (d) => y(d.Continent))
        .attr("height", y.bandwidth()) // Use a larger percentage of bandwidth for height
        .attr("width", (d) => { switch(i) {
            case 0: return x1(d[group.key.split("_")[0] + "_Emissions"])
            case 1: return x2(d[group.key.split("_")[0] + "_Emissions"])
            case 2: return x3(d[group.key.split("_")[0] + "_Emissions"])
            case 3: return x4(d[group.key.split("_")[0] + "_Emissions"])
          }} ) // Increase width for better visibility
        .attr("fill", group.color)
        .attr("class", "myRect " + group.key)
        .attr("stroke", "grey")
        .on("mouseover", function (event, d) {
          d3.selectAll(".myRect").style("opacity", 0.2);
          d3.selectAll("." + group.key).style("opacity", 1);

          setTooltip({
            visible: true,
            value: `${group.key !== "Others" ? d[group.key] : group.key}: ${d[group.key.split("_")[0] + "_Emissions"]}`,
            x: event.pageX,
            y: event.pageY,
          });
        })
        .on("mouseleave", mouseleave);
    });
  }, [data]);

  return (
    <>
      <svg width={width} height={height} ref={svgRef}>
        <g ref={gx} transform={`translate(${marginLeft},0)`} />
        <g ref={gy} transform={`translate(0,${marginTop})`} />
      </svg>
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
          {tooltip.value}
        </div>
      )}
    </>
  );
}
