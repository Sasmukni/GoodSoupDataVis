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

  const allSvgPaths = filteredGeoData.map((shape) => {
    const countryName = shape.properties?.NAME_ENGL ?? 'No Data';
    const bubble = bubbleData.find(d => d.nation === countryName);
   
    const bubbleSize = bubble ? sizeScale(bubble.femaleDoctoral) : 0;
    const centroid = geoPathGenerator.centroid(shape); 

    const adjustedX = Math.max(marginLeft, Math.min(width - marginRight, centroid[0]));
    const adjustedY = Math.max(marginTop, Math.min(height - marginBottom, centroid[1]));

    return (
      <g key={shape.id}>
        <path
          d={geoPathGenerator(shape.geometry)}
          stroke={focused === countryName ? "black" : "lightgrey"}
          strokeWidth={focused === countryName ? 1 : 0.5}
          fill="lightgrey"
          fillOpacity={1}
        />
        {bubbleSize > 0 && (
          <circle
            cx={adjustedX}
            cy={adjustedY}
            r={bubbleSize}
            fill="purple"
            fillOpacity={hoveredCircle === countryName ? 2 : 0.6}
            onMouseOver={(e) => {
              setHoveredCircle(countryName);
              setTooltip({
                visible: true,
                value: `${countryName}: ${bubble.femaleDoctoral} women in doctoral level`,
                x: e.pageX,
                y: e.pageY
              });
            }}
            onMouseLeave={() => {
              setHoveredCircle(null);
              setTooltip({ ...tooltip, visible: false });
            }}
          />
        )}
      </g>
    );
  });

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
        {allSvgPaths}
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
