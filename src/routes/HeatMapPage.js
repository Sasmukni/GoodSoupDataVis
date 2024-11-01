import '../App.css';
import HeatMap from'../HeatMap';
function HeatMapPage() {
    return (
    <div className="App">
      <header className="App-header">
        <h1>Countries' CO2 Emissions in year 2022</h1>
        <h2>A Comparison of 2022 emissions divided by categories</h2>
      </header>
      
      <h2>Description</h2>
        <HeatMap/>
    </div>
    );
  }
  
  export default HeatMapPage;

