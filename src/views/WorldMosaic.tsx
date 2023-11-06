import { useMemo, memo} from "react";

import { RECT_H, RECT_W } from "../modules/core/constants";
import MosaicStore from "../modules/state/MosaicStore";
import {MosaicDetails} from '../hooks/mosaic/useGetMosaic'
import MosaicSquare from "../components/squares/MosaicSquare";
import { SelectedSquare } from "../modules/editor/MosaicRoot";

interface WorldMosaicProps {
  grid?: MosaicDetails;
  posts: any;
  frame: string;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const WorldMosaic = ({ grid, posts, frame, selectedSquare, setSelectedSquare }: WorldMosaicProps) => {
  const rectW = RECT_W;
  const rectH = RECT_H;
  const scale = MosaicStore.scale;

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
            <MosaicSquare
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

export default memo(WorldMosaic);
