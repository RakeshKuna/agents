import React from "react";
import PropTypes from "prop-types";

import Select from "../../Selectable";

const EditableSelect = ({ options, value, onChange, rtl, ...otherProps }) => (
  <Select
    options={options}
    itemCount={options.length > 5 ? 5 : options.length}
    value={value}
    isClearable={false}
    onChange={onChange}
    inputStyle={{ padding: "7px 8px 7px 8px" }}
    rtl={rtl}
    {...otherProps}
  />
);

EditableSelect.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.any,
  rtl: PropTypes.bool,
};

EditableSelect.defaultProps = {
  rtl: false,
};

export default EditableSelect;
