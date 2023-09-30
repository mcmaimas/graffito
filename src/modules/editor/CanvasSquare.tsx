import { Box, IconButton } from "@mui/material";

import { LEAF_COLOR_SCHEME } from "../../theme/colors";
import { CanvasPosition, Position } from "../core/foundation";
import CanvasStore from "../state/CanvasStore";
import { Square } from "./testData";
import FadingPaperArticle from "../../components/FadingArticle";


interface CanvasSquareProps extends CanvasPosition {
  square: Square
  width: number;
  height: number;
}

const CanvasSquare = ({square, left, top, width, height}: CanvasSquareProps) => {

  const granularZoomMax = 1000;
  
  return (
    <Position left={left} top={top} width={width} height={height}>
      <Box display="flex" alignItems="center" justifyContent="center" width={`${width}px`} height={`${height}px`} fontSize="6px">
      {(CanvasStore.camera.z > granularZoomMax) ? <HighLevelSquare square={square} /> : <LowLevelSquare square={square}/> }
      </Box>
    </Position>
  );
};

export default CanvasSquare;

const HighLevelSquare = ({square}: {square: Square}) => <div style={{backgroundColor: LEAF_COLOR_SCHEME[square.color], height: "100%" , width: "100%"}} />

const LowLevelSquare = ({square}: {square: Square}) => {

  return square?.isAvailable ? <EmptySquare square={square}/> : <OccupiedSquare square={square}/>
    
}

const EmptySquare = ({square}: {square: Square}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" bgcolor={LEAF_COLOR_SCHEME[square.color]} height="100%" width="100%">
      <IconButton>
        +
      </IconButton>
    </Box>
  )
}


const OccupiedSquare = ({square}: {square: Square}) => {

  return  (
    <Box bgcolor={LEAF_COLOR_SCHEME[square.color]} height="100%" width="100%" p={1}>
      <Box display="flex" flexDirection="column" bgcolor="white" height="100%" width="100%" borderRadius={0.5} position="relative">
        <Box flexGrow={1} overflow="hidden">
        <FadingPaperArticle >
          <p>
          post content will go here aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv end
          </p>
        </FadingPaperArticle>
        </Box>

      </Box>
    </Box>
  )
}

