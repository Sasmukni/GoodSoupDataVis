import logo from "../goodsoup-removebg.png"

function AboutUs() {
  return (
    <div className="App">
        <header className="App-header py-5 bg-light rounded shadow-sm">
            <img 
            src={logo}
            alt="Good Soup Logo" 
            className="d-inline-block align-text-top" 
            style={{ height: 'auto', width: '200px' }} 
            />
            <h1 className="display-4 fw-bold text-primary mb-3 text-center">Good Soup</h1>
            <h2 className="h5 text-secondary mt-3 text-center">Computer Science Master's Degree - 2024/2025</h2>
            
            <div className="my-4">
            <h3 className="h4 fw-semibold text-primary text-center">Members:</h3>
            <ul className="list-unstyled text-secondary text-center">
                <li>Alluto Enrico</li>
                <li>Capani Samuele</li>
                <li>Fuciarelli Laura</li>
                <li>Siddi Yryskeldi</li>
            </ul>
            </div>
        </header>
    </div>
  );
}

export default AboutUs;
