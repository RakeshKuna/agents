import React from "react";
import PropTypes from "prop-types";
import ButtonBase from "@material-ui/core/ButtonBase";
import withStyles from "@material-ui/core/styles/withStyles";
import { css, ucFirst } from "../utils";
import tabStyles, { styles } from "./styles/tabStyle";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";

class TabCmpt extends React.Component {
  label = null;

  state = {
    labelWrapped: false,
  };

  componentDidMount() {
    this.checkTextWrap();
  }

  componentDidUpdate(prevProps, prevState) {
    const labelWrapped = this.state;
    if (labelWrapped === prevState.labelWrapped) {
      this.checkTextWrap();
    }
  }

  handleChange = event => {
    const { onChange, value, onClick } = this.props;

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  checkTextWrap = () => {
    const labelWrapped = this.state;
    if (this.label) {
      const clientLabelWrapped = this.label.getClientRects().length > 1;
      if (labelWrapped !== clientLabelWrapped) {
        this.setState({ labelWrapped: clientLabelWrapped });
      }
    }
  };

  render() {
    const {
      classes,
      className: classNameProp,
      disabled,
      fullWidth,
      icon,
      badge,
      indicator,
      label: labelProp,
      onChange,
      selected,
      textColor,
      value,
      rtl,
      ...other
    } = this.props;

    let label;
    let badgeWrapper;
    let iconWrapper = icon;
    if (badge !== undefined) {
      badgeWrapper = (
        <span
          className={css(
            classes.badgeContainer,
            { [classes.badgeIconLabel]: labelProp && icon && !rtl },
            { [classes.badgeIconLabelRtl]: rtl }
          )}
        >
          {badge}
        </span>
      );
    }
    const showBadgeOnLabel = labelProp && !icon;
    if (labelProp !== undefined) {
      const labelWrapped = this.state;
      label = (
        <span className={classes.labelContainer}>
          <span
            className={css(classes.label, {
              [classes.labelWrapped]: labelWrapped,
            })}
            ref={node => {
              this.label = node;
            }}
          >
            {labelProp}
            {showBadgeOnLabel && badgeWrapper}
          </span>
        </span>
      );
    }
    if (icon !== undefined) {
      iconWrapper = (
        <span className={classes.iconContainer}>
          {icon}
          {badgeWrapper}
        </span>
      );
    }

    const className = css(
      classes.root,
      classes[`textColor${ucFirst(textColor)}`],
      {
        [classes.disabled]: disabled,
        [classes.selected]: selected,
        [classes.labelIcon]: icon && label,
        [classes.fullWidth]: fullWidth,
      },
      classNameProp
    );

    return (
      <ButtonBase
        focusRipple
        className={className}
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        {...other}
        onClick={this.handleChange}
      >
        <span className={classes.wrapper}>
          {iconWrapper}
          {label}
        </span>
        {indicator}
      </ButtonBase>
    );
  }
}
TabCmpt.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  badge: PropTypes.node,
  indicator: PropTypes.node,
  label: PropTypes.node,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  textColor: PropTypes.oneOf(["secondary", "primary", "inherit"]),
  value: PropTypes.any,
  rtl: PropTypes.bool,
};
const TabWithBadgeStyle = withStyles(styles, { name: "MuiTab" })(TabCmpt);

const TabComponent = props => {
  const { label, classes, isEnabled, icon, value, umStyle, rtl, ...otherParams } = props;

  return (
    <TabWithBadgeStyle
      label={label}
      classes={{
        root: classes.root,
        labelIcon: classes.labelIcon,
        textColorInherit: classes.textColorInherit,
        textColorSecondary: classes.textColorSecondary,
        textColorPrimary: classes.textColorPrimary,
        selected: classes.selected,
        disabled: classes.disabled,
        fullWidth: classes.fullWidth,
        wrapper: classes.wrapper,
        label: classes.label,
        labelWrapped: classes.labelWrapped,
        labelContainer: classes.labelContainer,
      }}
      disabled={!isEnabled}
      icon={icon}
      value={value}
      rtl={rtl}
      {...otherParams}
    />
  );
};

TabComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.any,
  label: PropTypes.any,
  isEnabled: PropTypes.bool,
  rtl: PropTypes.bool,
  value: PropTypes.any,
};
TabComponent.defaultProps = {
  isEnabled: true,
};
export default WithThemeMaterial(tabStyles)(TabComponent);
