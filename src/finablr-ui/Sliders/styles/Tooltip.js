import tooltipBg from "../assets/img/tooltipBg.svg";

const style = {
  tooltip: ({ style: { tooltip = {} } = {}, isVertical }) => ({
    top: !isVertical ? -43 : -16,
    left: !isVertical ? -6 : 23,
    backgroundImage: `url(${tooltipBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    minWidth: 33,
    height: 0,
    paddingBottom: "240%",
    lineHeight: 3,
    transform: isVertical && "rotate(90deg)",
    color: "#fff",
    ...tooltip, // Tooltip style with background
  }),
  tooltipRoot: ({ style: { tooltipRoot = {} } = {} }) => ({
    fontSize: 12,
    textAlign: "center",
    position: "absolute",
    ...tooltipRoot, // Tooltip root common style
  }),
  tooltipNoBg: ({ style: { tooltipNoBg = {} } = {}, isVertical }) => ({
    top: !isVertical ? -17 : 0,
    left: !isVertical ? 0 : 26,
    right: !isVertical && 0,
    lineHeight: 1.8,
    ...tooltipNoBg, // Tooltip style without background
  }),
};

export default style;
