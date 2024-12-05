import '../App.css';
import StackedBarPlot from '../StackedBarPlot';
import emissionsData from '../data/continents_tot_emissions_plot_123.json';

function StackedBarPlotPage() {
   
    return (
        <div className="App">
            <header className="text-center py-4">
                <h1 className="display-4 fw-bold text-primary mb-3">CO₂ emissions in total</h1>
                <h2 className="h5 text-secondary mt-3">A stacked comparison of countries' 2022 emissions divided by categories</h2>
            </header>

            <div className="container my-3">
                <h2 className="text-center mb-4 fw-semibold fs-4">Reading the visualization</h2>
                <p className="text-muted text-start fs-5 px-3">
                    This stacked bar plot visualization allows you to analyze each continent's total CO₂ emissions (in tonnes), with an emphasis on the top five emitting countries.
                </p>
            </div>
            <StackedBarPlot width={window.innerWidth - 0.1 * window.innerWidth} marginRight={80} data={emissionsData.sort((a,b)=> 
                (b.Top1_Emissions + b.Top2_Emissions + b.Top3_Emissions + b.Top4_Emissions + b.Top5_Emissions + b.Others_Emissions) - 
                (a.Top1_Emissions + a.Top2_Emissions + a.Top3_Emissions + a.Top4_Emissions + a.Top5_Emissions + a.Others_Emissions))} /> 
        </div>
    );
}

export default StackedBarPlotPage;