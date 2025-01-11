import '../App.css';
import '../LinePlot';
import { Link } from "react-router-dom";
import {useRef} from "react";
function Home() {
    const assRef = useRef();

    function goToAssignments(){
      assRef.current.scrollIntoView();
    }


    return (
      <div className="App">
        <header className="App-header py-0">
          <div class="jumbotron jumbotron-fluid-students">
            <div class="container">
              <h1 className="display-4 fw-bold text-primary">Gender differences in third-level education rates</h1>
              <p className="lead text-secondary">By <Link to="/aboutus" style={{ textDecoration: 'none' }}><b>Good Soup</b></Link></p>
              {<p class="lead">
                <Link class="btn btn-primary btn-lg" to="/project">Check out our project!</Link>
              </p>}
            </div>
          </div>

          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 className="display-4 fw-bold text-primary">Global Warming in Data</h1>
              <p className="lead text-secondary">By <Link to="/aboutus" style={{ textDecoration: 'none' }}><b>Good Soup</b></Link></p>
              {<p className="text-secondary">Visualizing CO₂ emmissions and temperatures</p>}
              {<p class="lead">
                <div class="btn btn-primary btn-lg" onClick={()=>goToAssignments()} to="/assignment1">Check out our work!</div>
              </p>}
            </div>
          </div>

          <div ref= {assRef}>
            <div id="assignments" class="row gap-4 my-5 mx-3">
              <div class="col-sm-12">
                <Link to="/assignment1" style={{ textDecoration: 'none' }}>
                <div class="card shadow-sm p-4">
                  <div class="card-body">
                    <h3 class="card-title text-primary fw-semibold mb-4">Comparing categories</h3>
                    <p class="card-text text-secondary">Countries compared both in terms of per capita and total emissions</p>
                  </div>
                </div>
                </Link>
              </div>
              
              <div class="col-sm-12">
                <Link to="/alluvial" style={{ textDecoration: 'none' }}>
                <div class="card shadow-sm p-4">
                  <div class="card-body">
                    <h3 class="card-title text-primary fw-semibold mb-4">Emissions flow</h3>
                    <p class="card-text text-secondary">Relationship between continents, countries and emission types</p>
                  </div>
                </div>
                </Link>
              </div>

              <div class="col-sm-12">
                <Link to="/map" style={{ textDecoration: 'none' }}>
                <div class="card shadow-sm p-4">
                  <div class="card-body">
                    <h3 class="card-title text-primary fw-semibold mb-4">Maps</h3>
                    <p class="card-text text-secondary">3D and 2D maps for a spatial and global view of emmissions</p>
                  </div>
                </div>
                </Link>
              </div>

              <div class="col-sm-12">
                <Link to="/assignment4" style={{ textDecoration: 'none' }}>
                <div class="card shadow-sm p-4">
                  <div class="card-body">
                    <h3 class="card-title text-primary fw-semibold mb-4">Temperature</h3>
                    <p class="card-text text-secondary">Analysis of monthly temperature time series</p>
                  </div>
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

