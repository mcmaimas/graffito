import { Box } from "@mui/material";

import { CanvasPosition, Position } from "../../modules/core/foundation";
import { Square } from "../../hooks/useGetTestWorldCanvas";
import OccupiedSquare from "./occupied/OccupiedSquare";
import AvailableSqaure from "./available/AvailableSquare";

export const GRANULAR_ZOOM_MAX = 1000;

interface CanvasSquareProps extends CanvasPosition {
  square: Square
  width: number;
  height: number;
}

const CanvasSquare = ({square, left, top, width, height}: CanvasSquareProps) => {
  
  return (
    <Position left={left} top={top} width={width} height={height}>  
      <Box display="flex" alignItems="center" justifyContent="center" width={`${width}px`} height={`${height}px`} fontSize="6px">
        {square?.content ? (
          <OccupiedSquare square={square} />
        ) : (
          <AvailableSqaure square={square} />
        )}
      </Box>
      
    </Position>
  );
};

export default CanvasSquare;
