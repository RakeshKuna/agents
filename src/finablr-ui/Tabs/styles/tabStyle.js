import theme from "../../utils/theme";

const selectedStyle = ({ umStyle, style: { selected } = {} }) => {
  if (umStyle === "primary" || umStyle === "secondary") {
    return {
      opacity: 1,
      ...selected,
    };
  }
  return {
    color: theme.palette.primary.main,
    ...selected,
  };
};

const disabledStyle = ({ style: { disabled } = {} }) => ({
  ...disabled,
});
const labelStyle = ({ style: { label } = {} }) => ({
  fontSize: "16px",
  ...label,
});

const wrapperStyle = ({ style: { wrapper } = {} }) => ({
  padding: "20px 0",
  ...wrapper,
});
const textColorInheritStyle = ({ style: { textColorInherit } = {} }) => ({
  ...textColorInherit,
});
const textColorSecondaryStyle = ({ style: { textColorSecondary } = {} }) => ({
  ...textColorSecondary,
});
const textColorPrimaryStyle = ({ style: { textColorPrimary } = {} }) => ({
  ...textColorPrimary,
});

const rootStyle = ({ umStyle, style: { root } = {} }) => {
  if (umStyle === "primary" || umStyle === "secondary") {
    return {
      fontSize: "16px",
      color: "#ffffff",
      opacity: 0.6,
      ...root,
    };
  }
  return {
    fontSize: "16px",
    ...root,
  };
};

const tabStyles = {
  disabled: {
    extend: disabledStyle,
  },
  selected: {
    extend: selectedStyle,
  },
  wrapper: {
    extend: wrapperStyle,
  },
  label: {
    extend: labelStyle,
  },
  root: {
    extend: rootStyle,
    "&$selected": {
      extend: selectedStyle,
    },
    "&$disabled": {
      opacity: 0.3,
      extend: disabledStyle,
    },
  },

  textColorInherit: {
    extend: textColorInheritStyle,
    "&$selected": {
      extend: selectedStyle,
    },
    "&$disabled": {
      opacity: 0.3,
      extend: disabledStyle,
    },
  },
  textColorPrimary: {
    extend: textColorPrimaryStyle,
    "&$selected": {
      extend: selectedStyle,
    },
    "&$disabled": {
      opacity: 0.3,
      extend: disabledStyle,
    },
  },
  textColorSecondary: {
    extend: textColorSecondaryStyle,
    "&$selected": {
      extend: selectedStyle,
    },
    "&$disabled": {
      opacity: 0.3,
      extend: disabledStyle,
    },
  },
};

export const styles = {
  root: {
    ...theme.typography.button,
    maxWidth: 264,
    position: "relative",
    minWidth: 72,
    padding: 0,
    minHeight: 48,
    flexShrink: 0,
    overflow: "hidden",
    [theme.breakpoints.up("md")]: {
      minWidth: 160,
    },
  },
  labelIcon: {
    minHeight: 72,
  },
  textColorInherit: {
    color: "inherit",
    opacity: 0.7,
    "&$selected": {
      opacity: 1,
    },
    "&$disabled": {
      opacity: 0.4,
    },
  },
  textColorPrimary: {
    color: theme.palette.text.secondary,
    "&$selected": {
      color: theme.palette.primary.main,
    },
    "&$disabled": {
      color: theme.palette.text.disabled,
    },
  },
  textColorSecondary: {
    color: theme.palette.text.secondary,
    "&$selected": {
      color: theme.palette.secondary.main,
    },
    "&$disabled": {
      color: theme.palette.text.disabled,
    },
  },
  selected: {},
  disabled: {},
  fullWidth: {
    flexShrink: 1,
    flexGrow: 1,
  },
  wrapper: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
  },
  labelContainer: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    [theme.breakpoints.up("md")]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  },
  badgeContainer: {
    position: "relative",
    top: -15,
  },
  badgeIconLabel: {
    position: "relative",
    top: 0,
    marginRight: -25,
    paddingLeft: 5,
  },
  badgeIconLabelRtl: {
    position: "relative",
    top: 0,
    marginLeft: -25,
    paddingRight: 5,
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    whiteSpace: "normal",
    [theme.breakpoints.up("md")]: {
      fontSize: theme.typography.pxToRem(13),
    },
  },
  labelWrapped: {
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },
};

export default tabStyles;
