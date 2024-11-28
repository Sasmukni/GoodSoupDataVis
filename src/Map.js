import * as d3 from 'd3';

export const Map = ({ width, height, geoData, numData, angle=[0,0] }) => {
  var colorScale = d3
    .scaleLinear()
    .domain(d3.extent([...numData.map(d=>(d.Emissions??d.Tot_Emissions))]))
    .range(['#FFFFFF', '#ff00ff']);

  const projection = d3
    .geoMercator()//.geoAzimuthalEqualArea()//.geoGnomonic()//
    .scale(width / 8 )/// Math.PI-20
    .center([0, Math.max(height/10,20)]).rotate(angle);

  const geoPathGenerator = d3.geoPath().projection(projection);
    

  const allSvgPaths = geoData.features
    .filter((shape) => shape.id !== 'ATA')
    .map((shape) => {
      const regionData = numData.find((region) => region.Code === shape.id);

      const color = regionData ? colorScale(regionData?.Emissions ?? regionData?.Tot_Emissions) : 'lightgrey';

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
