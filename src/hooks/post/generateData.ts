import { Post } from "./useGetPost";

export const generatePost = (): Post => {
  const rando = Math.floor(Math.random() * 100);
  const type = rando > 66 ? 'text' : rando > 33 ? 'file' : 'link';
  return {
    author: "Sam",
    type: type,
    content: `Random Generated Content`, 
    title: `Random Title`
  }
}

// const generateTextPost = () => {
//   return ""
// }

// const generateImagePost = () => {
//   return ""
// }

// const generateLinkPost = () => {
//   return ""
// }
