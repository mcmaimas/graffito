import { FileContent, LinkContent, Post, PostType, TextContent } from "./useGetPost";

export const generatePost = (): Post => {
  const rando = Math.floor(Math.random() * 100);
  const type = rando > 66 ? 'text' : rando > 33 ? 'file' : 'link';
  const basePost: Post = {
    author: 'me',
    type: type,
    title: 'default title',
    content: generateTypedContent(type)
  }
  return basePost;
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
    srcUrl: '',
  }
}

const generateLinkContent = (): LinkContent => {
  return {
    description: 'default text description',
    linkUrl: '',
    linkPreview: ''
  }
}
