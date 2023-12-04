import {
  cameraToScreenCoordinates,
  scaleWithAnchorPoint,
} from "../core/camera-utils";
import { CAMERA_ANGLE, RECT_H, RECT_W } from "../core/constants";
import { SQUARES_PER_ROW } from "../core/constants";

export interface MosaicState {
  shouldRender: boolean;
  pixelRatio: number; // our resolution for dip calculations
  container: {
    //holds information related to our screen container
    width: number;
    height: number;
  };
  pointer: {
    x: number;
    y: number;
  };
  camera: {
    //holds camera state
    x: number;
    y: number;
    z: number;
  };
}
const getInitialMosaicState = (): MosaicState => {
  return {
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
  };
};

let MosaicData = getInitialMosaicState();

export default class MosaicStore {
  private static get data() {
    if (!MosaicData)
      MosaicData = {
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
      };
    return MosaicData;
  }

  static initialize(width: number, height: number) {
    
    // if (!!MosaicData.pixelRatio) return;
    if(MosaicData.pointer.x !== 0) return;
    
    

    const containerWidth = width;
    const containerHeight = height;
    MosaicData = getInitialMosaicState();
    MosaicData.pixelRatio = window.devicePixelRatio || 1;
    MosaicData.container.width = containerWidth;
    MosaicData.container.height = containerHeight;
    MosaicData.camera.x = RECT_W * (SQUARES_PER_ROW / 2);
    MosaicData.camera.y =  RECT_H * (SQUARES_PER_ROW / 2);
    MosaicData.camera.z = containerWidth / Math.tan(CAMERA_ANGLE);
  }
  public static get screen() {
    const { x, y, z } = this.camera;
    const aspect = this.aspect;
    const angle = CAMERA_ANGLE;
    return cameraToScreenCoordinates(x, y, z, angle, aspect);
  }
  public static get camera() {
    return this.data.camera;
  }
  public static get scale() {
    const { width: w, height: h } = MosaicStore.screen;
    const { width: cw, height: ch } = MosaicStore.container;
    return { x: cw / w, y: ch / h };
  }
  public static get shouldRender() {
    return MosaicData.shouldRender;
  }
  public static set shouldRender(value: boolean) {
    MosaicData.shouldRender = value;
  }

  private static get container() {
    return MosaicData.container;
  }

  private static get pointer() {
    return MosaicData.pointer;
  }

  private static get aspect() {
    return MosaicData.container.width / MosaicData.container.height;
  }

  private static isCameraInBounds(
    cameraX: number,
    cameraY: number,
    cameraZ: number
  ) {
    return true;
    // const angle = radians(30);
    // const { x, y, width, height } = cameraToScreenCoordinates(
    //   cameraX,
    //   cameraY,
    //   cameraZ,
    //   angle,
    //   this.aspect
    // );
    // const isXInBounds = x >= 0 && x <= this.data.Mosaic.width;
    // const isYInBounds = y >= 0 && y <= this.data.Mosaic.height;
    // return isXInBounds && isYInBounds;
  }

  public static moveCamera(mx: number, my: number) {
    const scrollFactor = 1.5;
    const deltaX = mx * scrollFactor,
      deltaY = my * scrollFactor;
    const { x, y, z } = this.camera;
    if (this.isCameraInBounds(x + deltaX, y + deltaY, z)) {
      this.data.camera.x += deltaX;
      this.data.camera.y += deltaY;
      // move pointer by the same amount
      this.shouldRender = true;
      this.movePointer(deltaY, deltaY);
    }
  }

  public static zoomCamera(deltaX: number, deltaY: number) {
    // Normal zoom is quite slow, we want to scale the amount quite a bit
    const zoomScaleFactor = 2;
    const deltaAmount = zoomScaleFactor * Math.max(deltaY);
    const { x: oldX, y: oldY, z: oldZ } = this.camera;
    const oldScale = { ...this.scale };

    const { width: containerWidth, height: containerHeight } = this.container;
    const { width, height } = cameraToScreenCoordinates(
      oldX,
      oldY,
      oldZ + deltaAmount,
      CAMERA_ANGLE,
      this.aspect
    );
    const newScaleX = containerWidth / width;
    const newScaleY = containerHeight / height;
    const { x: newX, y: newY } = scaleWithAnchorPoint(
      this.pointer.x,
      this.pointer.y,
      oldX,
      oldY,
      oldScale.x,
      oldScale.y,
      newScaleX,
      newScaleY
    );
    const newZ = oldZ + deltaAmount;
    this.shouldRender = true;
    if (this.isCameraInBounds(oldX, oldY, newZ)) {
      this.data.camera = {
        x: newX,
        y: newY,
        z: newZ,
      };
    }
  }

  // pointer position from top left of the screen
  public static movePointer(deltaX: number, deltaY: number) {
    const scale = this.scale;
    const { x: left, y: top } = this.screen;
    this.data.pointer.x = left + deltaX / scale.x;
    this.data.pointer.y = top + deltaY / scale.y;
  }
}
