import theme from "../../utils/theme";

const styles = {
  root: ({ style: { root = {} } = {} }) => ({
    fontSize: theme.typography.pxToRem(12),
    ...root,
  }),
  toolbar: ({ rtl, style: { toolbar = {} } = {} }) => ({
    height: 56,
    minHeight: 56,
    paddingRight: rtl ? null : 2,
    paddingLeft: rtl ? 2 : null,
    ...toolbar,
  }),
  spacer: {
    flex: "1 1 100%",
  },
  caption: ({ style: { labelStyle = {} } = {} }) => ({
    flexShrink: 0,
    ...labelStyle,
  }),
  actions: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: ({ rtl }) => (rtl ? null : theme.spacing.unit * 2.5),
    marginRight: ({ rtl }) => (rtl ? theme.spacing.unit * 2.5 : null),
  },
};

export default styles;
