import {useCallback, useState } from "react";

import CanvasStore from "../../../modules/state/CanvasStore";
import { ClaimedSquare } from "../../../hooks/canvas/useGetWorldCanvas";
import ZoomedOut from "../ZoomedOut";
import PostDetails from "./PostDetails";
import PostPreview from "../../PostPreview";
import { GRANULAR_ZOOM_MAX } from "../../../modules/core/constants";

interface ClaimedProps {
  square: ClaimedSquare;
}

const Claimed = ({square}: ClaimedProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const selectSquare = useCallback(() => setSelected(true), [setSelected]);

  return (<>
    {(CanvasStore.camera.z > GRANULAR_ZOOM_MAX) ? (
      <ZoomedOut square={square} selected={selected} onClick={selectSquare}/>
    ) : (
      <PostPreview square={square} onClick={selectSquare} />
    )}
    <PostDetails square={square} open={selected} handleClose={()=>setSelected(false)}/>
  </>)
}

export default Claimed;
