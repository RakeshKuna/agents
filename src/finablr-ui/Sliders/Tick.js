import React from "react";
import PropTypes from "prop-types";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import styles from "./styles/Tick";

const Tick = ({ classes, tick, count, format, isVertical }) => (
  <div id={tick.id}>
    <div
      id={`${tick.id}-mark`}
      className={classes.tickMark}
      style={{
        left: !isVertical && `${tick.percent}%`,
        top: isVertical && `${tick.percent}%`,
      }}
    />
    <div
      id={`${tick.id}-value`}
      className={classes.tickValue}
      style={{
        marginLeft: `${-(100 / count) / 2}%`,
        width: `${100 / count}%`,
        left: !isVertical && `${tick.percent}%`,
        top: isVertical && `${tick.percent}%`,
      }}
    >
      {format(tick.value)}
    </div>
  </div>
);

Tick.propTypes = {
  classes: PropTypes.object.isRequired,
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func,
  isVertical: PropTypes.bool,
};

Tick.defaultProps = {
  format: d => d,
  isVertical: false,
};

export default WithThemeMaterial(styles)(Tick);
