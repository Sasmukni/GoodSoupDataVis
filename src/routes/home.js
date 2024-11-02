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

            <div>
              <h2 className="h4 fw-semibold text-secondary">Assignment 1</h2>

              <div className="my-3 p-3 border rounded shadow-sm">
                <h3 className="h5 text-primary">CO₂ Emissions</h3>
                <h4 className="h6 text-secondary">Comparing Categories</h4>
                <Link to="/emissions" className="d-inline-block mt-2">
                  <LinePlot width={160} height={100} />
                </Link>
              </div>

              <div className="my-3 p-3 border rounded shadow-sm">
                <h3 className="h5 text-primary">CO₂ Emissions Decade</h3>
                <h4 className="h6 text-secondary">Comparing Categories</h4>
                <Link to="/emissionsDecade" className="d-inline-block mt-2">
                  <LinePlot width={160} height={100} />
                </Link>
              </div>

              <div className="my-3 p-3 border rounded shadow-sm">
                <h3 className="h5 text-primary">CO₂ Emissions (fossil/land-use)</h3>
                <h4 className="h6 text-secondary">Comparing Categories</h4>
                <Link to="/heatmap" className="d-inline-block mt-2">
                  <LinePlot width={160} height={100} />
                </Link>
              </div>
            </div>
          </header>
        </div>
    );
  }
  
  export default Home;

