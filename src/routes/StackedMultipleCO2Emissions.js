import '../App.css';
import StackedMultipleBarPlot from '../StackedMultipleBarPlot';
import emissionsData from '../data/continents_emissions_plot_123.json';

function StackedMultipleBarPlotPage() {
   
    return (
        <div className="App">
            <header className="App-header">
                <h1>Countries' CO2 Emissions in year 2022</h1>
                <h2>A Stacked Comparison of 2022 emissions divided by categories</h2>
            </header>
            
            <h2>Description</h2>
            <StackedMultipleBarPlot marginRight={160} data={emissionsData} /> 
        </div>
    );
}

export default StackedMultipleBarPlotPage;
