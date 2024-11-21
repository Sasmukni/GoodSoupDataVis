import { numData, geoData } from '../data/geodata';
import { Map } from '../Map';
import React from 'react';

export const ChoroplethMapBasicDemo = ({ width = 1000, height = 600 }) => {
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
    <Map geoData={geoData} numData={numData} width={width} height={height} angle={angle} />
  );
};
