import './App.css';
import { Link } from "react-router-dom"
import logo from "./goodsoup-removebg.png"
const Navbar =()=>{
      return (
            <div className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary shadow-sm py-0">
                  <div className="container-fluid">
                        <a class="navbar-brand" href="#/">
                              <img 
                              src={logo} 
                              alt="Good Soup Logo" 
                              className="d-inline-block align-text-top" 
                              style={{ height: 'auto', width: '75px' }} 
                              />
                        </a>
                        <button 
                              className="navbar-toggler" 
                              type="button" 
                              data-bs-toggle="collapse" 
                              data-bs-target="#navbarNav" 
                              aria-controls="navbarNav" 
                              aria-expanded="false" 
                              aria-label="Toggle navigation"
                        >
                              <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                              <ul className="navbar-nav">
                                    <li className="nav-item">
                                          <Link className="nav-link text-light fw-semibold" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link text-light fw-semibold" to="/assignment1">Comparing categories</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link text-light fw-semibold" to="/alluvial">Emissions flow</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link text-light fw-semibold" to="/map">Maps</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link text-light fw-semibold" to="/assignment4">Temperature</Link>
                                    </li>
                                    <li className="nav-item">
                                          <Link className="nav-link text-light fw-semibold" to="/aboutus">About Us</Link>
                                    </li>
                              </ul>
                        </div>
                  </div>
            </div>
      )
}
export default Navbar;