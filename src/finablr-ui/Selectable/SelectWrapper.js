import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { CellMeasurerCache } from "react-virtualized";
import { SizeMe } from "react-sizeme";
import Select from "./Selectable";
import Icon from "../Icons/index";
import Option from "./Options";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css } from "../utils";
import styles from "./styles/style";

import MenuRenderer from "./MenuRenderer";

class SelectWrapped extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cache = new CellMeasurerCache({
      fixedWidth: true,
    });
  }

  render() {
    const {
      classes,
      onClose,
      isSave,
      isClearable,
      isCreatable,
      saveIconClick,
      onValueClick,
      searchBy,
      searchable,
      rtl,
      onFocus,
      maxHeight,
      itemCount,
      menuRendererProps = {},
      ...other
    } = this.props;
    return (
      <SizeMe>
        {({ size }) => (
          <Select
            rtl={rtl}
            menuRenderer={MenuRenderer({
              cache: this.cache,
              dropDownHeight: maxHeight !== undefined ? maxHeight : itemCount * 48,
              selectWidth: size.width !== undefined ? size.width : 357,
              onValueClick,
              ...menuRendererProps,
            })}
            onFocus={onFocus && onFocus()}
            optionComponent={Option}
            matchProp={searchBy}
            isCreatable={isCreatable}
            isSave={isSave}
            searchable={searchable}
            saveIconClick={e => saveIconClick(e)}
            arrowRenderer={() => <Icon iconName="triangle" className={classes.dropdownIcon} />}
            clearRenderer={() => isClearable && <Icon iconName="close" />}
            valueComponent={valueProps => {
              const { value, children, onRemove } = valueProps;

              const onDelete = event => {
                event.preventDefault();
                event.stopPropagation();
                onRemove(value);
              };

              if (onRemove) {
                return (
                  <Chip
                    tabIndex={-1}
                    label={children}
                    className={css(classes.chip, "chipSpan")}
                    onDelete={isClearable ? onDelete : () => {}}
                  />
                );
              }

              return <div className="Select-value">{children}</div>;
            }}
            onClose={e => onClose(e)}
            {...other}
          />
        )}
      </SizeMe>
    );
  }
}

SelectWrapped.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  saveIconClick: PropTypes.func,
  isSave: PropTypes.bool,
  isCreatable: PropTypes.bool,
  isClearable: PropTypes.bool,
  onValueClick: PropTypes.func,
  searchBy: PropTypes.oneOf(["any", "label", "value"]),
  searchable: PropTypes.bool,
  rtl: PropTypes.bool,
  menuRendererProps: PropTypes.object,
  onFocus: PropTypes.func,
  maxHeight: PropTypes.number,
  itemCount: PropTypes.number,
};
SelectWrapped.defaultProps = {
  isSave: false,
  isCreatable: false,
  isClearable: true,
  searchBy: "any",
  searchable: true,
  rtl: false,
  itemCount: 5,
};

export default WithThemeMaterial(styles)(SelectWrapped);
