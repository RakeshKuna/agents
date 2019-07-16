/* eslint-disable react/prop-types */

import React from "react";
import PropTypes from "prop-types";
import lodashMap from "lodash/map";
import Input from "../Input/Input";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import SelectWrapped from "./SelectWrapper";
import SelectWithCheckbox from "./SelectWithCheckbox";
import { css } from "../utils";
import styles from "./styles/style";

class Selectable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      valueArr: [],
      isSaveOption: false,
      createOption: "",
      allOptions: [],
      errorState: false,
    };
    this.list = [];
  }

  componentDidMount() {
    let { options } = this.props;
    const optionType = options.find(
      obj => !!(typeof obj.label === "string" || typeof obj.label === "number")
    );
    if (optionType !== undefined) {
      options = this.mapping(options);
    } else {
      options = this.dataConversion(options);
    }
    options.map((k, i) => this.list.push(options[i].label));
    this.setState({ allOptions: options });
  }

  onInput = e => {
    const { allOptions } = this.state;
    allOptions.map((k, i) => this.list.push(allOptions[i].label));
    if (this.list.indexOf(e.target.value) === -1) {
      this.setState({ isSaveOption: true, createOption: e.target.value });
    } else this.setState({ isSaveOption: false, createOption: "" });
  };

  onValueClick = e => {
    const { onValueClick: onValueClick = () => {} } = this.props;
    onValueClick(e);
  };

  mapping = object =>
    object.map((suggestion, i) => ({
      value: suggestion.value !== undefined ? suggestion.value : suggestion.label,
      label: suggestion.label,
      disabled: !!suggestion.disabled,
      id: suggestion.id !== undefined ? suggestion.id : i,
    }));

  dataConversion = param => {
    const newArr = [];
    let newObj;
    param.map((k, i) => {
      newObj = {};
      if (typeof param[i] === "string" || typeof param[i] === "number") {
        newObj.value = param[i];
        newObj.label = param[i];
        newObj.disabled = false;
        newObj.id = i;
      }
      newArr.push(newObj);
      return newObj;
    });
    return newArr;
  };

  saveIconClick = e => {
    let { options } = this.props;
    options = this.mapping(options);
    const { createOption } = this.state;
    e.preventDefault();
    e.stopPropagation();
    const obj = {};
    const total = options;
    obj.label = createOption;
    obj.value = createOption;
    total.push(obj);
    this.setState({ allOptions: total, isSaveOption: false, value: "" });
  };

  optionOnclose = e => {
    const { onClose: onClose = () => {} } = this.props;
    this.setState({ isSaveOption: false });
    onClose(e);
  };

  handleChange = value => {
    const { onChange: onChange = () => {}, isRequired, isMultiple, delimiter } = this.props;
    const componentValue = !Array.isArray(value) ? [value] : value;
    const selectedValue = lodashMap(componentValue, "value");

    // let valueArr = [];
    // if (value !== null && typeof value === "string") {
    //   valueArr = value.split(",");
    // } else {
    //   valueArr.push(value);
    // }
    this.setState({
      valueArr: selectedValue,
      value: selectedValue.join(delimiter),
      errorState: isRequired && value === null,
    });
    onChange(isMultiple ? selectedValue : selectedValue[0]);
  };

  render() {
    const {
      classes,
      umClass,
      placeholder,
      label,
      id,
      isMultiple,
      options,
      isEnabled,
      optionProps,
      boxtype,
      itemHeight,
      isRequired,
      isCreatable,
      isClearable,
      onValueClick,
      searchBy,
      searchable,
      noResultsText,
      selectProps,
      showCheckBox,
      chipStyle,
      rtl,
      wordWrap,
      maxHeight,
      itemCount,
      onFocus,
      onChange,
      delimiter,
      ...otherParams
    } = this.props;
    const { value, valueArr, isSaveOption, allOptions, errorState } = this.state;

    const menuRendererProps = {
      selectedValue: valueArr,
      options,
      isCheckbox: showCheckBox,
      rtl,
      ...optionProps,
    };

    const params = {
      multi: isMultiple,
      name: id,
      instanceId: id,
      simpleValue: false,
      options: allOptions,
      isSave: isSaveOption,
      delimiter,
      itemHeight,
      isCreatable,
      isClearable,
      searchBy,
      searchable,
      noResultsText,
      autoBlur: !isMultiple,
      saveIconClick: e => this.saveIconClick(e),
      onClose: this.optionOnclose,
      onValueClick: this.onValueClick,
      menuRendererProps,
      chipStyle,
      maxHeight,
      itemCount,
      onFocus,
      ...selectProps,
    };

    return (
      <div className={css(classes.root, umClass)}>
        <Input
          rtl={rtl}
          fullWidth
          boxtype={boxtype}
          isSelectable
          isEnabled={isEnabled}
          inputComponent={showCheckBox ? SelectWithCheckbox : SelectWrapped}
          classes={{
            root: classes.inputRoot,
          }}
          placeholder={label === undefined ? placeholder : ""}
          label={label}
          id={id}
          onChange={this.handleChange}
          value={value}
          inputProps={params}
          onInput={this.onInput}
          errorState={errorState}
          isRequired={isRequired}
          {...otherParams}
        />
      </div>
    );
  }
}

Selectable.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  delimiter: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  selectProps: PropTypes.object,
  umClass: PropTypes.string,
  isMultiple: PropTypes.bool,
  options: PropTypes.array,
  boxtype: PropTypes.bool,
  isRequired: PropTypes.bool,
  isEnabled: PropTypes.bool,
  isCreatable: PropTypes.bool,
  isClearable: PropTypes.bool,
  onClose: PropTypes.func,
  onChange: PropTypes.func,
  onValueClick: PropTypes.func,
  searchable: PropTypes.bool,
  showCheckBox: PropTypes.bool,
  rtl: PropTypes.bool,
};

Selectable.defaultProps = {
  isMultiple: false,
  boxtype: false,
  isRequired: false,
  isEnabled: true,
  isCreatable: false,
  isClearable: true,
  searchable: true,
  showCheckBox: false,
  rtl: false,
  delimiter: ",",
};

export default WithThemeMaterial(styles)(Selectable);
