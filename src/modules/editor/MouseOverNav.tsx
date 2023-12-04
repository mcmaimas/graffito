import MosaicStore from "../state/MosaicStore";
import { useContext, PointerEvent, useEffect, useRef, useState, useMemo, WheelEvent } from "react";
import useSize from "@react-hook/size";
import useRenderLoop from "../core/RenderLoop";
import WorldMosaic from "../../views/WorldMosaic";
import useGetMosaic from "../../hooks/mosaic/useGetMosaic";
import useGetMosaicSquares, { ClaimedSquare } from "../../hooks/post/useGetMosaicSquares";
import PostDetails from "../../components/squares/claimed/PostDetails";
import StakeClaim from "../../components/squares/unclaimed/StakeClaim";
import { Box } from "@mui/material";


export interface SelectedSquare {
  row: string|number;
  column: string|number;
}

const MosaicRoot = () => {
  const [guiding, setGuiding] = useState<'left'|'right'|'up'|'down'|undefined>();
  
  const [ticker, setTicker] = useState(0) 

  useEffect(() => {
    setTimeout(() => {
      setTicker((tick) => tick + 1)}, 100)
}, [ticker, setTicker]);

  

  useEffect(() => {
    if (!guiding) return;
    const delta = 50 / window.devicePixelRatio
    switch (guiding) {
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

  },[guiding, ticker]);

  return (
    <>
      <Box position="absolute" height="4%"  width="100%" top={0} bgcolor="#FF0000" onMouseEnter={()=>setGuiding('up')} onMouseLeave={()=>setGuiding(undefined)}>
        
      </Box>
  
      <Box position="absolute" height="4%"  width="100%" bottom={0} bgcolor="#FF0000" onMouseOver={()=>setGuiding('down')} onMouseLeave={()=>setGuiding(undefined)}>
        
      </Box>


  
        
        <Box position="absolute" height="100%"  width="2%"  top={0} right={0} style={{float: "right"}} bgcolor="#FF0000" onMouseOver={()=>setGuiding('right')} onMouseLeave={()=>setGuiding(undefined)}>
          
        </Box>
        <Box position="absolute" height="100%"  width="2%"  top={0} left={0} style={{float: "left"}} bgcolor="#FF0000" onMouseOver={()=>setGuiding('left')} onMouseLeave={()=>setGuiding(undefined)}>
          
        </Box>
        </>
  )

};

export default MosaicRoot;
