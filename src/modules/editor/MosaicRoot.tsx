import { useContext, useCallback, PointerEvent, useEffect, useRef, useState, useMemo, WheelEvent } from "react";
import useSize from "@react-hook/size";
import useRenderLoop from "../core/RenderLoop";
import WorldMosaic from "../../views/WorldMosaic";
import useGetMosaic from "../../hooks/mosaic/useGetMosaic";
import useGetMosaicSquares, { ClaimedSquare } from "../../hooks/post/useGetMosaicSquares";
import PostDetails from "../../components/squares/claimed/PostDetails";
import StakeClaim from "../../components/squares/unclaimed/StakeClaim";
import { Box } from "@mui/material";
import { ProjectionContext } from "../../state/useProjectionContext";

export interface SelectedSquare {
  row: string|number;
  column: string|number;
}

const MosaicRoot = () => {
  const mosaic = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(mosaic);

  const [selectedSquare, setSelectedSquare] = useState<SelectedSquare>();

  const projectionDetails = useContext(ProjectionContext);
  useEffect(()=> {
    console.log(projectionDetails)
  },[projectionDetails])

  const {data: grid} = useGetMosaic({resourceKey: 'world'});
  const {data: squaresMap} = useGetMosaicSquares({resourceKey: 'world'});


  const squareLookup = useMemo(() => {
    if (!selectedSquare || !useGetMosaicSquares) return undefined;
    return squaresMap[`${selectedSquare.row}-${selectedSquare.column}`]
  },[selectedSquare])

  const pointerListener = useCallback((event: PointerEvent) => {
    projectionDetails.movePointer(event.clientX, event.clientY)
  },[projectionDetails])

  const wheelListener = useCallback((event: WheelEvent) => {
    const friction = 0.5;
    const deltaX = event.deltaX * friction;
    const deltaY = event.deltaY * friction;
    if (!event.ctrlKey) {
      projectionDetails.moveCamera(deltaX, deltaY);
    } else {
      projectionDetails.zoomCamera(deltaX, deltaY);
    }
  },[projectionDetails])

  const frame = useRenderLoop(10);
  return (
    <Box width="100%" height="100%">
      <Box width="100%" height="100%" position="relative" overflow="hidden" 
      ref={mosaic}
      onWheel={wheelListener}
      onPointerMove={pointerListener}>
      {/* <div
        className="w-full h-full relative overflow-hidden overscroll-none"
        ref={mosaic}
        onWheel={wheelListener}
        onPointerMove={pointerListener}

      > */}
        <WorldMosaic grid={grid} squaresMap={squaresMap} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare} frame={frame}></WorldMosaic>
        </Box>
      {selectedSquare && (
        <>
          {squareLookup ? (
            <PostDetails post={(squareLookup as ClaimedSquare).post} open={!!selectedSquare} handleClose={()=>setSelectedSquare(undefined)}/>
          ) : (
            <StakeClaim square={selectedSquare} open={!!selectedSquare} handleClose={()=>setSelectedSquare(undefined)}/>
          )}
        </>
      )}
    </Box>
  );
};

export default MosaicRoot;
