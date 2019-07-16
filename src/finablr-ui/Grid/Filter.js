import React from "react";
import PropTypes from "prop-types";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { Input } from "../Input";
import styles from "./styles/Filter";

const Filter = ({
  tableHeader,
  filterText,
  onChangeFilter,
  classes,
  rtl,
  style,
  ...inputProps
}) => {
  const onInputChange = e => {
    onChangeFilter(e.target.value);
  };
  const filterable = tableHeader.some(header => header.filterable === true);
  if (!filterable) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Input
        onChange={onInputChange}
        boxtype
        value={filterText}
        rtl={rtl}
        inputStyle={{ padding: "11px 8px 11px 8px" }}
        {...inputProps}
      />
    </div>
  );
};

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeader: PropTypes.array.isRequired,
  filterText: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  style: PropTypes.object,
  rtl: PropTypes.bool,
};

Filter.defaultProps = {
  rtl: false,
};

export default WithThemeMaterial(styles)(Filter);
