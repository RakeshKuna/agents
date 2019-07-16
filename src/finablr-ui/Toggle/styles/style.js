import theme from "../../utils/theme";

const checkedStyle = ({ style: { checked } = {} }) => ({
  ...checked,
});
const checkedBarStyle = ({ style: { checkedBar } = {} }) => ({
  ...checkedBar,
});
const disabledStyle = ({ style: { disabled } = {} }) => ({
  ...disabled,
});

const styles = {
  root: ({ style: { wrapper } = {} }) => ({
    color: theme.palette.text.secondary,
    ...wrapper,
  }),
  bar: ({ style: { bar } = {} }) => ({
    ...bar,
  }),
  icon: ({ style: { icon } = {} }) => ({
    boxShadow:
      "0 0 0 0px rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14), -2px -3px 4px 0px rgba(0, 0, 0, 0.12)",
    ...icon,
  }),
  iconChecked: ({ style: { iconChecked } = {} }) => ({
    boxShadow:
      "0 0 0 0px rgba(0, 0, 0, 0.2), -1px -1px 0px 0 rgba(0, 0, 0, 0.14), -2px -3px 4px 0px rgba(0, 0, 0, 0.12)",
    ...iconChecked,
  }),

  checked: {
    extend: checkedStyle,
  },
  disabled: {
    extend: disabledStyle,
  },
  colorPrimary: {
    "&$checked": {
      color: theme.palette.primary.main,
      extend: checkedStyle,
      "& + $bar": {
        backgroundColor: theme.palette.primary.main,
        extend: checkedBarStyle,
      },
    },
    "&$disabled": {
      color: theme.palette.primary.main,
      extend: disabledStyle,
      "& + $bar": {
        color: theme.palette.primary.main,
      },
    },
  },
  colorSecondary: {
    "&$checked": {
      color: theme.palette.secondary.main,
      extend: checkedStyle,
      "& + $bar": {
        backgroundColor: theme.palette.secondary.main,
        extend: checkedBarStyle,
      },
    },
    "&$disabled": {
      color: theme.palette.secondary.main,
      extend: disabledStyle,
      "& + $bar": {
        color: theme.palette.secondary.main,
      },
    },
  },
  switchBase: {
    "&$checked": {
      color: theme.palette.default.main,
      extend: checkedStyle,
      "& + $bar": {
        backgroundColor: theme.palette.default.main,
        extend: checkedBarStyle,
      },
    },
    "&$disabled": {
      color: theme.palette.action.disabled,
      extend: disabledStyle,
      "& + $bar": {
        color: theme.palette.action.disabled,
      },
    },
  },

  toggle: props => {
    const { rtl, style } = props;
    return {
      transform: rtl ? "scale(-1)" : "scale(1)",
      ...style,
      direction: "ltr",
      "& > span": {},
    };
  },
  isRtl: props => {
    const { rtl } = props;
    return {
      direction: rtl ? "rtl" : "ltr",
    };
  },
};

export default styles;
