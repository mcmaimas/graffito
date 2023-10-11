import { LeafColor} from '../../theme/colors';
import { Post } from '../post/useGetPost';
import { generateGrid } from './generateData';

export type BulkSquare = ClaimedSquare | UnclaimedSquare
type SquareStatus = 'claimed' | 'unclaimed';

// Instead of isAvailable, we'll attach a post object of some sort
export interface BaseSquare {
  resourceKey: string;
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



export const getWorldCanvas = () => {
  const grid = generateGrid();
  return grid;
}
