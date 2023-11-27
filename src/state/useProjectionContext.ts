import { createContext, useCallback, useMemo, useReducer } from 'react';

import projectionReducer, { initialMosaicState } from './projectionReducer';
import { CAMERA_ANGLE } from '../modules/core/constants';
import { cameraToScreenCoordinates } from '../modules/core/camera-utils';

export const ProjectionContext = createContext<ProjectionDetails>({} as ProjectionDetails);

const useProjectionContext = () => {

  // const [mosaicData, setMosaicData] = useState<MosaicState>({...initialMosaicState});
  const [projectionData, dispatch] = useReducer(projectionReducer, initialMosaicState);

  const aspect = useMemo(() => {
    return projectionData.container.width / projectionData.container.height;
  },[projectionData.container]);

  const screen = useMemo(() => {
    const { x, y, z } = projectionData.camera;
    const angle = CAMERA_ANGLE;
    return cameraToScreenCoordinates(x, y, z, angle, aspect);
  },[projectionData.camera, aspect])

  const scale = useMemo(() => {
    const { width: w, height: h } = screen;
    const { width: cw, height: ch } = projectionData.container;
    return { x: cw / w, y: ch / h };
  },[projectionData, screen]);

  const moveCamera = useCallback((deltaX: number, deltaY: number) => {
    dispatch({
      type: 'moveCamera',
      deltaX,
      deltaY,
      scale,
      screen
    });
  },[scale, screen, dispatch])

  const zoomCamera = useCallback((deltaX: number, deltaY: number) => {
    dispatch({
      type: 'zoomCamera',
      deltaX,
      deltaY,
      scale,
      aspect
    });
  },[scale, aspect, dispatch])

  const movePointer = useCallback((deltaX: number, deltaY: number) => {
    dispatch({
      type: 'movePointer',
      deltaX,
      deltaY,
      scale,
      screen
    });
  },[scale, screen, dispatch])

  const setRender = useCallback((value: boolean) => {
    dispatch({
      type: 'setRender',
      value
    });
  }, [dispatch])

  return useMemo(() => ({
    projectionData, aspect, screen, scale, moveCamera, zoomCamera, movePointer, setRender
  }),[projectionData, aspect, screen, scale, moveCamera, zoomCamera, movePointer, setRender])

}

export default useProjectionContext;

export type ProjectionDetails = ReturnType<typeof useProjectionContext>;