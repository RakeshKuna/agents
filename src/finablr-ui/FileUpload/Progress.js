import React from "react";
import PropTypes from "prop-types";

import WithTheme from "../utils/HOC/WithTheme";
import { css } from "../utils";
import { CircularProgress, LinearProgress } from "../PageLoader";
import styles from "./styles/Progress";

const Progress = ({ classes, type, ...otherParams }) => {
  const Component = type === "bar" ? LinearProgress : CircularProgress;
  return <Component className={css({ [classes.circle]: type === "circle" })} {...otherParams} />;
};

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(["bar", "circle"]),
};

export default WithTheme(Progress, styles)();
