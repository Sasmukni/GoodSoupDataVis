/*
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
      const countryName = shape.properties?.name ?? 'No Data'; //new
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
*/

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
  const [projectionType, setProjectionType] = useState('geoOrthographic');

  const projectionMap = {
    geoOrthographic: d3.geoOrthographic,
    geoMercator: d3.geoMercator,
    geoAzimuthalEqualArea: d3.geoAzimuthalEqualArea,
    geoGnomonic: d3.geoGnomonic,
    geoConicConformal: d3.geoConicConformal,
    geoConicEquidistant: d3.geoConicEquidistant,
    geoEqualEarth: d3.geoEqualEarth,
    geoNaturalEarth1: d3.geoNaturalEarth1,
    geoStereographic: d3.geoStereographic,
    geoEquirectangular: d3.geoEquirectangular,
  };
  
  var colorScale = d3
    .scaleLinear()
    .domain([d3.min([...numData.map(d=>nthRoot(d.Emissions??d.Tot_Emissions,3))]),0,d3.max([...numData.map(d=>nthRoot(d.Emissions??d.Tot_Emissions,3))])])
    .range(["#00FF00",'#FFFFFF', '#FF0000']);

     // Scale for density, change name and see the scale
  var colorScaleDensity = d3
    .scaleLinear()
    .domain([d3.min(numData.map(d => nthRoot(d.Emissions ?? d.Tot_Emissions, 3))), 0, d3.max(numData.map(d => nthRoot(d.Emissions ?? d.Tot_Emissions, 3)))])
    .range(["#0000FF", '#FFFFFF', '#FFFF00']);


  var geoDataFiltered = geoData.features.filter((shape) => shape.id !== 'ATA');
  const projection = projectionMap[projectionType]().fitSize([width / 2, height], geoData).rotate(angle);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = geoDataFiltered.sort((a,b)=> {if(a.id === focused) return 1; if (b.id === focused) return -1; return a.id-b.id})
    .map((shape) => {
      const regionData = numData.find((region) => region.Code === shape.id);
      const color = regionData ? colorScale(nthRoot(regionData?.Emissions ?? regionData?.Tot_Emissions,3)) : 'lightgrey';
      const countryName = shape.properties?.name ?? 'No Data'; //new
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
// Paths for density map
const densityPaths = geoDataFiltered.map((shape) => {
  const regionData = numData.find((region) => region.Code === shape.id);
  const color = regionData ? colorScaleDensity(regionData?.Density) : 'lightgrey';
  const countryName = shape.properties?.name ?? 'No Data';
  return (
    <path
      key={shape.id}
      d={geoPathGenerator(shape)}
      stroke={focused === shape.id ? "black" : "lightGrey"}
      strokeWidth={focused === shape.id ? 1 : 0.5}
      fill={color}
      fillOpacity={1}
      onMouseOver={(e) => {
        setFocused(shape.id);
        let label = `${regionData?.Density}` + " people per km²";
        if (!regionData?.Density) label = "no data";
        label = `${countryName}: ${label}`;
        setTooltip({
          visible: true,
          value: label,
          x: e.pageX,
          y: e.pageY
        });
      }}
      onMouseLeave={() => {
        setFocused(null);
        setTooltip({ ...tooltip, visible: false });
      }}
    />
  );
});

return (
  <div style={{ display: 'flex', flexDirection: 'column', width: `${width}px`, gap: '10px' }}>
    {/* Dropdown to select projection */}
    <select
      style={{ marginBottom: '10px' }}
      value={projectionType}
      onChange={e => setProjectionType(e.target.value)}
    >
      {Object.keys(projectionMap).map(key => (
        <option key={key} value={key}>
          {key}
        </option>
      ))}
    </select>

    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      {/* Emissions Map */}
      <div style={{ flex: 1 }}>
        <svg width={width / 2} height={height}>
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

      {/* Density Map */}
      <div style={{ flex: 1 }}>
        <svg width={width / 2} height={height}>
          {densityPaths}
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
    </div>
  </div>
);
};