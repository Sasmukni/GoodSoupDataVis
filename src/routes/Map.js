import { geoData } from '../data/geodata';
import numDataProCapita from '../data/per_capita_2022_plot_1.json'
import numDataTot from '../data/fossil_land_2022_heatmap_1.json'
import { Map } from '../Map';
import React from 'react';

export const RotatingMap = ({ width = 1000, height = 600 }) => {
let [angle, setAngle] = React.useState([0,300]);
function updateAngle(){
    const newAngle = [angle[0]+1,angle[1]];
    console.log(newAngle)
    setAngle(newAngle);
  }

  React.useEffect(() => {
    console.log(`initializing interval`);
    const interval = setInterval(() => {
        updateAngle();
    }, 50);
  
    return () => {
      console.log(`clearing interval`);
      clearInterval(interval);
    };
  }, [angle]);
  if (width === 0) {
    return null;
  }

  return (
    <Map geoData={geoData} numData={numDataTot} width={width} height={height} angle={angle} />
  );
};

export const StillMap = ({ width = 1000, height = 600 }) => {
    return (
      <Map geoData={geoData} numData={numDataTot} width={window.innerWidth - 0.1 * window.innerWidth} height={height}/>
    );
  };