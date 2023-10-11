import { Box } from "@mui/material";

import { CanvasPosition, Position } from "../../modules/core/foundation";
import { BulkSquare, ClaimedSquare, UnclaimedSquare } from "../../hooks/canvas/useGetWorldCanvas";
import Claimed from "./claimed/Claimed";
import Unclaimed from "./unclaimed/Unclaimed";

interface CanvasSquareProps extends CanvasPosition {
  square: BulkSquare;
  width: number;
  height: number;
  selectedSquare?: BulkSquare;
  setSelectedSquare: (selectedSquare?: BulkSquare) => void;
}

const CanvasSquare = ({square, left, top, width, height, selectedSquare, setSelectedSquare}: CanvasSquareProps) => {
  
  return (
    <Position left={left} top={top} width={width} height={height}>  
      <Box display="flex" alignItems="center" justifyContent="center" width={`${width}px`} height={`${height}px`} >
        {square.status === 'claimed' ? (
          <Claimed square={square as ClaimedSquare} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare}/>
        ) : (
          <Unclaimed square={square as UnclaimedSquare} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare}/>
        )}
      </Box>
    </Position>
  );
};

export default CanvasSquare;
