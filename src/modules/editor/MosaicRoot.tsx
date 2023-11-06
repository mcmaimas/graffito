import MosaicStore from "../state/MosaicStore";
import { PointerEvent, useEffect, useRef, useState, useMemo, WheelEvent } from "react";
import useSize from "@react-hook/size";
import useRenderLoop from "../core/RenderLoop";
import WorldMosaic from "../../views/WorldMosaic";
import useGetMosaic from "../../hooks/mosaic/useGetMosaic";
import useGetMosaicPosts from "../../hooks/post/useGetMosaicPosts";
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
  const {data: posts} = useGetMosaicPosts({resourceKey: 'world'});


  const postLookup = useMemo(() => {
    if (!selectedSquare || !posts) return undefined;
    return posts[`${selectedSquare.row}-${selectedSquare.column}`]
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
        <WorldMosaic grid={grid} posts={posts} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare} frame={frame}></WorldMosaic>
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

export default MosaicRoot;
