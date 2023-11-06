import { LEAF_COLOR_SCHEME, LeafColor } from "../../theme/colors";
import PulsingBackgroundDiv from "../PulsingBackgroundDiv";

interface ZoomedOutProps {
  color: LeafColor;
  selected: boolean;
  onClick: ()=>void;
}
const ZoomedOut = ({color, selected, onClick}: ZoomedOutProps) => <PulsingBackgroundDiv leaf={LEAF_COLOR_SCHEME[color]} selected={selected} onClick={onClick}/>;

export default ZoomedOut