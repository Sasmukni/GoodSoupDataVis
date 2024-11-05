import './App.css';
import { Link } from "react-router-dom"
const Navbar =()=>{
      return (
            <div className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
                  <div className="container">
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
                                          <Link className="nav-link text-light fw-semibold" to="/assignment1">Assignment 1</Link>
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