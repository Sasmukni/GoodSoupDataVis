import * as d3 from "d3";
import {useRef, useEffect} from "react";

export default function BarPlot({
  data = [{Entity:"Saudi Arabia", Emissions:230},{Entity:"China", Emissions:1000},{Entity:"Taiwan", Emissions:20},{Entity:"Serbia", Emissions:50},{Entity:"Russia", Emissions:700}],
  width = 640,
  height = 400,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 40,
  marginLeft = 40
}) {
  var mouseover = function(d) {
    // what subgroup are we hovering?
    var _this = this;
    //var subgroupName = d3.select(this.parentNode).datum().key; // This was the tricky part
    //var subgroupValue = d.data[subgroupName];
    // Reduce opacity of all rect to 0.2
    d3.selectAll("rect").style("opacity", 0.2)
    // Highlight all rects of this subgroup with opacity 0.8. It is possible to select them since they have a specific class = their name.
    d3.select("#"+d.currentTarget.id).style("opacity", 1)
    }
  var mouseleave = function(d) {
    // Back to normal opacity: 0.8
    d3.selectAll("rect")
      .style("opacity",0.8

      )
    }
  const w = width  - marginLeft; 
  const h = height  - marginBottom;
  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleBand(data.map(d=>d.Entity),[ marginTop,h  ]).padding(.2);
  const y = d3.scaleLinear(d3.extent([...data.map(d=>d.Emissions),0]), [ marginRight,w ]);
  const regex =new RegExp(" *\\(*\\)*", "g");
  useEffect(() => void d3.select(gx.current).call(d3.axisLeft(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisTop(y)), [gy, y]);
  return (
    <svg width={width} height={height} >
      <g ref={gx} transform={`translate(${marginRight},0)`} />
      <g ref={gy} transform={`translate(${marginRight*0},${marginTop})`}/>
      {data.map(d =>(
        <rect 
          id={d.Entity.replaceAll(regex,"_")}
          x={y(0)} 
          y={x(d.Entity)} 
          width={y(d.Emissions)-y(0)} 
          height={x.bandwidth()} 
          fill={'#694'}
          opacity={0.8}
          onMouseOver={mouseover} 
          onMouseLeave={mouseleave} 
        />
        ))
      }
    </svg>
  );
}