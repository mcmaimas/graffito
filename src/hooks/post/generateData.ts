import { Post, PostType, TextContent } from "./useGetPost";

export const generatePost = (): Post => {
  const rando = Math.floor(Math.random() * 100);
  const type = rando > 66 ? 'text' : rando > 33 ? 'file' : 'link';
  const basePost = {
    author: 'me',
    type: type,
    title: 'default title',
    content: generateTypedContent(type)
  }
  return basePost as Post;
}

const generateTypedContent = (type: PostType) => {
  return generateTextContent();
    // if (type === 'text') {
    //   return generateTextContent();
    // } else if () {
    //   return generateImageContent();
    // } else {
    //   return generateLinkContent();
    // }
}

const generateTextContent = (): TextContent => {
  return {
    text: 'default text content'
  }
}

// const generateImageContent = () => {
//   return {
    
//   }
// }

// const generateLinkContent = () => {
//   return {

//   }
// }
