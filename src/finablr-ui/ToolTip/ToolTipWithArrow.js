import React from "react";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import PropTypes from "prop-types";

import WithTheme from "../utils/HOC/WithTheme";
import styles from "./styles/ToolTipWithArrow";
import { css, ucFirst } from "../utils";

const Tooltip = ({
  id,
  content,
  classes,
  placement,
  umClass,
  umClassContent,
  umClassArrow,
  arrowOffsetLeft,
  arrowOffsetTop,
  positionLeft,
  positionTop,
  className,
  ...otherParams
}) => (
  <div
    id={id}
    role="tooltip"
    className={css(className, umClass, classes.root, classes[placement])}
    {...otherParams}
  >
    <div
      className={css(
        classes.arrow,
        classes.arrowOverRides,
        classes[`arrow${ucFirst(placement)}`],
        umClassArrow
      )}
    />
    <div className={css(classes.inner, umClassContent)}>{content}</div>
  </div>
);

Tooltip.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.any,
  className: PropTypes.string, // passed from overlay
  classes: PropTypes.object.isRequired,
  placement: PropTypes.oneOf(["top", "left", "right", "bottom"]).isRequired,
  umClass: PropTypes.string,
  umClassContent: PropTypes.string,
  umClassArrow: PropTypes.string,
  arrowOffsetLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  arrowOffsetTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  positionLeft: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  positionTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const ToolTipWithArrow = ({
  placement,
  toShow,
  onShow,
  onHide,
  children,
  rtl,
  style,
  theme,
  umStyle,
  ...otherParams
}) => {
  const toolTipComponent = <Tooltip placement={placement} {...otherParams} />;
  return (
    <OverlayTrigger
      overlay={toolTipComponent}
      placement={placement}
      trigger={toShow}
      onEntered={onShow}
      onExited={onHide}
    >
      {children}
    </OverlayTrigger>
  );
};
const triggerType = PropTypes.oneOf(["click", "hover", "focus"]);
ToolTipWithArrow.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.any,
  rtl: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  placement: PropTypes.oneOf(["top", "left", "right", "bottom"]).isRequired,
  toShow: PropTypes.oneOfType([triggerType, PropTypes.arrayOf(triggerType)]),
  delay: PropTypes.number,
  delayShow: PropTypes.number,
  delayHide: PropTypes.number,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  style: PropTypes.shape({
    tooltip: PropTypes.object,
    content: PropTypes.object,
    arrow: PropTypes.object,
  }),
  umClass: PropTypes.string,
  umClassContent: PropTypes.string,
  umClassArrow: PropTypes.string,
};

ToolTipWithArrow.defaultProps = {
  toShow: ["hover", "focus"],
};

export default WithTheme(ToolTipWithArrow, styles)({});
