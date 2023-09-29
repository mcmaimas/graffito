import { RECT_H, RECT_W } from "../../modules/core/constants";
import { CanvasPosition, Position } from "../../modules/core/foundation";
import CanvasStore from "../../modules/state/CanvasStore";
import { memo, useMemo } from "react";


interface TextBlockProps extends CanvasPosition {
  text: string;
  color: string;
  width: number;
  height: number;
}

const TextBlock = ({
  text,
  color,
  left,
  top,
  width,
  height
}: TextBlockProps) => {
  return (
    <Position left={left} top={top} width={width} height={height}>
      <div className="flex items-center justify-center"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
          fontSize: '6px'
        }}
      >
        {text}
      </div>
    </Position>
  );
};

export interface Square {
  name: string;
}


export const generateGrid = () => {
  let grid: Square[][] = []; 
  for(let i = 0; i < 100; i++) {
    grid[i] = genereateRow(i);
  }
  return grid;
}

export const genereateRow = (rowNum: number) => {
  let row : Square[] = []
  for(let i = 0; i < 100; i++) {
    row[i] = {name: `${rowNum}-${i}`}
  }
  return row;
}

const InfiniteCanvas = ({ frame }: { frame: string }) => {
  // const texts = [
  //   "Infinite",
  //   "Canvases",
  //   "Are",
  //   "Easy",
  //   "When",
  //   "You",
  //   "Know",
  //   "The",
  //   "Fundamentals1",
  //   "Infinite",
  //   "Canvases",
  //   "Are",
  //   "Easy",
  //   "When",
  //   "You",
  //   "Know",
  //   "The",
  //   "Fundamentals2"
  // ];

  const colors = [
    "#f1f7ed",
    "#61c9a8",
    "#7ca982",
    "#e0eec6",
    "#c2a83e",
    "#ff99c8",
    "#fcf6bd",
    "#9c92a3",
    "#c6b9cd"
  ];
  const rectW = RECT_W;
  const rectH = RECT_H;
  const scale = CanvasStore.scale;

  // const row = useMemo(() => {
  //   return genereateRow(1)
  // },[])

  const grid = useMemo(() => {
    return generateGrid()
  },[])

  return (
    <div
      className="w-full h-full"
      style={{
        transform: `scale(${(scale.x, scale.y)})`,
        transformOrigin: "top left"
      }}
    >
      {/* {row.map((square, index) => (
        <TextBlock
          key={index}
          text={square.name}
          color={colors[index % colors.length]}
          left={(index % 100) * rectW}
          top={Math.floor(index / 100) * rectH}
          width={rectW}
          height={rectH}
        />
      ))} */}

      {grid.map((row: Square[], rowIdx: number) => (
        <>
          {row.map((square: Square, columnIdx: number) => (
            <TextBlock
              key={`${rowIdx}-${columnIdx}`}
              text={square.name}
              color={colors[(columnIdx * rowIdx) % colors.length]}
              left={rowIdx * rectW}
              top={columnIdx * rectH}
              width={rectW}
              height={rectH}
          />
          ))}
        </>
      ))}
    </div>
  );
};

export default memo(InfiniteCanvas);
