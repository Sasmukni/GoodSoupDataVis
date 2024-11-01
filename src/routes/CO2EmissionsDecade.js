import '../App.css';
import BarPlot from'../BarPlot';
import EmissionsData from "../data/per_capita_2013_2022_plot_2.json";
import Select from "react-select";
import {useState, useRef} from "react";

//utilities
function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item.Entity) ? false : (seen[item.Entity] = true);
  });
}

function CO2EmissionsDecade() {
    const topOptions = [
      { value: 5, label: 'Top 5' },
      { value: 10, label: 'Top 10' },
      { value: 20, label: 'Top 20' }
    ];
    const stateSelectRef = useRef();
    const [stateOptions, setStateOptions ]= useState(EmissionsData.slice(5).map(d=>({value:d,label:d.Entity})));
    const [topSelected, setTopSelected] = useState(5);
    const [stateSelected, setStateSelected]= useState([]);
    return (
    <div className="App">
      <header>
        <h1>Countries' CO2 Emissions</h1>
        <h2>A Comparison of 2013-2022 emissions</h2>
      </header>
      
      <h2>Description</h2>
      <div class="filters-bar">
        <Select 
          options={topOptions} 
          onChange={(d)=> {
            setTopSelected(d.value);
            setStateSelected([]);
            setStateOptions(EmissionsData.slice(d.value).map(d=>({value:d,label:d.Entity})));
            stateSelectRef.current.clearValue();
          }} 
          defaultValue={topSelected}
        />
        <Select 
          ref={stateSelectRef}
          options={stateOptions} 
          isMulti={true} 
          onChange={(d)=> setStateSelected(
            d.map(e=>{if(e.value)return e.value}).sort((a,b)=> b.Emissions - a.Emissions)
          )}
        />
      </div>
      <BarPlot width={1000} height={600} marginRight={120} data={uniq(EmissionsData.slice(0,topSelected).concat(stateSelected))}/>
    </div>
    );
  }
  
  export default CO2EmissionsDecade;

