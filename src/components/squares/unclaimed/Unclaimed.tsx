import { Box, CardActionArea } from "@mui/material";

import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import ZoomedOut from "../ZoomedOut";
import { useCallback, useContext } from "react";
import { Add } from "@mui/icons-material";
import { GRANULAR_ZOOM_MAX } from "../../../modules/core/constants";
import { SelectedSquare } from "../../../modules/editor/MosaicRoot";
import { ProjectionContext } from "../../../state/useProjectionContext";

interface UnclaimedProps {
  row: string|number;
  column: string|number;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const UNCALIMED_COLOR = "default";

const Unclaimed = ({row, column, selectedSquare, setSelectedSquare}: UnclaimedProps) => {
  
  const selected = selectedSquare?.row === row && selectedSquare.column === column;
  const {projectionData} = useContext(ProjectionContext);

  const selectSquare = useCallback(() => setSelectedSquare({row, column}), [row, column, setSelectedSquare]);
  return (
    <>
      {(projectionData.camera.z > GRANULAR_ZOOM_MAX) ? (
        <ZoomedOut color={UNCALIMED_COLOR} selected={selected} onClick={()=>setSelectedSquare(undefined)}/>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" bgcolor={LEAF_COLOR_SCHEME[UNCALIMED_COLOR]} height="100%" width="100%" border={selected ? "1px solid black" : undefined}>
          <CardActionArea style={{height: "100%", width: "100%"}} onClick={selectSquare}>
            <Box style={{color: "#FFFFFF"}} display="flex" alignItems="center" justifyContent="center">
              <Add style={{fontSize: "64px"}}/>
            </Box>
          </CardActionArea>
        </Box>
      )}
      
    </>
  )
}

export default Unclaimed;