import theme from "../../utils/theme";

const checkedStyle = ({ style: { checked } = {} }) => ({
  ...checked,
});
const disabledStyle = ({ style: { disabled } = {} }) => ({
  ...disabled,
});

const styles = {
  checkbox: props => {
    const { style } = props;
    return {
      ...style,
    };
  },
  isRtl: props => {
    const { rtl } = props;
    return {
      direction: rtl ? "rtl" : "ltr",
    };
  },
  root: ({ style: { wrapper } = {} }) => ({
    color: theme.palette.text.secondary,
    ...wrapper,
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
    },
    "&$disabled": {
      color: theme.palette.action.disabled,
      extend: disabledStyle,
    },
  },
  colorSecondary: {
    "&$checked": {
      color: theme.palette.secondary.main,
      extend: checkedStyle,
    },
    "&$disabled": {
      color: theme.palette.action.disabled,
      extend: disabledStyle,
    },
  },
};

export default styles;
