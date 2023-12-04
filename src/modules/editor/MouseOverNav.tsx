import MosaicStore from "../state/MosaicStore";
import { useContext, PointerEvent, useEffect, useRef, useState, useMemo, WheelEvent, useCallback } from "react";
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
  const [rate, setRate] = useState<number>(1);
  
  const [ticker, setTicker] = useState(0) 

  useEffect(() => {
    setTimeout(() => {
      setTicker((tick) => tick + 1)}, 100)
}, [ticker, setTicker]);

  const setConditions = useCallback((guiding: 'left'|'right'|'up'|'down'|undefined, rate: number) => {
    setGuiding(guiding);
    setRate(2)
  },[setGuiding, setRate])

  useEffect(() => {
    if (!guiding) return;
    const delta = ((10 * rate) / MosaicStore.scale.x) ;
    console.log(window);
    console.log(MosaicStore.scale)
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

  },[guiding, ticker, rate]);

  return (
    <>
      <Box position="absolute" height="3%"  width="100%" top={0} bgcolor="#FF0000" onMouseEnter={()=>setConditions('up', 5)} onMouseLeave={()=>setGuiding(undefined)}>
        
      </Box>
  
      <Box position="absolute" height="3%"  width="100%" bottom={0} bgcolor="#FF0000" onMouseOver={()=>setConditions('down', 5)} onMouseLeave={()=>setGuiding(undefined)}>
        
      </Box>


  
        
        <Box position="absolute" height="100%"  width="2%"  top={0} right={0} style={{float: "right"}} bgcolor="#FF0000" onMouseOver={()=>setConditions('right', 5)} onMouseLeave={()=>setGuiding(undefined)}>
          
        </Box>
        <Box position="absolute" height="100%"  width="2%"  top={0} left={0} style={{float: "left"}} bgcolor="#FF0000" onMouseOver={()=>setConditions('left', 5)} onMouseLeave={()=>setGuiding(undefined)}>
          
        </Box>

        

        <Box position="absolute" height="3%"  width="100%" top="3%" bgcolor="#00FF00" onMouseEnter={()=>setConditions('up', 1)} onMouseLeave={()=>setGuiding(undefined)}>
        
        </Box>
    
        <Box position="absolute" height="3%"  width="100%" bottom="3%" bgcolor="#00FF00" onMouseOver={()=>setConditions('down', 1)} onMouseLeave={()=>setGuiding(undefined)}>
          
        </Box>
  
  
    
          
          <Box position="absolute" height="100%"  width="3%"  top={0} right="2%" style={{float: "right"}} bgcolor="#00FF00" onMouseOver={()=>setConditions('right',1)} onMouseLeave={()=>setGuiding(undefined)}>
            
          </Box>
          <Box position="absolute" height="100%"  width="3%"  top={0} left="2%" style={{float: "left"}} bgcolor="#00FF00" onMouseOver={()=>setConditions('left', 1)} onMouseLeave={()=>setGuiding(undefined)}>
            
          </Box>

        </>
  )

};

export default MosaicRoot;
