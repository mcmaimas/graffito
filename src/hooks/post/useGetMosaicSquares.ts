import useSWR from 'swr';
import fetcher from '../fetcher'

import { Post } from './useGetPost';
import { LeafColor } from '../../theme/colors';

export type BulkSquare = ClaimedSquare | UnclaimedSquare

// Instead of isAvailable, we'll attach a post object of some sort
export interface BaseSquare {
  resourceKey: string;
  row: string|number;
  column: string|number;
  color: LeafColor;
}

export interface UnclaimedSquare extends BaseSquare {
  queued?: boolean;
}


export interface ClaimedSquare extends BaseSquare {
  _id: string;
  post: Post;
  updatedAt: string;
}

type SquareMapping = Record<string, ClaimedSquare>; 

interface GetMosaicSquaresVars {
  resourceKey: string;
}

const useGetMosaicSquares = (vars: GetMosaicSquaresVars) => {
  const { data, error, isLoading, mutate } = useSWR(vars.resourceKey ? `https://breezy-orange-forest.glitch.me/mosaic/${vars.resourceKey}/squares` : undefined, fetcher)

  return {
    data: data as SquareMapping,
    isLoading,
    isError: error,
    mutate
  }
}

export default useGetMosaicSquares;

