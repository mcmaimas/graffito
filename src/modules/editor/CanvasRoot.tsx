import CanvasStore from "../../modules/state/CanvasStore";
import { PointerEvent, useEffect, useRef, useState, WheelEvent } from "react";
import useSize from "@react-hook/size";
import useRenderLoop from "../../modules/core/RenderLoop";
import WorldCanvas from "../../views/WorldCanvas";
import { BulkSquare, ClaimedSquare, UnclaimedSquare } from "../../hooks/canvas/useGetWorldCanvas";
import PostDetails from "../../components/squares/claimed/PostDetails";
import StakeClaim from "../../components/squares/unclaimed/StakeClaim";

const wheelListener = (e: WheelEvent) => {
  const friction = 0.5;
  const event = e as WheelEvent;
  const deltaX = event.deltaX * friction;
  const deltaY = event.deltaY * friction;
  if (!event.ctrlKey) {
    CanvasStore.moveCamera(deltaX, deltaY);
  } else {
    CanvasStore.zoomCamera(deltaX, deltaY);
  }
};

const pointerListener = (event: PointerEvent) => {
  CanvasStore.movePointer(event.clientX, event.clientY);
};

const CanvasRoot = () => {
  const canvas = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(canvas);

  const [selectedSquare, setSelectedSquare] = useState<BulkSquare>();

  useEffect(() => {
    if (width === 0 || height === 0) return;
    CanvasStore.initialize(width, height);
  }, [width, height]);
  const frame = useRenderLoop(10);
  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full relative overflow-hidden overscroll-none"
        ref={canvas}
        onWheel={wheelListener}
        onPointerMove={pointerListener}

      >
        <WorldCanvas selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare} frame={frame}></WorldCanvas>
      </div>
      {selectedSquare && (
        <>
          {selectedSquare.status === 'claimed' ? (
            <PostDetails square={selectedSquare as ClaimedSquare} open={!!selectedSquare} handleClose={()=>setSelectedSquare(undefined)}/>
          ) : (
            <StakeClaim square={selectedSquare as UnclaimedSquare} open={!!selectedSquare} handleClose={()=>setSelectedSquare(undefined)}/>
          )}
        </>
      )}
    </div>
  );
};

export default CanvasRoot;
