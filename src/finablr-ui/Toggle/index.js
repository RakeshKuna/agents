import React from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";
import styles from "./styles/style";
import { css } from "../utils";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";

const Toggle = props => {
  const {
    classes,
    umClass,
    umStyle,
    isChecked,
    isEnabled,
    onChange,
    label,
    umLabelClass,
    rtl,
    ...otherParam
  } = props;
  const iconClass = {};
  if (rtl) {
    iconClass.icon = classes.icon;
    iconClass.iconChecked = classes.iconChecked;
  }

  let showSwitchBase = false;
  if (umStyle === "default") {
    showSwitchBase = true;
  }

  const toggle = (
    <Switch
      checked={isChecked}
      className={css(classes.toggle, umClass)}
      color={umStyle}
      disabled={!isEnabled}
      onChange={onChange}
      classes={{
        root: classes.root,
        checked: classes.checked,
        switchBase: css({ [classes.switchBase]: showSwitchBase }),
        bar: classes.bar,
        disabled: classes.disabled,
        colorPrimary: classes.colorPrimary,
        colorSecondary: classes.colorSecondary,
        ...iconClass,
      }}
      {...otherParam}
    />
  );

  return label ? (
    <FormControlLabel
      control={toggle}
      label={label}
      className={css(classes.isRtl)}
      classes={{
        label: umLabelClass,
      }}
    />
  ) : (
    toggle
  );
};

Toggle.propTypes = {
  classes: PropTypes.object.isRequired,
  style: PropTypes.object,
  umClass: PropTypes.string,
  label: PropTypes.string,
  umLabelClass: PropTypes.string,
  labelPlacement: PropTypes.oneOf(["start", "end"]),
  umStyle: PropTypes.oneOf(["primary", "secondary", "default"]),
  isChecked: PropTypes.bool,
  isEnabled: PropTypes.bool,
  onChange: PropTypes.func,
  rtl: PropTypes.bool,
};

Toggle.defaultProps = {
  umStyle: "primary",
  umClass: "",
  umLabelClass: "",
  label: "",
  style: {},
  isEnabled: true,
  rtl: false,
};

// export default Toggle;
export default WithThemeMaterial(styles)(Toggle);
