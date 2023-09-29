import { memo, useMemo } from "react";

import { RECT_H, RECT_W } from "../../modules/core/constants";
import CanvasStore from "../../modules/state/CanvasStore";
import CanvasSquare from './CanvasSquare';
import {generateGrid, Square} from './testData';


const InfiniteCanvas = ({ frame }: { frame: string }) => {
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
      {grid.map((row: Square[], rowIdx: number) => (
        <>
          {row.map((square: Square, columnIdx: number) => (
            <CanvasSquare
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
