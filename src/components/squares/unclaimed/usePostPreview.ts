import { useMemo } from "react";
import { ClaimedSquare } from "../../../hooks/post/useGetMosaicSquares";
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
    if (postType === 'file') {
      content = {
        file: files ? files[0] : undefined
      } 
    } else if (postType === 'link') {
      content = (files && !!files.length) ? {
        linkUrl: linkUrl,
        file: files ? files[0] : undefined,
        previewType: 'static'
      } as StaticLinkContent : {
        linkUrl: linkUrl,
        previewType: 'dynamic',
      } as DynamicLinkContent
    };

    return {
      _id: 'previewId',
      resourceKey: 'rKey',
      row: 1,
      column: 1,
      color: 'green',
      updatedAt: '2023-11-26T22:26:31.009Z',
      post: {
        type: postType,
        author: 'me',
        content,
        title: title || 'My Title here',
        stats: {
          views: 70,
          likes: 23,
          comments: 5,
        }
      },

    }
  },[title, text, files, linkUrl, postType])


  return useMemo(() => (
    previewClaimedSquare
  ),[previewClaimedSquare])
}

export default usePostPreview;