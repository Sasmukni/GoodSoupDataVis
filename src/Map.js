import * as d3 from 'd3';
import {useState} from "react";

function nthRoot(val,n){
  if(n%2==0){
    return Math.pow(val,1/n);
  }else{
    return val>0 ? Math.pow(val,1/n) : -Math.pow(-val,1/n);
  }
}

export const Map = ({ width, height, geoData, numData, angle=[0,0] }) => {
  const [focused, setFocused] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });

  var colorScale = d3
    .scaleLinear()
    .domain([d3.min([...numData.map(d=>nthRoot(d.Emissions??d.Tot_Emissions,3))]),0,d3.max([...numData.map(d=>nthRoot(d.Emissions??d.Tot_Emissions,3))])])
    .range(["#00FF00",'#FFFFFF', '#FF0000']);
  var geoDataFiltered = geoData.features.filter((shape) => shape.id !== 'ATA');
  const projection = d3
  .geoOrthographic() //.geoMercator()//.geoAzimuthalEqualArea()//.geoGnomonic()//
    .fitSize([width, height], geoData).rotate(angle);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = geoDataFiltered.sort((a,b)=> {if(a.id === focused) return 1; if (b.id === focused) return -1; return a.id-b.id})
    .map((shape) => {
      const regionData = numData.find((region) => region.Code === shape.id);
      const color = regionData ? colorScale(nthRoot(regionData?.Emissions ?? regionData?.Tot_Emissions,3)) : 'lightgrey';
      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape)}
          stroke={focused === shape.id? "black": "lightGrey"}
          strokeWidth={focused === shape.id? 1: 0.5}
          fill={color}
          fillOpacity={1}
          onMouseOver={(e)=>{
            setFocused(shape.id);
            var label = `${regionData?.Emissions ?? regionData?.Tot_Emissions}` + " tonnes" + (regionData?.Emissions? " per person":"");
            if(!(regionData?.Emissions ?? regionData?.Tot_Emissions))
              label = "no data"
            setTooltip({
                  visible: true,
                  value: label,
                  x: e.pageX,
                  y: e.pageY
              });
          }}
          onMouseLeave={(e)=>{
            setFocused(null);
            setTooltip({ ...tooltip, visible: false });
          }}
        />
      );
    })

  return (
    <div>
      <svg width={width} height={height}>
        {allSvgPaths}
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
    </div>
  );
};
