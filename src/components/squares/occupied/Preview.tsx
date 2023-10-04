import { Dialog } from "@mui/material";
import { Square } from "../../../hooks/useGetTestWorldCanvas";

interface PreviewProps {
  square: Square;
  open: boolean;
  handleClose: ()=>void;
}

const Preview = ({square, open, handleClose}: PreviewProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      YAAAA
    </Dialog>
  )
}

export default Preview;