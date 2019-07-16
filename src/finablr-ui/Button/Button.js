import React from "react";
// MaterialDesign => MdButton
import MdButton from "@material-ui/core/Button";
import styles from "./styles/buttonStyle";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css } from "../utils";
import { propTypesList, defaultProps } from "./ButtonProps";

const Button = props => {
  const {
    children,
    classes,
    umStyle,
    umClass,
    isBlock,
    umSize,
    rtl,
    inputProps,
    isExtended,
    iconStyle,
    icon,
    style,
    isEnabled,
    ...otherParam
  } = props;
  return (
    <MdButton
      color={umStyle}
      fullWidth={isBlock}
      size={umSize}
      classes={{
        root: classes.root,
        containedPrimary: classes.containedPrimary,
        containedSecondary: classes.containedSecondary,
        textPrimary: classes.textPrimary,
        textSecondary: classes.textSecondary,
        outlined: classes.outlined,
      }}
      className={css(classes.aButtonClass, umClass)}
      {...inputProps}
      {...otherParam}
      disabled={!isEnabled}
    >
      {children}
    </MdButton>
  );
};

Button.propTypes = propTypesList;

Button.defaultProps = defaultProps;

export default WithThemeMaterial(styles)(Button);
