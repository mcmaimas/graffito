import { cameraToScreenCoordinates, scaleWithAnchorPoint } from '../modules/core/camera-utils';
import { CAMERA_ANGLE } from '../modules/core/constants';

export interface Screen {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Pointer {
  x: number;
  y: number;
}

export interface Scale {
  x: number;
  y: number;
}

export interface ProjectionState {
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

const calculatePointerPosition = (scale: Scale, screen: Screen, deltaX: number, deltaY: number): Pointer => {
  return {
    x: screen.x + deltaX / scale.x,
    y: screen.y + deltaY / scale.y
  } as Pointer
}


export const initialMosaicState: ProjectionState = {
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

// We care about 3 things when it comes to the screen
// Move Camera
export interface MoveCameraAction {
  deltaX: number;
  deltaY: number;
  scale: Scale;
  screen: Screen;
  type: 'moveCamera'
}
// Zoom Camera
export interface ZoomCameraAction {
  deltaX: number;
  deltaY: number;
  scale: Scale;
  aspect: number;
  type: 'zoomCamera'
}
// Move Pointer
export interface MovePointerAction {
  deltaX: number;
  deltaY: number;
  scale: Scale;
  screen: Screen;
  type: 'movePointer'
}

export interface SetRender {
  type: 'setRender';
  value: boolean;
}

export type Action = MoveCameraAction | ZoomCameraAction | MovePointerAction | SetRender;

export default function projectionReducer(state: ProjectionState, action: Action) {

  switch (action.type) {
    case 'setRender':
      return {
        ...state,
        shouldRender: action.value,
      }
      break;
    case 'moveCamera':
      const scrollFactor = 1.5;
      const deltaX = action.deltaX * scrollFactor,
      deltaY = action.deltaY * scrollFactor;
      return {
        ...state,
        camera: {
          x: state.camera.x + deltaX,
          y: state.camera.y + deltaY,
          z: state.camera.z
        },
        shouldRender: true,
        pointer: calculatePointerPosition(action.scale, action.screen, deltaY, deltaY)
      }
      break;
    case 'zoomCamera':
      const zoomScaleFactor = 2;
      const deltaAmount = zoomScaleFactor * Math.max(action.deltaY);
      const { x: oldX, y: oldY, z: oldZ } = state.camera;
      const oldScale = action.scale;
  
      const { width: containerWidth, height: containerHeight } = state.container;
      const { width, height } = cameraToScreenCoordinates(
        oldX,
        oldY,
        oldZ + deltaAmount,
        CAMERA_ANGLE,
        state.container.width / state.container.height
      );
      const newScaleX = containerWidth / width;
      const newScaleY = containerHeight / height;
      const { x: newX, y: newY } = scaleWithAnchorPoint(
        state.pointer.x,
        state.pointer.y,
        oldX,
        oldY,
        oldScale.x,
        oldScale.y,
        newScaleX,
        newScaleY
      );
      return {
        ...state,
        shouldRender: true,
        camera: {
          x: newX, 
          y: newY,
          z: oldZ + deltaAmount
        }
      }
      break;
    case 'movePointer':
      return {
        ...state,
        pointer: {
          x: action.screen.x + action.deltaX / action.scale.x,
          y: action.screen.y + action. deltaY / action.scale.y
        }
      }
      break;
    default: 
      return state;
      break;
  }


}








