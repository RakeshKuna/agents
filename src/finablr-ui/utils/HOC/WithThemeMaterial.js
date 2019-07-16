import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import injectSheet from "react-jss";
import theme from "../theme";

const withThemeProvider = WrapComp => {
  function withTheme(propsInput) {
    return (
      <MuiThemeProvider theme={theme}>
        <WrapComp {...propsInput} />
      </MuiThemeProvider>
    );
  }
  withTheme.displayName = WrapComp.displayName || WrapComp.name;
  if (process.env.NODE_ENV !== "production") {
    // Exposed for test purposes.
    withTheme.Naked = WrapComp;
  }
  return withTheme;
};

const materialHOC = style => {
  const sheet = injectSheet(style);
  return component => sheet(withThemeProvider(component));
};

export default materialHOC;
