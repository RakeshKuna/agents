import React from "react";
import PropTypes from "prop-types";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css } from "../utils";
import styles from "./styles/Handle";

// *******************************************************
// HANDLE COMPONENT
// *******************************************************

const Handle = ({
  classes,
  domain: [min, max],
  handle: { id, value, percent },
  getHandleProps,
  isVertical,
  hasTooltip,
  showTooltipBg,
  showAlwaysTooltip,
  isEnabled,
}) => (
  <div
    role="slider"
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuenow={value}
    className={css(
      classes.handleRoot,
      classes.handlePsuedo,
      { [classes.handleDisabled]: !isEnabled },
      { [classes.handle]: isEnabled }
    )}
    style={{
      left: !isVertical && `${percent}%`,
      top: isVertical && `${percent}%`,
    }}
    {...getHandleProps(id)}
  >
    {(hasTooltip || showAlwaysTooltip) && (
      <div
        className={css(
          "slider-tooltip",
          classes.tooltipRoot,
          { [classes.tooltip]: showTooltipBg },
          { [classes.tooltipNoBg]: !showTooltipBg }
        )}
      >
        {value}
      </div>
    )}
  </div>
);

Handle.propTypes = {
  classes: PropTypes.object.isRequired,
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  isVertical: PropTypes.bool,
  hasTooltip: PropTypes.bool,
  isEnabled: PropTypes.bool,
  showTooltipBg: PropTypes.bool,
  showAlwaysTooltip: PropTypes.bool,
};

Handle.defaultProps = {
  isVertical: false,
  hasTooltip: false,
  isEnabled: true,
  showTooltipBg: true,
  showAlwaysTooltip: false,
};

export default WithThemeMaterial(styles)(Handle);
