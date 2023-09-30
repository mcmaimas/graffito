import styled from "@emotion/styled";

const fadingLinearBackground = (colorToFade: string) => {
  const startColor = "rgba(255,255,255,0.99)";
  const endColor = "rgba(255,255,255,0)";
  return ` background: linear-gradient(to top,
    ${startColor} 0%,
    ${endColor} 100%
    )}`
  }

const FadingPaperArticle = styled.article`
  position: relative;
  height: 100%
  width: 100%;
  overflow: hidden;
  &:after {
    position: absolute;
    bottom: 0;
    height: 100%;
    width: 100%;
    content: "";
    ${fadingLinearBackground("#FFFFFF")};
    pointer-events: none;
  }
`
export default FadingPaperArticle;