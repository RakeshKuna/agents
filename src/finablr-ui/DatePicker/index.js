import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import moment from "moment";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MDDatePicker from "material-ui-pickers/DatePicker";
import { MuiThemeProvider } from "@material-ui/core";
import TextField from "../TextField";
import themes from "../utils/theme";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import Icon from "../Icons";

class DatePicker extends PureComponent {
  constructor(props) {
    super(props);
    const { errorState, value } = props;
    this.state = {
      selectedDate: value,
      prevPropDate: value, //eslint-disable-line
      previousError: errorState, //eslint-disable-line
      error: errorState,
    };
  }

  onBlur = () => {
    const { selectedDate } = this.state;
    if (selectedDate === null) {
      this.setState({ error: true });
    }
  };

  onInputChange = e => {
    const { format } = this.props;
    const date = moment(e.target.value, format, true);
    if (date.isValid()) {
      this.setState({ selectedDate: date.toDate() });
    }
  };

  static getDerivedStateFromProps(props, state) {
    const { previousError, prevPropDate } = state;
    let newState = {};
    const { value: currentPropDate, errorState, locale } = props;
    moment.locale(locale);
    let prevPropDateUnix = prevPropDate;
    if (prevPropDate instanceof Date) {
      prevPropDateUnix = moment(prevPropDate).unix();
    }
    let currentPropDateUnix = currentPropDate;
    if (currentPropDate instanceof Date) {
      currentPropDateUnix = moment(currentPropDate).unix();
    }

    if (prevPropDateUnix !== currentPropDateUnix) {
      newState = { selectedDate: currentPropDate, prevPropDate: currentPropDate };
    }

    if (previousError !== errorState) {
      newState.error = errorState;
    }

    return Object.keys(newState).length > 0 ? newState : null;
  }

  handleDateChange = date => {
    const { onChange: onChange = () => {} } = this.props;
    this.setState({ selectedDate: date.toDate() });
    onChange(date.toDate());
  };

  render() {
    const {
      label,
      boxtype,
      placeholder,
      isEnabled,
      cancelLabel,
      okLabel,
      format,
      onOpen,
      onClose,
      isRequired,
      rtl,
      value,
      onError,
      errorState,
      inputProps,
      locale,
      onChange,
      id,
      ...other
    } = this.props;
    const { selectedDate, error } = this.state;
    const childProps = {
      boxtype,
      isRequired,
      errorState: error,
      rtl,
      id,
      label: !boxtype ? label : "",
      onBlur: e => this.onBlur && this.onBlur(e),
      ...inputProps,
    };
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} locale={locale} moment={moment}>
        <MuiThemeProvider theme={themes}>
          <MDDatePicker
            value={selectedDate}
            onChange={this.handleDateChange}
            TextFieldComponent={TextField}
            leftArrowIcon={
              rtl ? <Icon iconName="chevron-right" /> : <Icon iconName="chevron-left" />
            }
            rightArrowIcon={
              rtl ? <Icon iconName="chevron-left" /> : <Icon iconName="chevron-right" />
            }
            format={format}
            placeholder={placeholder}
            fullWidth
            disabled={!isEnabled}
            inputProps={{ isEnabled, ...childProps }}
            cancelLabel={cancelLabel}
            okLabel={okLabel}
            onInputChange={this.onInputChange}
            onOpen={e => onOpen && onOpen(e)}
            onClose={e => onClose && onClose(e)}
            onError={e => onError && onError(e)}
            {...other}
          />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

DatePicker.propTypes = {
  inputProps: PropTypes.object,
  boxtype: PropTypes.bool,
  isEnabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  errorState: PropTypes.bool,
  rtl: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  cancelLabel: PropTypes.string,
  id: PropTypes.string,
  locale: PropTypes.string,
  okLabel: PropTypes.string,
  format: PropTypes.string,
  onOpen: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onError: PropTypes.func,
  value: PropTypes.object,
};

DatePicker.defaultProps = {
  boxtype: false,
  isEnabled: true,
  isRequired: false,
  rtl: false,
  errorState: false,
  cancelLabel: "Cancel",
  okLabel: "Ok",
  format: "DD/MM/YYYY",
  value: null,
};

export default WithThemeMaterial()(DatePicker);
