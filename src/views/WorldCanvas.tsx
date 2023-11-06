import { useMemo, memo} from "react";

import { RECT_H, RECT_W } from "../modules/core/constants";
import CanvasStore from "../modules/state/CanvasStore";
import {MosaicDetails} from '../hooks/mosaic/useGetMosaic'
import CanvasSquare from "../components/squares/CanvasSquare";
import { SelectedSquare } from "../modules/editor/CanvasRoot";

interface WorldCanvasProps {
  grid?: MosaicDetails;
  posts: any;
  frame: string;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const WorldCanvas = ({ grid, posts, frame, selectedSquare, setSelectedSquare }: WorldCanvasProps) => {
  const rectW = RECT_W;
  const rectH = RECT_H;
  const scale = CanvasStore.scale;

  const dimArray = useMemo(() => {
    if (!grid) return [];
    return [...Array(grid?.dimensions)].map(x => 1);
  },[grid])

  return (
    <div
      className="w-full h-full"
      style={{
        transform: `scale(${(scale.x, scale.y)})`,
        transformOrigin: "top left"
      }}
    >
      {posts && dimArray.map((row, rowIdx) => (
        <>
          {dimArray.map((col, columnIdx) => (
            <CanvasSquare
              key={`${rowIdx}-${columnIdx}`}
              square={posts[`${rowIdx}-${columnIdx}`]}
              row={rowIdx}
              column={columnIdx}
              selectedSquare={selectedSquare}
              setSelectedSquare={setSelectedSquare}
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


      {/* {generatedData?.map((row: BulkSquare[], rowIdx: number) => (
        <>
          {row.map((square: BulkSquare, columnIdx: number) => (
            <CanvasSquare
              key={`${rowIdx}-${columnIdx}`}
              square={square}
              selectedSquare={selectedSquare}
              setSelectedSquare={setSelectedSquare}
              left={rowIdx * rectW}
              top={columnIdx * rectH}
              width={rectW}
              height={rectH}
          />
          ))}
        </>
      ))} */}
