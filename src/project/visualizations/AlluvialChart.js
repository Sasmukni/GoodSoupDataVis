import * as d3 from "d3";
import {useRef, useEffect} from "react";
import Select from "react-select";
import {useState} from "react";

import nodes_2013 from '../data/Project_alluvial_nodes_2013_data.json'
import links_2013 from '../data/Project_alluvial_links_2013_data.json'
import nodes_2014 from '../data/Project_alluvial_nodes_2014_data.json'
import links_2014 from '../data/Project_alluvial_links_2014_data.json'
import nodes_2015 from '../data/Project_alluvial_nodes_2015_data.json'
import links_2015 from '../data/Project_alluvial_links_2015_data.json'
import nodes_2016 from '../data/Project_alluvial_nodes_2016_data.json'
import links_2016 from '../data/Project_alluvial_links_2016_data.json'
import nodes_2017 from '../data/Project_alluvial_nodes_2017_data.json'
import links_2017 from '../data/Project_alluvial_links_2017_data.json'
import nodes_2018 from '../data/Project_alluvial_nodes_2018_data.json'
import links_2018 from '../data/Project_alluvial_links_2018_data.json'
import nodes_2019 from '../data/Project_alluvial_nodes_2019_data.json'
import links_2019 from '../data/Project_alluvial_links_2019_data.json'
import nodes_2020 from '../data/Project_alluvial_nodes_2020_data.json'
import links_2020 from '../data/Project_alluvial_links_2020_data.json'
import nodes_2021 from '../data/Project_alluvial_nodes_2021_data.json'
import links_2021 from '../data/Project_alluvial_links_2021_data.json'
import nodes_2022 from '../data/Project_alluvial_nodes_2022_data.json'
import links_2022 from '../data/Project_alluvial_links_2022_data.json'

export default function AlluvialChart({
  data = [230,420,690,880,400],
  width = 1040,
  height = 600,
  marginTop = 20,
  marginRight = 60,
  marginBottom = 10,
  marginLeft = 60,
  colors = ["coral"]
}) {
  const data2013 = {
    nodes: nodes_2013,
    links: links_2013
}
const data2014 = {
    nodes: nodes_2014,
    links: links_2014
}
const data2015 = {
    nodes: nodes_2015,
    links: links_2015
}
const data2016 = {
    nodes: nodes_2016,
    links: links_2016
}
const data2017 = {
    nodes: nodes_2017,
    links: links_2017
}
const data2018 = {
    nodes: nodes_2018,
    links: links_2018
}
const data2019 = {
    nodes: nodes_2019,
    links: links_2019
}
const data2020 = {
    nodes: nodes_2020,
    links: links_2020
}
const data2021 = {
    nodes: nodes_2021,
    links: links_2021
}
const data2022 = {
    nodes: nodes_2022,
    links: links_2022
}

const yearOptions = [
    {label : 2013, value: data2013},
    {label : 2014, value: data2014},
    {label : 2015, value: data2015},
    {label : 2016, value: data2016},
    {label : 2017, value: data2017},
    {label : 2018, value: data2018},
    {label : 2019, value: data2019},
    {label : 2020, value: data2020},
    {label : 2021, value: data2021},
    {label : 2022, value: data2022}
];
const [topSelected, setTopSelected] = useState(data2022);

const svgRef = useRef();
const tooltipRef = useRef();
const margin = { top: 40, right: width < 1024 ? 20 : 80, bottom: 400, left: width < 1024 ? 20 : 80 };

useEffect(() => {
const svg = d3.select(svgRef.current);
const tooltip = d3.select(tooltipRef.current);
svg.selectAll("*").remove();


/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*                             COLORS                                     */
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const layers = ["nation", "sex", "study_type","working_time"];


const sexColor =
{
    Males: colors["Males"],
    Females: colors["Females"]
}

const sexType =
{
    Males: "male",
    Females: "female"
}
const workColor = 
{
    "Full time": colors["Full time"],
    "Part time": colors["Part time"]
}
const studyColor = 
{
    "Short cycle" : colors["Short cycle"],
    Bachelor : colors["Bachelor"],
    Master : colors["Master"],
    Doctoral : colors["Doctoral"]
}

var colorScale = d3.scaleLinear()
      .domain([0,8600000])
      .range([colors["Nation1"], colors["Nation2"]]);

const layerColors= (layer, name, value) => {
    switch(layer){
        case "nation" : return colorScale(value);
        case "sex" : return sexColor[name];
        case "study_type" : return studyColor[name];
        case "working_time" : return workColor[name]
    }
}



const sumNodeValues = d3.sum(topSelected.nodes, d => d.value);


const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([marginTop, height]);

const xScale = d3.scalePoint()
    .domain(layers)
    .range([marginLeft, width - marginRight]);
  






const nodesByLayer = {};

topSelected.nodes.forEach(node => {
    
    
    if(node.layer === "nation"){
        node.width = 100;
    }
    if(node.layer === "sex"){
        node.width = 100;
    }
    if(node.layer === "study_type"){
        node.width = 100;
    }
    if(node.layer === "working_time"){
      node.width = 100;
  }
    node.height = yScale(node.value_perc) - marginTop; 
    node.x = xScale(node.layer);
    node.y = (nodesByLayer[node.layer] || 0);
    nodesByLayer[node.layer] = node.y + node.height;
});

const maxLinkValue = d3.max(topSelected.links, d => d.value_perc);

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*                             LINKS                                      */
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

let prevValsCN = {
    Asia: 0, 
    Europe: 0,
    Africa: 0,
    Oceania: 0,
    "North America": 0,
    "South America": 0
};
let prevValsTargetMale = {
  "Males":0
};

let prevValsTargetFemale = {
  Females:0
};
let prevValsSex = {
  Males: 0,
  Females: 0
}
let prevValsTargetCN = {
  Males:0,
  Females: 0
};
let prevValsTargetSC = {
    "Short cycle":0
};

let prevValsTargetBA = {
    Bachelor:0
};
let prevValsTargetMA = {
    Master:0
};
let prevValsTargetDO = {
    Doctoral:0
};

let prevValsStudy = {
    "Short cycle":0,
    Bachelor:0,
    Master:0,
    Doctoral:0
};

let prevValsTargetFull = {
  "Full time":0
};
let prevValsTargetPart = {
  "Part time":0
};

let prevValsNE = {
}
let prevValE = {
    Females:0,
    Males:0
}

const links = svg.append("g")
    .attr("fill", "none")
    .selectAll()
    .data(topSelected.links)
    .join("path")
    .attr("d", d => {
        const sourceNode = topSelected.nodes.find(n => n.name === d.source);
        const targetNode = topSelected.nodes.find(n => n.name === d.target);
        let pos = 0;
        let targetPos = 0;
        if(sourceNode.layer==="nation"){
            if(sourceNode.name in prevValsNE){
              pos = prevValsNE[sourceNode.name] + (yScale(d.value_perc)- marginTop)/2;
              prevValsNE[sourceNode.name] += (yScale(d.value_perc)- marginTop);
            }else{
              pos = (yScale(d.value_perc)- marginTop)/2;
              prevValsNE[sourceNode.name] = (yScale(d.value_perc)- marginTop);
            }
            if(targetNode.name === "Males"){
                targetPos = prevValsTargetMale[targetNode.name] + (yScale(d.value_perc)- marginTop)/2;
                prevValsTargetMale[targetNode.name] += (yScale(d.value_perc)- marginTop);
            }else{
                targetPos = prevValsTargetFemale[targetNode.name] + (yScale(d.value_perc)- marginTop)/2;
                prevValsTargetFemale[targetNode.name] += (yScale(d.value_perc)- marginTop);
            }
        }else if(sourceNode.layer==="sex"){
            pos = prevValsSex[sourceNode.name] + (yScale(d.value_perc)- marginTop)/2;
            prevValsSex[sourceNode.name] += (yScale(d.value_perc)- marginTop);
            
            if(targetNode.name === "Short cycle"){
              targetPos = prevValsTargetSC[targetNode.name] + (yScale(d.value_perc)- marginTop)/2;
              prevValsTargetSC[targetNode.name] += (yScale(d.value_perc)- marginTop);
            }else if(targetNode.name === "Bachelor"){
              targetPos = prevValsTargetBA[targetNode.name] + (yScale(d.value_perc)- marginTop)/2;
              prevValsTargetBA[targetNode.name] += (yScale(d.value_perc)- marginTop);
            }else if(targetNode.name === "Master"){
              targetPos = prevValsTargetMA[targetNode.name] + (yScale(d.value_perc)- marginTop)/2;
              prevValsTargetMA[targetNode.name] += (yScale(d.value_perc)- marginTop);
            }else if(targetNode.name === "Doctoral"){
              targetPos = prevValsTargetDO[targetNode.name] + (yScale(d.value_perc)- marginTop)/2;
              prevValsTargetDO[targetNode.name] += (yScale(d.value_perc)- marginTop);
            }
        }else if(sourceNode.layer==="study_type"){
            pos = prevValsStudy[sourceNode.name] + (yScale(d.value_perc)- marginTop)/2;
            prevValsStudy[sourceNode.name] += (yScale(d.value_perc)- marginTop);
            
            if(targetNode.name === "Full time"){
              targetPos = prevValsTargetFull[targetNode.name] + (yScale(d.value_perc)- marginTop)/2;
              prevValsTargetFull[targetNode.name] += (yScale(d.value_perc)- marginTop);
            }else if(targetNode.name === "Part time"){
              targetPos = prevValsTargetPart[targetNode.name] + (yScale(d.value_perc)- marginTop)/2;
              prevValsTargetPart[targetNode.name] += (yScale(d.value_perc)- marginTop);
            }
        }
        return d3.line()
            .curve(d3.curveBundle.beta(1))
            .x(d => d.x )
            .y(d => d.y)([
                { x: sourceNode.x + (sourceNode.width/2), y: sourceNode.y + pos},
                { x: (sourceNode.x + targetNode.x) / 2, y: sourceNode.y + pos},
                { x: (sourceNode.x + targetNode.x) / 2, y: targetNode.y + targetPos },
                { x: targetNode.x - (targetNode.width/2), y: targetNode.y + targetPos}
            ]);
    })
    .attr("stroke", d => {
        const sourceNode = topSelected.nodes.find(n => n.name === d.source);
        const targetNode = topSelected.nodes.find(n => n.name === d.target);

        return layerColors(sourceNode.layer,sourceNode.name, sourceNode.value);
    })
    .attr("stroke-width", d => Math.max((yScale(d.value_perc)- marginTop),2))
    .attr("stroke-opacity", d => (d.value_perc / maxLinkValue) * 0.7 + 0.3);

    links.on("mouseover", function(event, d) {
        const sourceNode = topSelected.nodes.find(n => n.name === d.source);
        const targetNode = topSelected.nodes.find(n => n.name === d.target);

        d3.select(this).attr("stroke-opacity", 1);

        if (sourceNode.layer === "nation" && targetNode.layer === "sex") {
          if (targetNode.name === "Males") {
            tooltip.html(`${d.value.toFixed(0)} students from ${d.source} are Males, <br> 
                          they rappresents ${((d.value_perc/sourceNode.value_perc)*100).toFixed(2)}% of ${d.source} students, <br>
                          they are ${d.value_perc.toFixed(2)}% of the European students.`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`)
                .style("opacity", 1);
          } else if (targetNode.name === "Females") {
            tooltip.html(`${d.value.toFixed(0)} students from ${d.source} are Females, <br> 
                          they rappresents ${((d.value_perc/sourceNode.value_perc)*100).toFixed(2)}% of ${d.source} students, <br>
                          they are ${d.value_perc.toFixed(2)}% of the European students.`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`)
                .style("opacity", 1);
          }
        } else if (sourceNode.layer === "sex" && targetNode.layer === "study_type") {
            if (sourceNode.name === "Males") {
                tooltip.html(`${((d.value_perc/sourceNode.value_perc)*100).toFixed(2)}% of ${d.source} are in ${d.target} type of studies, <br>
                              They rappresents ${((d.value_perc/targetNode.value_perc)*100).toFixed(2)}% of students enrolled to ${d.target} type of studies.`)
                    .style("left", `${event.pageX + 5}px`)
                    .style("top", `${event.pageY - 28}px`)
                    .style("opacity", 1);
            } else if (sourceNode.name === "Females") {
                tooltip.html(`${((d.value_perc/sourceNode.value_perc)*100).toFixed(2)}% of ${d.source} are in ${d.target} type of studies, <br>
                              They rappresents ${((d.value_perc/targetNode.value_perc)*100).toFixed(2)}% of students enrolled to ${d.target} type of studies.`)
                    .style("left", `${event.pageX + 5}px`)
                    .style("top", `${event.pageY - 28}px`)
                    .style("opacity", 1);
            } 
        }else if (sourceNode.layer === "study_type" && targetNode.layer === "working_time") {
          if (targetNode.name === "Full time") {
              tooltip.html(`The ${d.value_perc.toFixed(2)}% of students enrolled in a ${sourceNode.name} type of studies, they are studing in ${targetNode.name}.<br>
                            They are ${((d.value_perc/targetNode.value_perc)*100).toFixed(2)}% of total students studing in ${targetNode.name}.`)
                  .style("left", `${event.pageX + 5}px`)
                  .style("top", `${event.pageY - 28}px`)
                  .style("opacity", 1);
          } else if (targetNode.name === "Part time") {
              tooltip.html(`The ${d.value_perc.toFixed(2)}% of students enrolled in a ${sourceNode.name} type of studies, they are studing in ${targetNode.name}.<br>
                            They are ${((d.value_perc/targetNode.value_perc)*100).toFixed(2)}% of total students studing in ${targetNode.name}.`)
                  .style("left", `${event.pageX + 5}px`)
                  .style("top", `${event.pageY - 28}px`)
                  .style("opacity", 1);
          } 
      }

    svg.selectAll("path")
        .attr("stroke-opacity", link => {
            const linkSourceNode = topSelected.nodes.find(n => n.name === link.source);
            const linkTargetNode = topSelected.nodes.find(n => n.name === link.target);
            if ((linkSourceNode === sourceNode && linkTargetNode === targetNode) ||
                (linkSourceNode === targetNode && linkTargetNode === sourceNode)) {
                return 1;
            }
            return 0.1;
        });
})
.on("mouseout", function() {
    svg.selectAll("path")
        .attr("stroke-opacity", 0.1);
    tooltip.style("opacity", 0);
});

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*                             NODES                                      */
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
const nodes = svg.append("g")
    .selectAll()
    .data(topSelected.nodes)
    .join("rect")
    .attr("x", d => d.x - (d.width/2))
    .attr("y", d => d.y)
    .attr("width", d => d.width)
    .attr("height", d => d.height)
    .attr("fill", d => layerColors(d.layer, d.name, d.value))
    .attr("stroke", "#000")
    .attr("stroke-width", 0.5)
    .attr("opacity", 1);

nodes.on("mouseover", function(event, d) {
    d3.select(this).attr("fill-opacity", 0.3);

if (d.layer === "nation") {
    tooltip.html(`Total students of nation ${d.name}: ${d.value.toFixed(0)} <br>
                  That are ${d.value_perc.toFixed(2)}% of total European students.`)
        .style("left", `${event.pageX + 5}px`)
        .style("top", `${event.pageY - 28}px`)
        .style("opacity", 1);
} else if (d.layer === "sex") {
    tooltip.html(`Total ${sexType[d.name]} students in Europe: ${d.value.toFixed(0)} <br>
                  That are ${d.value_perc.toFixed(2)}% of the total.`)
        .style("left", `${event.pageX + 5}px`)
        .style("top", `${event.pageY - 28}px`)
        .style("opacity", 1);
} else if (d.layer === "study_type") {
  tooltip.html(`Total ${d.name} students in Europe: ${d.value.toFixed(0)} <br>
                That are ${d.value_perc.toFixed(2)}% of the total.`)
      .style("left", `${event.pageX + 5}px`)
      .style("top", `${event.pageY - 28}px`)
      .style("opacity", 1);
}else{
    tooltip.html(`Total students in ${d.name}: ${d.value.toFixed(0)}<br> 
                  That are ${d.value_perc.toFixed(2)}% of the total European`)
        .style("left", `${event.pageX + 5}px`)
        .style("top", `${event.pageY - 28}px`)
        .style("opacity", 1);
}

svg.selectAll("path")
    .attr("stroke-opacity", link => {
        const sourceNode = topSelected.nodes.find(n => n.name === link.source);
        const targetNode = topSelected.nodes.find(n => n.name === link.target);
        if (sourceNode === d || targetNode === d) {
            return 1;
        }
        return 0.1;
    });
})
.on("mouseout", function() {
    d3.select(this).attr("fill-opacity", 1);
    tooltip.style("opacity", 0);

    svg.selectAll("path")
        .attr("stroke-opacity", 0.1);
});



svg.append("g")
.selectAll()
.data(topSelected.nodes)
.join("text")
.attr("x", d => d.x)
.attr("y", d => d.y + (d.height/2))
.attr("dy", "0.3em")
.attr("text-anchor", "middle")
.attr("font-family", "Arial")
.attr("font-size", 10)
.attr("fill", "#000")
.text(d => {
    if (d.value_perc >= 1.13){
        return d.name
    }else{
        return " "
    }
});

},[topSelected, width, height, margin]);

  return (
  <div>
    <div className="filters-bar d-flex justify-content-center gap-3">
      <div className={window.innerWidth > 1024?"w-25":"w-50"}>
        <Select 
        options={yearOptions}
        onChange={(d)=> {
            setTopSelected(d.value);
        }} 
        defaultValue={yearOptions.filter(o => o.value === topSelected)}
        />
      </div>
    </div>

    <svg ref={svgRef} width={width} height={height}></svg>
    <div ref={tooltipRef} style={{
        position: 'absolute', background: 'rgba(255, 255, 255, 0.7)', padding: '5px', borderRadius: '5px',
        pointerEvents: 'none', opacity: 0, transition: 'opacity 0.2s'
    }}></div>
  </div>
  );
}