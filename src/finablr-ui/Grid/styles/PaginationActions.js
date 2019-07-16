import theme from "../../utils/theme";

const styles = {
  root: ({ style: { root = {} } = {} }) => ({
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
    ...root,
  }),
};

export default styles;
