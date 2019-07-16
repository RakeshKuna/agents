const styles = {
  root: {
    paddingLeft: 8,
    paddingRight: 8,
    boxSizing: "content-box",
    wordBreak: "break-word",
    width: ({ width = "auto" }) => width,
    textAlign: ({ rtl }) => (rtl ? "right" : "left"),
    "&:last-child": {
      paddingRight: ({ rtl }) => (rtl ? null : 24),
      paddingLeft: ({ rtl }) => (rtl ? 24 : null),
    },
  },
  customRoot: ({ style: { root = {} } = {} }) => ({
    ...root,
  }),
  head: ({ style: { head = {} } = {} }) => ({
    backgroundColor: "#f1f1f1",
    color: "#333333",
    fontSize: 16,
    ...head,
  }),
  numeric: ({ rtl, style: { numeric = {} } = {} }) => ({
    flexDirection: "row",
    textAlign: rtl ? "left" : "right",
    ...numeric,
  }),
  firstCell: {
    paddingLeft: ({ rtl }) => (rtl ? null : 40),
    paddingRight: ({ rtl }) => (rtl ? 40 : null),
  },
};

export default styles;
