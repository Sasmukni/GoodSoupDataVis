import '../App.css';
import StackedBarPlotPercentile from '../StackedBarPlotPercentile';
import emissionsData from '../data/continents_tot_emissions_plot_123.json';

function StackedBarPlotPercentilePage() {
   
    return (
        <div className="App">
            <header className="text-center py-4">
                <h1 className="display-4 fw-bold text-primary mb-3">CO₂ emissions in total (percentage)</h1>
                <h2 className="h5 text-secondary mt-3">A stacked comparison of countries' 2022 emissions divided by categories</h2>
            </header>

            <div className="container my-3">
                <h2 className="text-center mb-4 fw-semibold fs-4">Reading the visualization</h2>
                <p className="text-muted text-start fs-5 px-3">
                    This stacked bar plot visualization allows you to analyze each continent's CO₂ emissions as a percentage, with an emphasis on the top five emitting countries.
                </p>
                <StackedBarPlotPercentile width={window.innerWidth - 0.1 * window.innerWidth} marginLeft={80} marginRight={40} data={emissionsData.sort((a,b)=> b.Top1_Percentage - a.Top1_Percentage)} /> 
                <div className="container my-3">
                    <h2 className="text-center my-4 fw-semibold fs-4">Understanding the data</h2>
                    <p className="text-muted text-start fs-5 px-3">
                    Often the top countries in this visualization are the ones with large populations and/or more developed than the other nations in the same continent. This happens especially in continents with few nations, such as in the case of Australia in Oceania.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default StackedBarPlotPercentilePage;