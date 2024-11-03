import * as d3 from "d3";
import {useRef, useEffect,useState} from "react";

export default function StackedBarPlot({
  data = [{"Continent":"Asia","Top1_Country":"Qatar","Top1_Emissions":37.601273,"Top1_Percentage":10.8552281296,"Top2_Country":"United Arab Emirates","Top2_Emissions":25.833244,"Top2_Percentage":7.4578793369,"Top3_Country":"Bahrain","Top3_Emissions":25.672274,"Top3_Percentage":7.4114084083,"Top4_Country":"Kuwait","Top4_Emissions":25.578102,"Top4_Percentage":7.3842216015,"Top5_Country":"Brunei","Top5_Emissions":23.950201,"Top5_Percentage":6.9142578126,"Others_Countries":["Saudi Arabia","Oman","Kazakhstan","Taiwan","South Korea","Mongolia","Turkmenistan","Singapore","Malaysia","Japan","China","Iran","Israel","Turkey","Lebanon","Hong Kong","Iraq","Thailand","Azerbaijan","Vietnam","Uzbekistan","Maldives","Laos","Georgia","Indonesia","Armenia","Jordan","India","North Korea","Macao","Kyrgyzstan","Bhutan","Philippines","Syria","Cambodia","Tajikistan","Pakistan","Sri Lanka","Palestine","Myanmar","Bangladesh","Nepal","East Timor","Yemen","Afghanistan"],"Others_Emissions":207.4581446,"Others_Percentage":59.8917352339},{"Continent":"Europe","Top1_Country":"Faroe Islands","Top1_Emissions":14.084624,"Top1_Percentage":5.4180009437,"Top2_Country":"Luxembourg","Top2_Emissions":11.618432,"Top2_Percentage":4.4693188501,"Top3_Country":"Russia","Top3_Emissions":11.416899,"Top3_Percentage":4.391794169,"Top4_Country":"Iceland","Top4_Emissions":9.499798,"Top4_Percentage":3.654333586,"Top5_Country":"Czechia","Top5_Emissions":9.3357525,"Top5_Percentage":3.5912294041,"Others_Countries":["Poland","Germany","Estonia","Ireland","Belgium","Norway","Netherlands","Austria","Bulgaria","Finland","Belarus","Bosnia and Herzegovina","Slovakia","Serbia","Slovenia","Greece","Italy","Cyprus","Spain","Denmark","Kosovo","United Kingdom","Andorra","Lithuania","France","Hungary","Croatia","Portugal","Switzerland","Liechtenstein","Romania","Montenegro","North Macedonia","Sweden","Latvia","Ukraine","Malta","Albania","Moldova"],"Others_Emissions":202.3476926,"Others_Percentage":77.8380728842}],
  width = 860,
  height = 400,
  marginTop = 40,
  marginRight = 80,
  marginBottom = 40,
  marginLeft = 40
}) {
  const [tooltip, setTooltip] = useState({ visible: false, value: '', x: 0, y: 0 });
  const svgRef = useRef();
  const gx = useRef();
  const gy = useRef();
  useEffect(() => {
    var mouseleave = function(d) {
        // Back to normal opacity: 0.8
        d3.selectAll(".myRect").style("opacity", 0.8)
        setTooltip({ ...tooltip, visible: false });
    }
    const w = width  - marginLeft; 
    const h = height  - marginBottom;

    const subgroups = ["Top1_Country","Top2_Country","Top3_Country","Top4_Country","Top5_Country","Others"];
    const groups = data.map(d => d.Continent);

    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(d3.schemeSet2);

    const dataWtotal = data.map(d => {return {...d, Total_Emissions: d.Top1_Emissions + d.Top2_Emissions + d.Top3_Emissions+ d.Top4_Emissions + d.Top5_Emissions + d.Others_Emissions}});
    
    const x = d3.scaleBand(groups,[ marginTop,h  ]).padding(.2);
    const y = d3.scaleLinear(d3.extent([...dataWtotal.map(d=>d.Total_Emissions),0]), [ marginRight,w ]);

    const stackedData = d3.stack().keys(subgroups).value((d, key) => d[key.split("_")[0]+"_Emissions"]) (dataWtotal);

    const regex =new RegExp(" *\\(*\\)*", "gi");
    d3.select(gx.current).call(d3.axisLeft(x))
    d3.select(gy.current).call(d3.axisTop(y))
    //useEffect(() => void , [gx, x]);
    //useEffect(() => void , [gy, y]);
    var plot = d3.select(svgRef.current);

    plot.selectAll("mylabels")
    .data(subgroups)
    .enter()
    .append("text")
        .attr("x", function(_,i){ return width>1024?i*120:(i%3)*120})
        .attr("y", function(_,i){ return height - 2*marginBottom/3 + (width>1024 || i < subgroups.length/2 ?0:15)} ) 
        .style("fill", function(d){ return color(d)})
        .style("font-size", 8 + width/100)
        .text(function(d){ return d.replace("_"," ")})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    plot.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })      
        .attr("class", function(d){ return "myRect " + d.key }) // Add a class to each subgroup: their name
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function(d) { return d; })
        .enter().append("rect")
            .attr("x", function(d) { return y(d[0]);})
            .attr("y", function(d) { return x(d.data.Continent);  })
            .attr("height", x.bandwidth())
            .attr("width",function(d) { return  y(d[1]) - y(d[0]); })
            .attr("stroke", "grey")
        .on("mouseover",  function(d) {
            var data = this.__data__.data;
            // what subgroup are we hovering?
            var subgroupName = d3.select(this.parentNode).datum().key; // This was the tricky part
            //var subgroupValue = this.__data__.data[subgroupName];
            // Reduce opacity of all rect to 0.2
            d3.selectAll(".myRect").style("opacity", 0.2)
            // Highlight all rects of this subgroup with opacity 0.8. It is possible to select them since they have a specific class = their name.
            d3.selectAll("."+subgroupName)
              .style("opacity", 1);
              setTooltip({
                visible: true,
                value: `${subgroupName!=="Others"?data[subgroupName]:subgroupName}: ${data[subgroupName.split("_")[0]+"_Emissions"]}`,
                x: d.pageX,
                y: d.pageY
            });
        })
        .on("mouseleave", mouseleave)
  },[data]);

  return (
    <>
    <svg width={width} height={height} ref={svgRef}>
      <g ref={gx} transform={`translate(${marginRight},0)`} />
      <g ref={gy} transform={`translate(${marginRight*0},${marginTop})`}/>
    </svg>
    {tooltip.visible && (
      <div style={{
          position: 'absolute',
          left: tooltip.x,
          top: tooltip.y,
          background: 'white',
          border: '1px solid black',
          padding: '5px',
          pointerEvents: 'none'
      }}>
          {tooltip.value}
      </div>
    )}
    </>
  );
}