import { Box } from "@mui/material";

import { CanvasPosition, Position } from "../../modules/core/foundation";
import { BulkSquare, ClaimedSquare, UnclaimedSquare } from "../../hooks/canvas/useGetWorldCanvas";
import Claimed from "./claimed/Claimed";
import Unclaimed from "./unclaimed/Unclaimed";

export const GRANULAR_ZOOM_MAX = 1000;

interface CanvasSquareProps extends CanvasPosition {
  square: BulkSquare;
  width: number;
  height: number;
}

const CanvasSquare = ({square, left, top, width, height}: CanvasSquareProps) => {
  
  return (
    <Position left={left} top={top} width={width} height={height}>  
      <Box display="flex" alignItems="center" justifyContent="center" width={`${width}px`} height={`${height}px`} >
        {square.status === 'claimed' ? (
          <Claimed square={square as ClaimedSquare} />
        ) : (
          <Unclaimed square={square as UnclaimedSquare} />
        )}
      </Box>
    </Position>
  );
};

export default CanvasSquare;
