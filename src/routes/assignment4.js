import { Link } from "react-router-dom";

function Assignment4() {
  return (
    <div className="App">
      <header className="App-header py-5">
        <h1 className="display-4 fw-bold text-primary mb-3">Temperature</h1>
        <h2 className="h5 text-secondary mt-3">Analysis of monthly temperature time series</h2>

        <div className="container mt-5">
            <div className="row mt-3">
                <div className="col-md-4 d-flex align-items-stretch mb-3 mb-md-0">
                    <Link to="linechart" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">Temperature timeline</h3>
                        <h4 className="h6 text-secondary">Linechart showing max, average and min temperature over time</h4>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch mb-3 mb-md-0">
                    <Link to="radarchart" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">Temperature timeline</h3>
                        <h4 className="h6 text-secondary">Radarchart showing average temperature over time</h4>
                    </div>
                    </Link>
                </div>

                <div className="col-md-4 d-flex align-items-stretch mb-3 mb-md-0">
                    <Link to="ridgeline" style={{ textDecoration: 'none', width: '100%' }}>
                    <div className="p-3 border rounded shadow-sm w-100">
                        <h3 className="h5 text-primary">Temperature distribution</h3>
                        <h4 className="h6 text-secondary">Ridgeline to compare max and min temperature distributions over time</h4>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
      </header>
    </div>
  );
}

export default Assignment4;
