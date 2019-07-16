import React from "react";
import PropTypes from "prop-types";
import SelectWrapped from "./SelectWrapper";

const SelectWithCheckbox = ({ ...other }) => (
  <SelectWrapped closeOnSelect={false} removeSelected={false} {...other} />
);

SelectWithCheckbox.propTypes = {
  menuRendererProps: PropTypes.object,
};

export default SelectWithCheckbox;
