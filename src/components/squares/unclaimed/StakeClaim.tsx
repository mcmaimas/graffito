import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, OutlinedInput, TextField } from "@mui/material";
import { ClaimedSquare, UnclaimedSquare } from "../../../hooks/canvas/useGetWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
// import EmbeddedWebistePreview from "../../EmbeddedWebsitePreview";
import { useMemo, useState } from "react";
// import UploadFiles from "../../UploadFiles";
import { RECT_H, RECT_W } from "../../../modules/core/constants";
import { Close, Link } from "@mui/icons-material";
import PostPreview from "../../PostPreview";
import UploadFiles from "../../UploadFiles";
import { Content, LinkPreviewType, PostType, StaticLinkContent } from "../../../hooks/post/useGetPost";

interface PreviewProps {
  square: UnclaimedSquare;
  open: boolean;
  handleClose: ()=>void;
}

const StakeClaim = ({square, open, handleClose}: PreviewProps) => {

  // const [srcUrl, setSrcUrl] = useState<string>(); 
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const [files, setFiles] = useState<FileList>({} as FileList);
  // const [filePaths, setFilePaths] = useState<string[]>([]);
  const [linkUrl, setLinkURL] = useState<string>();
  const [linkType, setLinkType] = useState<LinkPreviewType>('dynamic');

  const previewClaimedSquare: ClaimedSquare = useMemo(() => {
    let postType: PostType = 'text';
    let content: Content = {
      description: text || 'Lorem Ipsum aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv end',
    }
    if (!!files.length) {
      postType = 'file';
      content = {
        file: files[0]
      } 
    };
    if (!!linkUrl) {
      postType = 'link';
      content = {
        linkUrl: linkUrl,
        previewType: linkType
      } as StaticLinkContent
    };

    return {
      resourceKey: 'rKey',
      color: 'green',
      status: 'claimed',
      post: {
        type: postType,
        author: 'me',
        content,
        title: title || 'My Title here'
      },
      stats: {
        views: 70,
        likes: 23,
        comments: 5,
      }
    }
  },[title, text, files, linkUrl])

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
        {/* <Box m={2} display="flex" justifyContent="space-around" alignItems="center">
          <UploadFiles square={square} files={files} setFiles={setFiles} />
        </Box> */}
        <Box m={2}>
          <TextField value={title} onChange={(e:any)=>setTitle(e.target.value)} fullWidth  placeholder="Title (optional)"/>
        </Box>
        <Box m={2}>
          <TextField value={text} onChange={(e:any)=>setText(e.target.value)} fullWidth multiline minRows={3} placeholder="Lorem ipsum..."/>
        </Box>
        <Box my={2} display="flex" width="100%">
          <Box display="flex" alignItems="center" justifyContent="center" borderRadius="8px" bgcolor="#FFFFFFAA" width="50%" mx={3}>
            <UploadFiles square={square} files={files} setFiles={setFiles}/>

          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" borderRadius="8px" bgcolor="#FFFFFFAA" width="50%" mx={3} px={2}>
            <OutlinedInput placeholder="Paste a link to a URL" value={linkUrl} startAdornment={<Link />} onChange={(e:any) => setLinkURL(e.target.value)} fullWidth/>
            <Button onClick={()=>setLinkType('dynamic')}>Dynamic</Button>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" width="100%" >
        <Box height={RECT_H} width={RECT_W} >
          
          <PostPreview square={previewClaimedSquare}/>
        </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button>Post</Button>
      </DialogActions>
    </Dialog>
  )
}

export default StakeClaim;