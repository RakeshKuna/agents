import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import moment from "moment";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import MDTimePicker from "material-ui-pickers/TimePicker";
import { MuiThemeProvider } from "@material-ui/core";
import TextField from "../TextField";
// import styles from "./styles/style";
import themes from "../utils/theme";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";

class TimePicker extends PureComponent {
  constructor(props) {
    super(props);
    const { errorState, value } = props;
    this.state = {
      selectedDate: value,
      prevPropDate: value, //eslint-disable-line
      previousError: errorState, //eslint-disable-line
      error: errorState,
    };
    this.handleDateChange = this.handleDateChange.bind(this);
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
    const localeUpdate = locale === "ar" ? "en" : locale;
    moment.locale(localeUpdate);
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

  // static getDerivedStateFromProps(props, state) {
  //   const { selectedDate, error } = state;
  //   const newState = {};
  //   const { value, errorState } = props;
  //   const formattedValue = moment(value).format();
  //   const formattedDate = moment(selectedDate).format();
  //   if (formattedDate !== formattedValue) {
  //     newState.selectedDate = formattedDate;
  //   }
  //   if (error !== errorState) {
  //     newState.error = errorState;
  //   }
  //   return Object.keys(newState).length > 0 ? newState : null;
  // }

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
      is24hrs,
      showSeconds,
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
          <MDTimePicker
            ampm={!is24hrs}
            seconds={showSeconds}
            value={selectedDate}
            onChange={this.handleDateChange}
            TextFieldComponent={TextField}
            format={format}
            placeholder={placeholder}
            fullWidth
            disabled={!isEnabled}
            inputProps={{ isEnabled, ...childProps }}
            cancelLabel={cancelLabel}
            okLabel={okLabel}
            onOpen={e => onOpen && onOpen(e)}
            onClose={e => onClose && onClose(e)}
            onError={e => onError && onError(e)}
            onInputChange={this.onInputChange}
            {...other}
          />
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }
}

TimePicker.propTypes = {
  inputProps: PropTypes.object,
  value: PropTypes.any,
  boxtype: PropTypes.bool,
  isEnabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  errorState: PropTypes.bool,
  is24hrs: PropTypes.bool,
  showSeconds: PropTypes.bool,
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
};

TimePicker.defaultProps = {
  boxtype: false,
  isEnabled: true,
  isRequired: false,
  rtl: false,
  errorState: false,
  cancelLabel: "Cancel",
  okLabel: "Ok",
  format: "hh:mm A",
  value: null,
  is24hrs: false,
  showSeconds: false,
};

export default WithThemeMaterial()(TimePicker);
