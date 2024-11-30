import '../App.css';
import '../LinePlot';
import { Link } from "react-router-dom";
function Home() {
    return (
      <div className="App">
        <header className="App-header py-0">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 className="display-4 fw-bold text-primary">Final Project Name</h1>
              <p className="lead text-secondary">By <a href="/#/aboutus"><b>Good Soup</b></a></p>
              {<p className="text-secondary">Visualizing CO₂ emmissions data</p>}
              {<p class="lead">
                <Link class="btn btn-primary btn-lg" to="/assignment1">Check out our work!</Link>
              </p>}
            </div>
          </div>

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
          </div>
        </header>
      </div>
    );
  }
  
  export default Home;

