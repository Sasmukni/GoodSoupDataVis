import React from 'react';
import '../App.css';
import RidgelineChart from '../ridgeline';

function RidgelinePage() {
    const data = [
        {
            year: 2020,
            values: [15, 18, 20, 22, 25, 30, 35, 40, 45, 50]
          },
          {
            year: 2021,
            values: [10, 12, 15, 18, 22, 28, 32, 38, 42, 48]
          },
          {
            year: 2022,
            values: [8, 10, 14, 17, 21, 26, 31, 36, 41, 46]
          }
    ];

    return <RidgelineChart data={data} />;
};

export default RidgelinePage;
