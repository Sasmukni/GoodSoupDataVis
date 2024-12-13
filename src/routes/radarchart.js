import React from 'react';
import '../App.css';
import RadarChart from '../radarchart';

function RadarChartPage () {
    const data = [
        { year: 2020, month: 'Jan', mean: 0 },
        { year: 2020, month: 'Feb', mean: 2 },
        { year: 2020, month: 'Mar', mean: 5 },
        { year: 2020, month: 'Apr', mean: 8 },
        { year: 2020, month: 'May', mean: 12 },
        { year: 2020, month: 'Jun', mean: 15 },
        { year: 2020, month: 'Jul', mean: 20 },
        { year: 2020, month: 'Aug', mean: 19 },
        { year: 2020, month: 'Sep', mean: 14 },
        { year: 2020, month: 'Oct', mean: 10 },
        { year: 2020, month: 'Nov', mean: 5 },
        { year: 2020, month: 'Dec', mean: 1 },
        { year: 2021, month: 'Jan', mean: -1 },
        { year: 2021, month: 'Feb', mean: 1 },
        { year: 2021, month: 'Mar', mean: 4 },
        { year: 2021, month: 'Apr', mean: 7 },
        { year: 2021, month: 'May', mean: 11 },
        { year: 2021, month: 'Jun', mean: 16 },
        { year: 2021, month: 'Jul', mean: 21 },
        { year: 2021, month: 'Aug', mean: 20 },
        { year: 2021, month: 'Sep', mean: 15 },
        { year: 2021, month: 'Oct', mean: 9 },
        { year: 2021, month: 'Nov', mean: 4 },
        { year: 2021, month: 'Dec', mean: 0 },
    ];

    return <RadarChart data={data} />;
};

export default RadarChartPage;
