import './App.css';
import { Link } from "react-router-dom"
const Navbar =()=>{
      return (
            <div>
                  <Link to="/">Home</Link>
                  <Link to="/emissions">Emissions</Link>
            </div>
      )
}
export default Navbar;