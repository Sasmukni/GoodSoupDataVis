import React from 'react';
import '../App.css';
import LineChart from '../linechart'; 
import Data from '../data/temperatures_merged_final.json';

function LinechartPage() {
    return <LineChart data={Data} />;
};

export default LinechartPage;
