import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icons";
import WithTheme from "../utils/HOC/WithTheme";
import styles from "./styles/nextArrowStyle";
import { css } from "../utils";

function NextArrow(props) {
  const { classes, className, onClick, rtl, nextArrowIcon } = props;
  let iconName = "";
  let dynamicClass = "";
  let rtlClass = "";
  dynamicClass = "customClassArrowRight";
  iconName = "chevron-right";
  if (rtl) {
    rtlClass = "slickNextRtl";
  }
  return (
    <div
      className={css(className, classes[dynamicClass], classes[rtlClass])}
      onClick={onClick}
      role="presentation"
    >
      {nextArrowIcon ? (
        <NextArrowIconCust classes={classes} nextArrowIcon={nextArrowIcon} />
      ) : (
        <Icon className={css(classes.customNext)} iconName={iconName} />
      )}
    </div>
  );
}
function NextArrowIconCust(props) {
  const { classes, nextArrowIcon } = props;
  return typeof nextArrowIcon === "string" ? (
    <Icon className={css(classes.customNext)} iconName={nextArrowIcon} />
  ) : (
    nextArrowIcon
  );
}
NextArrowIconCust.propTypes = {
  classes: PropTypes.object.isRequired,
  nextArrowIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

NextArrow.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  rtl: PropTypes.bool,
  nextArrowIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
export default WithTheme(NextArrow, styles)();
