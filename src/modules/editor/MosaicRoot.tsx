import MosaicStore from "../state/MosaicStore";
import { PointerEvent, useEffect, useRef, useState, useMemo, WheelEvent } from "react";
import useSize from "@react-hook/size";
import useRenderLoop from "../core/RenderLoop";
import WorldMosaic from "../../views/WorldMosaic";
import useGetMosaic from "../../hooks/mosaic/useGetMosaic";
import useGetMosaicSquares, { ClaimedSquare } from "../../hooks/post/useGetMosaicSquares";
import PostDetails from "../../components/squares/claimed/PostDetails";
import StakeClaim from "../../components/squares/unclaimed/StakeClaim";

const wheelListener = (e: WheelEvent) => {
  const friction = 0.5;
  const event = e as WheelEvent;
  const deltaX = event.deltaX * friction;
  const deltaY = event.deltaY * friction;
  if (!event.ctrlKey) {
    MosaicStore.moveCamera(deltaX, deltaY);
  } else {
    MosaicStore.zoomCamera(deltaX, deltaY);
  }
};

const pointerListener = (event: PointerEvent) => {
  MosaicStore.movePointer(event.clientX, event.clientY);
};

export interface SelectedSquare {
  row: string|number;
  column: string|number;
}

const MosaicRoot = () => {
  const mosaic = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(mosaic);

  const [selectedSquare, setSelectedSquare] = useState<SelectedSquare>();



  const {data: grid} = useGetMosaic({resourceKey: 'world'});
  const {data: squaresMap} = useGetMosaicSquares({resourceKey: 'world'});


  const squareLookup = useMemo(() => {
    if (!selectedSquare || !useGetMosaicSquares) return undefined;
    return squaresMap[`${selectedSquare.row}-${selectedSquare.column}`]
  },[selectedSquare])

  useEffect(() => {
    if (width === 0 || height === 0) return;
    MosaicStore.initialize(width, height);
  }, [width, height]);
  const frame = useRenderLoop(10);
  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full relative overflow-hidden overscroll-none"
        ref={mosaic}
        onWheel={wheelListener}
        onPointerMove={pointerListener}

      >
        <WorldMosaic grid={grid} squaresMap={squaresMap} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare} frame={frame}></WorldMosaic>
      </div>
      {selectedSquare && (
        <>
          {squareLookup ? (
            <PostDetails post={(squareLookup as ClaimedSquare).post} open={!!selectedSquare} handleClose={()=>setSelectedSquare(undefined)}/>
          ) : (
            <StakeClaim square={selectedSquare} open={!!selectedSquare} handleClose={()=>setSelectedSquare(undefined)}/>
          )}
        </>
      )}
    </div>
  );
};

export default MosaicRoot;