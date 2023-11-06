import CanvasStore from "../../modules/state/CanvasStore";
import { PointerEvent, useEffect, useRef, useState, useMemo, WheelEvent } from "react";
import useSize from "@react-hook/size";
import useRenderLoop from "../../modules/core/RenderLoop";
import WorldCanvas from "../../views/WorldCanvas";
import useGetWorldCanvas from "../../hooks/mosaic/useGetMosaic";
import useGetMosaicPosts from "../../hooks/post/useGetMosaicPosts";
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

export interface SelectedSquare {
  row: string|number;
  column: string|number;
}

const CanvasRoot = () => {
  const canvas = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(canvas);

  const [selectedSquare, setSelectedSquare] = useState<SelectedSquare>();



  const {data: grid} = useGetWorldCanvas({resourceKey: 'world'});
  const {data: posts} = useGetMosaicPosts({resourceKey: 'world'});


  const postLookup = useMemo(() => {
    if (!selectedSquare || !posts) return undefined;
    return posts[`${selectedSquare.row}-${selectedSquare.column}`]
  },[selectedSquare])

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
        <WorldCanvas grid={grid} posts={posts} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare} frame={frame}></WorldCanvas>
      </div>
      {selectedSquare && (
        <>
          {postLookup ? (
            <PostDetails post={postLookup} open={!!selectedSquare} handleClose={()=>setSelectedSquare(undefined)}/>
          ) : (
            <StakeClaim square={selectedSquare} open={!!selectedSquare} handleClose={()=>setSelectedSquare(undefined)}/>
          )}
        </>
      )}
    </div>
  );
};

export default CanvasRoot;
