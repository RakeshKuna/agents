const styles = {
  paper: ({ dropDownStyle, rtl }) => ({
    ...dropDownStyle,
    direction: rtl ? "rtl" : "ltr",
    textAlign: "right",
  }),
  wrapperComponent: {
    position: "relative",
  },
  iconStyle: {
    position: "absolute",
    bottom: "2px",
    left: ({ rtl }) => (rtl ? "0px" : "auto"),
    right: ({ rtl }) => (!rtl ? "0px" : "auto"),
  },
  hoverDom: {
    padding: "5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
export default styles;
