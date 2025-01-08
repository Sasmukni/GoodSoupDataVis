import * as d3 from "d3";
import { useState } from "react";
import { geoData } from "../data/europegeodata";
import numData from "../data/Project_secondsection_data.json";

export default function BubbleChart({
  width = 800,
  height = 800,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 10,
}) {
  const [focused, setFocused] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2013);

  const bubbleData = numData.filter(d => d.year === selectedYear).map(d => ({
    nation: d.nation,
    femaleDoctoral: d.fem_doctoral_type
  }));

  const nations = bubbleData.map(d => d.nation);
  const filteredGeoData = geoData.features.filter((feat) => nations.includes(feat.properties.NAME_ENGL));
  const projection = d3.geoMercator().fitSize([width - marginLeft - marginRight, height - marginTop - marginBottom], geoData);
  const geoPathGenerator = d3.geoPath().projection(projection);

  const sizeScale = d3.scaleSqrt()
    .domain([0, d3.max(bubbleData, d => d.femaleDoctoral)])
    .range([0, 50]);

  const opacityScale = d3.scaleLinear()
    .domain([0, d3.max(bubbleData, d => d.femaleDoctoral)])
    .range([0.3, 1]);
  

  return (
    <div style={{ flex: 1 }}>
      <h4 className="mb-4">Female Doctoral Students in Europe (Bubble Chart)</h4>

      {/* Year Selector */}
      <div>
        <label htmlFor="yearSelect">Select Year: </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => 2013 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* SVG to render the map and bubbles */}
      <svg width={width} height={height}>
        <g>
          {filteredGeoData.map((shape) => (
            <path
              key={shape.id}
              d={geoPathGenerator(shape.geometry)}
              stroke={focused === shape.properties.NAME_ENGL ? "black" : "lightgrey"}
              strokeWidth={focused === shape.properties.NAME_ENGL ? 1 : 0.5}
              fill="lightgrey"
              fillOpacity={1}
            />
          ))}
        </g>
        <g>
          {bubbleData.map(({ nation, femaleDoctoral }) => {
            const shape = filteredGeoData.find((d) => d.properties.NAME_ENGL === nation);
            if (!shape) return null;
            const centroid = geoPathGenerator.centroid(shape);
            const bubbleSize = sizeScale(femaleDoctoral);
            return (
              <circle
                key={nation}
                cx={centroid[0]}
                cy={centroid[1]}
                r={bubbleSize}
                fill="purple"
                fillOpacity={opacityScale(femaleDoctoral)}
                onMouseOver={(e) => {
                  setHoveredCircle(nation);
                  setTooltip({
                    visible: true,
                    value: `${nation}: ${Intl.NumberFormat().format(femaleDoctoral)} women in doctoral level`,
                    x: e.pageX,
                    y: e.pageY,
                  });
                }}
                onMouseLeave={() => {
                  setHoveredCircle(null);
                  setTooltip({ ...tooltip, visible: false });
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            background: "white",
            border: "1px solid black",
            padding: "5px",
            pointerEvents: "none",
          }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
}
