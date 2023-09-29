import { CanvasPosition, Position } from "../core/foundation";

interface CanvasSquareProps extends CanvasPosition {
  text: string;
  color: string;
  width: number;
  height: number;
}

const CanvasSquare = ({
  text,
  color,
  left,
  top,
  width,
  height
}: CanvasSquareProps) => {
  return (
    <Position left={left} top={top} width={width} height={height}>
      <div className="flex items-center justify-center"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
          fontSize: '6px'
        }}
      >
        {text}
      </div>
    </Position>
  );
};

export default CanvasSquare;