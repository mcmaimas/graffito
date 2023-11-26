export type PostType = 'text' | 'file' | 'link';

export interface BaseContent {
  description?: string;
}

export interface TextContent extends BaseContent {
  description: string;
} 

export interface FileContent extends BaseContent {
  srcUrl?: string;
  filePaths?: string[];
  file?: File;
} 

// dynamic is iframe
// static is a screenshot
export type LinkPreviewType = 'static' | 'dynamic'
export interface BaseLinkContent extends BaseContent {
  linkUrl: string;
  filePaths?: string[];
  previewType: LinkPreviewType;
}

export interface DynamicLinkContent extends BaseLinkContent {
  previewType: 'dynamic';
  srcUrl?: string;
}

export interface StaticLinkContent extends BaseLinkContent {
  file?: File;
  srcUrl?: string;
  previewType: 'static';
}

export type LinkContent = StaticLinkContent | DynamicLinkContent;

export type Content = TextContent | FileContent | LinkContent;

export interface Comment {
  text:string;
  author: string;
  timestamp: string;
}
export interface InteractionStats {
  views: number;
  likes: number;
  comments: number;
}

export interface Post {
  author: string;
  type: PostType;
  title?: string;
  content: Content;
  comments?: Comment[];
  stats: InteractionStats;
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