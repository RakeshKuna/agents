import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import styles from "./styles/style";
import { css } from "../utils";

const RadioButton = props => {
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
        <Radio
          checked={isChecked}
          color={umStyle}
          className={css(classes.radiobox, umClass)}
          classes={{
            root: classes.root,
            checked: classes.checked,
            disabled: classes.disabled,
            colorPrimary: classes.colorPrimary,
            colorSecondary: classes.colorSecondary,
          }}
          disabled={!isEnabled}
          onChange={onChange}
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
    <Radio
      checked={isChecked}
      color={umStyle}
      className={css(classes.radiobox, umClass)}
      classes={{
        root: classes.root,
        checked: classes.checked,
        disabled: classes.disabled,
        colorPrimary: classes.colorPrimary,
        colorSecondary: classes.colorSecondary,
      }}
      disabled={!isEnabled}
      onChange={onChange}
      {...otherParam}
    />
  );
};

RadioButton.propTypes = {
  classes: PropTypes.object.isRequired,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  isEnabled: PropTypes.bool,
  rtl: PropTypes.bool,
  onChange: PropTypes.func,
  style: PropTypes.object,
  umClass: PropTypes.string,
  umLabelClass: PropTypes.string,
  umStyle: PropTypes.oneOf(["primary", "secondary", "default", "disabled"]),
};

RadioButton.defaultProps = {
  isEnabled: true,
  label: "",
  rtl: false,
  umStyle: "primary",
  umClass: "",
  style: {},
};

export default WithThemeMaterial(styles)(RadioButton);
