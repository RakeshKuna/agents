import React from "react";
import MdTooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import styles from "./styles/ToolTip";

const positionMapper = {
  top: "top",
  "top-left": "top-start",
  "top-right": "top-end",
  left: "left",
  "left-top": "left-start",
  "left-bottom": "left-end",
  right: "right",
  "right-top": "right-start",
  "right-bottom": "right-end",
  bottom: "bottom",
  "bottom-left": "bottom-start",
  "bottom-right": "bottom-end",
};

const ToolTip = ({
  title,
  placement,
  classes,
  children,
  delay,
  delayShow,
  delayHide,
  onHide,
  onShow,
  style = {}, // eslint-disable-line
  ...otherProps
}) => {
  const mappedPosition = positionMapper[placement] ? positionMapper[placement] : "top";
  let delayInShow = delayShow;
  let dealyInHide = delayHide;
  if (delay) {
    delayInShow = delay;
    dealyInHide = delay;
  }
  return (
    <MdTooltip
      title={title}
      placement={mappedPosition}
      classes={{ tooltip: classes.tooltip }}
      enterDelay={delayInShow}
      leaveDelay={dealyInHide}
      enterTouchDelay={delayInShow}
      leaveTouchDelay={dealyInHide}
      onClose={onHide}
      onOpen={onShow}
      {...otherProps}
    >
      {children}
    </MdTooltip>
  );
};

ToolTip.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  placement: PropTypes.oneOf([
    "top",
    "top-left",
    "top-right",
    "left",
    "left-top",
    "left-bottom",
    "right",
    "right-top",
    "right-bottom",
    "bottom",
    "bottom-left",
    "bottom-right",
  ]).isRequired,
  children: PropTypes.any.isRequired,
  delay: PropTypes.number,
  delayShow: PropTypes.number,
  delayHide: PropTypes.number,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  style: PropTypes.object,
};

ToolTip.defaultProps = {
  delay: 0,
  delayShow: 0,
  delayHide: 0,
};

export default WithThemeMaterial(styles)(ToolTip);
