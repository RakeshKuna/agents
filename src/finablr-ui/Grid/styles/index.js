const styles = {
  root: ({ style: { root = {} } = {} }) => ({
    width: "100%",
    ...root,
  }),
  table: ({ style: { table = {} } = {} }) => ({
    minWidth: 750,
    tableLayout: "fixed",
    ...table,
  }),
  sticky: {
    position: "sticky",
    background: "#fff",
    top: 0,
    zIndex: 1,
  },
  tableWrapper: ({ scrollHeight, style: { tableWrapper = {} } = {} }) => ({
    width: "100%",
    height: scrollHeight,
    overflow: "auto",
    ...tableWrapper,
  }),
  expanderCell: {
    width: 24,
    paddingLeft: ({ rtl }) => (rtl ? null : 5),
    paddingRight: ({ rtl }) => (rtl ? 5 : null),
  },
  checkbox: {
    width: 24,
    height: 24,
  },
};

export default styles;
