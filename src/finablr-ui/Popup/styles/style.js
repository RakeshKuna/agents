const styles = {
  root: ({ style: { root } = {}, rtl }) => ({
    direction: rtl ? "rtl" : "ltr",
    ...root,
  }),
  titleRoot: ({ style: { dialogTitle } = {} }) => ({
    padding: "15px 24px",
    width: "73%",
    ...dialogTitle,
  }),
  dialogHeader: ({ style: { dialogHeader } = {} }) => ({
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    flex: "0 0 auto",
    ...dialogHeader,
  }),
};

export default styles;
