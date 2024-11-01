import '../App.css';
import HeatMap from '../HeatMap';
import emissionsData from '../data/fossil_land_2022_heatmap_1.json';

function HeatMapPage() {
    // Select the top 10 countries based on total emissions
    const top10Countries = emissionsData
        .sort((a, b) => b.Tot_Emissions - a.Tot_Emissions) // Sort by total emissions in descending order
        .slice(0, 10) // Take the top 10
        .map(country => ({
            country: country.Entity,
            fossil: country.Fossil_Emissions,
            land_use: country.Land_Emissions
        })); // Map to the structure expected by HeatMap

    return (
        <div className="App">
            <header className="App-header">
                <h1>Countries' CO2 Emissions in year 2022</h1>
                <h2>A Comparison of 2022 emissions divided by categories</h2>
            </header>
            
            <h2>Description</h2>
            <HeatMap data={top10Countries} /> {/* Pass the filtered data to HeatMap */}
        </div>
    );
}

export default HeatMapPage;
