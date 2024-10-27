import './App.css';
import { Routes, Route} from "react-router-dom";
import About from "./routes/About";
import Careers from "./routes/Careers";
import Home from "./routes/Home";
import Navbar from './Navbar';

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
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
      </header>
    </div>
    </>
  );
}

export default App;
