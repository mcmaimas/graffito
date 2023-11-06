import { Box } from "@mui/material";

import { MosaicPosition, Position } from "../../modules/core/foundation";
import { ClaimedSquare } from "../../hooks/post/useGetMosaicSquares";
import Claimed from "./claimed/Claimed";
import Unclaimed from "./unclaimed/Unclaimed";
import { SelectedSquare } from "../../modules/editor/MosaicRoot";


interface MosaicSquareProps extends MosaicPosition {
  square?: SelectedSquare;
  row: string|number;
  column: string|number;
  width: number;
  height: number;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const MosaicSquare = ({square, row, column, left, top, width, height, selectedSquare, setSelectedSquare}: MosaicSquareProps) => {
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

export default MosaicSquare;
