import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import Icon from "../Icons";
import iconDefaultStyle from "./styles/iconStyle";

const FloatButton = props => {
  const { isExtended, icon, children, iconStyle } = props;
  return (
    <Button variant={isExtended ? "extendedFab" : "fab"} {...props}>
      {typeof icon === "string" ? (
        <Icon iconName={icon} style={{ ...iconDefaultStyle, ...iconStyle }} />
      ) : (
        icon
      )}
      {children}
    </Button>
  );
};
FloatButton.propTypes = {
  isExtended: PropTypes.bool,
  // string => material icon class name or custom icon component
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]).isRequired,
  iconStyle: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
};
FloatButton.defaultProps = {
  isExtended: false,
};
export default FloatButton;
