export type PostType = 'text' | 'file' | 'link';

export interface BaseContent {
  description?: string;
}

export interface TextContent extends BaseContent {
  description: string;
} 

export interface FileContent extends BaseContent {
  srcUrl: string;
} 

// dynamic is iframe
// static is a screenshot
export interface LinkContent extends BaseContent {
  linkUrl: string;
  previewType: 'static' | 'dynamic'
}

type Content = TextContent | FileContent | LinkContent;

export interface Post {
  author: string;
  type: PostType;
  title?: string;
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