import '../App.css';
import '../LinePlot';
import LinePlot from '../LinePlot';
import { Link } from "react-router-dom";
function Home() {
    return (
    <div className="App">
      <header className="App-header">
        <h1>Final Project Name</h1>
        <h2>Data Visualization - <b>Good Soup</b></h2>
        <h3>Members:</h3>  
        <ul>
          <li>Alluto Enrico</li>
          <li>Capani Samuele</li>
          <li>Fuciarelli Laura</li>
          <li>Siddi Yryskeldi</li>
        </ul>

        <h2>Project Description</h2>
        <p>To Be Done</p>

        <h2>Assignment 1</h2>
        <h3>CO2 Emissions</h3>
        <h4>Comparing Categories</h4>
        
        <Link to="/emissions">
          <LinePlot width={160} height={100}/>
        </Link>

        <h3>CO2 Emissions Decade</h3>
        <h4>Comparing Categories</h4>
        
        <Link to="/emissionsDecade">
          <LinePlot width={160} height={100}/>
        </Link>

        <h3>CO2 Emissions (fossil/land-use)</h3>
        <h4>Comparing Categories</h4>
        
        <Link to="/heatmap">
          <LinePlot width={160} height={100}/>
        </Link>
        
      </header>
    </div>
    );
  }
  
  export default Home;

