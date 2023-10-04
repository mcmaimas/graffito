import { keyframes } from "@mui/material";

// https://www.appsloveworld.com/reactjs/100/7/how-to-pass-props-to-keyframes-in-styled-component-with-react
export const pulsingBackground = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.25;
  }
  75%{
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`