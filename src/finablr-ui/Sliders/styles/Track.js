import theme from "../../utils/theme";

const style = {
  trackRoot: ({ style: { trackRoot = {} } = {}, isVertical }) => ({
    position: "absolute",
    height: !isVertical && 3,
    width: isVertical && 3,
    zIndex: 1,
    borderRadius: 7,
    cursor: "pointer",
    ...trackRoot, // Track Root common style
  }),
  track: ({ style: { track = {} } = {}, rtl }) => ({
    backgroundColor: !rtl ? theme.palette.primary.main : theme.palette.primary.light,
    ...track, // Track style, if track is enabled
  }),
  trackDisabled: ({ style: { trackDisabled = {} } = {}, rtl }) => ({
    backgroundColor: !rtl ? theme.palette.action.disabled : theme.palette.action.disabledBackground,
    ...trackDisabled, // Track style, if track is disabled
  }),
};

export default style;
