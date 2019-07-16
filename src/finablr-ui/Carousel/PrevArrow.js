import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icons";
import WithTheme from "../utils/HOC/WithTheme";
import styles from "./styles/prevArrowStyle";
import { css } from "../utils";

function PrevArrow(props) {
  const { classes, className, onClick, rtl, prevArrowIcon } = props;
  let iconName = "";
  let dynamicClass = "";
  let rtlClass = "";
  iconName = "chevron-left";
  dynamicClass = "customClassArrowLeft";
  if (rtl) {
    rtlClass = "slickPrevRtl";
  }

  return (
    <div
      className={css(className, classes[dynamicClass], classes[rtlClass])}
      style={{ zIndex: 1 }}
      onClick={onClick}
      role="presentation"
    >
      {prevArrowIcon ? (
        <PrevArrowIconCust classes={classes} prevArrowIcon={prevArrowIcon} />
      ) : (
        <Icon className={css(classes.customPrev)} iconName={iconName} />
      )}
    </div>
  );
}

function PrevArrowIconCust(props) {
  const { classes, prevArrowIcon } = props;
  return typeof prevArrowIcon === "string" ? (
    <Icon className={css(classes.customPrev)} iconName={prevArrowIcon} />
  ) : (
    prevArrowIcon
  );
}
PrevArrowIconCust.propTypes = {
  classes: PropTypes.object.isRequired,
  prevArrowIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
PrevArrow.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  rtl: PropTypes.bool,
  prevArrowIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
export default WithTheme(PrevArrow, styles)();
