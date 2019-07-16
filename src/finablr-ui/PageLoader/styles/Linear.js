import theme from "../../utils/theme";

const trackLine = "#ccc";
const styles = {
  root: ({ style: { root } = {} }) => ({
    textAlign: "center",
    ...root,
  }),
  colorPrimary: ({ pathColor }) => ({
    backgroundColor: pathColor || theme.palette.primary.main,
  }),
  colorSecondary: ({ pathColor }) => ({
    backgroundColor: pathColor || theme.palette.secondary.main,
  }),
  rootBar: ({ trackColor }) => ({
    backgroundColor: trackColor || trackLine,
  }),
  bar: ({ style: { bar } = {} }) => ({
    height: 5,
    ...bar,
  }),
  progress: ({ rtl, style: { progress } = {} }) => ({
    transformOrigin: rtl ? "right" : "left",
    ...progress,
  }),
  stripes: ({ trackColor = "#999999", style: { stripes } = {} }) => ({
    background: `repeating-linear-gradient(135deg,${trackColor}15 5px, ${trackColor}15 10px,${trackColor} 3px, ${trackColor} 12px)`,
    ...stripes,
  }),
  percentage: ({ style: { stripes } = {} }) => ({
    color: "#000",
    display: "inline-block",
    marginTop: 5,
    ...stripes,
  }),
};

export default styles;
