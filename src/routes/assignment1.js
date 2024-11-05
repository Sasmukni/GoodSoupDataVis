import { Link, Outlet } from "react-router-dom";
import LinePlot from "../LinePlot";

function Assignment1() {
  return (
    <div className="App">
      <header className="App-header py-5">
        <h1 class="display-4 fw-bold text-primary mb-3">Assignment 1</h1>
        <h2 class="h5 text-secondary mt-3">Comparing categories</h2>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-4 d-flex align-items-stretch">
                  <Link to="/emissions" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ Emissions</h3>
                      <h4 className="h6 text-secondary">Comparing Categories</h4>
                      <LinePlot width={160} height={100} data={[157,223,487,810,232]}/>
                    </div>
                  </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch">
                  <Link to="/emissionsDecade" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ Emissions Decade</h3>
                      <h4 className="h6 text-secondary">Comparing Categories</h4>
                      <LinePlot width={160} height={100} />
                    </div>
                  </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch">
                  <Link to="/heatmap" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ Emissions (fossil/land-use)</h3>
                      <h4 className="h6 text-secondary">Comparing Categories</h4>
                      <LinePlot width={160} height={100} data={[490,920,184,739,364]}/>
                    </div>
                  </Link>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-4 d-flex align-items-stretch">
                    <Link to="/stacked" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">CO₂ Emissions Stacked</h3>
                        <h4 className="h6 text-secondary">Comparing Categories</h4>
                        <LinePlot width={160} height={100} />
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch">
                    <Link to="/stackedMultiple" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">CO₂ Emissions Stacked Multiple</h3>
                        <h4 className="h6 text-secondary">Comparing Categories</h4>
                        <LinePlot width={160} height={100} />
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch">
                    <Link to="/stackedPercentile" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">CO₂ Emissions Stacked Percentile</h3>
                        <h4 className="h6 text-secondary">Comparing Categories</h4>
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
