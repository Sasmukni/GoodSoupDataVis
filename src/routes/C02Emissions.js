import '../App.css';
import BarPlot from'../BarPlot';
import EmissionsData from "../data/per_capita_2022_plot_1.json";
import Select from "react-select";
import {useState, useRef} from "react";

//utilities
function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
      return seen.hasOwnProperty(item.Entity) ? false : (seen[item.Entity] = true);
  });
}

function CO2Emissions() {
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
      <header class="text-center py-4">
        <h1 class="display-4 fw-bold text-primary mb-3">Countries' CO2 Emissions</h1>
        <h2 class="h5 text-secondary mt-3">A Comparison of 2022 emissions</h2>
      </header>

      <div class="container my-3">
        <h2 class="text-center mb-4 fw-semibold fs-4">Description</h2>
        <p class="text-muted text-center fs-5 px-3">
          This visualization allows you to compare CO₂ emissions per capita (in tons) across different countries. You can start by viewing the top five, top ten, or top twenty emitters worldwide, and then add specific countries to create a customized comparison.
        </p>
        <div class="filters-bar d-flex justify-content-center gap-3">
          <div className={window.innerWidth > 1024?"w-25":"w-50"}>
            <Select
              options={topOptions}
              onChange={(d)=> {
                setTopSelected(d.value);
                setStateSelected([]);
                setStateOptions(EmissionsData.slice(d.value).map(d=>({value:d,label:d.Entity})));
                stateSelectRef.current.clearValue();
              }} 
              defaultValue={topOptions.filter(o => o.value === topSelected)}
            />
          </div>
          <div className={window.innerWidth > 1024?"w-25":"w-50"}>
            <Select 
              ref={stateSelectRef}
              options={stateOptions.sort((a,b)=> a.label.localeCompare(b.label))} 
              isMulti={true} 
              onChange={(d)=> setStateSelected(
                d.map(e=>{if(e.value)return e.value}).sort((a,b)=> b.Emissions - a.Emissions)
              )}
              placeholder="Add countries to the plot"
            />
          </div>
        </div>
      </div>
      <BarPlot width={window.innerWidth - 0.1 * window.innerWidth} height={600} marginRight={120} data={uniq(EmissionsData.slice(0,topSelected).concat(stateSelected))}/>
      <br/>
      <br/>
    </div>
    );
  }
  
  export default CO2Emissions;

