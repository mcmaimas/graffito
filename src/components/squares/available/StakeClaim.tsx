import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { Square } from "../../../hooks/useGetTestWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import EmbeddedWebistePreview from "../../EmbeddedWebsitePreview";
import { useState } from "react";

interface PreviewProps {
  square: Square;
  open: boolean;
  handleClose: ()=>void;
}

const StakeClaim = ({square, open, handleClose}: PreviewProps) => {

  const [srcUrl, setSrcUrl] = useState<string>(); 
  const [text, setText] = useState<string>();

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth
    
      PaperProps={{
        style:{
        boxShadow: `1px 1px 20px 1px ${square.color}`    
      }}}
    >
      <DialogTitle>Create Post</DialogTitle>
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
          X
        </IconButton>
      <DialogContent style={{backgroundColor: LEAF_COLOR_SCHEME.default}}>
        <Box m={2} display="flex" border="1PX SOLID RED" justifyContent="space-around" alignItems="center">
          <Box>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
          </Box>
          <Box>
          <TextField value={text} onChange={(e:any)=>setSrcUrl(e.target.value)} fullWidth placeholder="Source URL"/>
          {srcUrl && (
            <EmbeddedWebistePreview srcUrl={srcUrl}/>
          )}
          
        </Box>
        </Box>

        <Box m={2}>
          <TextField value={text} onChange={(e:any)=>setText(e.target.value)} fullWidth multiline minRows={3} placeholder="Lorem ipsum..."/>
          </Box>
      </DialogContent>
      <DialogActions>
        <Button>Post</Button>
      </DialogActions>
    </Dialog>
  )
}

export default StakeClaim;