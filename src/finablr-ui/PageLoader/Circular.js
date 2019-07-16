import React from "react";
import PropTypes from "prop-types";
import CircularProgressbar from "react-circular-progressbar";

import WithTheme from "../utils/HOC/WithTheme";
import { css } from "../utils";
import styles from "./styles/Circular";

const formatPercentage = (value, rtl) => (rtl ? `%${value}` : `${value}%`);
const getValue = value => (value > 100 ? 100 : value);

const CircularProgress = ({
  classes,
  value,
  strokeWidth,
  showPercentage,
  percentage,
  rtl,
  style,
  umStyle,
  umClass,
  id,
  ...others
}) => (
  <div id={id} className={css(classes.root, umClass)}>
    <CircularProgressbar
      classes={{
        root: classes.progressRoot,
        trail: classes.trail,
        path: css({
          [classes.path]: true,
          [classes.colorPrimary]: umStyle === "primary",
          [classes.colorSecondary]: umStyle === "secondary",
        }),
        text: classes.text,
        background: classes.background,
      }}
      strokeWidth={strokeWidth}
      text={showPercentage && percentage(getValue(value), rtl)}
      percentage={getValue(value)}
      counterClockwise={!!rtl}
      {...others}
    />
  </div>
);

CircularProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  value: PropTypes.number,
  size: PropTypes.number,
  showPercentage: PropTypes.bool,
  percentage: PropTypes.func,
  strokeWidth: PropTypes.number,
  trackColor: PropTypes.string,
  pathColor: PropTypes.string,
  rtl: PropTypes.bool,
  style: PropTypes.object,
  umStyle: PropTypes.oneOf(["primary", "secondary"]),
  textStyle: PropTypes.object,
  umClass: PropTypes.string,
};

CircularProgress.defaultProps = {
  value: 0,
  showPercentage: false,
  percentage: formatPercentage,
  strokeWidth: 8,
  rtl: false,
  umStyle: "primary",
};

export default WithTheme(CircularProgress, styles)({});
