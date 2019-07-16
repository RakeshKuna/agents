import React from "react";
import PropTypes from "prop-types";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css } from "../utils";

import styles from "./styles/Track";

const Track = ({ classes, source, target, getTrackProps, isEnabled, isVertical }) => (
  <div
    className={css(
      classes.trackRoot,
      { [classes.trackDisabled]: !isEnabled },
      { [classes.track]: isEnabled }
    )}
    style={{
      left: !isVertical && `${source.percent}%`,
      width: !isVertical && `${target.percent - source.percent}%`,
      top: isVertical && `${source.percent}%`,
      height: isVertical && `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);

Track.propTypes = {
  classes: PropTypes.object.isRequired,
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool,
  isVertical: PropTypes.bool,
};
Track.defaultProps = {
  isEnabled: true,
  isVertical: false,
};

export default WithThemeMaterial(styles)(Track);
