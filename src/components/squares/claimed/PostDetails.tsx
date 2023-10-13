import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, OutlinedInput, Tooltip } from "@mui/material";
import { ClaimedSquare } from "../../../hooks/canvas/useGetWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import { Close, OpenInBrowser, Recommend, Visibility } from "@mui/icons-material";
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
        <Box display="flex" overflow="hidden">
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
          <Box width="33%" flexGrow={1} m={2} p={2} display="flex" flexDirection="column" >
            <Box height="500px" overflow="auto">
            {square.post.comments?.map((comment) => (
              <Box bgcolor="#FFFFFF" borderRadius="4px" mb={2} p={2}>{comment.text}</Box>
            ))}
            </Box>

            <Box flexGrow={1} pt={1}>
              <OutlinedInput fullWidth multiline rows={3}/>
            </Box>
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
    <img alt={post.title} src={(post.content as FileContent).srcUrl} style={{width: "100%", height: "100%"}}/>
    <Box >
      {post.content.description}
    </Box>
  </Box>
)

const LinkPostDetails = ({post}: {post: LinkPost}) => {
  return (
    <Box pb={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Box pb={1}>
        <Button startIcon={<OpenInBrowser />} variant="contained" color="info" onClick={()=>window.open(`${post.content.linkUrl}`)}>Visit this page</Button>
      </Box>
      {post.content.previewType === 'dynamic' ? (
        <iframe title={post.title} src={post.content.linkUrl} height="100%" width="100%" style={{minHeight: "500px"}}></iframe>
      ) : (
        <img alt={post.title} src={post.content.srcUrl} style={{width: "100%", height: "100%"}}/>
      )}
      <Box py={1}>
        {post.content.description}
      </Box>
  
    </Box>
  )
}