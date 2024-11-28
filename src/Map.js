import * as d3 from 'd3';

function nthRoot(val,n){
  if(n%2==0){
    return Math.pow(val,1/n);
  }else{
    return val>0 ? Math.pow(val,1/n) : -Math.pow(-val,1/n);
  }
}

export const Map = ({ width, height, geoData, numData, angle=[0,0] }) => {
  var colorScale = d3
    .scaleLinear()
    .domain([d3.min([...numData.map(d=>nthRoot(d.Emissions??d.Tot_Emissions,3))]),0,d3.max([...numData.map(d=>nthRoot(d.Emissions??d.Tot_Emissions,3))])])
    .range(["#00FF00",'#FFFFFF', '#FF0000']);

  const projection = d3
  .geoMercator()//.geoOrthographic() //.geoAzimuthalEqualArea()//.geoGnomonic()//
    .fitSize([width, height], geoData).rotate(angle);
    //.scale(1)
    //.translate([0, 0]);
    //.scale(width / 8 )/// Math.PI-20
    //.center([Math.max(-width/10,0), Math.max(height/10,20)]);

  const geoPathGenerator = d3.geoPath().projection(projection);
    

  const allSvgPaths = geoData.features
    .filter((shape) => shape.id !== 'ATA')
    .map((shape) => {
      const regionData = numData.find((region) => region.Code === shape.id);

      const color = regionData ? colorScale(nthRoot(regionData?.Emissions ?? regionData?.Tot_Emissions,3)) : 'lightgrey';

      return (
        <path
          key={shape.id}
          d={geoPathGenerator(shape)}
          stroke="lightGrey"
          strokeWidth={0.5}
          fill={color}
          fillOpacity={1}
        />
      );
    });

  return (
    <div>
      <svg width={width} height={height}>
        {allSvgPaths}
      </svg>
    </div>
  );
};
