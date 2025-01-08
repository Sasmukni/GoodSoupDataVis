import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import studentData from "../data/Project_wafflechart_data";

export default function WaffleChart({
  width = 800,
  height = 400,
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

  const data = studentData.find((d) => d.year === selectedYear) || studentData[0];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const totalSquares = rows * columns;
    const malePercentage = data.tot_males;
    const femalePercentage = data.tot_females;
    const maleFullSquares = Math.floor((malePercentage / 100) * totalSquares);
    const malePartialSquare = ((malePercentage / 100) * totalSquares) % 1;
    const femaleFullSquares = Math.floor((femalePercentage / 100) * totalSquares);
    const femalePartialSquare = ((femalePercentage / 100) * totalSquares) % 1;

    const createWaffle = (fullSquares, partialSquare, percentage, totalSquares, xOffset, color, label) => {
      const waffleData = Array.from({ length: totalSquares }, (_, i) => (i < fullSquares ? 1 : 0));
      svg.selectAll(`.square-${label}`)
        .data(waffleData)
        .enter()
        .append("g")
        .each(function (d, i) {
          const x = xOffset + (i % columns) * (width / (2 * columns));
          const y = marginTop + Math.floor(i / columns) * (height / rows);
          const squareWidth = width / (2 * columns) - 2;
          const squareHeight = height / rows - 2;

          d3.select(this)
            .append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", squareWidth)
            .attr("height", squareHeight)
            .attr("fill", grayColor);

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
        .attr("x", xOffset + width / 4)
        .attr("y", height + 35) 
        .attr("text-anchor", "middle")
        .attr("fill", color)
        .style("font-weight", "bold")
        .text(`${label}: ${percentage.toFixed(1)}%`);
    };

    createWaffle(maleFullSquares, malePartialSquare, malePercentage, totalSquares, marginLeft, colors[0], "Male NEET");
    createWaffle(femaleFullSquares, femalePartialSquare, femalePercentage, totalSquares, width / 2 + marginLeft + 20, colors[1], "Female NEET");
  }, [data, width, height, marginTop, marginRight, marginBottom, marginLeft, colors, grayColor, rows, columns]);

  return (
    <div>
      <label htmlFor="year-selector">Select Year: </label>
      <select
        id="year-selector"
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {studentData.map((d) => (
          <option key={d.year} value={d.year}>
            {d.year}
          </option>
        ))}
      </select>
      <svg ref={svgRef} width={width} height={height + 50} />
    </div>
  );
}
