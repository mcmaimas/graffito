import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Square } from "../../../hooks/useGetTestWorldCanvas";

interface PreviewProps {
  square: Square;
  open: boolean;
  handleClose: ()=>void;
}

const Preview = ({square, open, handleClose}: PreviewProps) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth
      PaperProps={{
        style:{
        boxShadow: `2px 2px 200px 2px ${square.color}`    
      }}}
    >
      <DialogTitle>Post</DialogTitle>
      <DialogContent>
        <Box display="flex" >
          <Box flexGrow={1} overflow="hidden">    
              <p>
              post content will go here aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv end
              </p>
            
          </Box>
          <Box>
            comment section
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Preview;