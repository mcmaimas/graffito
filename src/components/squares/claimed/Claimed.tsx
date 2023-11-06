import {useCallback } from "react";

import CanvasStore from "../../../modules/state/CanvasStore";
import { ClaimedSquare } from "../../../hooks/mosaic/useGetMosaic";
import ZoomedOut from "../ZoomedOut";
import PostPreview from "../../PostPreview";
import { GRANULAR_ZOOM_MAX } from "../../../modules/core/constants";
import { SelectedSquare } from "../../../modules/editor/CanvasRoot";

interface ClaimedProps {
  square: ClaimedSquare;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const Claimed = ({square, selectedSquare, setSelectedSquare}: ClaimedProps) => {
  const selectSquare = useCallback(() => setSelectedSquare({row:square.row, column: square.column}), [square, setSelectedSquare]);

  const selected = selectedSquare?.row === square.row && selectedSquare.column === square.column;
  console.log('yooooooooooooooooooooooooo')
  return (<>
    {(CanvasStore.camera.z > GRANULAR_ZOOM_MAX) ? (
      <ZoomedOut color={square.color} selected={selected} onClick={selectSquare}/>
    ) : (
      <PostPreview square={square} onClick={selectSquare} />
    )}
  </>)
}

export default Claimed;
