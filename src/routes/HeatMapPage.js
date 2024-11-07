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
                <h1 className="display-4 fw-bold text-primary mb-3">Countries' CO2 Emissions in year 2022</h1>
                <h2 className="h5 text-secondary mt-3">A Stacked Comparison of 2022 emissions divided by categories</h2>
            </header>

            <div className="container my-3">
                <h2 className="text-center mb-4 fw-semibold fs-4">Description</h2>
                <p className="text-muted text-center fs-5 px-3">
                    Compare fossil fuel and land-use CO₂ emissions among the top ten global emitters for 2022.
                </p>
            </div>
            <HeatMap 
                width={window.innerWidth - 0.1 * window.innerWidth} 
                data={top10Countries} 
                margin={{top: 40, right:window.innerWidth<1024? 0:80, bottom: 80, left: 100 }}    
            />
        </div>
    );
}

export default HeatMapPage;
