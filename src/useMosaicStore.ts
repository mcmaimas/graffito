import { createContext, useCallback, useMemo, useState } from 'react';

import { CAMERA_ANGLE, RECT_H, RECT_W } from "./modules/core/constants";
import { cameraToScreenCoordinates, scaleWithAnchorPoint } from './modules/core/camera-utils';

export const MosaicContext = createContext(null);
export const MosaicDispatchContext = createContext(null);

interface Screen {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Pointer {
  x: number;
  y: number;
}

interface Scale {
  x: number;
  y: number;
}

const calculatePointerPosition = (scale: Scale, screen: Screen, deltaX: number, deltaY: number): Pointer => {
  return {
    x: screen.x + deltaX / scale.x,
    y: screen.y + deltaY / scale.y
  } as Pointer
}

export interface MosaicState {
  shouldRender: boolean;
  pixelRatio: number; // our resolution for dip calculations
  container: {
    //holds information related to our screen container
    width: number;
    height: number;
  };
  pointer: Pointer;
  camera: {
    //holds camera state
    x: number;
    y: number;
    z: number;
  };
}

const initialMosaicState: MosaicState = {
  shouldRender: true,
  pixelRatio: window.devicePixelRatio || 1,
  container: {
    width: 0,
    height: 0,
  },
  pointer: {
    x: 0,
    y: 0,
  },
  camera: {
    x: 0,
    y: 0,
    z: 0,
  },
}

const useMosaicStore = () => {

  const [mosaicData, setMosaicData] = useState<MosaicState>({...initialMosaicState});

  const aspect = useMemo(() => {
    return mosaicData.container.width / mosaicData.container.height;
  },[mosaicData.container]);

  const screen = useMemo(() => {
    const { x, y, z } = mosaicData.camera;
    const angle = CAMERA_ANGLE;
    return cameraToScreenCoordinates(x, y, z, angle, aspect);
  },[mosaicData.camera, aspect])

  const scale = useMemo(() => {
    const { width: w, height: h } = screen;
    const { width: cw, height: ch } = mosaicData.container;
    return { x: cw / w, y: ch / h };
  },[mosaicData, screen]);

  const isCameraInBounds = useCallback((cameraX: number, cameraY: number, cameraZ: number) => {
    return true;
  },[])

  const moveCamera = useCallback((mx: number, my: number) => {
    const scrollFactor = 1.5;
    const deltaX = mx * scrollFactor,
      deltaY = my * scrollFactor;
    const { x, y, z } = mosaicData.camera;
    if (isCameraInBounds(x + deltaX, y + deltaY, z)) {
      setMosaicData((prevValue: MosaicState) => {
        return {
        ...prevValue,
        camera: {
          x: prevValue.camera.x + deltaX,
          y: prevValue.camera.y + deltaY,
          z: prevValue.camera.z
        }, 
        shouldRender: true,
        pointer: calculatePointerPosition(scale, screen, deltaY, deltaY)
      }})
    }
  },[mosaicData, setMosaicData, isCameraInBounds]);

  const zoomCamera = useCallback((deltaY: number) => {
    const zoomScaleFactor = 2;
    const deltaAmount = zoomScaleFactor * Math.max(deltaY);

    setMosaicData((prevValue: MosaicState) => {
      const { x: oldX, y: oldY, z: oldZ } = prevValue.camera;
      const oldScale = scale;
  
      const { width: containerWidth, height: containerHeight } = prevValue.container;
      const { width, height } = cameraToScreenCoordinates(
        oldX,
        oldY,
        oldZ + deltaAmount,
        CAMERA_ANGLE,
        aspect
      );
      const newScaleX = containerWidth / width;
      const newScaleY = containerHeight / height;
      const { x: newX, y: newY } = scaleWithAnchorPoint(
        prevValue.pointer.x,
        prevValue.pointer.y,
        oldX,
        oldY,
        oldScale.x,
        oldScale.y,
        newScaleX,
        newScaleY
      );
      
      return {
        ...prevValue,
        shouldRender: true,
        camera: {
          x: newX, 
          y: newY,
          z: oldZ + deltaAmount
        }
      }
  })

  },[mosaicData, scale, aspect])

  return useMemo(() => ({
    mosaicData, aspect, screen, scale, moveCamera, zoomCamera
  }),[mosaicData, aspect, screen, scale, moveCamera, zoomCamera])

}

export default useMosaicStore;