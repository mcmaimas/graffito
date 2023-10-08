import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { Square } from "../../../hooks/useGetTestWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
// import EmbeddedWebistePreview from "../../EmbeddedWebsitePreview";
import { useMemo, useState } from "react";
import UploadFiles from "../../UploadFiles";
import { ZoomedIn } from "../occupied/OccupiedSquare";
import { RECT_H, RECT_W } from "../../../modules/core/constants";
import { Close } from "@mui/icons-material";

interface PreviewProps {
  square: Square;
  open: boolean;
  handleClose: ()=>void;
}

const StakeClaim = ({square, open, handleClose}: PreviewProps) => {

  // const [srcUrl, setSrcUrl] = useState<string>(); 
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [files, setFiles] = useState<FileList>({} as FileList);
  // const [filePaths, setFilePaths] = useState<string[]>([]);

  const fakeSquare: Square = useMemo(() => {
    return {
      name: title || 'Default Title',
      color: 'green',
      content: {
        author: "Sam",
        content: text || '',
      },
      stats: {
        views: 0,
        likes: 0,
        comments: 0,
      }
    }
  },[title, text])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth
      PaperProps={{
        style:{
        boxShadow: `1px 1px 20px 1px ${square.color}`    
      }}}
    >
      <DialogTitle>Create Post</DialogTitle>
      <IconButton aria-label="close" onClick={handleClose}
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
        <Box m={2} display="flex" justifyContent="space-around" alignItems="center">
          <UploadFiles square={square} files={files} setFiles={setFiles} />
          {/* 
            <Box>
              <TextField value={text} onChange={(e:any)=>setSrcUrl(e.target.value)} fullWidth placeholder="Source URL"/>
              {srcUrl && (
                <EmbeddedWebistePreview srcUrl={srcUrl}/>
              )}
            </Box> 
          */}
        </Box>
        <Box m={2}>
          <TextField value={title} onChange={(e:any)=>setTitle(e.target.value)} fullWidth  placeholder="Title (optional)"/>
        </Box>
        <Box m={2}>
          <TextField value={text} onChange={(e:any)=>setText(e.target.value)} fullWidth multiline minRows={3} placeholder="Lorem ipsum..."/>
        </Box>
        <Box height={RECT_H} width={RECT_W}>
          <ZoomedIn square={fakeSquare} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Post</Button>
      </DialogActions>
    </Dialog>
  )
}

export default StakeClaim;