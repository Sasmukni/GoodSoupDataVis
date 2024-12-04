import * as d3 from 'd3';
import {useState} from "react";
import Select from "react-select";

function nthRoot(val,n){
  if(n%2==0){
    return Math.pow(val,1/n);
  }else{
    return val>0 ? Math.pow(val,1/n) : -Math.pow(-val,1/n);
  }
}

export const Map = ({ width, height, geoData, numData, numData2 ,angle=[0,0] }) => {
  const [focused, setFocused] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });
  const [projectionType, setProjectionType] = useState('Orthographic');

  const projectionMap = {
    "Orthographic": d3.geoOrthographic,
    "Mercator": d3.geoMercator,
    "Azimuthal": d3.geoAzimuthalEqualArea,
    "Gnomonic": d3.geoGnomonic,
    "EqualEarth": d3.geoEqualEarth,
    "NaturalEarth": d3.geoNaturalEarth1,
    "Equirectangular": d3.geoEquirectangular,
  };
  
  var colorScale = d3
    .scaleLinear()
    .domain([d3.min([...numData.map(d=>nthRoot(d.Emissions??d.Tot_Emissions,3))]),0,d3.max([...numData.map(d=>nthRoot(d.Emissions??d.Tot_Emissions,3))])])
    .range(["#00FF00",'#FFFFFF', '#FF0000']);

  var colorScaleDensity = d3
    .scaleLinear()
    .domain([d3.min(numData2.map(d => d.Emissions)), d3.max(numData2.map(d => d.Emissions))])
    .range(["#FFFFFF", '#FF8800']);

  var true_angle = [0,0]
  if(["Orthographic","Azimuthal","Gnomonic"].includes(projectionType))
    true_angle = angle;
  else if(["EqualEarth","NaturalEarth","Equirectangular"].includes(projectionType)){
    true_angle = [angle[0],0]
  }
  var myGeoData = {};// = geoData;
  myGeoData.type = "FeatureCollection";
  if(projectionType==="Mercator"){
    myGeoData.features = geoData.features.filter((shape) => shape.id !== 'ATA');
  }else{
    myGeoData.features = geoData.features//.filter((shape) => shape.id !== 'ATA');
  }

  var geoDataFiltered = myGeoData.features//.filter((shape) => shape.id !== 'ATA');
  const projection = projectionMap[projectionType]()
  .fitSize([width>500?width/2:width, height], myGeoData).rotate(true_angle);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const allSvgPaths = geoDataFiltered.sort((a,b)=> {if(a.id === focused) return 1; if (b.id === focused) return -1; return a.id-b.id})
    .map((shape) => {
      const regionData = numData.find((region) => region.Code === shape.id);
      const color = regionData ? colorScale(nthRoot(regionData?.Emissions ?? regionData?.Tot_Emissions,3)) : 'lightgrey';
      const countryName = shape.properties?.name ?? 'No Data'; 
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
const densityPaths = geoDataFiltered.map((shape) => {
  const regionData = numData2.find((region) => region.Code === shape.id);
  const color = regionData ? colorScaleDensity(regionData?.Emissions) : 'lightgrey';
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
        let label = `${regionData?.Emissions}` + " tonnes per person";
        if (!regionData?.Emissions) label = "no data";
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

const projectionOptions = Object.keys(projectionMap).map(key => (
  {label:key, value:key}
))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: `${width}px`, gap: '10px' }}>
      <div className='filters-bar d-flex justify-content-center gap-3'>
        <Select
          style={{ marginBottom: '10px' }}
          className={window.innerWidth > 1024 ? "w-25" : "w-100"}
          defaultValue={projectionOptions.filter(o => o.value === projectionType)}
          onChange={(e) => setProjectionType(e.value)}
          options={projectionOptions}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: width > 500 ? "row" : 'column', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <svg width={width > 500 ? width / 2 : width} height={height}>
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
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <svg width="300" height="50">
              <defs>
                <linearGradient id="divergent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FF00" />
                  <stop offset="20%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FF0000" />
                </linearGradient>
              </defs>
              <rect x="20" y="0" width="300" height="20" fill="url(#divergent-gradient)" />
              <text x="0" y="40" fontSize="12" textAnchor="start">
                {d3.min(numData.map(d => d.Tot_Emissions))}
              </text>
              <text x="80" y="40" fontSize="12" textAnchor="middle">0</text>
              <text x="300" y="40" fontSize="12" textAnchor="end">
                {d3.max(numData.map(d => d.Tot_Emissions))}
              </text>
            </svg>
            <p>Tonnes</p>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <svg width={width > 500 ? width / 2 : width} height={height}>
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
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <svg width="300" height="50">
              <defs>
                <linearGradient id="continuous-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FF8800" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="300" height="20" fill="url(#continuous-gradient)" />
              <text x="0" y="40" fontSize="12" textAnchor="start">
                {d3.min(numData2.map(d => d.Emissions))}
              </text>
              <text x="300" y="40" fontSize="12" textAnchor="end">
                {d3.max(numData2.map(d => d.Emissions))}
              </text>
            </svg>
            <p>Tonnes per person</p>
          </div>
        </div>
      </div>
    </div>
  );
};
