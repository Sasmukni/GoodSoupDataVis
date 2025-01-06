import * as d3 from "d3";
import {useState} from "react";
import { geoData } from "../data/europegeodata";
import  numData from "../data/Project_secondsection_data.json";
import Select from "react-select";
//import { geoData } from "../../data/geodata";

export default function ChoroplethMap({
  data = [230,420,690,880,400],
  width = 840,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 10,
  colors = ["pink"]
}) {
  const mapWidth = width * 2/3;
  const [focused, setFocused] = useState(null);
  const [selected, setSelected] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });
  const [year, setYear] = useState(2022);

  var yearFilteredNumData = numData.filter(d => d.year === year);
  var nations = numData.map(d => d.nation);
  var colorScale = d3.scaleLinear()
      .domain(d3.extent([...yearFilteredNumData.map(d=>d.tot_students)]))
      .range(['#AAAAFF', '#0000FF']);
  //var extent = 
  var newGeoData = geoData;
  newGeoData.features = newGeoData.features.filter((feat)=> nations.includes(feat.properties.NAME_ENGL));
  var myGeoData = newGeoData.features;
  const projection = d3.geoMercator().fitSize([mapWidth, height], newGeoData);
  const geoPathGenerator = d3.geoPath().projection(projection);
  const allSvgPaths = myGeoData.sort((a,b)=> {if(a.properties.NAME_ENGL === focused) return 1; if (b.properties.NAME_ENGL === focused) return -1; return a.properties.NAME_ENGL-b.properties.NAME_ENGL})
    .map((shape) => {
      const regionData = yearFilteredNumData.find((region) => region.nation === shape.properties?.NAME_ENGL);
      const color =  regionData ? colorScale(regionData?.tot_students) : 'lightgrey';
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
            var label = `${regionData?.tot_students} total students`;
            if(!(regionData?.tot_students))
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
          onClick={(e)=>{
            setSelected(shape.properties.NAME_ENGL);
          }}
        />
      );
    })
  const yearOptions = [...new Set(numData.map((d)=> d.year))].map((d)=> ({label:""+d, value:d}))//
  return (
     <div className='container-fluid'>
          <h4 className='mb-4'>Third Grade Students in Europe</h4>
          <div className='container my-3 filters-bar d-flex justify-content-center gap-3'>
            <Select
              style={{ marginBottom: '10px' }}
              className={window.innerWidth > 1024 ? "w-25" : "w-100"}
              defaultValue={year}
              onChange={(e) => setYear(e.value)}
              options={yearOptions}
            />
          </div>
          <div className='row' style={{width:width}}>
            <div className='col-4' style={{border:"1px solid",borderRadius:"25px", marginTop:"20px", marginBottom:"20px", height:height}}>
              {selected?
                <div>TO DO: {selected}</div>
                :
                <div className="align-middle">
                  Click on a nation to see details
                </div>
              }
            </div>
            <div className='col-8'>
              <svg width={mapWidth} height={height}>
                {allSvgPaths}
              </svg>
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <svg width="300" height="50">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="00%" stopColor="#AAAAFF" />
                  <stop offset="100%" stopColor="#0000FF" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="300" height="20" fill="url(#gradient)" />
              <text x="0" y="40" fontSize="12" textAnchor="start">
                {d3.min(yearFilteredNumData.map(d => d.tot_students))}
              </text>
              <text x="300" y="40" fontSize="12" textAnchor="end">
                {d3.max(yearFilteredNumData.map(d => d.tot_students))}
              </text>
            </svg>
            <p>Number of Students</p>
          </div>
            </div>
          </div>
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