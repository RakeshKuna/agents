import theme from "../../utils/theme";

const style = {
  root: ({ style: { root = {} } = {} }) => ({
    position: "relative",
    width: "100%",
    ...root, // Slider Root style
  }),
  disabled: ({ style: { disabled = {} } = {} }) => ({
    pointerEvents: "none",
    ...disabled,
  }),
  railRoot: ({ style: { railRoot = {} } = {}, isVertical }) => ({
    position: "absolute",
    width: isVertical ? 3 : "100%",
    height: isVertical ? "100%" : 3,
    borderRadius: 7,
    cursor: "pointer",
    ...railRoot, // Rail Root common style
  }),
  rail: ({ style: { rail = {} } = {}, rtl }) => ({
    backgroundColor: !rtl ? theme.palette.primary.light : theme.palette.primary.main,
    ...rail, // Rail style, if rail is enabled
  }),
  railDisabled: ({ style: { railDisabled = {} } = {}, rtl }) => ({
    backgroundColor: !rtl ? theme.palette.action.disabledBackground : theme.palette.action.disabled,
    ...railDisabled, // Rail style, if rail is disabled
  }),
};

export default style;
