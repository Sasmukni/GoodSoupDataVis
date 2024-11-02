import '../App.css';
import StackedBarPlotPercentile from '../StackedBarPlotPercentile';
import emissionsData from '../data/continents_emissions_plot_123.json';

function StackedBarPlotPercentilePage() {
   
    return (
        <div className="App">
            <header class="text-center py-4">
                <h1 class="display-4 fw-bold text-primary mb-3">Countries' CO2 Emissions in year 2022</h1>
                <h2 class="h5 text-secondary mt-3">A Stacked Comparison of 2022 emissions divided by categories</h2>
            </header>

            <div class="container my-3">
                <h2 class="text-center mb-4 fw-semibold fs-4">Description</h2>
                <p class="text-muted text-center fs-5 px-3">
                    This visualization allows you to analyze each continent's per capita CO₂ emissions as a percentage, with an emphasis on the top five emitting countries.
                </p>
                <StackedBarPlotPercentile marginRight={160} data={emissionsData} /> 
            </div>
        </div>
    );
}

export default StackedBarPlotPercentilePage;