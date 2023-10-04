import { useCallback, useState } from "react";
import { Box} from "@mui/material";

import { LEAF_COLOR_SCHEME } from "../../../theme/colors";

import CanvasStore from "../../../modules/state/CanvasStore";
import { Square } from "../../../hooks/useGetTestWorldCanvas";
import FadingPaperArticle from "../../FadingArticle";
import { GRANULAR_ZOOM_MAX } from "../CanvasSquare";
import ZoomedOut from "../ZoomedOut";
import Preview from "./Preview";

interface OccupiedSquareProps {
  square: Square;
}

const OccupiedSquare = ({square}: OccupiedSquareProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const selectSquare = useCallback(() => setSelected(true), [setSelected])

  return (<>
    {(CanvasStore.camera.z > GRANULAR_ZOOM_MAX) ? (
      <ZoomedOut square={square} selected={selected} onClick={selectSquare}/>
    ) : (
      <Box bgcolor={LEAF_COLOR_SCHEME[square.color]} height="100%" width="100%" p={1} onClick={selectSquare}>
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
    )}
    <Preview square={square} open={selected} handleClose={()=>setSelected(false)}/>
    </>
  )
}

export default OccupiedSquare;
