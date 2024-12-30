import React from 'react';
import '../App.css';
import RadarChart from '../radarchart';
import Data from '../data/temperatures_merged_final.json';

function RadarChartPage () {
    return(
    <div className="App">
        <header className="text-center py-4">
          <h1 className="display-4 fw-bold text-primary mb-3">Temperature timeline</h1>
          <h2 className="h5 text-secondary mt-3">Radarchart showing average temperature over time</h2>
        </header>
        <div className="container my-3">
            <h2 className="text-center mb-4 fw-semibold fs-4">Reading the visualization</h2>
            <p className="text-muted text-start fs-5 px-3">
            This radarchart visualization allows you to compare average temperatures (in Fahrenheit) recorded in the state of Texas over the months and years.
            </p>
            <RadarChart data={Data} />
        </div>
        <div className="container my-3">
            <h2 className="text-center my-4 fw-semibold fs-4">Understanding the data</h2>
            <p className="text-muted text-start fs-5 px-3">
            Again, as seen in the linechart, it is possible to observe that the temperatures in Texas are higher during the summer months, reaching around 88 °F, and staying around 44 °F during winter months.
            Most recent years have recorded higher temperatures overall. The difference is more visibile during winter than summer.
            </p>
        </div>
    </div>);
};

export default RadarChartPage;
