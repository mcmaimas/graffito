import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, OutlinedInput, TextField, TextareaAutosize, capitalize } from "@mui/material";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import { useCallback, useState } from "react";
import { RECT_H, RECT_W } from "../../../modules/core/constants";
import { Close, Link } from "@mui/icons-material";
import PostPreview from "../../PostPreview";
import UploadFiles from "../../UploadFiles";
import { PostType } from "../../../hooks/post/useGetPost";
import usePostPreview from "./usePostPreview";
import axios from "axios";
import { SelectedSquare } from "../../../modules/editor/MosaicRoot";

interface PreviewProps {
  square: SelectedSquare;
  open: boolean;
  handleClose: ()=>void;
}

const StakeClaim = ({square, open, handleClose}: PreviewProps) => {

  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [files, setFiles] = useState<FileList>({} as FileList);
  const [linkUrl, setLinkURL] = useState<string>();

  const [postType, setPostType] = useState<PostType>('text');

  const previewClaimedSquare = usePostPreview({title, text, files, linkUrl, postType});

  const handleSubmit = useCallback(async () => {
    const payload = {
      ...previewClaimedSquare,
      post: {
        ...previewClaimedSquare.post,
      },
      row: square.row,
      column: square.column
    }
    console.log(payload)
    await axios.post(`https://breezy-orange-forest.glitch.me/squares`, payload)
  },[previewClaimedSquare, square])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth
      PaperProps={{
        style:{
        // boxShadow: `1px 1px 20px 1px ${square.color}`    
      }}}
    >
      <DialogTitle>Create a {capitalize(postType)} Post</DialogTitle>
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

        <Box display="flex" width="100%">

          {/* LEFT SIDE */}
          <Box flexGrow={1} display="flex" flexDirection="column">
            {/* Title Input */}
            <Box mx={2}>
              <TextField value={title} onChange={(e:any)=>setTitle(e.target.value)} fullWidth  placeholder="Title (optional)"/>
            </Box>
            {/* Main Text Content Input */}
            <Box mx={2} flexGrow={1}>
              <TextareaAutosize value={text} onChange={(e:any)=>setText(e.target.value)} style={{height: "100%", width: "100%", padding: "16px"}} placeholder="Lorem ipsum..."/>
            </Box>
          </Box>
          <Box px={1} />
          {/* RIGHT SIDE */}
          <Box width="350px" display="flex" flexDirection="column" alignItems="center">
            {/* Select the Post Type */}
            <Box width="100%" pb={2}>
              <ButtonGroup fullWidth>
                <Button variant={postType === 'text' ? 'contained' : 'outlined'} onClick={()=>setPostType('text')}>Text</Button>
                <Button variant={postType === 'file' ? 'contained' : 'outlined'} onClick={()=>setPostType('file')}>Image</Button>
                <Button variant={postType === 'link' ? 'contained' : 'outlined'} onClick={()=>setPostType('link')}>Link</Button>
              </ButtonGroup>
            </Box>
 
            {/* Upload a file */}
            {postType !== 'text' && (
              <Box width="100%">
                <UploadFiles files={files} setFiles={setFiles}/>
              </Box>
            )}
            <Box>
              <Box height={RECT_H} width={RECT_W} >
                <PostPreview square={previewClaimedSquare}/>
              </Box>
            </Box>

           {/* Set a link  */}
           {postType === 'link' && (
              <Box width="100%" px={2} pb={2}>
                <Box display="flex" justifyContent="center">
                  <Box width="8px" height="16px" bgcolor={(linkUrl && !files?.length) ? LEAF_COLOR_SCHEME["green"] : undefined} />
                </Box>
                <OutlinedInput placeholder="Paste a website URL here" value={linkUrl} startAdornment={<Link />} onChange={(e:any) => setLinkURL(e.target.value)} fullWidth/>
              </Box>
            )}

          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Post</Button>
      </DialogActions>
    </Dialog>
  )
}

export default StakeClaim;