import {useState } from "react";
import RadarChart from './radarChart';
import PieChart from './pieChart';
import TreeMapChart from './treeMapChart';
import treemapimg from '../data/treemap.png';
import piechartimg from '../data/piechartimg.png';
import radarchartimg from'../data/radarchartimg.png';

export default function SwitchDiag({
  colorsType = ["pink"]
}) {
  const [diag, setDiag] = useState(0);

  return (
    <div className='row'>
        <div className='col-3' >
            <div className="card ">
                <div className="card-body " >
                    <h5 className="card-title text text-primary">The average number of women in bachelor's and master's programs exceeds that of men</h5>
                    <img class="card-img-top img-small" src={radarchartimg} alt="Card image cap" style={{maxWidth:"250px"}}/>
                    <button className="btn btn-primary" onClick={()=>setDiag(0)}>Show me</button>
                </div>
            </div>
            <div className="card ">
                <div className="card-body">
                    <h5 className="card-title text text-primary">Full-time study is common among students in Europe</h5>
                    <img class="card-img-top" src={piechartimg} alt="Card image cap" style={{maxWidth:"250px"}}/>
                    <button className="btn btn-primary" onClick={()=>setDiag(1)}>Show me</button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text text-primary">Women are more inclined to private universities than men</h5>
                    <img class="card-img-top" src={treemapimg} alt="Card image cap" style={{maxWidth:"250px"}}/>
                    <button className="btn btn-primary" onClick={()=>setDiag(2)}>Show me</button>
                </div>
            </div>
            
        </div>
    {diag!==null && 
        <>
        {diag===0 &&
            <div className="col-9 white border_external_right">
                <RadarChart colors={colorsType} width={window.innerWidth - 0.5 * window.innerWidth} height={window.innerHeight* 4/8}/>
                <h2 className="card-title text-primary fw-bold mb-3">The average number of women in bachelor's and master's programs exceeds that of men</h2>
                <h4 className='card-title text-secondary'>Radar chart</h4>
                <p>The proportions of male and female students across education levels are broadly similar. 
                    Most are enrolled at the bachelor’s level, followed by the master’s, short-cycle, and doctoral levels. 
                </p><p>
                    For the short-cycle and doctoral levels, the gender distribution is nearly identical, while at the bachelor’s and master’s levels,
                    female students are significantly more numerous.
                </p>
            </div>   
        }
        {diag===1 &&
            <div className="col-9 white border_external_right">
                <PieChart colors={colorsType} width={window.innerWidth - 0.4 * window.innerWidth} height={window.innerHeight* 4/8}/>
                <h2 className="card-title text-primary fw-bold mb-3">Full-time study is common among students in Europe</h2>
                <h4 className='card-title text-secondary'>Pie charts</h4>
                <p>The proportions of male and female students based on working time are similar, with most studying full-time (80%–90% across years). 
                    However, female students are slightly more likely to study part-time, possibly because, in some less developed countries, 
                    women are often expected to take on caregiving responsibilities at home.</p>
            </div>   
        }
        {diag===2 &&
            <div className="col-9 white border_external_right">
                <TreeMapChart colors={colorsType} width={window.innerWidth - 0.5 * window.innerWidth} height={window.innerHeight* 4/8}/>
                <h2 className="card-title text-primary fw-bold mb-3">Women are more inclined to private universities than men</h2>
                <h4 className='card-title text-secondary'>Treemap chart</h4>
                <p>There are generally more female students than male students, and this trend extends across both the public and private sectors. 
                    However, female students are more likely to attend private institutions, possibly correlating with their higher likelihood of 
                    part-time enrollment, as private universities often offer part-time programs compared to public ones.</p>
            </div>   
        }
        </>
    }
    </div>
  );
}
