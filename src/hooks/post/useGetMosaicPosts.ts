import useSWR from 'swr';
import fetcher from '../fetcher'

import { Post } from './useGetPost';

type PostMapping = Record<string, Post>; 

interface GetProjectsVars {
  resourceKey: string;
}

const useGetMosaicPosts = (vars: GetProjectsVars) => {
  const { data, error, isLoading, mutate } = useSWR(vars.resourceKey ? `https://breezy-orange-forest.glitch.me/mosaic/${vars.resourceKey}/posts` : undefined, fetcher)

  return {
    data: data as PostMapping,
    isLoading,
    isError: error,
    mutate
  }
}

export default useGetMosaicPosts;

