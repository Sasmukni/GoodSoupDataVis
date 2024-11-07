import { Link, Outlet } from "react-router-dom";
import LinePlot from "../LinePlot";

function Assignment1() {
  return (
    <div className="App">
      <header className="App-header py-5">
        <h1 className="display-4 fw-bold text-primary mb-3">CO₂ Emissions</h1>
        <h2 className="h5 text-secondary mt-3">Comparing categories</h2>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-4 d-flex align-items-stretch">
                  <Link to="/emissions" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ emissions per capita</h3>
                      <h4 className="h6 text-secondary">Bar plot</h4>
                      <LinePlot width={160} height={100} data={[157,223,487,810,232]}/>
                    </div>
                  </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch">
                  <Link to="/emissionsDecade" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ emissions per capita (decade)</h3>
                      <h4 className="h6 text-secondary">Bar plot</h4>
                      <LinePlot width={160} height={100} />
                    </div>
                  </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch">
                  <Link to="/heatmap" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ emissions (fossil/land-use)</h3>
                      <h4 className="h6 text-secondary">Heatmap</h4>
                      <LinePlot width={160} height={100} data={[490,920,184,739,364]}/>
                    </div>
                  </Link>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-4 d-flex align-items-stretch">
                    <Link to="/stacked" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">CO₂ emissions in total</h3>
                        <h4 className="h6 text-secondary">Stacked bar plot</h4>
                        <LinePlot width={160} height={100} />
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch">
                    <Link to="/stackedMultiple" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">CO₂ emissions in total</h3>
                        <h4 className="h6 text-secondary">Stacked multiple bar plot</h4>
                        <LinePlot width={160} height={100} />
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch">
                    <Link to="/stackedPercentile" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">CO₂ emissions (percentage)</h3>
                        <h4 className="h6 text-secondary">Stacked bar plot</h4>
                        <LinePlot width={160} height={100} />
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
