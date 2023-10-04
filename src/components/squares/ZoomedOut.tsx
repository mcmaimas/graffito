import { Square } from "../../hooks/useGetTestWorldCanvas";
import { LEAF_COLOR_SCHEME } from "../../theme/colors";
import PulsingBackgroundDiv from "../PulsingBackgroundDiv";

interface ZoomedOutProps {
  square: Square;
  selected: boolean;
  onClick: ()=>void;
}
const ZoomedOut = ({square, selected, onClick}: ZoomedOutProps) => <PulsingBackgroundDiv leaf={LEAF_COLOR_SCHEME[square.color]} selected={selected} onClick={onClick}/>;

export default ZoomedOut