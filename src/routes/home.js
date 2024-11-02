import '../App.css';
import '../LinePlot';
import LinePlot from '../LinePlot';
import { Link } from "react-router-dom";
function Home() {
    return (
      <div className="App">
        <header className="App-header py-5">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold text-primary">Final Project Name</h1>
              <h2 className="h5 text-secondary">
                Data Visualization - <b>Good Soup</b>
              </h2>
            </div>

            <div className="mb-4">
              <h3 className="h4 fw-semibold text-secondary">Members:</h3>
              <ul className='text-secondary'>
                <li>Alluto Enrico</li>
                <li>Capani Samuele</li>
                <li>Fuciarelli Laura</li>
                <li>Siddi Yryskeldi</li>
              </ul>
            </div>

            <div className="mb-4">
              <h2 className="h4 fw-semibold text-secondary">Project Description</h2>
              <p className="text-secondary">To Be Done</p>
            </div>

            <div className="container my-5">
              <h2 className="h4 fw-semibold text-secondary text-center mb-4">Assignment 1</h2>

              <div className="row">
                <div className="col-md-4 d-flex align-items-stretch">
                  <Link to="/emissions" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                      <h3 className="h5 text-primary">CO₂ Emissions</h3>
                      <h4 className="h6 text-secondary">Comparing Categories</h4>
                      <LinePlot width={160} height={100} />
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
                      <LinePlot width={160} height={100} />
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
  
  export default Home;

