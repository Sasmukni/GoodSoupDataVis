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
              <p className="lead text-secondary">By <b>Good Soup</b> - learn more about us <a href="/#/aboutus">here</a></p>
              <p className="text-secondary">Visualizing CO2 emmissions data</p>
              {<p class="lead">
                <Link class="btn btn-primary btn-lg" to="/assignment1">Check out our assignments!</Link>
              </p>}
            </div>
          </div>

          <div id="assignments" class="row gap-4 my-5 mx-3">
            <div class="col-sm-12">
              <Link to="/assignment1" style={{ textDecoration: 'none' }}>
              <div class="card shadow-sm p-4">
                <div class="card-body">
                  <h5 class="card-title text-primary h4 fw-semibold mb-4">Assignment 1</h5>
                  <p class="card-text text-secondary">Comparing categories</p>
                </div>
              </div>
              </Link>
            </div>
            
            <div class="col-sm-12">
              <Link to="/alluvial" style={{ textDecoration: 'none' }}>
              <div class="card shadow-sm p-4">
                <div class="card-body">
                  <h5 class="card-title text-primary h4 fw-semibold mb-4">Assignment 2</h5>
                  <p class="card-text text-secondary">Alluvial</p>
                </div>
              </div>
              </Link>
            </div>

            <div class="col-sm-12">
              <Link to="/map" style={{ textDecoration: 'none' }}>
              <div class="card shadow-sm p-4">
                <div class="card-body">
                  <h5 class="card-title text-primary h4 fw-semibold mb-4">Assignment 3</h5>
                  <p class="card-text text-secondary">Maps</p>
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

