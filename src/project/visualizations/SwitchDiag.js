import {useState } from "react";
import RadarChart from './radarChart';
import PieChart from './pieChart';
import TreeMapChart from './treeMapChart';

export default function SwitchDiag({
  colorsType = ["pink"]
}) {
  const [diag, setDiag] = useState(0);

  return (
    <div className='row'>
        <div className='col-3'>
            <div className="card">
                <div className="card-body " >
                    <h5 className="card-title text text-primary">Radar chart</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button className="btn btn-primary" onClick={()=>setDiag(0)}>Show me</button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Pie charts</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button className="btn btn-primary" onClick={()=>setDiag(1)}>Show</button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Tree map chart</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button className="btn btn-primary" onClick={()=>setDiag(2)}>Show</button>
                </div>
            </div>
        </div>
    {diag!==null && 
        <>
        {diag===0 &&
            <div className="col-9">
                <RadarChart colors={colorsType} width={window.innerWidth - 0.5 * window.innerWidth} height={window.innerHeight* 5/8}/>
            </div>   
        }
        {diag===1 &&
            <div className="col-9">
                <PieChart colors={colorsType} width={window.innerWidth - 0.5 * window.innerWidth} height={window.innerHeight* 5/8}/>
            </div>   
        }
        {diag===2 &&
            <div className="col-9">
                <TreeMapChart colors={colorsType} width={window.innerWidth - 0.5 * window.innerWidth} height={window.innerHeight* 5/8}/>
            </div>   
        }
        </>
    }
    </div>
  );
}
