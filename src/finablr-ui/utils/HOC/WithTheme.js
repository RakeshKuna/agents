import React from "react";
import PropTypes from "prop-types";
import injectSheet, { ThemeProvider } from "react-jss";
import RTL from "./RTL";

function WithTheme(WrappedComponent, styles) {
  return theme => {
    class WithThemeComponent extends React.Component {
      constructor(props) {
        super(props);
        const { rtl = false } = this.props;
        this.StyledComponent = injectSheet(styles, { flip: rtl })(WrappedComponent);
      }

      componentWillReceiveProps(nextProps) {
        const { rtl } = this.props;
        if (nextProps.rtl !== rtl) {
          this.StyledComponent = injectSheet(styles, { flip: rtl })(WrappedComponent);
        }
      }

      render() {
        const { style = {}, umStyle, ...propData } = this.props;
        const { StyledComponent } = this;
        const newTheme = { ...theme };
        if (style) {
          newTheme.style = style;
        }
        if (umStyle) {
          newTheme.umStyle = umStyle;
        }
        return (
          <ThemeProvider theme={newTheme}>
            <RTL>
              <StyledComponent style={style} umStyle={umStyle} {...propData} />
            </RTL>
          </ThemeProvider>
        );
      }
    }
    WithThemeComponent.propTypes = {
      rtl: PropTypes.bool,
      style: PropTypes.object,
    };
    return WithThemeComponent;
  };
}

export default WithTheme;
