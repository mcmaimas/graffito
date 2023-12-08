import { ClaimedSquare } from "../../hooks/post/useGetMosaicSquares";
import { LeafColor } from "../../theme/colors";

export const getSquareColor = (square: ClaimedSquare): LeafColor => {
  const currentDate = new Date();
  const lastUpdated = new Date(square.updatedAt);
  const diffInTime = currentDate.getTime() - lastUpdated.getTime();
  
  const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));
  if (diffInDays < 2) return 'darkGreen';
  else if (diffInDays < 7) return 'green';
  else if (diffInDays < 14) return 'yellow';
  else if (diffInDays < 30) return 'orange';
  else if (diffInDays < 90) return 'red';
  
  return 'default'
}