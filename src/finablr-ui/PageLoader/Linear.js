import React from "react";
import PropTypes from "prop-types";
import MDLinearProgress from "@material-ui/core/LinearProgress";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import styles from "./styles/Linear";
import { css } from "../utils";

const formatPercentage = (value, rtl) => (rtl ? `%${value}` : `${value}%`);
const getValue = value => (value > 100 ? 100 : value);

const LinearProgress = ({
  classes,
  value,
  size,
  trackColor,
  pathColor,
  showPercentage,
  percentage,
  stripes,
  rtl,
  style,
  umStyle,
  umClass,
  className,
  ...others
}) => (
  <div className={css(classes.root, umClass)}>
    <MDLinearProgress
      classes={{
        bar: classes.bar,
        root: classes.rootBar,
        bar1Determinate: css({
          [classes.progress]: true,
          [classes.colorPrimary]: umStyle === "primary",
          [classes.colorSecondary]: umStyle === "secondary",
        }),
      }}
      className={css({
        [classes.stripes]: stripes,
        className,
      })}
      variant="determinate"
      value={getValue(value)}
      {...others}
    />
    {showPercentage && (
      <span className={css(classes.percentage)}>{percentage(getValue(value), rtl)}</span>
    )}
  </div>
);
LinearProgress.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  size: PropTypes.number,
  trackColor: PropTypes.string,
  pathColor: PropTypes.string,
  showPercentage: PropTypes.bool,
  percentage: PropTypes.func,
  stripes: PropTypes.bool,
  rtl: PropTypes.bool,
  style: PropTypes.object,
  umStyle: PropTypes.oneOf(["primary", "secondary"]),
  umClass: PropTypes.string,
  className: PropTypes.string,
};

LinearProgress.defaultProps = {
  size: 5,
  trackColor: "#ccc",
  showPercentage: false,
  percentage: formatPercentage,
  stripes: false,
  rtl: false,
  umStyle: "primary",
};

export default WithThemeMaterial(styles)(LinearProgress);
