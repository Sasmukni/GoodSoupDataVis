import React from 'react';
import '../App.css';
import RidgelineChart from '../ridgeline';
import Data from '../data/temperatures_merged_final.json';

function RidgelinePage() {
    return(
        <div className="App">
            <header className="text-center py-4">
              <h1 className="display-4 fw-bold text-primary mb-3">Temperature timeline</h1>
              <h2 className="h5 text-secondary mt-3">Radarchart showing average temperature over time</h2>
            </header>
            <div className="container my-3">
                <h2 className="text-center mb-4 fw-semibold fs-4">Reading the visualization</h2>
                <p className="text-muted text-start fs-5 px-3">
                This ridgeline visualization allows you to compare max and min monthly temperature distributions (in Fahrenheit) in the state of Texas from 1978 to 2023.
                </p>
                <RidgelineChart data={Data} />
            </div>
            <div className="container my-3">
                <h2 className="text-center my-4 fw-semibold fs-4">Understanding the data</h2>
                <p className="text-muted text-start fs-5 px-3">
                The max temperature distribution, in the higher end, has shifted more towards 120 °F over the years.
                In the lower end, in 1970s it started from 30 °F, then in the 1980s it shifted more towards 40 °F and nowadays it is shifting towards 50 °F.
                It often shows peaks around 70 °F and 90 °F.
                </p>
                <p className="text-muted text-start fs-5 px-3">
                The min temperature distribution instead stayed more consistent over the years, although its lower end starts more often from around 20 °F in most recent decades when compared to the earlier decades (1970s), where it often started from around 10 °F.
                The higher end stayed always around 90 °F.
                It often shows peaks around 40 °F and 60 °F.
                </p>
            </div>
        </div>);
};

export default RidgelinePage;
