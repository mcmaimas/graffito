import {SQUARES_PER_ROW} from '../../modules/core/constants';
import { LeafColor, color_randomizer } from '../../theme/colors';
import { BulkSquare } from './useGetWorldCanvas';
import { generatePost } from '../post/generateData';

export const generateGrid = () => {
  let grid: BulkSquare[][] = []; 
  for(let i = 0; i < SQUARES_PER_ROW; i++) {
    grid[i] = genereateRow(i);
  }
  console.log(grid)
  return grid;
}

export const genereateRow = (rowNum: number) => {
  let row : BulkSquare[] = []
  for(let i = 0; i < SQUARES_PER_ROW; i++) {
    row[i] = generateSquare(rowNum, i);

  }
  return row;
}

const generateSquare = (rowNum: number, colNum: number): BulkSquare => {
  const randomNumber = Math.floor(Math.random() * SQUARES_PER_ROW);
  const randomIdx = Math.floor(Math.random() * (color_randomizer.length));

  const claimed = randomNumber === colNum;

  const color: LeafColor = claimed ? color_randomizer[randomIdx] : "default";
  const post = claimed ?  generatePost() : undefined;
  return {
    resourceKey: `${rowNum}-${colNum}`,
    color: color,
    status: claimed ? 'claimed' : 'unclaimed',
    post: post,
    stats: {
      views: randomNumber,
      comments: randomIdx,
      likes: randomIdx * 2
    }
  }
}
