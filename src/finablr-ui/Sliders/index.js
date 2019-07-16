import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import Handle from "./Handle";
import Track from "./Track";
import Tick from "./Tick";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css, emptyFunction } from "../utils";

import styles from "./styles/Root";

class Sliders extends PureComponent {
  constructor(props) {
    super(props);
    const { hasTooltip, showAlwaysTooltip } = this.props;
    this.state = {
      showTooltip: hasTooltip,
      PreviousShowTooltip: hasTooltip, //eslint-disable-line
      showAlwaysTooltip, //eslint-disable-line
      PreviousshowAlwaysTooltip: showAlwaysTooltip, //eslint-disable-line
    };
  }

  onSlideStart = () => {
    const { hasTooltip, showAlwaysTooltip } = this.props;
    if (hasTooltip && !showAlwaysTooltip) {
      this.setState({ showTooltip: true });
    }
  };

  onBeforeChange = value => {
    const { onBeforeChange: onBeforeChange = emptyFunction, hasTooltip } = this.props;
    const { showTooltip } = this.state;
    if (hasTooltip && showTooltip) {
      this.setState({ showTooltip: false });
    }
    onBeforeChange(value);
  };

  static getDerivedStateFromProps(props, state) {
    const { PreviousShowTooltip, PreviousshowAlwaysTooltip } = state;
    const newState = {};
    const { hasTooltip, showAlwaysTooltip } = props;
    if (PreviousShowTooltip !== hasTooltip) {
      newState.showTooltip = hasTooltip;
    }
    if (PreviousshowAlwaysTooltip !== showAlwaysTooltip) {
      newState.showAlwaysTooltip = showAlwaysTooltip;
    }
    return Object.keys(newState).length > 0 ? newState : null;
  }

  render() {
    const { showTooltip } = this.state;

    const {
      classes,
      sliderId,
      min,
      max,
      marks,
      pushable,
      step,
      handle: HandleComponent,
      isVertical,
      isEnabled,
      onBeforeChange,
      track: TrackComponent,
      tick: TickComponent,
      rtl,
      allowCross,
      showTooltipBg,
      showAlwaysTooltip,
      mode,
      umClass,
      values,
      ...others
    } = this.props;

    let modeType;

    switch (mode) {
      case "pushable":
        modeType = 3;
        break;
      case "noAllowCross":
        modeType = 2;
        break;
      case "allowCross":
      default:
        modeType = 1;
        break;
    }

    const domain = [min, max];

    return (
      <div id={sliderId} className={umClass}>
        <Slider
          mode={modeType}
          reversed={rtl}
          vertical={isVertical}
          step={step}
          domain={domain}
          className={css(classes.root, !isEnabled && classes.disabled)}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          onSlideEnd={this.onBeforeChange}
          onSlideStart={this.onSlideStart}
          values={values.slice()}
          {...others}
        >
          <Rail>
            {({ getRailProps }) => (
              <div
                className={css(
                  classes.railRoot,
                  { [classes.rail]: isEnabled },
                  { [classes.railDisabled]: !isEnabled }
                )}
                {...getRailProps()}
              />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(({ id, value, percent }) => {
                  const config = {
                    key: id,
                    handle: { id, value, percent },
                    getHandleProps,
                    isVertical,
                    domain,
                    isEnabled,
                    hasTooltip: showTooltip,
                    showTooltipBg,
                    showAlwaysTooltip,
                  };
                  return <HandleComponent {...config} />;
                })}
              </div>
            )}
          </Handles>
          <Tracks left={!(values.length > 1)} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, ...params }) => {
                  const config = {
                    ...params,
                    key: id,
                    getTrackProps,
                    isEnabled,
                    isVertical,
                    rtl,
                  };
                  return <TrackComponent {...config} />;
                })}
              </div>
            )}
          </Tracks>
          <Ticks count={marks}>
            {({ ticks }) =>
              marks > 0 && (
                <div className="slider-ticks">
                  {ticks.map(({ id, value, percent }) => {
                    const config = {
                      key: id,
                      tick: { id, value, percent },
                      ticks,
                      count: marks,
                      isVertical,
                    };
                    return <TickComponent {...config} />;
                  })}
                </div>
              )
            }
          </Ticks>
        </Slider>
      </div>
    );
  }
}

Sliders.propTypes = {
  classes: PropTypes.object.isRequired,
  sliderId: PropTypes.string,
  umClass: PropTypes.string,
  mode: PropTypes.oneOf(["allowCross", "noAllowCross", "pushable"]),
  min: PropTypes.number,
  max: PropTypes.number,
  marks: PropTypes.number,
  step: PropTypes.number,
  values: PropTypes.array,
  pushable: PropTypes.bool,
  isVertical: PropTypes.bool,
  isEnabled: PropTypes.bool,
  rtl: PropTypes.bool,
  hasTooltip: PropTypes.bool,
  showTooltipBg: PropTypes.bool,
  allowCross: PropTypes.bool,
  showAlwaysTooltip: PropTypes.bool,
  handle: PropTypes.func,
  onBeforeChange: PropTypes.func,
  onChange: PropTypes.func,
  track: PropTypes.func,
  tick: PropTypes.func,
};

Sliders.defaultProps = {
  min: 0,
  max: 100,
  values: [0],
  marks: 0,
  step: 1,
  isVertical: false,
  pushable: false,
  isEnabled: true,
  rtl: false,
  hasTooltip: false,
  showTooltipBg: true,
  allowCross: true,
  showAlwaysTooltip: false,
  mode: "allowCross",
  handle: Handle,
  track: Track,
  tick: Tick,
};

export default WithThemeMaterial(styles)(Sliders);
