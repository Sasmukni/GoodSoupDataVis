import '../App.css';
import HeatMap from '../HeatMap';
import emissionsData from '../data/fossil_land_2022_heatmap_1.json';

function HeatMapPage() {
    const top10Countries = emissionsData
        .sort((a, b) => b.Tot_Emissions - a.Tot_Emissions)
        .slice(0, 10)
        .map(country => ({
            country: country.Entity,
            fossil: country.Fossil_Emissions,
            land_use: country.Land_Emissions
        }));

    return (
        <div className="App">
            <header className="text-center py-4">
                <h1 className="display-4 fw-bold text-primary mb-3">CO₂ emissions in total (fossil/land-use)</h1>
                <h2 className="h5 text-secondary mt-3">A comparison of countries' 2022 emissions divided by categories</h2>
            </header>

            <div className="container my-3">
                <h2 className="text-center mb-4 fw-semibold fs-4">Reading the visualization</h2>
                <p className="text-muted text-start fs-5 px-3">
                    This heatmap visualization allows you to compare fossil fuel, land-use and total CO₂ emissions (in tonnes) among the top ten global emitters for 2022.
                </p>
            </div>
            <HeatMap 
                width={window.innerWidth - 0.1 * window.innerWidth} 
                data={top10Countries} 
                margin={{top: 40, right:window.innerWidth<1024? 0:80, bottom: 80, left: 100 }}    
            />
            <div className="container my-3">
                <h2 className="text-center my-4 fw-semibold fs-4">Understanding the data</h2>
                <p className="text-muted text-start fs-5 px-3">
                Total CO₂ emissions are typically higher in countries with large populations and substantial industrial activity. Countries where land use change is a major source of emissions are often characterized by deforestation, like Brazil. In contrast, those with higher fossil fuel emissions rely heavily on oil production and/or have significant energy consumption, like the United States.
                </p>
            </div>
        </div>
    );
}

export default HeatMapPage;
