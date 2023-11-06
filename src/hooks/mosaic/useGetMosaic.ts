import useSWR from 'swr';
import fetcher from '../fetcher'

import { LeafColor} from '../../theme/colors';
import { Post } from '../post/useGetPost';
import { generateGrid } from './generateData';

export type BulkSquare = ClaimedSquare | UnclaimedSquare
type SquareStatus = 'claimed' | 'unclaimed';

// Instead of isAvailable, we'll attach a post object of some sort
export interface BaseSquare {
  resourceKey: string;
  row: string|number;
  column: string|number;
  color: LeafColor;
  status: SquareStatus;
}

export interface UnclaimedSquare extends BaseSquare {
  queued?: boolean;
}

export interface InteractionStats {
  views: number;
  likes: number;
  comments: number;
}
export interface ClaimedSquare extends BaseSquare {
  post: Post;
  stats: InteractionStats;
}

export interface MosaicDetails {
  dimensions: number;
}

interface GetProjectsVars {
  resourceKey: string|null;
}

const useGetWorldCanvas = (vars: GetProjectsVars) => {
  const { data, error, isLoading, mutate } = useSWR(vars.resourceKey ? `https://breezy-orange-forest.glitch.me/mosaic/${vars.resourceKey}` : undefined, fetcher)

  return {
    data: data as MosaicDetails,
    isLoading,
    isError: error,
    mutate
  }
}

export default useGetWorldCanvas;

export const getWorldCanvas = () => {
  const grid = generateGrid();
  return grid;
}
