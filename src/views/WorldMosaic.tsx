import { useContext, useMemo, memo} from "react";

import { RECT_H, RECT_W } from "../modules/core/constants";
import {MosaicDetails} from '../hooks/mosaic/useGetMosaic'
import MosaicSquare from "../components/squares/MosaicSquare";
import { SelectedSquare } from "../modules/editor/MosaicRoot";
import { ClaimedSquare } from "../hooks/post/useGetMosaicSquares";
import { Box } from "@mui/material";
import { ProjectionContext } from "../state/useProjectionContext";

interface WorldMosaicProps {
  grid?: MosaicDetails;
  squaresMap: Record<string, ClaimedSquare>;
  frame: string;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const WorldMosaic = ({ grid, squaresMap, frame, selectedSquare, setSelectedSquare }: WorldMosaicProps) => {
  const rectW = RECT_W;
  const rectH = RECT_H;
  const {scale} = useContext(ProjectionContext);

  const dimArray = useMemo(() => {
    if (!grid) return [];
    return [...Array(grid?.dimensions)].map(x => 1);
  },[grid])

  return (

      <Box width="100%" height="100%" 
        style={{
        transform: `scale(${(scale.x, scale.y)})`,
        transformOrigin: "top left"
        }}
      >
      {squaresMap && dimArray.map((row, rowIdx) => (
        <>
          {dimArray.map((col, columnIdx) => (
            <MosaicSquare
              key={`${rowIdx}-${columnIdx}`}
              square={squaresMap[`${rowIdx}-${columnIdx}`]}
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
        
        </Box>
    
  );
};

export default memo(WorldMosaic);
