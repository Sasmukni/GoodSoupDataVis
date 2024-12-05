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
      <div className="App">
        <header className="text-center py-4">
          <h1 className="display-4 fw-bold text-primary mb-3">Maps</h1>
          <h2 className="h5 text-secondary mt-3">Countries' 2022 per capita and total CO₂ emissions</h2>
        </header>

        <div className="container my-3">
          <h2 className="text-center mb-4 fw-semibold fs-4">Reading the visualization</h2>
          <p className="text-muted text-start fs-5 px-3">
            These map visualizations allows you to visualize 2022 total and per capita CO₂ emmissions across the globe. It is possible to select different types of projection and move the maps with the mouse. In the case of the Mercator projection, Antartic is missing because it would take excessive space due to the greater distortion near the poles, so we considered not worthy representing since it provides no data.
          </p>
        </div>

        <div onMouseDown={handleMouseDown} 
          onMouseUp={handleMouseUp} 
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          className='d-flex justify-content-center gap-3'>
          <Map geoData={geoData} numData={numDataTot} numData2={numDataProCapita} width={window.innerWidth - 0.1 * window.innerWidth} height={window.innerHeight/2} angle={angle}/>
        </div>
      </div>
    );
  };
