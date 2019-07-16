import React from "react";
import PropTypes from "prop-types";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "../Icons";

const EndAdornmentComponent = ({
  position,
  className,
  iconName,
  onClick,
  onMouseDown,
  parentClass,
}) => (
  <InputAdornment position={position} className={parentClass}>
    {typeof iconName === "string" ? (
      <Icon iconName={iconName} className={className} onClick={onClick} onMouseDown={onMouseDown} />
    ) : (
      iconName
    )}
  </InputAdornment>
);

EndAdornmentComponent.propTypes = {
  position: PropTypes.string,
  parentClass: PropTypes.string,
  className: PropTypes.string,
  iconName: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  onClick: PropTypes.func,
  onMouseDown: PropTypes.func,
};

EndAdornmentComponent.defaultProps = {
  position: "end",
};

export default EndAdornmentComponent;
