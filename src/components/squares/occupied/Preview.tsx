import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Square } from "../../../hooks/useGetTestWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import { Close } from "@mui/icons-material";

interface PreviewProps {
  square: Square;
  open: boolean;
  handleClose: ()=>void;
}

const Preview = ({square, open, handleClose}: PreviewProps) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth
      PaperProps={{
        style:{
        boxShadow: `1px 1px 20px 1px ${square.color}`
      }}}
    >
      <DialogTitle>Post</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent style={{backgroundColor: LEAF_COLOR_SCHEME.default}}>
        <Box display="flex" >
          <Box width="66%" overflow="hidden" m={2} p={2} bgcolor="#FFFFFF"> 
            <p>
              post content will go here aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv end
            </p>
          </Box>
          <Box width="33%" flexGrow={1} m={2} p={2} >
            <Box bgcolor="#FFFFFF" mb={2} p={2}>Comment 1</Box>
            <Box bgcolor="#FFFFFF" mb={2} p={2}>Comment 2</Box>
            <Box bgcolor="#FFFFFF" mb={2} p={2}>Comment 3</Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Like</Button>
        <Button>Reply</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Preview;