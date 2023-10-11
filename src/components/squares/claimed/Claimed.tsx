import {useCallback } from "react";

import CanvasStore from "../../../modules/state/CanvasStore";
import { BulkSquare, ClaimedSquare } from "../../../hooks/canvas/useGetWorldCanvas";
import ZoomedOut from "../ZoomedOut";
import PostPreview from "../../PostPreview";
import { GRANULAR_ZOOM_MAX } from "../../../modules/core/constants";

interface ClaimedProps {
  square: ClaimedSquare;
  selectedSquare?: BulkSquare;
  setSelectedSquare: (selectedSquare?: BulkSquare) => void;
}

const Claimed = ({square, selectedSquare, setSelectedSquare}: ClaimedProps) => {
  const selectSquare = useCallback(() => setSelectedSquare(square), [square, setSelectedSquare]);

  const selected = selectedSquare?.resourceKey === square.resourceKey;

  return (<>
    {(CanvasStore.camera.z > GRANULAR_ZOOM_MAX) ? (
      <ZoomedOut square={square} selected={selected} onClick={selectSquare}/>
    ) : (
      <PostPreview square={square} onClick={selectSquare} />
    )}
  </>)
}

export default Claimed;
