import { Link, Outlet } from "react-router-dom";
import LinePlot from "../LinePlot";

function Assignment1() {
  return (
    <div className="App">
      <header className="App-header py-5">
        <h1 className="display-4 fw-bold text-primary mb-3">CO₂ Emissions</h1>
        <h2 className="h5 text-secondary mt-3">Comparing categories</h2>

        <div className="text-secondary py-3 px-2">
          <p className="p-4">
            <h2 className="text-primary mb-4">Per capita CO₂ emissions</h2>
            <span className="d-block mt-2 text-start">
              These are typically higher in countries with a strong dependence on fossil fuels. This includes major producers like the Gulf states, wealthy nations with high energy consumption per person like Luxembourg, heavily industrialized countries such as the United States or Canada, and even small nations with significant tourism, like Trinidad and Tobago.
            </span>
          </p>
        </div>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 d-flex align-items-stretch">
                  <Link to="emissions" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ emissions per capita</h3>
                      <h4 className="h6 text-secondary">Bar plot</h4>
                    </div>
                  </Link>
                </div>

                <div className="col-md-6 d-flex align-items-stretch">
                  <Link to="emissionsDecade" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ emissions per capita (decade)</h3>
                      <h4 className="h6 text-secondary">Bar plot</h4>
                    </div>
                  </Link>
                </div>
            </div>
        </div>

        <div className="text-secondary py-3 px-2">
          <p className="p-4">
            <h2 className="text-primary mb-4">Total CO₂ emissions</h2>
            <span className="d-block mt-2 text-start">
              These are typically higher in countries with large populations and substantial industrial activity. Countries where land use change is a major source of emissions are often characterized by deforestation, like Brazil. In contrast, those with higher fossil fuel emissions rely heavily on oil production and/or have significant energy consumption, like the United States.
            </span>
          </p>
        </div>
        <div className="container my-5">
          <div className="row mt-3">
          <div className="col-md-3 d-flex align-items-stretch">
            <Link to="heatmap" style={{ textDecoration: 'none', width: '100%' }}>
              <div className="p-3 border rounded shadow-sm w-100">
                <h3 className="h5 text-primary">CO₂ emissions (fossil/land-use)</h3>
                <h4 className="h6 text-secondary">Heatmap</h4>
              </div>
            </Link>
          </div>

            <div className="col-md-3 d-flex align-items-stretch">
                <Link to="stacked" style={{ textDecoration: 'none', width: '100%' }}>
                <div className="p-3 border rounded shadow-sm w-100">
                    <h3 className="h5 text-primary">CO₂ emissions in total</h3>
                    <h4 className="h6 text-secondary">Stacked bar plot</h4>
                </div>
                </Link>
            </div>

            <div className="col-md-3 d-flex align-items-stretch">
                <Link to="stackedMultiple" style={{ textDecoration: 'none', width: '100%' }}>
                <div className="p-3 border rounded shadow-sm w-100">
                    <h3 className="h5 text-primary">CO₂ emissions in total</h3>
                    <h4 className="h6 text-secondary">Stacked multiple bar plot</h4>
                </div>
                </Link>
            </div>

            <div className="col-md-3 d-flex align-items-stretch">
                <Link to="stackedPercentile" style={{ textDecoration: 'none', width: '100%' }}>
                <div className="p-3 border rounded shadow-sm w-100">
                    <h3 className="h5 text-primary">CO₂ emissions (percentage)</h3>
                    <h4 className="h6 text-secondary">Stacked bar plot</h4>
                </div>
                </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Assignment1;
