import { RECT_H, RECT_W } from "../modules/core/constants";

interface PreviewProps {
  srcUrl: string;
}

const EmbeddedWebistePreview = ({srcUrl}: PreviewProps) => {
  return (
    <iframe
      id="inlineFrameExample"
      title="Inline Frame Example"
      width={RECT_W}
      height={RECT_H}
      src={srcUrl}
    />
  )
}

export default EmbeddedWebistePreview;