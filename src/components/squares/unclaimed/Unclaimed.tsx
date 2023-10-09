import { Box, IconButton } from "@mui/material";

import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import CanvasStore from "../../../modules/state/CanvasStore";
import { UnclaimedSquare } from "../../../hooks/canvas/useGetWorldCanvas";
import { GRANULAR_ZOOM_MAX } from "../CanvasSquare";
import ZoomedOut from "../ZoomedOut";
import { useCallback, useState } from "react";
import StakeClaim from "./StakeClaim";
import { Add } from "@mui/icons-material";

interface UnclaimedProps {
  square: UnclaimedSquare;
}

const Unclaimed = ({square}: UnclaimedProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const selectSquare = useCallback(() => setSelected(true), [setSelected]);
  return (
    <>
      {(CanvasStore.camera.z > GRANULAR_ZOOM_MAX) ? (
        <ZoomedOut square={square} selected={selected} onClick={()=>setSelected(false)}/>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" bgcolor={LEAF_COLOR_SCHEME[square.color]} height="100%" width="100%" border={selected ? "1px solid black" : undefined}>
          <IconButton onClick={selectSquare}>
            <Add />
          </IconButton>
        </Box>
      )}
      <StakeClaim square={square} open={selected} handleClose={()=>setSelected(false)}/>
    </>
  )
}

export default Unclaimed;