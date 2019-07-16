import React, { Component } from "react";
import PropTypes from "prop-types";
import InputField from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import styles from "./styles/style";
import { css } from "../utils";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import EndAdornmentComponent from "./EndAdornmentComponent";

import {
  isEmpty,
  isNumeric,
  isTextEqual,
  isDecimal,
  roundOffinteger,
  isEmail,
  isAlpha,
  isAlphaNumeric,
  isVaildByRegex,
} from "./validation";

const mappedType = {
  freeText: "text",
  password: "password",
  numeric: "number",
  alphaNumeric: "text",
  alpha: "text",
  decimal: "number",
  email: "text",
  text: "text",
};

class Input extends Component {
  constructor(props) {
    super(props);
    const { value, errorState, maxLength } = props;
    const valueData = value || "";
    const dataValue = valueData.length > maxLength ? valueData.substring(0, maxLength) : valueData;
    this.state = {
      value: dataValue || "",
      error: errorState,
      showPassword: false,
      PreviousValue: value, // eslint-disable-line
      PreviousError: errorState // eslint-disable-line
    };
  }

  onChangeInput = e => {
    const { onChange, InputProps, type, charValidate } = this.props;
    const value = e !== null && e.target ? e.target.value : e;
    const { error: isError } = charValidate ? this.validationProperty(value, e) : { error: false };
    if (isError) {
      if (type !== "email") return;
    }
    this.setState({ value, error: isError });
    if (onChange) onChange(e, value);
    if (InputProps) {
      const { onChange: change } = InputProps;
      if (change) change(e, value);
    }
  };

  onBlurInput = e => {
    const { onBlur, InputProps } = this.props;

    this.checkValidation(e);
    if (onBlur) onBlur(e);
    if (InputProps) {
      const { onBlur: blur } = InputProps;
      if (blur) blur(e);
    }
  };

  onFocusInput = e => {
    const { onFocus, InputProps } = this.props;

    this.setState({ error: false });
    if (onFocus) onFocus(e);
    if (InputProps) {
      const { onFocus: focus } = InputProps;
      if (focus) focus(e);
    }
  };

  static getDerivedStateFromProps(props, state) {
    const { PreviousValue, PreviousError } = state;
    const newState = {};
    const { value, errorState } = props;
    if (PreviousValue !== value) {
      newState.value = value;
    }
    if (PreviousError !== errorState) {
      newState.error = errorState;
    }
    return Object.keys(newState).length > 0 ? newState : null;
  }

  togglePassWordIcon = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  validationProperty = (value, e) => {
    const { regex, type, roundOff, decimalChar, onChange, isRequired, roundOffType } = this.props;
    let typeReturn = type;
    let isError;
    if (isRequired && isEmpty(value)) {
      isError = true;
      return { error: isError, type: "required" };
    }
    if (isEmpty(value)) {
      return { error: isError, type: "empty" };
    }

    if (regex) {
      if (isVaildByRegex(value, regex)) {
        isError = true;
        typeReturn = "regex";
      }
    } else {
      switch (type) {
        case "numeric":
          isError = isNumeric(value);
          break;
        case "email":
          isError = isEmail(value);
          this.setState({ error: isError });
          break;
        case "alpha":
          isError = isAlpha(value);
          break;
        case "alphaNumeric":
          isError = isAlphaNumeric(value);
          break;
        case "decimal": // eslint-disable-line
          isError = isDecimal(value);
          const roundoffPos = roundOff !== undefined ? roundOff : decimalChar + 1;
          if (!isError && decimalChar !== undefined && roundoffPos !== undefined) {
            const newValue = roundOffinteger(value, roundoffPos, decimalChar, roundOffType);
            if (onChange) {
              onChange(e, newValue);
            }
            this.setState({ value: newValue });
          }
          break;
        default:
          break;
      }
    }
    return { error: isError, type: typeReturn };
  };

  checkValidation(e) {
    const { type, onError, minLength, min, max } = this.props;

    const { value } = this.state;

    let { error: isError, type: errorType } = this.validationProperty(value, e);

    if (minLength && value.length < minLength) {
      isError = true;
      errorType = "minLength";
    }
    if (type === "numeric") {
      if (min && value < min) {
        isError = true;
        errorType = "min";
      } else if (max && value > max) {
        isError = true;
        errorType = "max";
      }
    }

    if (isError) {
      if (onError) onError(errorType, value);
      this.setState({ error: true });
    }
  }

  InputEndAdornmentComponent() {
    const { type, classes, icon, iconClick, hasPreviewPassword } = this.props;
    const { showPassword } = this.state;
    if (isTextEqual(type, "password") && hasPreviewPassword) {
      return (
        <EndAdornmentComponent
          parentClass={classes.hover}
          iconName={!showPassword ? "eye-off" : "eye"}
          className={css(classes.rightIconcss, "mdi-24px")}
          onClick={this.togglePassWordIcon}
          onMouseUp={this.togglePassWordIcon}
        />
      );
    }
    if (icon !== undefined) {
      return (
        <EndAdornmentComponent
          parentClass={classes.hover}
          iconName={icon}
          className={css(classes.rightIconcss, "mdi-24px")}
          onClick={iconClick}
          onMouseUp={iconClick}
        />
      );
    }
    return null;
  }

  render() {
    const { value, error, showPassword } = this.state;
    const {
      classes,
      type,
      isRequired,
      label,
      id,
      umClass,
      onChange,
      roundOff,
      decimalChar,
      onFocus,
      onBlur,
      icon,
      iconStyle,
      iconClick,
      value: propValue,
      regex,
      boxtype,
      isEnabled,
      rtl,
      errorState,
      onChange: propChange,
      onFocus: propFocus,
      onBlur: propBlur,
      InputProps,
      hasPreviewPassword,
      style,
      isSelectable,
      inputRef,
      charValidate,
      inputStyle,
      disableUnderline,
      roundOffType,
      ...others
    } = this.props;
    return (
      <FormControl className={css(classes.FormControlClass)}>
        {label &&
          !boxtype && (
            <InputLabel
              htmlFor={id}
              className={rtl ? classes.labelClassRTL : classes.labelClass}
              FormLabelClasses={{
                root: classes.labelRoot,
                focused: classes.labelFocused,
                disabled: classes.labelDisabled,
                error: classes.labelError,
                asterisk: classes.asterisk,
              }}
            >
              {label}
            </InputLabel>
          )}
        <InputField
          error={error}
          ref={inputRef}
          required={isRequired}
          disableUnderline={disableUnderline || boxtype}
          type={type === "password" && showPassword ? "text" : mappedType[type]}
          value={value}
          className={css(
            umClass,
            classes.textBox,
            { [classes.textBoxtypeTwo]: boxtype },
            { [classes.disabled]: !isEnabled },
            { [classes.error]: error }
          )}
          classes={{
            root: css(
              classes.root,
              { [classes.rootTwoCustom]: boxtype },
              { [classes.rootTwo]: boxtype },
              { [classes.rootHover]: boxtype && isEnabled },
              { [classes.rootTwoError]: boxtype && error }
            ),
            input: css({ [classes.inputTypeTwo]: boxtype }, classes.input),
            underline: classes.underline,
            focused: css({ [classes.focused]: boxtype }),
          }}
          endAdornment={this.InputEndAdornmentComponent()}
          label={label}
          id={id}
          {...InputProps}
          {...(isSelectable ? others : { inputProps: others })}
          disabled={!isEnabled}
          onChange={e => this.onChangeInput(e)}
          onFocus={e => this.onFocusInput(e)}
          onBlur={e => this.onBlurInput(e)}
        />
      </FormControl>
    );
  }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRequired: PropTypes.bool,
  roundOff: PropTypes.number,
  decimalChar: PropTypes.number,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  isEnabled: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  iconClick: PropTypes.func,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  iconStyle: PropTypes.object,
  regex: PropTypes.object,
  type: PropTypes.oneOf(Object.keys(mappedType)),
  boxtype: PropTypes.bool,
  rtl: PropTypes.bool,
  onError: PropTypes.func,
  errorState: PropTypes.bool,
  hasPreviewPassword: PropTypes.bool,
  InputProps: PropTypes.object,
  style: PropTypes.object,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  isSelectable: PropTypes.bool,
  inputRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  charValidate: PropTypes.bool,
  inputStyle: PropTypes.object,
  disableUnderline: PropTypes.bool,
  roundOffType: PropTypes.oneOf(["floor", "ceil", "round"]),
};

Input.defaultProps = {
  type: "freeText",
  isRequired: false,
  boxtype: false,
  rtl: false,
  errorState: false,
  isEnabled: true,
  hasPreviewPassword: true,
  isSelectable: false,
  charValidate: false,
  inputStyle: {},
  disableUnderline: false,
  roundOffType: "round",
};

export default WithThemeMaterial(styles)(Input);
