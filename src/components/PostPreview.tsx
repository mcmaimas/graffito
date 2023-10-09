import { Box } from "@mui/material";
import { ClaimedSquare, InteractionStats } from "../hooks/canvas/useGetWorldCanvas";
import { LEAF_COLOR_SCHEME, LeafColor } from "../theme/colors";
import FadingPaperArticle from "./FadingArticle";
import { Forum, Recommend, Visibility } from "@mui/icons-material";
import { TextPost } from "../hooks/post/useGetPost";
import InteractionStatItem from "./InteractionStatItem";

interface PostPreviewProps {
  square: ClaimedSquare;
  onClick?: ()=>void;
}

export const PostPreview = ({square, onClick}: PostPreviewProps) => {
  if (square.post.type) return <TextPostPreview color={square.color} stats={square.stats} post={square.post as TextPost} onClick={onClick}/>
  return (<>No Preivew Available Yet for ${square.post.type}</>)
}

export default PostPreview;

interface TextPostPreviewProps {
  color: LeafColor;
  stats: InteractionStats;
  post: TextPost;
  onClick?: ()=>void;
}
export const TextPostPreview = ({color, stats, post, onClick}: TextPostPreviewProps) => {
  return (
<Box bgcolor={LEAF_COLOR_SCHEME[color]} height="100%" width="100%" p={1} onClick={onClick}>
      <Box display="flex" flexDirection="column" bgcolor="white" height="100%" width="100%" borderRadius={0.5} position="relative">
        <Box flexGrow={1} overflow="hidden">
          <Box fontWeight={600} p={1}>{post.title || `Looong title of mine that causes overflow`}</Box>
          <FadingPaperArticle >
            <p style={{padding: "8px"}}>
              {post.content.description}
            </p>
          </FadingPaperArticle>
          <Box position="absolute" bottom={0} width="100%" height="32px" display="flex" justifyContent="space-between" bgcolor="#C9C9C911">
            <InteractionStatItem icon={<Visibility fontSize="small"/>} count={stats.views}/>
            <InteractionStatItem icon={<Recommend fontSize="small"/>} count={stats.likes}/>
            <InteractionStatItem icon={<Forum fontSize="small"/>} count={stats.comments}/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}