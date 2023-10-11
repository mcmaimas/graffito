export type PostType = 'text' | 'file' | 'link';

export interface BaseContent {
  description?: string;
}

export interface TextContent extends BaseContent {
  description: string;
} 

export interface FileContent extends BaseContent {
  srcUrl?: string;
  file?: File;
} 

// dynamic is iframe
// static is a screenshot
export type LinkPreviewType = 'static' | 'dynamic'
export interface LinkContent extends BaseContent {
  linkUrl: string;
  previewType: LinkPreviewType;
}

export type Content = TextContent | FileContent | LinkContent;

export interface Comment {
  text:string;
  author: string;
  timestamp: string;
}

export interface Post {
  author: string;
  type: PostType;
  title?: string;
  content: Content;
  comments?: Comment[];
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