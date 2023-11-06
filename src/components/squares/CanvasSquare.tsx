import { Box } from "@mui/material";

import { CanvasPosition, Position } from "../../modules/core/foundation";
import { ClaimedSquare } from "../../hooks/mosaic/useGetMosaic";
import Claimed from "./claimed/Claimed";
import Unclaimed from "./unclaimed/Unclaimed";
import { SelectedSquare } from "../../modules/editor/CanvasRoot";

interface CanvasSquareProps extends CanvasPosition {
  square?: SelectedSquare;
  row: string|number;
  column: string|number;
  width: number;
  height: number;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const CanvasSquare = ({square, row, column, left, top, width, height, selectedSquare, setSelectedSquare}: CanvasSquareProps) => {
  return (
    <Position left={left} top={top} width={width} height={height}>  
      <Box display="flex" alignItems="center" justifyContent="center" width={`${width}px`} height={`${height}px`} >
        {square ? (
          <Claimed square={square as ClaimedSquare} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare}/>
        ) : (
          <Unclaimed row={row} column={column} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare}/>
        )}
      </Box>
    </Position>
  );
};

export default CanvasSquare;
