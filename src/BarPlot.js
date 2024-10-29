import * as d3 from "d3";
import {useRef, useEffect} from "react";

export default function BarPlot({
  data = [{country:"Saudi Arabia", emissions:230},{country:"Saudi Arabia", emissions:230},{country:"Saudi Arabia", emissions:230},{country:"Saudi Arabia", emissions:230},{country:"Saudi Arabia", emissions:230}],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 30,
  marginLeft = 40
}) {
  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleBand(data.map(d=>d.country),[ marginTop,height - marginBottom]);
  const y = d3.scaleLinear(d3.extent(data.map(d=>d.emissions)), [width - marginLeft, marginRight]);
  const line = d3.line((d, i) => x(i), y);
  useEffect(() => void d3.select(gx.current).call(d3.axisTop(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );
}