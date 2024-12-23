import React from 'react';
import '../App.css';
import RidgelineChart from '../ridgeline';
import Data from '../data/temperatures_merged_final.json';

function RidgelinePage() {
    return <RidgelineChart data={Data} />;
};

export default RidgelinePage;
