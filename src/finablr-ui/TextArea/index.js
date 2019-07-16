import React, { Component } from "react";
import PropTypes from "prop-types";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import styles from "./styles/style";
import { css } from "../utils";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { isEmpty, isVaildByRegex } from "../Input/validation";

class TextArea extends Component {
  constructor(props) {
    super(props);
    const {
      value,
      errorState,
      // minLength,
      maxLength,
    } = props;
    const valueData = value || "";
    const trimmedValue = valueData.trim().length;
    const dataValue = trimmedValue > maxLength ? valueData.substring(0, maxLength) : valueData;
    // const newValueCnt = dataValue.length;
    this.state = {
      value: dataValue,
      error: errorState,
      charCount: dataValue.length,
      minMaxError: false, //! !(minLength > newValueCnt || newValueCnt > maxLength),
      PreviousValue: value, // eslint-disable-line
      PreviousError: errorState,// eslint-disable-line
    };
  }

  onChangeInput = e => {
    const { onChange, InputProps, minLength, maxLength } = this.props;
    const { value } = e.target;
    const trimmedValue = value.toString().trim().length;
    const newValue = trimmedValue > maxLength ? value.substring(0, maxLength) : value;
    this.setState({
      value: newValue,
      charCount: newValue.length,
      minMaxError: !!(minLength > newValue.length),
    });
    if (onChange) onChange(newValue);
    if (InputProps) {
      const { onChange: change } = InputProps;
      if (change) change(newValue);
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
    this.onChangeInput(e);
    if (onFocus) onFocus(e);
    if (InputProps) {
      const { onFocus: focus } = InputProps;
      if (focus) focus(e);
    }
  };

  static getDerivedStateFromProps(props, state) {
    const { PreviousValue, PreviousError } = state;
    const newState = {};
    const { value, errorState, maxLength } = props;
    if (PreviousValue !== value) {
      const valueData = value || "";
      const trimmedValue = valueData.trim().length;
      const dataValue = trimmedValue > maxLength ? valueData.substring(0, maxLength) : valueData;
      newState.value = dataValue;
      newState.charCount = newState.value.length;
    }
    if (PreviousError !== errorState) {
      newState.error = errorState;
    }

    return Object.keys(newState).length > 0 ? newState : null;
  }

  checkValidation() {
    const { isRequired, onError, regex } = this.props;
    const { value } = this.state;

    if (isEmpty(value)) {
      if (regex) {
        if (isVaildByRegex(value, regex)) {
          if (onError) onError("regex", value);
          this.setState({ error: true });
        }
      }
    } else if (isRequired) {
      if (onError) onError("required", value);
      this.setState({ error: true });
    }
  }

  render() {
    const {
      classes,
      onChange,
      showCount,
      charText,
      boxtype,
      style,
      rows,
      autoHeight,
      isRequired,
      umClass,
      isEnabled,
      label,
      rtl,
      errorState,
      ...others
    } = this.props;
    const { charCount, value, error, minMaxError } = this.state;
    return (
      <FormControl className={css(classes.FormControlClass, classes.textBox)}>
        <TextField
          {...others}
          disabled={!isEnabled}
          label={!boxtype ? label : undefined}
          error={error}
          InputProps={{
            classes: {
              root: css(classes.root, { [classes.disabled]: !isEnabled }),
              input: classes.input,
              underline: classes.underline,
            },
          }}
          className={css(
            umClass,
            { [classes.textBoxHover]: !boxtype && isEnabled },
            { [classes.boxtwo]: boxtype },
            { [classes.boxtwoHover]: boxtype && isEnabled },
            { [classes.errorBox]: error && boxtype }
          )}
          onChange={this.onChangeInput}
          onBlur={this.onBlurInput}
          onFocus={this.onFocusInput}
          value={value}
          rows={autoHeight ? undefined : rows}
          multiline
          required={isRequired}
        />
        {showCount && (
          <FormHelperText
            className={css(
              classes.helperText,
              { [classes.error]: minMaxError },
              { [classes.notDisabled]: isEnabled }
            )}
          >
            {!rtl ? `${charCount} ${charText}` : `${charText} ${charCount}`}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
}
TextArea.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  showCount: PropTypes.bool,
  charText: PropTypes.string,
  boxtype: PropTypes.bool,
  style: PropTypes.object,
  autoHeight: PropTypes.bool,
  errorState: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  InputProps: PropTypes.object,
  onFocus: PropTypes.func,
  onError: PropTypes.func,
  isRequired: PropTypes.bool,
  regex: PropTypes.object,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  umClass: PropTypes.string,
  isEnabled: PropTypes.bool,
  rtl: PropTypes.bool,
  label: PropTypes.string,
};

TextArea.defaultProps = {
  rows: 4,
  showCount: true,
  charText: "Chars",
  autoHeight: false,
  isEnabled: true,
  rtl: false,
};
export default WithThemeMaterial(styles)(TextArea);
