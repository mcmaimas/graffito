import {SQUARES_PER_ROW} from '../core/constants';

export interface Square {
  name: string;
}


export const generateGrid = () => {
  let grid: Square[][] = []; 
  for(let i = 0; i < SQUARES_PER_ROW; i++) {
    grid[i] = genereateRow(i);
  }
  return grid;
}

export const genereateRow = (rowNum: number) => {
  let row : Square[] = []
  for(let i = 0; i < SQUARES_PER_ROW; i++) {
    row[i] = {name: `${rowNum}-${i}`}
  }
  return row;
}