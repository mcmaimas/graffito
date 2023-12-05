import MosaicStore from "../state/MosaicStore";
import { useEffect, useState, useCallback } from "react";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

type Direction = 'left' | 'right' | 'up' | 'down' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined;

const transparenBackground = "#a9a9a922"

export interface SelectedSquare {
  row: string|number;
  column: string|number;
}

const Guider = styled(Box)`
  background: transparent;
  &:hover {
    background: ${transparenBackground};
  }
`

const Triangle = styled(Guider)`
  width: 25%;
  aspect-ratio : 1 / 1;
  clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
`

const TopRightTriangle = styled(Triangle)`
  transform: rotate(90deg);
`

const BottomRightTriangle = styled(Triangle)`
  transform: rotate(180deg);
`

const BottomLeftTriangle = styled(Triangle)`
  transform: rotate(-90deg);
`

/**
 * This puts a border around the screen that detects when a user is hovering over the area
 * It's a new type of nav pattern
 * * scrolling zooms in and out and moving your mouse pans the page 
 * I am trying out this type of nav because ctrl-zooming is causing problems and this lets the mouse handle everything
 * 
 * Note: also add click to zoom if we are far away.
 * 
 * Note: A better approach would be to put this border around the edges and then detect the mouse position relative to the edges
 * That way I can move the screen diagonally and at different rates depending on how close the cursor is to an edge
 * I dont think I would even need the hover area in this approach, just polling on mouse position would be fine
 * A circular border would be nice because it would be less space to travel to move diagonally
 * 
 */
const MosaicRoot = () => {
  const [guiding, setGuiding] = useState<Direction>();
  const [rate, setRate] = useState<number>(1);
  
  const [ticker, setTicker] = useState(0) 

  useEffect(() => {
    setTimeout(() => {
      setTicker((tick) => tick + 1)}, 100)
}, [ticker, setTicker]);

  const setConditions = useCallback((guiding: Direction, rate: number) => {
    setGuiding(guiding);
    setRate(rate)
  },[setGuiding, setRate])

  useEffect(() => {
    if (!guiding) return;

    

    const delta = ((10 * rate) / MosaicStore.scale.x) ;
    switch (guiding) {
      case 'top-left':
        MosaicStore.moveCamera(-delta, -delta);
        break;
      case 'bottom-left':
        MosaicStore.moveCamera(-delta, delta);
        break;
      case 'top-right':
        MosaicStore.moveCamera(delta, -delta);
        break;
      case 'bottom-right':
        MosaicStore.moveCamera(delta, delta);
        break;
      case 'left':
        MosaicStore.moveCamera(-delta, 0);
        break;
      case 'right':
        MosaicStore.moveCamera(delta, 0);
        break;
      case 'up':
        MosaicStore.moveCamera(0, -delta);
        break;
      case 'down':
        MosaicStore.moveCamera(0, delta);
        break;
      
    }

  },[guiding, ticker, rate]);


  return (
    <>
      {/* Outer edges. When hovering over these, the rate increases so more space is covred */}
      {/* onMouseLeave should not set guiding anymore because of the inner edges*/}
      <Guider position="absolute" height="5%"  width="100%" top={0} onMouseEnter={()=>setConditions('up', 1)} onMouseLeave={()=>setGuiding(undefined)} />
      <Guider position="absolute" height="5%"  width="100%" bottom={0} onMouseOver={()=>setConditions('down', 1)} onMouseLeave={()=>setGuiding(undefined)}/>
      <Guider position="absolute" height="100%"  width="5%"  top={0} right={0} style={{float: "right"}} onMouseOver={()=>setConditions('right', 1)} onMouseLeave={()=>setGuiding(undefined)} />
      <Guider position="absolute" height="100%"  width="5%"  top={0} left={0} style={{float: "left"}} onMouseOver={()=>setConditions('left', 1)} onMouseLeave={()=>setGuiding(undefined)} />
          
      {/* Inner edges. Smaller rate so you can have more fine grained control */}
      {/* <Guider position="absolute" height="4%"  width="100%" top="3%" onMouseEnter={()=>setConditions('up', 0.5)} onMouseLeave={()=>setGuiding(undefined)} />
      <Guider position="absolute" height="4%"  width="100%" bottom="3%" onMouseOver={()=>setConditions('down', 0.5)} onMouseLeave={()=>setGuiding(undefined)} />
      <Guider position="absolute" height="100%"  width="4%"  top={0} right="3%" style={{float: "right"}} onMouseOver={()=>setConditions('right', 0.5)} onMouseLeave={()=>setGuiding(undefined)} />
      <Guider position="absolute" height="100%"  width="4%"  top={0} left="3%" style={{float: "left"}} onMouseOver={()=>setConditions('left', 0.5)} onMouseLeave={()=>setGuiding(undefined)} /> */}

      <Triangle position="absolute"  top={0} left={0} style={{float: "left"}} onMouseOver={()=>setConditions('top-left', 1)} onMouseLeave={()=>setGuiding(undefined)} />
      <TopRightTriangle position="absolute"  top={0} right={0} style={{float: "right"}} onMouseOver={()=>setConditions('top-right', 1)} onMouseLeave={()=>setGuiding(undefined)} />
      <BottomRightTriangle position="absolute"  bottom={0} right={0} style={{float: "right"}} onMouseOver={()=>setConditions('bottom-right', 1)} onMouseLeave={()=>setGuiding(undefined)} />
      <BottomLeftTriangle position="absolute"  bottom={0} left={0} style={{float: "left"}} onMouseOver={()=>setConditions('bottom-left', 1)} onMouseLeave={()=>setGuiding(undefined)} />

    </>
  )

};

export default MosaicRoot;
