import React from 'react';
import '../App.css';
import LineChart from '../linechart'; 
import Data from '../data/temperatures_merged_final.json';

function LinechartPage() {
    return(
    <div className="App">
        <header className="text-center py-4">
            <h1 className="display-4 fw-bold text-primary mb-3">Temperature timeline</h1>
            <h2 className="h5 text-secondary mt-3">Linechart showing max, average and min temperature over time</h2>
        </header>
        <div className="container my-3">
            <h2 className="text-center mb-4 fw-semibold fs-4">Reading the visualization</h2>
            <p className="text-muted text-start fs-5 px-3">
            This linechart visualization allows you to compare average, min and max temperatures (in Fahrenheit) recorded in the state of Texas over the months from 1978 to 2023.
            </p>
            <LineChart data={Data} />
        </div>
        <div className="container my-3">
            <h2 className="text-center my-4 fw-semibold fs-4">Understanding the data</h2>
            <p className="text-muted text-start fs-5 px-3">
             As expected, the temperatures in Texas are consistently higher during the months corresponding to the Northern hemisphere summer (June to August) and decrease during winter (December to February).
             It is also possible to notice that most the recent years' temperatures were overall higher when compared to previous years, although it was not always the case.
             In general, there is a difference of more or less 10 °F between min, average and max temperatures corresponding to the same month. All temperatures measured were between the range of around 20 °F to 100 °F.
            </p>
        </div>
    </div>);
};

export default LinechartPage;
