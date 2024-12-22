import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AlluvialDiagram = ({ data, width, height }) => {
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
        const layers = ["continent", "nation", "category"];

        const continentColors = {
            Asia: "yellow",
            Europe: "blue",
            Africa: "pink",
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
                case "nation" : return name!=="Others"?continentColors[continent]:"purple";
                case "category" : return categoryColor[name];
            }
        }
        
        

        const sumNodeValues = d3.sum(data.nodes, d => d.value);


        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([margin.top, height]);

        const xScale = d3.scalePoint()
            .domain(layers)
            .range([margin.left, width - margin.right]);
          
        

        
        
        

        const nodesByLayer = {};

        data.nodes.forEach(node => {
            
           
            if(node.layer === "nation"){
                node.width = 100;
            }
            if(node.layer === "category"){
                node.width = 100;
            }
            if(node.layer === "continent"){
                node.width = 100;
            }
            node.height = yScale(node.value) - margin.top; 
            node.x = xScale(node.layer);
            node.y = (nodesByLayer[node.layer] || 0);
            nodesByLayer[node.layer] = node.y + node.height;
        });

        const maxLinkValue = d3.max(data.links, d => d.value);

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

        let prevValsTargetCN = {
            Others:0,
        };

        let prevValsNE = {
        };

        let prevValE = {
            fossil:0,
            "land use":0
        }

        const links = svg.append("g")
            .attr("fill", "none")
            .selectAll()
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
                    if(targetNode.name === "Others"){
                        targetPos = prevValsTargetCN[targetNode.name] + (yScale(d.value)- margin.top)/2;
                        prevValsTargetCN[targetNode.name] += (yScale(d.value)- margin.top);
                    }else{
                    targetPos = targetNode.height / 2;
                    }
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
                const sourceNode = data.nodes.find(n => n.name === d.source);
                const targetNode = data.nodes.find(n => n.name === d.target);

                return layerColors(sourceNode.layer,sourceNode.name, sourceNode.continent);
            })
            .attr("stroke-width", d => Math.max((yScale(d.value)- margin.top),2))
            .attr("stroke-opacity", d => (d.value / maxLinkValue) * 0.7 + 0.3);

            links.on("mouseover", function(event, d) {
                const sourceNode = data.nodes.find(n => n.name === d.source);
                const targetNode = data.nodes.find(n => n.name === d.target);

                d3.select(this).attr("stroke-opacity", 1);

                if (sourceNode.layer === "continent" && targetNode.layer === "nation") {
                    tooltip.html(`${d.target}: responsible of ${d.value.toFixed(2)}% of the globe's total emissions`)
                        .style("left", `${event.pageX + 5}px`)
                        .style("top", `${event.pageY - 28}px`)
                        .style("opacity", 1);
                } else if (sourceNode.layer === "nation" && targetNode.layer === "category") {
                    if (targetNode.name === "fossil") {
                        tooltip.html(`${d.source}: responsible of ${d.value.toFixed(2)}% of the globe's fossil emissions`)
                            .style("left", `${event.pageX + 5}px`)
                            .style("top", `${event.pageY - 28}px`)
                            .style("opacity", 1);
                    } else if (targetNode.name === "land use") {
                        tooltip.html(`${d.source}: responsible of ${d.value.toFixed(2)}% of the globe's land use emissions`)
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

        /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
        /*                             NODES                                      */
        /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
        const nodes = svg.append("g")
            .selectAll()
            .data(data.nodes)
            .join("rect")
            .attr("x", d => d.x - (d.width/2))
            .attr("y", d => d.y)
            .attr("width", d => d.width)
            .attr("height", d => {
                if (d.name === "fossil"){
                    return prevValE["fossil"];
                }else if(d.name === "land use"){
                    return prevValE["land use"];
                }else{
                    return d.height;
            }})
            .attr("fill", d => layerColors(d.layer, d.name, d.continent))
            .attr("stroke", "#000")
            .attr("stroke-width", 0.5)
            .attr("opacity", 1);
      
        nodes.on("mouseover", function(event, d) {
            d3.select(this).attr("fill-opacity", 0.8);

        if (d.layer === "continent") {
            tooltip.html(`Total Emission of ${d.name}: ${d.value.toFixed(2)} % of the total `)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`)
                .style("opacity", 1);
        } else if (d.layer === "category") {
            const totalEmissions = data.links
                .filter(link => link.target === d.name)
                .reduce((sum, link) => sum + link.value, 0);

            tooltip.html(`Total ${d.name} Emissions: ${totalEmissions.toFixed(2)} % of the total`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`)
                .style("opacity", 1);
        }else{
            tooltip.html(`Total Emission of ${d.name}: ${d.value.toFixed(2)} % of the total`)
                .style("left", `${event.pageX + 5}px`)
                .style("top", `${event.pageY - 28}px`)
                .style("opacity", 1);
        }

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
            tooltip.style("opacity", 0);

            svg.selectAll("path")
                .attr("stroke-opacity", d => (d.value / maxLinkValue) * 0.7 + 0.3);
        });

        

        svg.append("g")
            .selectAll()
            .data(data.nodes)
            .join("text")
            .attr("x", d => d.x)
            .attr("y", d => d.y + (d.height/2))
            .attr("dy", "0.3em")
            .attr("text-anchor", "middle")
            .attr("font-family", "Arial")
            .attr("font-size", 10)
            .attr("fill", "#000")
            .text(d => {
                if (d.value >= 1.13){
                    return d.name
                }else{
                    return " "
                }
            });

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
