import { fade } from "@material-ui/core/styles/colorManipulator";
import theme from "../../utils/theme";

const styles = {
  aButtonClass: props => {
    const { rtl, style } = props;
    return {
      fontWeight: 600,
      fontSize: "14px",
      direction: rtl ? "rtl" : "ltr",
      ...style,
    };
  },
  root: {},
  containedPrimary: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      "@media (hover: none)": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  containedSecondary: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  textPrimary: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  textSecondary: {
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  outlined: {
    border: `1px solid ${
      theme.palette.type === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"
    }`,
  },
  iconPrimary: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  iconSecondary: {
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
};

export default styles;
