/*import { scaleOrdinal } from "d3";
import { sankey, sankeyJustify, sankeyLinkHorizontal } from "d3-sankey";
import React from "react";

const MARGIN_Y = 25;
const MARGIN_X = 5;
const COLORS = ["#e0ac2b", "#e85252", "#6689c6", "#9a6fb0", "#a53253"];

type Data = {
  nodes: { name: string; category: string }[];
  links: { source: string; target: string; value: number }[];
};

type SankeyProps = {
  width: number;
  height: number;
  data: Data;
};

function aaaaa(sankeyGenerator:any):number{
  let val;
  if(typeof(sankeyGenerator) !== "number"){
    val = sankeyGenerator.nodeWidth()
    if(typeof(val)==="number")
      return val
  }
  return 10
}

export const Sankey = ({ width, height, data }: SankeyProps) => {
  const allGroups = [...new Set(data.nodes.map((d) => d.category))].sort();
  const colorScale = scaleOrdinal<string>().domain(allGroups).range(COLORS);

  // Set the sankey diagram properties
  const sankeyGenerator = sankey().nodeWidth(26)
  if(typeof(sankeyGenerator) !== "number")
    sankeyGenerator.nodePadding(10)
  if(typeof(sankeyGenerator) !== "number")
    sankeyGenerator.extent([
      [MARGIN_X, MARGIN_Y],
      [width - MARGIN_X, height - MARGIN_Y],
    ])
  if(typeof(sankeyGenerator) !== "number")
    sankeyGenerator.nodeId((node) => node.name) // Accessor function: how to retrieve the id that defines each node. This id is then used for the source and target props of links
  if(typeof(sankeyGenerator) !== "number")
    sankeyGenerator.nodeAlign(sankeyJustify); // Algorithm used to decide node position

  // Compute nodes and links positions
  const { nodes, links } = typeof(sankeyGenerator) !== "number"?sankeyGenerator(data):{nodes:null,links:null};

  //
  // Draw the nodes
  //
  const allNodes = nodes.map((node) => {
    return (
      <g key={node.index}>
        <rect
          height={node.y1 - node.y0}
          width={aaaaa(sankeyGenerator)}
          x={node.x0}
          y={node.y0}
          stroke={"black"}
          fill={colorScale(node.category)}
          fillOpacity={1}
          rx={0.9}
        />
      </g>
    );
  });

  //
  // Draw the links
  //
  const allLinks = links.map((link, i) => {
    const linkGenerator = sankeyLinkHorizontal();
    const path = linkGenerator(link);

    return (
      <path
        key={i}
        d={path}
        stroke={colorScale(link.source.category)}
        fill="none"
        strokeOpacity={0.3}
        strokeWidth={link.width}
      />
    );
  });

  //
  // Draw the Labels
  //
  const allLabels = nodes.map((node, i) => {
    return (
      <text
        key={i}
        x={node.x0 < width / 2 ? node.x1 + 6 : node.x0 - 6}
        y={(node.y1 + node.y0) / 2}
        dy="0.35rem"
        textAnchor={node.x0 < width / 2 ? "start" : "end"}
        fontSize={12}
      >
        {node.name}
      </text>
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        {allLinks}
        {allNodes}
        {allLabels}
      </svg>
    </div>
  );
};
*/