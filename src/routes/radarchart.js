import React from 'react';
import '../App.css';
import RadarChart from '../radarchart';
import Data from '../data/temperatures_merged_final.json';

function RadarChartPage () {
    return <RadarChart data={Data} />;
};

export default RadarChartPage;
