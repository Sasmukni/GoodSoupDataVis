import * as d3 from "d3";

import {useState} from "react";
import { geoData } from "../data/europegeodata";
import  numData from "../data/Project_secondsection_data.json";

export default function BubbleChart({
  data = [230,420,690,880,400],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 10,
  colors = ["steelblue"]
}) {
  const [focused, setFocused] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });
  var nations = numData.map(d => d.nation);
  var newGeoData = geoData;
  newGeoData.features = newGeoData.features.filter((feat)=> nations.includes(feat.properties.NAME_ENGL));
  var myGeoData = newGeoData.features;
  const projection = d3.geoMercator().fitSize([width, height], newGeoData);///.center([0,62]).scale(500)//.
  const geoPathGenerator = d3.geoPath().projection(projection);
  const allSvgPaths = myGeoData.sort((a,b)=> {if(a.properties.NAME_ENGL === focused) return 1; if (b.properties.NAME_ENGL === focused) return -1; return a.properties.NAME_ENGL-b.properties.NAME_ENGL})
    .map((shape) => {
      //const regionData = data.find((region) => region.Code === shape.id);
      const color =  'lightgrey';//regionData ? colorScale(nthRoot(regionData?.Emissions ?? regionData?.Tot_Emissions,3)) :
      const countryName = shape.properties?.NAME_ENGL ?? 'No Data'; 
      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape.geometry)}
          stroke={focused === shape.properties.NAME_ENGL? "black": "lightGrey"}
          strokeWidth={focused === shape.properties.NAME_ENGL? 1: 0.5}
          fill={color}
          fillOpacity={1}
          onMouseOver={(e)=>{
            setFocused(shape.properties.NAME_ENGL);
            var label = "CIAO";
            /*var label = `${regionData?.Emissions ?? Intl.NumberFormat().format(regionData?.Tot_Emissions)} tonnes ${(regionData?.Emissions? " per person":"")}`;
            if(!(regionData?.Emissions ?? regionData?.Tot_Emissions))
              label = "no data"*/
           label = `${countryName}: ${label}`;
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
     <div style={{ flex: 1 }}>
          <h4 className='mb-4'>Third Grade Students in Europe</h4>
          <svg width={width} height={height}>
            {allSvgPaths}
          </svg>
          {tooltip.visible && (
            <div
              style={{
                position: 'absolute',
                left: tooltip.x,
                top: tooltip.y,
                background: 'white',
                border: '1px solid black',
                padding: '5px',
                pointerEvents: 'none',
              }}
            >
              {tooltip.value}
            </div>
          )}
        </div>
  );
}