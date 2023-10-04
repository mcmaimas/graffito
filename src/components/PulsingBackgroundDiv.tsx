import { styled } from "@mui/material";
import { pulsingBackground } from "../theme/keyframes";


const PulsingBackgroundDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "leaf" && prop !== "selected",
})<{ leaf: string; selected: boolean}>(({ leaf, selected }) => ({
  backgroundColor: leaf,
  animation: selected ? `${pulsingBackground} 4s infinite ease` : undefined,
  height: "100%",
  width: "100%"
}))

export default PulsingBackgroundDiv