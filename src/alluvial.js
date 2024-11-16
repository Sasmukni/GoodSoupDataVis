import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AlluvialDiagram = ({ data, width, height, margin }) => {
    const svgRef = useRef();
    const tooltipRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const tooltip = d3.select(tooltipRef.current);
        svg.selectAll("*").remove();

        const layers = ["continent", "nation", "category"];
        
        const xScale = d3.scalePoint()
            .domain(layers)
            .range([margin.left, width - margin.right]);

        const sumNodeValues = d3.sum(data.nodes, d => d.value);
        const yScale = d3.scaleLinear()
            .domain([0, sumNodeValues])
            .range([margin.top, height - margin.bottom]);
          
        const continentColors = {
            Asia: "yellow",
            Europe: "blue",
            Africa: "black",
            Oceania: "green",
            "North America": "red",
            "South America": "orange"
        };

        const categoryColor =
        {
            fossil: "Brown",
            "land use": "Green"
        }
        
        const layerColors= (layer, name, continent) => {
            switch(layer){
                case "continent" : return continentColors[name];
                case "nation" : return continentColors[continent];
                case "category" : return categoryColor[name];
            }
        }

        const nodesByLayer = {};
        data.nodes.forEach(node => {
            node.x = xScale(node.layer);
            node.y = (nodesByLayer[node.layer] || 0) + margin.top;
            node.height = yScale(node.value) - margin.top; 
            nodesByLayer[node.layer] = node.y + node.height - 20;
        });

        const maxLinkValue = d3.max(data.links, d => d.value);

        let prevValsCN = {
            Asia: 0,
            Europe: 0,
            Africa: 0,
            Oceania: 0,
            "North America": 0,
            "South America": 0
        };

        let prevValsNE = {};

        let prevValE = {
            fossil:0,
            "land use":0
        }

        const links = svg.append("g")
            .attr("fill", "none")
            .selectAll("path")
            .data(data.links)
            .join("path")
            .attr("d", d => {
                const sourceNode = data.nodes.find(n => n.name === d.source);
                const targetNode = data.nodes.find(n => n.name === d.target);
                let pos = 0;
                let targetPos = 0;
                if(sourceNode.layer==="continent"){
                    pos = prevValsCN[sourceNode.name] + (yScale(d.value)- margin.top)/2;
                    prevValsCN[sourceNode.name] += (yScale(d.value)- margin.top);
                    targetPos = targetNode.height / 2;
                }else{
                    if(sourceNode.name in prevValsNE){
                        pos = prevValsNE[sourceNode.name] + (yScale(d.value)- margin.top)/2;
                        prevValsNE[sourceNode.name] += (yScale(d.value)- margin.top);
                    }else{
                        pos = (yScale(d.value)- margin.top)/2;
                        prevValsNE[sourceNode.name] = (yScale(d.value)- margin.top);
                    }
                    targetPos = prevValE[targetNode.name] + (yScale(d.value)- margin.top)/2;
                    prevValE[targetNode.name] += (yScale(d.value)- margin.top);
                }
                return d3.line()
                    .curve(d3.curveBundle.beta(0.25))
                    .x(d => d.x-3)
                    .y(d => d.y)([
                        { x: sourceNode.x + 10, y: sourceNode.y + pos},
                        { x: (sourceNode.x + targetNode.x) / 2, y: sourceNode.y + sourceNode.height / 2 },
                        { x: (sourceNode.x + targetNode.x) / 2, y: targetNode.y + targetPos },
                        { x: targetNode.x , y: targetNode.y + targetPos}
                    ]);
            })
            .attr("stroke", d => {
                const sourceNode = data.nodes.find(n => n.name === d.source);
                const targetNode = data.nodes.find(n => n.name === d.target);

                return layerColors(sourceNode.layer,sourceNode.name, sourceNode.continent);
            })
            .attr("stroke-width", d => (yScale(d.value)- margin.top))
            .attr("stroke-opacity", d => (d.value / maxLinkValue) * 0.7 + 0.3);

        links.on("mouseover", function(event, d) {
            const sourceNode = data.nodes.find(n => n.name === d.source);
            const targetNode = data.nodes.find(n => n.name === d.target);

            d3.select(this).attr("stroke-opacity", 1);

            if (sourceNode.layer === "continent" && targetNode.layer === "nation") {
                tooltip.html(`Total Emissions: ${targetNode.totalEmissions} MT`)
                    .style("left", `${event.pageX + 5}px`)
                    .style("top", `${event.pageY - 28}px`)
                    .style("opacity", 1);
            } else if (sourceNode.layer === "nation" && targetNode.layer === "category") {
                if (targetNode.name === "fossil") {
                    tooltip.html(`Fossil Emissions: ${targetNode.fossilEmissions} MT`)
                        .style("left", `${event.pageX + 5}px`)
                        .style("top", `${event.pageY - 28}px`)
                        .style("opacity", 1);
                } else if (targetNode.name === "land use") {
                    tooltip.html(`Land Use Emissions: ${targetNode.landEmissions} MT`)
                        .style("left", `${event.pageX + 5}px`)
                        .style("top", `${event.pageY - 28}px`)
                        .style("opacity", 1);
                } 
            }

            svg.selectAll("path")
                .attr("stroke-opacity", link => {
                    const linkSourceNode = data.nodes.find(n => n.name === link.source);
                    const linkTargetNode = data.nodes.find(n => n.name === link.target);
                    if ((linkSourceNode === sourceNode && linkTargetNode === targetNode) ||
                        (linkSourceNode === targetNode && linkTargetNode === sourceNode)) {
                        return 1;
                    }
                    return 0.1;
                });
        })
        .on("mouseout", function() {
            svg.selectAll("path")
                .attr("stroke-opacity", d => (d.value / maxLinkValue) * 0.7 + 0.3);
            tooltip.style("opacity", 0);
        });

        const nodes = svg.append("g")
            .selectAll("rect")
            .data(data.nodes)
            .join("rect")
            .attr("x", d => d.x - 10)
            .attr("y", d => d.y )
            .attr("width", 20)
            .attr("height", d => d.height)
            .attr("fill", d => layerColors(d.layer, d.name, d.continent));

      
        nodes.on("mouseover", function(event, d) {
            d3.select(this).attr("fill-opacity", 0.8);

            svg.selectAll("path")
                .attr("stroke-opacity", link => {
                    const sourceNode = data.nodes.find(n => n.name === link.source);
                    const targetNode = data.nodes.find(n => n.name === link.target);
                    if (sourceNode === d || targetNode === d) {
                        return 1;
                    }
                    return 0.1;
                });
        })
        .on("mouseout", function() {
            d3.select(this).attr("fill-opacity", 1);

            svg.selectAll("path")
                .attr("stroke-opacity", d => (d.value / maxLinkValue) * 0.7 + 0.3);  // Reset opacity based on value
        });

        svg.append("g")
            .selectAll("text")
            .data(data.nodes)
            .join("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y - 4)
            .attr("dy", "0.01em")
            .attr("text-anchor", "middle")
            .text(d => d.name);

    }, [data, width, height, margin]);

    return (
        <>
            <svg ref={svgRef} width={width} height={height}></svg>
            <div ref={tooltipRef} style={{
                position: 'absolute', background: 'rgba(255, 255, 255, 0.7)', padding: '5px', borderRadius: '5px',
                pointerEvents: 'none', opacity: 0, transition: 'opacity 0.2s'
            }}></div>
        </>
    );
};

export default AlluvialDiagram;
