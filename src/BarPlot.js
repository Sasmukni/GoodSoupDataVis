import * as d3 from "d3";
import {useRef, useEffect,useState} from "react";

export default function BarPlot({
  data = [{Entity:"Saudi Arabia", Emissions:230},{Entity:"China", Emissions:1000},{Entity:"Taiwan", Emissions:20},{Entity:"Serbia", Emissions:50},{Entity:"Russia", Emissions:700}],
  width = 640,
  height = 400,
  marginTop = 40,
  marginRight = 40,
  marginBottom = 40,
  marginLeft = 40
}) {
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });
 
  var mouseleave = function(d) {
    // Back to normal opacity: 0.8
    d3.selectAll("rect")
      .style("opacity",0.8
    )
    setTooltip({ ...tooltip, visible: false });
  }
  const w = width  - marginLeft; 
  const h = height  - marginBottom;
  const g =  useRef();
  const gx = useRef();
  const gy = useRef();
  const x = d3.scaleBand(data.map(d=>d.Entity),[ 0,h  ]).padding(.2);
  const y = d3.scaleLinear(d3.extent([...data.map(d=>d.Emissions),0]), [ 0,w ]);
  const regex =new RegExp(" *\\(*\\)*", "gi");
  useEffect(() => void d3.select(gx.current).call(d3.axisLeft(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisTop(y)), [gy, y]);
  return (
    <>
    <svg width={width} height={height} >
      <g ref={g} transform = {`translate(${marginRight},${marginTop})`}>
        <g ref={gx}/>
        <g ref={gy}/>
        {data.map(d =>(
          <rect 
            id={d.Entity.replaceAll(regex,"_")}
            x={y(0)} 
            y={x(d.Entity)} 
            width={y(d.Emissions)-y(0)} 
            height={x.bandwidth()} 
            fill={'#694'}
            opacity={0.8}
            onMouseOver={(event) =>{
              d3.selectAll("rect").style("opacity", 0.2)
              d3.select("#"+event.currentTarget.id).style("opacity", 1)
              // Mostrare il tooltip
              setTooltip({
                  visible: true,
                  value: `${d.Emissions}`,
                  x: event.pageX,
                  y: event.pageY
              });
            }} 
            onMouseLeave={mouseleave}
            values={d.Emissions}
          />
          ))
        }
      </g>
    </svg>
    {tooltip.visible && (
      <div style={{
          position: 'absolute',
          left: tooltip.x,
          top: tooltip.y,
          background: 'white',
          border: '1px solid black',
          padding: '5px',
          pointerEvents: 'none'
      }}>
          {tooltip.value}
      </div>
    )}
    </>
  );
}