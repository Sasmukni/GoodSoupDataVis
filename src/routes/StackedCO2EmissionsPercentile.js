import '../App.css';
import StackedBarPlotPercentile from '../StackedBarPlotPercentile';
import emissionsData from '../data/continents_emissions_plot_123.json';

function StackedBarPlotPercentilePage() {
   
    return (
        <div className="App">
            <header className="App-header">
                <h1>Countries' CO2 Emissions in year 2022</h1>
                <h2>A Stacked Comparison of 2022 emissions divided by categories</h2>
            </header>
            
            <h2>Description</h2>
            <StackedBarPlotPercentile marginRight={160} data={emissionsData} /> 
        </div>
    );
}

export default StackedBarPlotPercentilePage;
