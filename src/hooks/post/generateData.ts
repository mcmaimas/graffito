import { Comment, FileContent, LinkContent, Post, PostType, TextContent } from "./useGetPost";

export const generatePost = (): Post => {
  const rando = Math.floor(Math.random() * 100);
  const type: PostType = rando > 75 ? 'text' : rando > 50 ? 'file' : 'link';
  const basePost: Post = {
    author: 'me',
    type: type,
    title: 'default title',
    content: generateTypedContent(type),
    comments: generateComments(),
  }
  return basePost;
}

const generateComments = (): Comment[] => {
  // const rando = Math.floor(Math.random() * 15);
  let comments: Comment[] = [];
  for (let idx = 0; idx < 15; idx++) {
    comments.push({
      text: `comment ${idx}`,
      author: `author ${idx}`,
      timestamp: `${idx}`,
    } as Comment)
  }
  return comments
}

const generateTypedContent = (type: PostType) => {

    if (type === 'text') {
      return generateTextContent();
    } else if (type === 'file') {
      return generateImageContent();
    } else {
      return generateLinkContent();
    }
}

const generateTextContent = (): TextContent => {
  return {
    description: 'default text description',
  }
}

const generateImageContent = (): FileContent => {
  return {
    description: 'default text description',
    srcUrl: 'https://storage.googleapis.com/molten-goal-386802.appspot.com/6494882ae3729f00b20c22d2/mtn.jpg',
  }
}

const generateLinkContent = (): LinkContent => {
  const rando = Math.floor(Math.random() * 100);
  return rando % 2 === 0 ? {
    description: 'default text description',
    linkUrl: 'https://www.tierracomun.net/en/home',
    previewType: 'dynamic'
  } : {
    description: 'default text description',
    linkUrl: 'https://storage.googleapis.com/molten-goal-386802.appspot.com/651188d67f3efb016cbf04ed/lessWrongPost.PNG',
    previewType: 'static'
  }
}
