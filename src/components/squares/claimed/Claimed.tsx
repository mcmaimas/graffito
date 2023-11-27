import {useCallback, useContext} from "react";

import { ClaimedSquare } from "../../../hooks/post/useGetMosaicSquares";
import ZoomedOut from "../ZoomedOut";
import PostPreview from "../../PostPreview";
import { GRANULAR_ZOOM_MAX } from "../../../modules/core/constants";
import { SelectedSquare } from "../../../modules/editor/MosaicRoot";
import { ProjectionContext } from "../../../state/useProjectionContext";

interface ClaimedProps {
  square: ClaimedSquare;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const Claimed = ({square, selectedSquare, setSelectedSquare}: ClaimedProps) => {
  const selectSquare = useCallback(() => setSelectedSquare({row:square.row, column: square.column}), [square, setSelectedSquare]);

  const selected = selectedSquare?.row === square.row && selectedSquare.column === square.column;
  const {projectionData} = useContext(ProjectionContext);
  return (<>
    {(projectionData.camera.z > GRANULAR_ZOOM_MAX) ? (
      <ZoomedOut color={square.color} selected={selected} onClick={selectSquare}/>
    ) : (
      <PostPreview square={square} onClick={selectSquare} />
    )}
  </>)
}

export default Claimed;
