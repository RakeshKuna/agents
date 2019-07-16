import theme from "../../utils/theme";
import { placeholder, placeholderVisible, bottomLineColor } from "../../utils/inputUtils";

const styles = {
  helperText: {
    textAlign: ({ rtl }) => (rtl ? "left" : "right"),
    fontSize: "11px",
    marginTop: "4px",
  },
  notDisabled: {
    color: "#444",
  },
  textBox: ({ style, rtl }) => ({
    width: "100%",
    fontSize: "16px",
    direction: rtl ? "rtl" : "ltr",
    ...style,
  }),

  FormControlClass: {
    width: "100%",
  },
  error: {
    color: "red",
  },
  textBoxHover: {
    "&:hover": {
      "& div:before": {
        borderBottom: `2px solid ${theme.palette.primary.main} !important`,
      },
    },
  },
  boxtwo: {
    border: ({ disabled }) => (disabled ? "1px dotted #b2b2b2" : "1px solid #b2b2b2"),
    "& div": {
      border: "none !important",
      padding: "0px",
      "&:before,&:after": {
        border: "none !important",
      },
    },
    "& textarea": {
      padding: "18px",
    },
  },
  boxtwoHover: {
    "& div:before": {
      "&:hover,&:focus": {
        border: "none !important",
      },
    },
    "& textarea": {
      "&:hover,&:focus": {
        borderLeft: ({ rtl }) => (!rtl ? `4px solid ${theme.palette.primary.main}` : "0px"),
        borderRight: ({ rtl }) => (rtl ? `4px solid ${theme.palette.primary.main}` : "0px"),
        padding: ({ rtl }) => (!rtl ? "18px 18px 18px 14px" : "18px 14px 18px 18px"),
      },
    },
  },
  errorBox: {
    border: `1px solid ${theme.palette.error.main}`,
    "& textarea": {
      "&:hover,&:focus": {
        borderLeft: ({ rtl }) => (!rtl ? `4px solid ${theme.palette.error.main}` : "0px"),
        borderRight: ({ rtl }) => (rtl ? `4px solid ${theme.palette.error.main}` : "0px"),
      },
    },
  },
  labelClass: {},
  coreClasess: {
    focused: {
      color: `${theme.palette.primary.main} !important`,
    },
  },
  disabled: {},
  focused: {},
  formControl: {
    "label + &": {
      marginTop: 16,
    },
  },
  root: {
    color: theme.overrides.textColor,
    "&$disabled": {
      color: theme.palette.text.disabled,
    },
  },
  input: {
    "&::-webkit-input-placeholder": placeholder,
    "&::-moz-placeholder": placeholder, // Firefox 19+
    "&:-ms-input-placeholder": placeholder, // IE 11
    "&::-ms-input-placeholder": placeholder, // Edge
    "label[data-shrink=false] + $formControl &": {
      "&:focus::-webkit-input-placeholder": placeholderVisible,
      "&:focus::-moz-placeholder": placeholderVisible, // Firefox 19+
      "&:focus:-ms-input-placeholder": placeholderVisible, // IE 11
      "&:focus::-ms-input-placeholder": placeholderVisible, // Edge
    },
  },
  underline: {
    "&:after": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    "&:before": {
      borderBottom: `1px solid ${bottomLineColor} `,
    },
    "&$disabled:before": {
      borderBottom: `1px dotted ${bottomLineColor} `,
    },
    "&$error:after": {
      borderBottomColor: theme.palette.error.main,
    },
    "&:hover:not($disabled):not($focused):not($error):before": {
      borderBottom: `2px solid ${theme.palette.text.primary} `,
    },
  },
  labelRoot: {
    color: theme.palette.text.secondary,
    "&$labelFocused": {
      color: theme.overrides.MuiFormLabel.focused.color,
    },
    "&$labelDisabled": {
      color: theme.palette.text.disabled,
    },
    "&$labelError": {
      color: theme.palette.error.main,
    },
  },
  labelFocused: {},
  labelDisabled: {},
  labelError: {},
  asterisk: {
    "&$error": {
      color: theme.palette.error.main,
    },
  },
};
export default styles;
