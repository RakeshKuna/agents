import theme from "../../utils/theme";

const indicatorStyle = ({ umStyle, style: { indicator } = {} }) => {
  if (umStyle === "primary" || umStyle === "secondary") {
    return {
      backgroundColor: "#ffffff",
      ...indicator,
    };
  }
  return {
    backgroundColor: theme.palette.primary.main,
    ...indicator,
  };
};
const scrollButtonsAutoStyle = ({ umStyle, style: { scrollButtonsAuto } = {} }) => {
  if (umStyle === "primary" || umStyle === "secondary") {
    return {
      color: "#ffffff",
      ...scrollButtonsAuto,
    };
  }
  return {
    color: theme.palette.primary.main,
    ...scrollButtonsAuto,
  };
};
const scrollButtonsStyle = ({ umStyle, style: { scrollButtons } = {} }) => {
  if (umStyle === "primary" || umStyle === "secondary") {
    return {
      color: "#ffffff",
      ...scrollButtons,
    };
  }
  return {
    color: theme.palette.primary.main,
    ...scrollButtons,
  };
};
const centeredStyle = ({ style: { centered } = {} }) => ({
  ...centered,
});
const scrollerStyle = ({ style: { scroller } = {} }) => ({
  ...scroller,
});
const fixedStyle = ({ style: { fixed } = {} }) => ({
  ...fixed,
});
const scrollableStyle = ({ style: { scrollable } = {} }) => ({
  ...scrollable,
});
const rootStyle = ({ style: { root } = {} }) => ({
  ...root,
});

const styles = {
  tabRoot: {
    backgroundColor: ({ umStyle }) => {
      if (umStyle === "primary") {
        return theme.palette.primary.main;
      }
      if (umStyle === "secondary") {
        return theme.palette.secondary.main;
      }
      return "#ffffff";
    },
    direction: ({ rtl, scrollable }) => (rtl && !scrollable ? "rtl" : "ltr"),
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
  },
  indicator: {
    extend: indicatorStyle,
  },
  root: {
    extend: rootStyle,
  },
  scrollButtonsAuto: {
    extend: scrollButtonsAutoStyle,
  },
  scrollButtons: {
    extend: scrollButtonsStyle,
  },
  centered: {
    extend: centeredStyle,
  },
  scroller: {
    extend: scrollerStyle,
  },
  fixed: {
    extend: fixedStyle,
  },
  scrollable: {
    extend: scrollableStyle,
  },
};

export default styles;
