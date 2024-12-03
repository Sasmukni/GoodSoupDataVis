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
    <Map geoData={geoData} numData={numDataTot} width={window.innerWidth - 0.1 * window.innerWidth} height={height} angle={angle} />
  );
};

export const StillMap = ({ width = 1000, height = 600 }) => {
    const [angle, setAngle] = React.useState([0,0]);
    const [isDragging, setIsDragging] = React.useState(false);
    const [currentPos, setCurrentPos ] = React.useState([0,0]);

    function handleMouseDown(event){
      setIsDragging(true);
    }
    function handleMouseUp(event){
      setIsDragging(false);
    }
    function handleMouseMove(event){
      if(isDragging){
        setAngle([angle[0]+event.movementX,angle[1]-event.movementY])
      }
    }

    function handleTouchStart(event){
      setIsDragging(true);
      setCurrentPos([event.touches[0].clientX,event.touches[0].clientY])
    }
    function handleTouchEnd(event){
      setIsDragging(false);
    }
    function handleTouchMove(event){
      if(isDragging){
        setAngle([angle[0]+(currentPos[0]-event.touches[0].clientX),angle[1]-(currentPos[1]-event.touches[0].clientY)])
        setCurrentPos([event.touches[0].clientX,event.touches[0].clientY]);
      }
    }
    return (
      <div onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp} 
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          className='d-flex justify-content-center gap-3'>
        <Map geoData={geoData} numData={numDataTot} numData2={numDataProCapita} width={window.innerWidth - 0.1 * window.innerWidth} height={window.innerHeight/2} angle={angle}/>
      </div>
    );
  };
