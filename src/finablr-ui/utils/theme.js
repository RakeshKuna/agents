import { createMuiTheme } from "@material-ui/core/styles";

const colorPattern = {
  primary: { light: "#AEE2F5", main: "#19ACE3" },
  secondary: "#25479E",
  default: "#bbbbbb",
  error: "#f44336",
};

const colorPalette = {
  palette: {
    primary: {
      light: colorPattern.primary.light,
      main: colorPattern.primary.main,
      // dark: "#1976d2",
      contrastText: "#fff",
    },
    secondary: {
      // light: "#25479E",
      main: colorPattern.secondary,
      // dark: "#25479E",
      contrastText: "#fff",
    },
    default: {
      // light: "#BBBBBB",
      main: colorPattern.default,
      // dark: "#BBBBBB",
      contrastText: "#000000",
    },
    error: {
      main: colorPattern.error,
    },
    bottomLineColor: {
      light: "#b2b2b2",
      main: "rgba(255, 255, 255, 0.7)",
    },
    inputBorder: {
      main: "rgba(0, 0, 0, 0.42)",
    },
  },
  overrides: {
    MuiFormLabel: {
      focused: {
        color: "#1face2",
      },
    },
    textColor: "#333333",
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: colorPattern.primary.main,
      },
    },
  },
};

export default createMuiTheme(colorPalette);
