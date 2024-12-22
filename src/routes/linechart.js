import React from 'react';
import '../App.css';
import LineChart from '../linechart'; 

function LinechartPage() {
    const data = [
        { year: 2020, month: 'Jan', min: -5, max: 5, mean: 0 },
        { year: 2020, month: 'Feb', min: -3, max: 7, mean: 2 },
        { year: 2020, month: 'Mar', min: 0, max: 10, mean: 5 },
        { year: 2021, month: 'Jan', min: -6, max: 4, mean: -1 },
        { year: 2021, month: 'Feb', min: -4, max: 6, mean: 1 },
        { year: 2021, month: 'Mar', min: 1, max: 11, mean: 6 },
    ];

    return <LineChart data={data} />;
};

export default LinechartPage;
