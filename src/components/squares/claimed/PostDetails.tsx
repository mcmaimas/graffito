import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { ClaimedSquare } from "../../../hooks/canvas/useGetWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import { Close, Recommend, Visibility } from "@mui/icons-material";
import InteractionStatItem from "../../InteractionStatItem";
import { FileContent, FilePost, LinkPost, TextPost } from "../../../hooks/post/useGetPost";

interface PostDetailsProps {
  square: ClaimedSquare;
  open: boolean;
  handleClose: ()=>void;
}

const PostDetails = ({square, open, handleClose}: PostDetailsProps) => {
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
          {square.post.type === 'text' && <TextPostDetails post={square.post as TextPost} />}
          
            
          {square.post.type === 'file' && <FilePostDetails post={square.post as FilePost}/>}

          {square.post.type === 'link' && <LinkPostDetails post={square.post as LinkPost}/>}
            
            
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
              <InteractionStatItem icon={<Visibility fontSize="large"/>} count={square.stats.views}/>
            <InteractionStatItem icon={<Recommend fontSize="large"/>} count={square.stats.likes}/>
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

export default PostDetails;

const TextPostDetails = ({post}: {post: TextPost}) => (
  <Box bgcolor="#FFFFFF" flexGrow={1}>
    {post.content.description}
  </Box>
)

const FilePostDetails = ({post}: {post: FilePost}) => (
  <Box pb={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
    <img src={(post.content as FileContent).srcUrl} style={{width: "100%", height: "100%"}}/>
    <Box >
      {post.content.description}
    </Box>
  </Box>
)

const LinkPostDetails = ({post}: {post: LinkPost}) => {
  return (
    <Box pb={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      {post.content.previewType === 'dynamic' ? (
        <iframe src={post.content.linkUrl}></iframe>
      ) : (
        <img src={post.content.linkUrl} style={{maxWidth: "100%", maxHeight: "100%"}}/>
      )}
      <Box>
        {post.content.description}
      </Box>
    </Box>
  )
}