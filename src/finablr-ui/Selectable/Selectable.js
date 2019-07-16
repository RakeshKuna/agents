/*eslint-disable */
import React from "react";
import ReactSelect from "react-select";
import Icon from "../Icons";
import { css } from "../utils";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import styles from "./styles/style";

class CustomSelect extends ReactSelect {
  render() {
    const {
      multi,
      removeSelected,
      disabled,
      clearable,
      isLoading,
      searchable,
      rtl,
      backspaceRemoves,
      backspaceToRemoveMessage,
      labelKey,
      wrapperStyle,
      style,
      isSave,
      saveIconClick,
      classes,
      saveIconTitle,
      isCreatable,
    } = this.props;
    let { className } = this.props;
    const { isFocused, isPseudoFocused, inputValue } = this.state;
    let { isOpen } = this.state;
    const valueArray = this.getValueArray(this.props.value);
    this._visibleOptions = this.filterOptions(multi && removeSelected ? valueArray : null);
    const options = this._visibleOptions;
    if (multi && !options.length && valueArray.length && !inputValue) isOpen = false;
    const focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);

    let focusedOption = null;
    if (focusedOptionIndex !== null) {
      this._focusedOption = options[focusedOptionIndex];
      focusedOption = this._focusedOption;
    } else {
      this._focusedOption = null;
      focusedOption = this._focusedOption;
    }
    className = css("Select", className, {
      "has-value": valueArray.length,
      "is-clearable": clearable,
      "is-disabled": disabled,
      "is-focused": isFocused,
      "is-loading": isLoading,
      "is-open": isOpen,
      "is-pseudo-focused": isPseudoFocused,
      "is-searchable": searchable,
      "Select--multi": multi,
      "Select--rtl": rtl,
      "Select--single": !multi,
    });

    let removeMessage = null;
    if (multi && !disabled && valueArray.length && !inputValue && isFocused && backspaceRemoves) {
      removeMessage = (
        <span
          id={`${this._instancePrefix}-backspace-remove-message`}
          className="Select-aria-only"
          aria-live="assertive"
        >
          {backspaceToRemoveMessage.replace("{label}", valueArray[valueArray.length - 1][labelKey])}
        </span>
      );
    }

    const renderSave = () => {
      let createElem = "";
      if (isSave && isCreatable) {
        createElem = (<span aria-label={saveIconTitle !== undefined ? saveIconTitle : "Save option"} className={classes.saveIcon}>
          <Icon
            iconName="content-save"
            onClick={e => saveIconClick(e)}
            onMouseDown={e => saveIconClick(e)}
          />
        </span>)
      }
      return createElem;
    }

    return (
      <div ref={ref => (this.wrapper = ref)} className={className} style={wrapperStyle}>
        {this.renderHiddenField(valueArray)}
        <div
          ref={ref => (this.control = ref)}
          className="Select-control"
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleTouchStart}
          style={style}
        >
          <div className="Select-multi-value-wrapper" id={`${this._instancePrefix}-value`}>
            {this.renderValue(valueArray, isOpen)}
            {this.renderInput(valueArray, focusedOptionIndex)}
          </div>
          {renderSave()}
          {removeMessage}
          {this.renderLoading()}

          {this.renderClear()}
          {this.renderArrow()}
        </div>
        {isOpen ? this.renderOuter(options, valueArray, focusedOption) : null}
      </div>
    );
  }
}

export default WithThemeMaterial(styles)(CustomSelect);