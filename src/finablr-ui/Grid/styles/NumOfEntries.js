import theme from "../../utils/theme";

const styles = {
  root: ({ style: { root = {} } = {} }) => ({
    fontSize: theme.typography.pxToRem(12),
    ...root,
  }),
  toolbar: ({ rtl, style: { toolbar = {} } = {} }) => ({
    height: 56,
    minHeight: 56,
    paddingRight: rtl ? 2 : null,
    paddingLeft: rtl ? null : 2,
    ...toolbar,
  }),
  spacer: {
    flex: "1 1 100%",
  },
  caption: ({ style: { labelStyle = {} } = {} }) => ({
    flexShrink: 0,
    textTransform: "uppercase",
    ...labelStyle,
  }),
};

export default styles;
