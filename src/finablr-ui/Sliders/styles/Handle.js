import theme from "../../utils/theme";
import tooltipBg from "../assets/img/tooltipBg.svg";

const style = {
  handleRoot: ({ style: { handleRoot = {} } = {}, isVertical }) => ({
    border: "none",
    width: 17,
    height: 17,
    position: "absolute",
    marginLeft: !isVertical ? "-4px" : 1,
    marginTop: !isVertical ? 0 : -8,
    zIndex: 2,
    cursor: "pointer",
    borderRadius: "50%",
    transform: "translate(-50%, -50%)",
    transition:
      "width 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,height 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,left 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,top 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    ...handleRoot, // Handle Root common style
  }),
  handle: ({ style: { handle = {} } = {} }) => ({
    backgroundColor: theme.palette.primary.main,
    ...handle, // Handle style, if handle is enabled
  }),
  handleDisabled: ({ style: { handleDisabled = {} } = {} }) => ({
    backgroundColor: theme.palette.grey.A200,
    ...handleDisabled, // Handle style, if handle is disabled
  }),
  handlePsuedo: {
    "&:active": {
      width: 22,
      height: 22,
    },
    "&:active, &:focus": {
      boxShadow: "none",
    },
  },
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
