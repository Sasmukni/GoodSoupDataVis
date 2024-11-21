import '../App.css';
import '../LinePlot';
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
              <h2 className="h4 fw-semibold text-secondary">Project Description</h2>
              <p className="text-secondary">To Be Done</p>
            </div>

            <div className="container my-5 d-flex flex-column align-items-center gap-4">
              <div className="col-md-6">
                <Link to="/assignment1" style={{ textDecoration: 'none' }}>
                  <div className="card text-center shadow-sm p-4">
                    <h2 className="h4 fw-semibold text-primary mb-3">CO₂ Emissions</h2>
                    <p className="text-secondary">Comparing categories</p>
                  </div>
                </Link>
              </div>
              <div className="col-md-6">
                <Link to="/alluvial" style={{ textDecoration: 'none' }}>
                  <div className="card text-center shadow-sm p-4">
                    <h2 className="h4 fw-semibold text-primary mb-3">CO₂ Emissions</h2>
                    <p className="text-secondary">Alluvial</p>
                  </div>
                </Link>
              </div>
            </div>
          </header>
        </div>
    );
  }
  
  export default Home;

