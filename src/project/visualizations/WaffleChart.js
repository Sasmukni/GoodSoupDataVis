import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from "../data/Project_wafflechart_data";
import Select from "react-select";

export default function WaffleChart({
  width = 800,
  height = 300,
  marginTop = 20, 
  marginRight = 10,
  marginBottom = 30,
  marginLeft = 10,
  colors = ["blue", "purple"],
  grayColor = "lightgrey",
  rows = 10,
  columns = 10,
}) {
  const svgRef = useRef();
  const [selectedYear, setSelectedYear] = useState(studentData[0].year);

  const years = [
      ...[...new Set(studentData.map(d => d.year))].map(year => ({
        value: year,
        label: year.toString(),
      })),
    ];
  const data = studentData.find((d) => d.year === selectedYear) || studentData[0];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const totalSquares = rows * columns;
    const malePercentage = data.tot_males;
    const femalePercentage = data.tot_females;
    const totalPercentage = data.tot_neets;

    const maleFullSquares = Math.floor((malePercentage / 100) * totalSquares);
    const malePartialSquare = ((malePercentage / 100) * totalSquares) % 1;
    const femaleFullSquares = Math.floor((femalePercentage / 100) * totalSquares);
    const femalePartialSquare = ((femalePercentage / 100) * totalSquares) % 1;
    const totalFullSquares = Math.floor((totalPercentage / 100) * totalSquares);
    const totalPartialSquare = ((totalPercentage / 100) * totalSquares) % 1;

    const createWaffle = (fullSquares, partialSquare, percentage, totalSquares, xOffset, color, label) => {
      const waffleData = Array.from({ length: totalSquares }, (_, i) => (i < fullSquares ? 1 : 0));
      svg.selectAll(`.square-${label}`)
        .data(waffleData)
        .enter()
        .append("g")
        .each(function (d, i) {
          const x = xOffset + (i % columns) * (width / (3 * columns));
          const y = marginTop + Math.floor(i / columns) * (height / rows);
          const squareWidth = width / (3 * columns) - 2;
          const squareHeight = height / rows - 2;

          d3.select(this)
            .append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", squareWidth)
            .attr("height", squareHeight)
            .attr("fill", colors["Neutral"]);

          if (d === 1) {
            d3.select(this)
              .append("rect")
              .attr("x", x)
              .attr("y", y)
              .attr("width", squareWidth)
              .attr("height", squareHeight)
              .attr("fill", color);
          } else if (i === fullSquares && partialSquare > 0) {
            d3.select(this)
              .append("rect")
              .attr("x", x)
              .attr("y", y)
              .attr("width", squareWidth * partialSquare)
              .attr("height", squareHeight)
              .attr("fill", color);
          }
        });

      svg.append("text")
        .attr("x", xOffset + width / 6)
        .attr("y", height + 35) 
        .attr("text-anchor", "middle")
        .attr("fill", color)
        .style("font-weight", "bold")
        .text(`${label}: ${percentage.toFixed(1)}%`);
    };

    createWaffle(maleFullSquares, malePartialSquare, malePercentage, totalSquares, marginLeft - 12, colors["Males"], "Male NEET");
    createWaffle(femaleFullSquares, femalePartialSquare, femalePercentage, totalSquares, width / 3 + 3, colors["Females"], "Female NEET");
    createWaffle(totalFullSquares, totalPartialSquare, totalPercentage, totalSquares, (2 * width) / 3 + 7, colors["Total"], "Total NEET");
  }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft, colors, grayColor, rows, columns]);

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <label htmlFor="year-select">Select Year: </label>
        <div className='container my-3 filters-bar d-flex justify-content-center gap-3'>
        <Select
          style={{ marginBottom: '10px' }}
          className={window.innerWidth > 1024 ? "w-25" : "w-50"}
          defaultValue={years.find(y => y.value === selectedYear)}
          onChange={(e) => setSelectedYear(e.value)}
          options={years}
        />
      </div>
      <svg ref={svgRef} width={width} height={height + 50} />
      </div>
    </div>
  );
}
