import * as d3 from "d3";
import {useRef, useEffect} from "react";

export default function MultipleStackedBarChart({
  data = [230,420,690,880,400],
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 10,
  colors = ["brown"]
}) {
  return (
    <svg width={width} height={height} fill={colors[0]}>
     <rect
        x={marginLeft}
        y={marginTop}
        width={width-marginLeft-marginRight}
        height={height-marginBottom-marginTop}
        fill={colors[0]} />
    </svg>
  );
}