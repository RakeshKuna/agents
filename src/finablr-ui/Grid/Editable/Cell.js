import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { emptyFunction } from "../../utils";
import EditableSelect from "./Select";

import { Input } from "../../Input";
import Checkbox from "../../CheckBox";
import DatePicker from "../../DatePicker";

const EDITABLE_TYPES = ["text", "numeric", "decimal", "date", "select", "checkbox"];
class Cell extends React.Component {
  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value,
      checked: !!value,
      isDatePickerOpen: false,
      isDecimalEdited: false,
    };
  }

  componentDidMount() {
    /**
     * text, numeric, select, date, checkbox will saved on outside cell click
     * decimal will be saved on the onblur of the input
     */
    global.document.addEventListener("mousedown", this.handleOutsideClick, false);
    global.document.addEventListener("keydown", this.handleEscapeKey, false);
  }

  componentWillUnmount() {
    global.document.removeEventListener("mousedown", this.handleOutsideClick, false);
    global.document.removeEventListener("keydown", this.handleEscapeKey, false);
  }

  onChangeInput = (event, value) => {
    this.setState({ value });
  };

  onChangeSelect = value => {
    this.setState({ value });
  };

  onChangeDate = value => {
    this.setState({ value: value.getTime() });
  };

  onChangeCheckbox = e => {
    const { checked } = e.target;
    this.setState({ checked });
  };

  onInputFocus = e => {
    const { type, editProps: { onFocus = emptyFunction } = {} } = this.props;
    onFocus(e);
    if (type !== "decimal") {
      return;
    }
    this.setState({ isDecimalEdited: true });
  };

  onInputBlur = e => {
    const { type, onSaveEdit, editProps: { onBlur = emptyFunction } = {} } = this.props;
    onBlur(e);
    if (type !== "decimal") {
      return;
    }
    this.setState(prevState => {
      const { value } = prevState;
      onSaveEdit(value);
      return {};
    });
  };

  onDatePickerOpen = () => {
    this.setState({ isDatePickerOpen: true });
  };

  onDatePickerClose = () => {
    this.setState({ isDatePickerOpen: false });
  };

  handleOutsideClick = event => {
    const { type, isEditingNodeClicked, onSaveEdit } = this.props;
    const { value, checked, isDatePickerOpen, isDecimalEdited } = this.state;
    if (isDatePickerOpen || (type === "decimal" && isDecimalEdited)) {
      return;
    }
    if (!isEditingNodeClicked(event)) {
      onSaveEdit(type !== "checkbox" ? value : checked);
    }
  };

  handleEscapeKey = event => {
    const { onCancelEdit } = this.props;
    if (event.keyCode !== 27) {
      return true;
    }
    onCancelEdit();
    return false;
  };

  render() {
    let content;
    const { type, availableOptions, editProps, rtl } = this.props;
    const { value, checked } = this.state;
    switch (type) {
      case "checkbox":
        {
          const checkboxValue = String(value);
          content = (
            <Checkbox
              onChange={this.onChangeCheckbox}
              isChecked={checked}
              value={checkboxValue}
              rtl={rtl}
              {...editProps}
            />
          );
        }
        break;
      case "select":
        content = (
          <EditableSelect
            options={availableOptions}
            value={value}
            onChange={this.onChangeSelect}
            rtl={rtl}
            {...editProps}
          />
        );
        break;
      case "date":
        {
          const date = moment(Number(value)).toDate();
          content = (
            <DatePicker
              value={date}
              onOpen={this.onDatePickerOpen}
              onClose={this.onDatePickerClose}
              onChange={this.onChangeDate}
              rtl={rtl}
              {...editProps}
            />
          );
        }
        break;
      case "numeric":
      case "decimal":
      case "text":
      default:
        {
          const inputValue = String(value);
          content = (
            <Input
              style={{ padding: 0, width: "100%" }}
              onChange={this.onChangeInput}
              type={type}
              value={inputValue}
              rtl={rtl}
              {...editProps}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
            />
          );
        }
        break;
    }
    return content;
  }
}

Cell.propTypes = {
  type: PropTypes.oneOf(EDITABLE_TYPES).isRequired,
  value: PropTypes.any,
  availableOptions: PropTypes.array,
  editProps: PropTypes.object,
  onSaveEdit: PropTypes.func,
  onCancelEdit: PropTypes.func,
  isEditingNodeClicked: PropTypes.func,
  rtl: PropTypes.bool,
};

Cell.defaultProps = {
  availableOptions: [],
  editProps: {},
  onSaveEdit: emptyFunction,
  onCancelEdit: emptyFunction,
  isEditingNodeClicked: emptyFunction,
  rtl: false,
};

export default Cell;
