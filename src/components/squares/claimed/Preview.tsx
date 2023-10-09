import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { ClaimedSquare } from "../../../hooks/canvas/useGetWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import { Close, Recommend, Visibility } from "@mui/icons-material";
import { Stat } from "./Claimed";

interface PreviewProps {
  square: ClaimedSquare;
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
      <DialogTitle>{square.post?.title}</DialogTitle>
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
          <Box width="66%" overflow="hidden" m={2} display="flex" flexDirection="column">          
          <Box bgcolor="#FFFFFF" flexGrow={1}>
            {square.post?.content?.text || 'post content will go here aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv end'} 
            </Box>
            <Box display="flex" alignItems="center">
              <Box>
                <Tooltip title={square.post?.author}>
                <Avatar>{square.post?.author.substring(0,1)}</Avatar>
                </Tooltip>
              </Box>
              <Box px={1}>
                <em>MM-DD-YYYY</em>
              </Box>
              <Box flexGrow={1} />
              <Stat icon={<Visibility fontSize="large"/>} count={square.stats.views}/>
            <Stat icon={<Recommend fontSize="large"/>} count={square.stats.likes}/>
            </Box>
          </Box>
          <Box width="33%" flexGrow={1} m={2} p={2} >
            <Box bgcolor="#FFFFFF" mb={2} p={2}>Comment 1</Box>
            <Box bgcolor="#FFFFFF" mb={2} p={2}>Comment 2</Box>
            <Box bgcolor="#FFFFFF" mb={2} p={2}>Comment 3</Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default Preview;