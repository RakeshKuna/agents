import React, { Component } from "react";
import PropTypes from "prop-types";
import Downshift from "downshift";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import ServiceHandler from "../utils/Service";
import Input from "./Input";
import Icon from "../Icons";
import styles from "./styles/autoCompleteStyle";
import { replaceText, css, emptyFunction } from "../utils";

const Service = new ServiceHandler();

const dropDownBox = ({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
  umClass,
  formattedOption,
}) => {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion) > -1;
  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      className={umClass}
      style={{
        fontWeight: isSelected ? 500 : 400,
        justifyContent: "flex-start",
      }}
    >
      {formattedOption && formattedOption(suggestion) ? formattedOption(suggestion) : suggestion}
    </MenuItem>
  );
};

dropDownBox.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.string.isRequired,
  rtl: PropTypes.bool,
  umClass: PropTypes.string,
  formattedOption: PropTypes.func,
};
dropDownBox.defaultProps = {
  rtl: false,
};

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestion: [],
      userSelectedItem: "",
    };
  }

  handleChangeInput = changes => {
    const { selectedItem, inputValue } = changes;
    const { onChange, getValue } = this.props;
    if (selectedItem !== undefined) {
      this.setState({
        userSelectedItem:
          getValue && getValue(selectedItem) ? getValue(selectedItem) : selectedItem,
      });
    } else if (inputValue !== undefined) {
      this.setState({ userSelectedItem: inputValue });
    }
    if (onChange && (selectedItem !== undefined || inputValue !== undefined)) {
      onChange(selectedItem || inputValue);
    }
  };

  closeModelInput = () => {
    this.down.closeMenu();
  };

  refDom = node => {
    this.down = node;
  };

  formattedOption = suggestion => {
    const { formattedOption: formattedOption = emptyFunction } = this.props;
    formattedOption(suggestion);
  };

  async dataRequest(value, baseURL) {
    const { service } = this.props;
    const FormatedURL = replaceText(baseURL, "value", value);
    const { status, data } = await service.get(FormatedURL);
    if (status === 200) {
      return data;
    }
    return [];
  }

  updateDropDown(e) {
    const { value } = e.target;
    const { data, baseURL, minLength } = this.props;
    if (value === "") {
      this.handleChangeInput({ inputValue: "" });
      this.setState({ suggestion: [] });
    } else if (value.toString().length >= minLength) {
      if (data) {
        const newData = data.filter(text => text.toLowerCase().indexOf(value.toLowerCase()) === 0);
        this.setState({ suggestion: newData });
      } else if (baseURL) {
        this.dataRequest(value, baseURL).then(suggestion => {
          this.setState({ suggestion });
        });
      }
    } else {
      this.setState({ suggestion: [] });
    }
  }

  renderInput(inputProps) {
    const { InputProps, ref, isOpen, ...other } = inputProps;
    const { inputComponentProps, classes, rtl } = this.props;
    return (
      <div className={classes.wrapperComponent}>
        <Input
          {...inputComponentProps}
          rtl={rtl}
          InputProps={{
            inputRef: ref,
            ...InputProps,
          }}
          {...other}
        />
        {isOpen ? (
          <Icon
            iconName="close"
            onClick={this.closeModelInput}
            className={css(classes.iconStyle, classes.hoverDom, "mdi-12px")}
          />
        ) : null}
      </div>
    );
  }

  render() {
    const { classes, rtl, umClass } = this.props;
    const { suggestion, userSelectedItem } = this.state;
    return (
      <Downshift
        ref={this.refDomInput}
        selectedItem={userSelectedItem}
        onStateChange={this.handleChangeInput}
      >
        {({ getInputProps, getItemProps, isOpen, selectedItem, highlightedIndex }) => (
          <div className={css(classes.container, classes.rtl)}>
            {this.renderInput({
              InputProps: getInputProps({
                onChange: e => this.updateDropDown(e),
              }),
              ref: node => {
                this.popperNode = node;
              },
              isOpen,
            })}

            <Popper open={isOpen} anchorEl={this.popperNode}>
              <Paper
                square
                classes={{ root: classes.paper }}
                style={{
                  width: this.popperNode ? this.popperNode.clientWidth : null,
                }}
              >
                {suggestion && suggestion.length > 0
                  ? suggestion.map((text, i) =>
                      dropDownBox({
                        suggestion: text,
                        index: i,
                        itemProps: getItemProps({ item: text }),
                        highlightedIndex,
                        selectedItem,
                        rtl,
                        umClass,
                        formattedOption: this.formattedOption,
                      })
                    )
                  : null}
              </Paper>
            </Popper>
          </div>
        )}
      </Downshift>
    );
  }
}

AutoComplete.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  baseURL: PropTypes.string,
  inputComponentProps: PropTypes.object,
  minLength: PropTypes.number,
  onChange: PropTypes.func,
  dropDownStyle: PropTypes.object,
  rtl: PropTypes.bool,
  umClass: PropTypes.string,
  formattedOption: PropTypes.func,
  getValue: PropTypes.func,
  service: PropTypes.instanceOf(ServiceHandler),
};

AutoComplete.defaultProps = {
  minLength: 1,
  rtl: false,
  service: Service,
};

export default WithThemeMaterial(styles)(AutoComplete);
