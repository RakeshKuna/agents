import theme from "../../utils/theme";

const trackLine = "#ccc";
const styles = {
  root: ({ style: { root } = {} }) => ({
    display: "inline-block",
    width: 60,
    ...root,
  }),
  progressRoot: {}, // undefined otherwise, in react-circular-progressbar
  colorPrimary: ({ pathColor }) => ({
    stroke: pathColor || theme.palette.primary.main,
  }),
  colorSecondary: ({ pathColor }) => ({
    stroke: pathColor || theme.palette.secondary.main,
  }),
  trail: ({ trackColor, style: { trail } = {} }) => ({
    stroke: trackColor || trackLine,
    ...trail,
  }),
  path: ({ style: { path } = {} }) => ({
    strokeLinecap: "round",
    transition: "stroke-dashoffset 0.5s ease 0s",
    ...path,
  }),
  text: ({ style: { text } = {} }) => ({
    fontSize: 20,
    fill: "#000",
    dominantBaseline: "middle",
    textAnchor: "middle",
    ...text,
  }),
  background: ({ style: { background } = {} }) => ({
    ...background,
  }),
};

export default styles;
