import '../App.css';
import '../BarPlot';
function CO2Emissions() {
    return (
    <div className="App">
      <header className="App-header">
        <h1>Countries' CO2 Emissions</h1>
        <h2>A Comparison of 2022 emissions</h2>
      </header>
      
      <h2>Description</h2>
        <BarPlot/>
    </div>
    );
  }
  
  export default CO2Emissions;

