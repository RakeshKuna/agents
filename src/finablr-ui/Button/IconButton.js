import React from "react";
import MdIconButton from "@material-ui/core/IconButton";
import PropTypes from "prop-types";
import styles from "./styles/buttonStyle";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css } from "../utils";
import Icon from "../Icons";
import iconDefaultStyle from "./styles/iconStyle";
import { propTypesList, defaultProps } from "./ButtonProps";

const IconButton = props => {
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
    <MdIconButton
      color={umStyle}
      size={umSize}
      classes={{ colorPrimary: classes.iconPrimary, colorSecondary: classes.iconSecondary }}
      className={css(classes.aButtonClass, umClass)}
      {...inputProps}
      {...otherParam}
      disabled={!isEnabled}
    >
      <span>
        {typeof icon === "string" ? (
          <Icon iconName={icon} style={{ ...iconDefaultStyle, ...iconStyle }} />
        ) : (
          icon
        )}
        {children}
      </span>
    </MdIconButton>
  );
};

IconButton.propTypes = {
  ...propTypesList,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]).isRequired,
};

IconButton.defaultProps = defaultProps;

export default WithThemeMaterial(styles)(IconButton);
