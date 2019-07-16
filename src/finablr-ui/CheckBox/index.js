import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import styles from "./styles/style";
import { css } from "../utils";

const CheckBox = props => {
  const {
    classes,
    umClass,
    umStyle,
    label,
    isEnabled,
    onChange,
    isChecked,
    umLabelClass,
    rtl,
    ...otherParam
  } = props;

  return label ? (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          color={umStyle}
          className={css(classes.checkbox, umClass)}
          disabled={!isEnabled}
          onChange={onChange}
          classes={{
            root: classes.root,
            checked: classes.checked,
            disabled: classes.disabled,
            colorPrimary: classes.colorPrimary,
            colorSecondary: classes.colorSecondary,
          }}
          {...otherParam}
        />
      }
      label={label}
      className={css(classes.isRtl)}
      classes={{
        label: umLabelClass,
      }}
    />
  ) : (
    <Checkbox
      classes={{
        root: classes.root,
        checked: classes.checked,
        disabled: classes.disabled,
        colorPrimary: classes.colorPrimary,
        colorSecondary: classes.colorSecondary,
      }}
      checked={isChecked}
      color={umStyle}
      className={css(classes.checkbox, umClass)}
      disabled={!isEnabled}
      onChange={onChange}
      {...otherParam}
    />
  );
};

CheckBox.propTypes = {
  classes: PropTypes.object.isRequired,
  isChecked: PropTypes.bool,
  isEnabled: PropTypes.bool,
  label: PropTypes.string,
  rtl: PropTypes.bool,
  onChange: PropTypes.func,
  umStyle: PropTypes.oneOf(["primary", "secondary", "default", "disabled"]),
  umClass: PropTypes.string,
  umLabelClass: PropTypes.string,
  style: PropTypes.object,
};

CheckBox.defaultProps = {
  isEnabled: true,
  label: "",
  rtl: false,
  umStyle: "primary",
  umClass: "",
  style: {},
};

export default WithThemeMaterial(styles)(CheckBox);
