import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, OutlinedInput, Tooltip } from "@mui/material";
// import { ClaimedSquare } from "../../../hooks/mosaic/useGetMosaic";
import { LEAF_COLOR_SCHEME } from "../../../theme/colors";
import { Close, OpenInBrowser, Recommend, Visibility } from "@mui/icons-material";
import InteractionStatItem from "../../InteractionStatItem";
import { FilePost, LinkPost, Post, TextPost } from "../../../hooks/post/useGetPost";

interface PostDetailsProps {
  post: Post;
  open: boolean;
  handleClose: ()=>void;
}

const PostDetails = ({post, open, handleClose}: PostDetailsProps) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth
      PaperProps={{
        style:{
        // boxShadow: `1px 1px 20px 1px ${LEAF_COLOR_SCHEME[color]}`
      }}}
    >
      <DialogTitle>{post?.title}</DialogTitle>
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
          {post.type === 'text' && <TextPostDetails post={post as TextPost} />}
          
            
          {post.type === 'file' && <FilePostDetails post={post as FilePost}/>}

          {post.type === 'link' && <LinkPostDetails post={post as LinkPost}/>}
            
            
            <Box display="flex" alignItems="center">
              <Box>
                <Tooltip title={post?.author}>
                <Avatar>{post?.author.substring(0,1)}</Avatar>
                </Tooltip>
              </Box>
              <Box px={1}>
                <em>MM-DD-YYYY</em>
              </Box>
              <Box flexGrow={1} />
              <InteractionStatItem icon={<Visibility fontSize="large"/>} count={0}/>
            <InteractionStatItem icon={<Recommend fontSize="large"/>} count={0}/>
            </Box>
          </Box>
          <Box width="33%" flexGrow={1} m={2} p={2} display="flex" flexDirection="column" >
            <Box height="500px" overflow="auto">
            {post.comments?.map((comment) => (
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
    {/* <img alt={post.title} src={(post.content as FileContent).srcUrl} style={{width: "100%", height: "100%"}}/> */}
    {(post.content?.filePaths && post.content?.filePaths[0]) ? (
      <img src={`https://storage.googleapis.com/molten-goal-386802.appspot.com/${post.content.filePaths[0]}`}  alt={post.title}/>
    ) : post.content.file ? (
      <img alt={post.title} src={URL.createObjectURL(post.content.file)} style={{maxWidth: "100%", maxHeight: "100%"}}/>
    ) : <>Nope</>}
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