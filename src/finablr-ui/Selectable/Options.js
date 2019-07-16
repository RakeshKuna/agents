import React from "react";
import PropTypes from "prop-types";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "../CheckBox";
import optionCss from "./styles/optionStyle";
import { css, emptyFunction } from "../utils";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";

class Option extends React.PureComponent {
  onSelect = event => {
    const { onSelect = emptyFunction, option, onValueClick = emptyFunction } = this.props;
    onSelect(option, event);
    onValueClick(option, event);
  };

  render() {
    const {
      classes,
      children,
      isFocused,
      onFocus,
      isCheckbox,
      isSelected,
      isDisabled,
    } = this.props;
    return (
      <MenuItem
        className={css(classes.option)}
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.onSelect}
        component="div"
      >
        {isCheckbox && (
          <Checkbox umClass="dropdownCheckbox" isEnabled={!isDisabled} checked={isSelected} />
        )}
        {children}
      </MenuItem>
    );
  }
}

Option.propTypes = {
  isFocused: PropTypes.bool,
  option: PropTypes.object,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  onValueClick: PropTypes.func,
  isSelected: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.node.isRequired,
  isCheckbox: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Option.defaultProps = {
  isFocused: true,
  isSelected: true,
  isCheckbox: false,
};

export default WithThemeMaterial(optionCss)(Option);
