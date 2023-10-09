type PostType = 'text' | 'file' | 'link'

export interface Post {
  author: string;
  type: PostType;
  content: string;
  title: string;
}