import MosaicStore from "../state/MosaicStore";
import { PropsWithChildren } from "react";
import { inBounds } from "./math-utils";
import { Box } from "@mui/material";

export interface MosaicPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const Position = ({
  left,
  top,
  width,
  height,
  children
}: PropsWithChildren<MosaicPosition>) => {
  const screen = MosaicStore.screen;
  if (
    inBounds(
      { left, top, height, width },
      {
        left: screen.x,
        top: screen.y,
        width: screen.width,
        height: screen.height
      }
    )
  ) {
    return (
      <Box position="absolute" display="inline-block" style={{
          left: `${left - screen.x}px`,
          top: `${top - screen.y}px`
        }}>
        {children}
      </Box>
    );
  } else return null;
};
