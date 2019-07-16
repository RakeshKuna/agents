import theme from "../../utils/theme";
import { placeholder, placeholderVisible, bottomLineColor } from "../../utils/inputUtils";

const styles = {
  fullWidth: {
    width: "100%",
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
  GridClass: {},
  GridRightIcon: {
    flexGrow: 1,
  },
  hover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  textBoxtypeTwoHover: {
    "& > div": {
      "&:before": {
        content: "''",
        width: 4,
        height: "100%",
        background: "transparent",
        position: "absolute",
        top: 0,
        left: ({ rtl }) => (rtl ? "" : 0),
        right: ({ rtl }) => (!rtl ? "" : 0),
      },
      "&:hover:before": {
        background: theme.palette.primary.main,
      },
      "&:focus:before": {
        background: theme.palette.primary.main,
      },
    },
    "& input, & > div": {
      position: "relative",
      paddingLeft: ({ rtl }) => (rtl ? "" : 15),
      paddingRight: ({ rtl }) => (!rtl ? "" : 15),
    },
  },
  textBoxtypeTwoLabel: {
    left: "5px",
    top: "10px",
  },
  rightIconcss: prop => ({
    color: "#8d8d8d",
    ...prop.rightIconStyle,
  }),
  textBoxHover: {
    "&:hover": {
      "&:before": {
        borderBottom: ({ isEnabled }) =>
          isEnabled !== false
            ? ` 2px solid ${theme.palette.primary.main} !important`
            : `1px dotted ${theme.palette.inputBorder.main} !important`,
      },
    },
  },
  labelClassRTL: {
    direction: "rtl",
    left: "auto",
    right: "0",
    transformOrigin: "top right",
  },
  labelClass: {},
  coreClasess: {
    focused: {
      color: `${theme.palette.primary.main} !important`,
    },
  },
  disabled: {},
  error: {},
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

  rootTwoCustom: ({ style }) => ({ ...style }),
  inputTypeTwo: ({ inputStyle }) => ({ ...inputStyle }),
  rootTwo: {
    boxSizing: "border-box",
    border: ({ isEnabled }) =>
      `1px ${isEnabled === false ? "dotted" : "solid"} ${theme.palette.inputBorder.main}`,
    "&:before": {
      content: "''",
      boxSizing: "border-box",
      width: 4,
      height: "100%",
      background: "transparent",
      position: "absolute",
      top: 0,
      left: ({ rtl }) => (rtl ? "" : 0),
      right: ({ rtl }) => (!rtl ? "" : 0),
    },
    "& input, & > div": {
      marginLeft: ({ rtl }) => (rtl ? "" : "10px"),
      marginRight: ({ rtl }) => (rtl ? "10px" : ""),
      padding: ({ inputStyle = {} }) => inputStyle.padding || "18px 8px 18px 8px",
      paddingTop: ({ inputStyle = {} }) => inputStyle.paddingTop,
      paddingBottom: ({ inputStyle = {} }) => inputStyle.paddingBottom,
      paddingLeft: ({ inputStyle = {} }) => inputStyle.paddingLeft,
      paddingRight: ({ inputStyle = {} }) => inputStyle.paddingRight,
    },
  },
  rootHover: {
    "&:hover": {
      border: `1px solid ${theme.palette.primary.main}`,
    },
    "&:hover:before": {
      background: theme.palette.primary.main,
    },
  },
  focused: {
    border: `1px solid ${theme.palette.primary.main} !important`,
    "&:before": {
      background: theme.palette.primary.main,
    },
  },
  rootTwoError: {
    border: `1px solid ${theme.palette.error.main} !important`,
    "&:hover": {
      border: `1px solid ${theme.palette.error.main}`,
    },
    "&:hover:before": {
      background: theme.palette.error.main,
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
    "&::-ms-clear": {
      display: "none",
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
      borderBottom: `2px solid ${theme.palette.primary.main} `,
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
