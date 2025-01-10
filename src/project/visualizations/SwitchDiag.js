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
                    <h5 className="card-title text text-primary">Radar chart</h5>
                    <h6 className="card-title">Radar chart</h6>
                    <img class="card-img-top img-small" src={radarchartimg} alt="Card image cap"></img>
                    <button className="btn btn-primary" onClick={()=>setDiag(0)}>Show me</button>
                </div>
            </div>
            <div className="card ">
                <div className="card-body">
                    <h5 className="card-title text text-primary">Pie charts</h5>
                    <h6 className="card-title">Pie charts</h6>
                    <img class="card-img-top" src={piechartimg} alt="Card image cap"></img>
                    <button className="btn btn-primary" onClick={()=>setDiag(1)}>Show me</button>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text text-primary">Tree map chart</h5>
                    <h6 className="card-title">Tree map chart</h6>
                    <img class="card-img-top" src={treemapimg} alt="Card image cap"></img>
                    <button className="btn btn-primary" onClick={()=>setDiag(2)}>Show me</button>
                </div>
            </div>
            
        </div>
    {diag!==null && 
        <>
        {diag===0 &&
            <div className="col-9 white">
                <RadarChart colors={colorsType} width={window.innerWidth - 0.5 * window.innerWidth} height={window.innerHeight* 4/8}/>
                <h5 className="card-title text text-primary">Radar chart</h5>
                <h6 className="card-title">Radar chart</h6>
                <p>Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                    Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                    amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                    Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.
                    Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                    Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                    amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                    Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.</p>
            </div>   
        }
        {diag===1 &&
            <div className="col-9 white">
                <PieChart colors={colorsType} width={window.innerWidth - 0.4 * window.innerWidth} height={window.innerHeight* 5/8}/>
                <h5 className="card-title text text-primary">Pie charts</h5>
                <h6 className="card-title">Pie charts</h6>
                <p>Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                    Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                    amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                    Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.
                    Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                    Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                    amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                    Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.</p>
            </div>   
        }
        {diag===2 &&
            <div className="col-9 white">
                <TreeMapChart colors={colorsType} width={window.innerWidth - 0.5 * window.innerWidth} height={window.innerHeight* 4/8}/>
                <h5 className="card-title text text-primary">Treemap chart</h5>
                <h6 className="card-title">Treemap chart</h6>
                <p>Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                    Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                    amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                    Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.
                    Ut ultricies, tellus non sagittis malesuada, velit dui venenatis eros, at pellentesque mauris neque non dui. 
                    Integer in lobortis dui. In a ornare quam. Donec maximus, dui interdum egestas ornare, augue leo suscipit nisl, 
                    sed aliquet lacus sapien ut tortor. Integer dignissim est leo, eu finibus diam accumsan id. Morbi a eros sit 
                    amet magna sollicitudin mattis. Donec vel lobortis nibh. Curabitur eu aliquam diam, ac faucibus nulla. 
                    Pellentesque vitae eros ac diam tincidunt condimentum eget vitae nunc.</p>
            </div>   
        }
        </>
    }
    </div>
  );
}
