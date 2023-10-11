import { Box } from "@mui/material";
import { ClaimedSquare } from "../hooks/canvas/useGetWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../theme/colors";
import FadingPaperArticle from "./FadingArticle";
import { Forum, Recommend, Visibility } from "@mui/icons-material";
import { FilePost, LinkPost, TextPost } from "../hooks/post/useGetPost";
import InteractionStatItem from "./InteractionStatItem";

interface PostPreviewProps {
  square: ClaimedSquare;
  onClick?: ()=>void;
}

export const PostPreview = ({square, onClick}: PostPreviewProps) => {  
  return (
    <Box bgcolor={LEAF_COLOR_SCHEME[square.color]} height="100%" width="100%" p={1} onClick={onClick}>
      <Box display="flex" flexDirection="column" bgcolor="white" height="100%" width="100%" borderRadius={0.5} position="relative">
        <Box flexGrow={1} overflow="hidden" display="flex" flexDirection="column">
          <Box fontWeight={600} p={1}>{square.post?.title || `Looong title of mine that causes overflow`}</Box>
            {(square.post.type === 'text') && <TextPostPreview  post={square.post as TextPost} />}
            {(square.post.type === 'file') && <FilePostPreview  post={square.post as FilePost} />}
            { (square.post.type === 'link') && <LinkPostPreview post={square.post as LinkPost} />}
          <Box position="absolute" bottom={0} width="100%" height="32px" display="flex" justifyContent="space-between" bgcolor="#C9C9C911">
            <InteractionStatItem icon={<Visibility fontSize="small"/>} count={square.stats.views}/>
            <InteractionStatItem icon={<Recommend fontSize="small"/>} count={square.stats.likes}/>
            <InteractionStatItem icon={<Forum fontSize="small"/>} count={square.stats.comments}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PostPreview;

interface TextPostPreviewProps {
  post: TextPost;
}
export const TextPostPreview = ({post}: TextPostPreviewProps) => (
  <FadingPaperArticle >
    <p style={{padding: "8px"}}>
      {post.content.description}
    </p>
  </FadingPaperArticle>
)

interface FilePostPreviewProps {
  post: FilePost;
}
export const FilePostPreview = ({post}: FilePostPreviewProps) => (
  <Box display="flex" alignItems="center" flexGrow={1}>
    <img alt={post.title} src={post.content.srcUrl} style={{maxWidth: "100%", maxHeight: "100%"}}/>
  </Box>
)

interface LinkPostPreviewProps {
  post: LinkPost;
}
export const LinkPostPreview = ({post}: LinkPostPreviewProps) => {
  return post.content.previewType === 'dynamic' ? (
    <iframe title={post.title} src={post.content.linkUrl}></iframe>
  ) : (
    <img alt={post.title} src={post.content.linkUrl} style={{maxWidth: "100%", maxHeight: "100%"}}/>
  ) 
}