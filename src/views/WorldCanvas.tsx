import { memo, useMemo } from "react";

import { RECT_H, RECT_W } from "../modules/core/constants";
import CanvasStore from "../modules/state/CanvasStore";
import CanvasSquare from '../components/squares/CanvasSquare';
import {getWorldCanvas, BulkSquare} from '../hooks/canvas/useGetWorldCanvas'


const WorldCanvas = ({ frame }: { frame: string }) => {
  const rectW = RECT_W;
  const rectH = RECT_H;
  const scale = CanvasStore.scale;

  const grid = useMemo(() => {
    return getWorldCanvas();
  },[])

  return (
    <div
      className="w-full h-full"
      style={{
        transform: `scale(${(scale.x, scale.y)})`,
        transformOrigin: "top left"
      }}
    >
      {grid.map((row: BulkSquare[], rowIdx: number) => (
        <>
          {row.map((square: BulkSquare, columnIdx: number) => (
            <CanvasSquare
              key={`${rowIdx}-${columnIdx}`}
              square={square}
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

export default memo(WorldCanvas);
