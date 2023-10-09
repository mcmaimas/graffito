import { Box } from "@mui/material";
import { ReactElement } from "react";

interface InteractionStatItemProps {
  icon: ReactElement;
  count: number;
}
const InteractionStatItem = ({icon, count}: InteractionStatItemProps) => {
  return (
    <Box display="flex" justifyContent="space-around" alignItems="center" px={0.5}>
      {icon} <Box px={0.5}/> {count}
    </Box>
  )
}

export default InteractionStatItem;