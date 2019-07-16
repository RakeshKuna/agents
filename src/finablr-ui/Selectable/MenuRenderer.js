import PropTypes from "prop-types";
import React from "react";
import { CellMeasurer, List } from "react-virtualized";

import { css } from "../utils";

const menuRenderer = props => {
  const { cache, dropDownHeight, selectWidth, onValueClick } = props;
  const MenuRenderer = ({
    focusedOption,
    focusOption,
    inputValue,
    instancePrefix,
    onFocus,
    onOptionRef,
    onSelect,
    optionClassName,
    optionComponent,
    optionRenderer,
    options,
    removeValue,
    selectValue,
    valueArray,
    valueKey,
  }) => {
    const Option = optionComponent;
    const renderOption = (option, i) => {
      const isSelected = valueArray && valueArray.some(x => x[valueKey] === option[valueKey]);
      const isFocused = option === focusedOption;
      const optionClass = css(optionClassName, {
        "Select-option": true,
        "is-selected": isSelected,
        "is-focused": isFocused,
        "is-disabled": option.disabled,
      });
      return (
        <Option
          className={optionClass}
          focusOption={focusOption}
          inputValue={inputValue}
          instancePrefix={instancePrefix}
          isDisabled={option.disabled}
          isFocused={isFocused}
          isSelected={isSelected}
          key={`option-${i}-${option[valueKey]}`}
          onFocus={onFocus}
          onSelect={onSelect}
          onValueClick={onValueClick}
          option={option}
          optionIndex={i}
          ref={ref => {
            onOptionRef(ref, isFocused);
          }}
          removeValue={removeValue}
          selectValue={selectValue}
          {...props}
        >
          {optionRenderer(option, i, inputValue)}
        </Option>
      );
    };
    const rowRenderer = (
      { index, key, parent, style } // eslint-disable-line
    ) => (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        <div style={style}>{renderOption(options[index], index)}</div>
      </CellMeasurer>
    );
    return (
      <List
        {...props}
        deferredMeasurementCache={cache}
        overscanRowCount={0}
        rowHeight={cache.rowHeight}
        height={dropDownHeight}
        rowCount={options.length}
        rowRenderer={rowRenderer}
        width={selectWidth}
        scrollToIndex={focusedOption.id}
      />
    );
  };

  MenuRenderer.propTypes = {
    focusOption: PropTypes.func,
    focusedOption: PropTypes.object,
    inputValue: PropTypes.string,
    instancePrefix: PropTypes.string,
    onFocus: PropTypes.func,
    onOptionRef: PropTypes.func,
    onSelect: PropTypes.func,
    optionClassName: PropTypes.string,
    optionComponent: PropTypes.func,
    optionRenderer: PropTypes.func,
    options: PropTypes.array,
    removeValue: PropTypes.func,
    selectValue: PropTypes.func,
    valueArray: PropTypes.array,
    valueKey: PropTypes.string,
  };
  return MenuRenderer;
};

export default menuRenderer;
