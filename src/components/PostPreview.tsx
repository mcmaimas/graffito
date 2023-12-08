import { Box } from "@mui/material";
import { ClaimedSquare } from "../hooks/post/useGetMosaicSquares";
import { LEAF_COLOR_SCHEME } from "../theme/colors";
import FadingPaperArticle from "./FadingArticle";
import { Forum, Recommend, Visibility } from "@mui/icons-material";
import { FilePost, LinkPost, StaticLinkContent, TextPost } from "../hooks/post/useGetPost";
import InteractionStatItem from "./InteractionStatItem";
import { getSquareColor } from "./squares/helpers";

interface PostPreviewProps {
  square: ClaimedSquare;
  onClick?: ()=>void;
}

export const PostPreview = ({square, onClick}: PostPreviewProps) => {
  return (
    <Box height="100%" width="100%"  onClick={onClick} border={`2px solid ${LEAF_COLOR_SCHEME[getSquareColor(square)]}`}>
      <Box display="flex" flexDirection="column" bgcolor="white" height="100%" width="100%" borderRadius={0.5} position="relative">
        <Box flexGrow={1} overflow="hidden" display="flex" flexDirection="column">
          <Box fontWeight={600} p={1}>{square.post?.title || `Looong title of mine that causes overflow`}</Box>
            {(square.post.type === 'text') && <TextPostPreview  post={square.post as TextPost} />}
            {(square.post.type === 'file') && <FilePostPreview  post={square.post as FilePost} />}
            { (square.post.type === 'link') && <LinkPostPreview post={square.post as LinkPost} />}
          <Box bgcolor={LEAF_COLOR_SCHEME[getSquareColor(square)]} position="absolute" bottom={0} width="100%" py={1} display="flex" justifyContent="space-between"  >
            <InteractionStatItem icon={<Visibility fontSize="small"/>} count={square?.post?.stats.views || 0}/>
            <InteractionStatItem icon={<Recommend fontSize="small"/>} count={square?.post?.stats?.likes || 0}/>
            <InteractionStatItem icon={<Forum fontSize="small"/>} count={square?.post?.stats.comments || 0}/>
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
export const FilePostPreview = ({post}: FilePostPreviewProps) => {
  
  

  return  (
  <Box display="flex" alignItems="center" >
    {(post.content?.filePaths && post.content?.filePaths[0]) ? (
      <img src={`https://storage.googleapis.com/molten-goal-386802.appspot.com/${post.content.filePaths[0]}`}  alt={post.title} style={{maxWidth: "100%", maxHeight: "100%"}}/>
    ) : post.content.file ? (
      <img alt={post.title} src={URL.createObjectURL(post.content.file)} style={{maxWidth: "100%", maxHeight: "100%"}}/>
    ) : <>Nope</>}
    
  </Box>
)
    }

interface LinkPostPreviewProps {
  post: LinkPost;
}
export const LinkPostPreview = ({post}: LinkPostPreviewProps) => {
  if (post.content.previewType === 'dynamic' && post.content.linkUrl) {
    return <iframe title={post.title} src={post.content.linkUrl} height="75%" width="100%"></iframe>
  }
  if (post.content?.filePaths && post.content?.filePaths[0]) {
    return <img src={`https://storage.googleapis.com/molten-goal-386802.appspot.com/${post.content.filePaths[0]}`}  alt={post.title} style={{maxWidth: "100%", maxHeight: "100%"}}/>
  }
  if ((post.content as StaticLinkContent)?.srcUrl) {
    return <img alt={post.title} src={(post.content as StaticLinkContent).srcUrl} style={{maxWidth: "100%", maxHeight: "100%"}}/>
  }
  if ((post.content as StaticLinkContent)?.file) {
    return <img src={URL.createObjectURL((post.content as StaticLinkContent)!.file as Blob)} alt={post.title} style={{maxWidth: "100%", maxHeight: "100%"}}/>
  }

  return <>Alert message here</>

}

// const DynamicLinkContentPreview = ({content}: DynamicLinkContent) => {
//   return <iframe title={content.title} src={content.linkUrl} height="75%" width="100%"></iframe>
//   return <>OOPS</>
// }