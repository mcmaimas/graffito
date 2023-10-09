export type PostType = 'text' | 'file' | 'link';

export interface TextContent {
  text: string;
} 

export interface Post {
  author: string;
  type: PostType;
  title: string;
  content: TextContent
}

export interface TextPost extends Post {
  type: 'text';
  content: TextContent;
}

// Just images for now
// export interface FilePost extends Post {
//   type: 'file';
//   srcUrl: string;
// }

// export interface LinkPost extends Post {
//   type: 'link';
//   linkUrl: string;
// }