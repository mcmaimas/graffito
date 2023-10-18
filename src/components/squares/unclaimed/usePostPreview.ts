import { useMemo } from "react";
import { ClaimedSquare } from "../../../hooks/canvas/useGetWorldCanvas";
import { Content, DynamicLinkContent, PostType, StaticLinkContent } from "../../../hooks/post/useGetPost";

interface PostPreviewProps {
  title?: string;
  text?: string;
  files?: FileList;
  linkUrl?: string;
  postType: PostType
}

const usePostPreview = ({title, text, files, linkUrl, postType} : PostPreviewProps): ClaimedSquare => {

  const previewClaimedSquare: ClaimedSquare = useMemo(() => {
    // let postType: PostType = 'text';
    let content: Content = {
      description: text || 'Lorem Ipsum aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv cenchnbeubvh cerncjrnv aye hjubnuncineicvn cenchnbeubvh cerncjrnv end',
    }
    if (files && !!files.length) {
      postType = 'file';
      content = {
        file: files[0]
      } 
    };
    if (!!linkUrl && postType === 'link') {
      postType = 'link';
      content = (linkUrl && !files) ? {
        linkUrl: linkUrl,
        srcUrl: linkUrl,
        previewType: 'static'
      } as StaticLinkContent : {
        linkUrl: linkUrl,
        previewType: 'dynamic',
      } as DynamicLinkContent
    };

    return {
      resourceKey: 'rKey',
      color: 'green',
      status: 'claimed',
      post: {
        type: postType,
        author: 'me',
        content,
        title: title || 'My Title here'
      },
      stats: {
        views: 70,
        likes: 23,
        comments: 5,
      }
    }
  },[title, text, files, linkUrl, postType])


  return useMemo(() => (
    previewClaimedSquare
  ),[previewClaimedSquare])
}

export default usePostPreview;