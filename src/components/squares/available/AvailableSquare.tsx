import { Box, IconButton } from "@mui/material";

import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import CanvasStore from "../../../modules/state/CanvasStore";
import { Square } from "../../../hooks/useGetTestWorldCanvas";
import { GRANULAR_ZOOM_MAX } from "../CanvasSquare";
import ZoomedOut from "../ZoomedOut";
import { useState } from "react";

interface AvailableSquareProps {
  square: Square;
}

const AvailableSqaure = ({square}: AvailableSquareProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <>
      {(CanvasStore.camera.z > GRANULAR_ZOOM_MAX) ? (
        <ZoomedOut square={square} selected={selected} onClick={()=>setSelected(false)}/>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" bgcolor={LEAF_COLOR_SCHEME[square.color]} height="100%" width="100%">
          <IconButton>
            +
          </IconButton>
        </Box>
      )}
    </>
  )
}

export default AvailableSqaure;