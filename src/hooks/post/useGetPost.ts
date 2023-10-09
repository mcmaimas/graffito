export type PostType = 'text' | 'file' | 'link';

export interface TextContent {
  description: string;
} 

export interface FileContent {
  description: string;
  srcUrl: string;
} 

export interface LinkContent {
  description: string;
  linkUrl: string;
  linkPreview: string;
}

type Content = TextContent | FileContent | LinkContent;

export interface Post {
  author: string;
  type: PostType;
  title: string;
  content: Content;
}

export interface TextPost extends Post {
  type: 'text';
  content: TextContent;
}

// Just images for now
export interface FilePost extends Post {
  type: 'file';
  content: FileContent;
}

export interface LinkPost extends Post {
  type: 'link';
  content: LinkContent;
}