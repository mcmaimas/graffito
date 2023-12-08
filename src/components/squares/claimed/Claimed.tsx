import {useCallback } from "react";

import MosaicStore from "../../../modules/state/MosaicStore";
import { ClaimedSquare } from "../../../hooks/post/useGetMosaicSquares";
import ZoomedOut from "../ZoomedOut";
import PostPreview from "../../PostPreview";
import { GRANULAR_ZOOM_MAX } from "../../../modules/core/constants";
import { SelectedSquare } from "../../../modules/editor/MosaicRoot";
import { getSquareColor } from "../helpers";


interface ClaimedProps {
  square: ClaimedSquare;
  selectedSquare?: SelectedSquare;
  setSelectedSquare: (selectedSquare?: SelectedSquare) => void;
}

const Claimed = ({square, selectedSquare, setSelectedSquare}: ClaimedProps) => {
  const selectSquare = useCallback(() => setSelectedSquare({row:square.row, column: square.column}), [square, setSelectedSquare]);

  const selected = selectedSquare?.row === square.row && selectedSquare.column === square.column;
  
  return (<>
    {(MosaicStore.camera.z > GRANULAR_ZOOM_MAX) ? (
      <ZoomedOut color={getSquareColor(square)} selected={selected} onClick={selectSquare}/>
    ) : (
      <PostPreview square={square} onClick={selectSquare} />
    )}
  </>)
}

export default Claimed;
