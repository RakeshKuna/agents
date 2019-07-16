import theme from "../../utils/theme";

const ITEM_HEIGHT = 48;

const MAX_HEIGHT = ({ itemCount = 5, maxHeight = itemCount * ITEM_HEIGHT }) =>
  maxHeight === undefined ? itemCount * ITEM_HEIGHT : maxHeight;

const styles = {
  root: {
    flexGrow: 1,
    "& .chipSpan > span": {
      whiteSpace: "normal",
    },
    "& .chipSpan > svg": {
      margin: ({ rtl }) => (rtl ? "0 -8px 0 4px" : "0 4px 0 0"),
      height: "1em",
    },
    "& .Select-control": {
      display: "flex",
      alignItems: "center",
      border: 0,
      height: "auto",
      background: "transparent",
      "&:hover": {
        boxShadow: "none",
      },
    },
    "& .Select-multi-value-wrapper": {
      flexGrow: 1,
      display: "flex",
      flexWrap: "wrap",
      position: "relative",
    },
    "& .Select--multi .Select-input": {
      margin: 0,
    },
    "& .Select.has-value.is-clearable.Select--single > .Select-control .Select-value": {
      padding: 0,
    },
    "& .Select-noresults": {
      padding: theme.spacing.unit * 2,
    },
    "& .Select-menu .Select-noresults": {
      boxSizing: "border-box",
    },
    "& .Select-input": {
      display: "inline-flex",
      padding: 0,
      height: 29,
    },
    "& .Select-input input": {
      background: "transparent",
      border: 0,
      padding: 0,
      cursor: "default",
      display: "inline-block",
      fontFamily: "inherit",
      fontSize: "inherit",
      margin: 0,
      outline: 0,
      height: 29,
    },
    "& .Select-placeholder, .Select--single .Select-value": {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      fontSize: 16,
      padding: 0,
    },
    "& .Select-placeholder": {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    "& .is-disabled": {
      "& .Select-placeholder": {
        color: "#b2b2b2",
      },
      "& .Select-arrow-zone": {
        color: "#b2b2b2",
        opacity: 0.42,
        cursor: "default",
        alighSelf: "flex-end",
      },
    },
    "& .Select-menu-outer": {
      backgroundColor: theme.palette.background.paper,
      boxShadow:
        "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
      position: "absolute",
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: "100%",
      zIndex: 2,
      maxHeight: MAX_HEIGHT,
    },
    "& .Select-menu-outer .dropdownCheckbox": {
      height: "auto",
    },
    "& .Select.is-focused:not(.is-open) > .Select-control": {
      boxShadow: "none",
    },
    "& .Select-menu": {
      maxHeight: MAX_HEIGHT,
      overflowY: "auto",
    },
    "& .Select-menu div": {
      boxSizing: "content-box",
    },
    "& .Select-menu > div": {
      width: "100% !important",
    },
    "& .Select-clear-zone": {
      color: theme.palette.action.active,
      cursor: "pointer",
      marginRight: "5px",
      alighSelf: "flex-end",
    },
    // Only for screen readers. We can't use display none.
    "& .Select-aria-only": {
      position: "absolute",
      overflow: "hidden",
      clip: "rect(0 0 0 0)",
      height: 1,
      width: 1,
      margin: -1,
    },
  },
  inputRoot: { display: "inline-block" },
  chip: ({ chipStyle, rtl }) => ({
    height: "auto",
    padding: 5,
    marginRight: !rtl && 6,
    marginLeft: rtl && 6,
    marginBottom: 6,
    whiteSpace: "normal",
    ...chipStyle,
  }),
  chipClose: ({ rtl }) => ({
    color: "#333",
    margin: rtl ? "0 -8px 0 4px" : "0 4px 0 0",
  }),

  saveIcon: {
    display: "inline-block",
    marginRight: "5px",
    cursor: "pointer",
  },
  dropdownIcon: {
    display: "inline-block",
    transform: "scaleY(-1)",
    fontSize: 10,
    transformOrigin: "0 44%",
  },
};

export default styles;
