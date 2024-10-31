import * as d3 from "d3";
import {useRef, useEffect} from "react";

export default function BarPlot({
  data = [{country:"Saudi Arabia", emissions:230},{country:"China", emissions:1000},{country:"Taiwan", emissions:20},{country:"Serbia", emissions:50},{country:"Russia", emissions:700}],
  width = 640,
  height = 400,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 40,
  marginLeft = 40
}) {
  const w = width  - marginRight; 
  const h = height  - marginBottom;
  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleBand(data.map(d=>d.country),[ marginTop,h  ]).padding(.2);
  const y = d3.scaleLinear(d3.extent([...data.map(d=>d.emissions),0]), [ marginRight,w ]);
  useEffect(() => void d3.select(gx.current).call(d3.axisLeft(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisTop(y)), [gy, y]);
  return (
    <svg width={width} height={height} >
      <g ref={gx} transform={`translate(${marginRight},0)`} />
      <g ref={gy} transform={`translate(${marginRight*0},${marginTop})`}/>
      {data.map(d =>(
        <rect x={y(0)} y={x(d.country)} width={y(d.emissions)} height={x.bandwidth()} fill={'#694'}/>
        ))
      }
    </svg>
  );
}