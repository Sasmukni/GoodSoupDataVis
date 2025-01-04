import { Link } from "react-router-dom";

function Assignment1() {
  return (
    <div className="App">
      <header className="App-header py-5">
        <h1 className="display-4 fw-bold text-primary mb-3">Comparing categories</h1>
        <h2 className="h5 text-secondary mt-3">Per capita and total CO₂ emissions</h2>

        <div className="text-secondary py-3 px-2">
          <p className="p-4">
            <h2 className="text-primary mb-4">Per capita CO₂ emissions</h2>
            <span className="d-block mt-2 text-start">
             Represent the emissions of an average person in a country (total CO₂ emissions divided by the population size)
            </span>
          </p>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-6 d-flex align-items-stretch mb-3 mb-md-0">
                  <Link to="emissions" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ emissions per capita</h3>
                      <h4 className="h6 text-secondary">Bar plot comparing countries' 2022 emissions</h4>
                    </div>
                  </Link>
                </div>

                <div className="col-md-6 d-flex align-items-stretch mb-3 mb-md-0">
                  <Link to="emissionsDecade" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ emissions per capita (decade)</h3>
                      <h4 className="h6 text-secondary">Bar plot comparing countries' 2013-2022 emissions</h4>
                    </div>
                  </Link>
                </div>
            </div>
        </div>

        <div className="text-secondary py-3 px-2">
          <p className="p-4">
            <h2 className="text-primary mb-4">Total CO₂ emissions</h2>
            <span className="d-block mt-2 text-start">
              Represent the sum of all emissions of a country from industrial activities, transportation, energy use, etc.
            </span>
          </p>
        </div>
        <div className="container">
          <div className="row mt-3">
          <div className="col-md-3 d-flex align-items-stretch mb-3 mb-md-0">
            <Link to="heatmap" style={{ textDecoration: 'none', width: '100%' }}>
              <div className="p-3 border rounded shadow-sm w-100">
                <h3 className="h5 text-primary">CO₂ emissions in total (fossil/land-use)</h3>
                <h4 className="h6 text-secondary">Heatmap comparing countries' 2022 emissions</h4>
              </div>
            </Link>
          </div>

            <div className="col-md-3 d-flex align-items-stretch mb-3 mb-md-0">
                <Link to="stacked" style={{ textDecoration: 'none', width: '100%' }}>
                <div className="p-3 border rounded shadow-sm w-100">
                    <h3 className="h5 text-primary">CO₂ emissions in total</h3>
                    <h4 className="h6 text-secondary">Stacked bar plot comparing countries' 2022 emissions</h4>
                </div>
                </Link>
            </div>

            <div className="col-md-3 d-flex align-items-stretch mb-3 mb-md-0">
                <Link to="stackedMultiple" style={{ textDecoration: 'none', width: '100%' }}>
                <div className="p-3 border rounded shadow-sm w-100">
                    <h3 className="h5 text-primary">CO₂ emissions in total</h3>
                    <h4 className="h6 text-secondary">Stacked multiple bar plot comparing countries' 2022 emissions</h4>
                </div>
                </Link>
            </div>

            <div className="col-md-3 d-flex align-items-stretch mb-3 mb-md-0">
                <Link to="stackedPercentile" style={{ textDecoration: 'none', width: '100%' }}>
                <div className="p-3 border rounded shadow-sm w-100">
                    <h3 className="h5 text-primary">CO₂ emissions in total (percentage)</h3>
                    <h4 className="h6 text-secondary">Stacked bar plot comparing countries' 2022 emissions</h4>
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
