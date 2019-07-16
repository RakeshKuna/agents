import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import WithThemeMaterial from "../../utils/HOC/WithThemeMaterial";
import Select from "../../Selectable";
import styles from "../styles/NumOfEntries";

const NumOfEntries = ({
  classes,
  colSpan: colSpanProp,
  component: Component,
  labelEntries,
  onChangeRowsPerPage,
  rowsPerPage,
  rowsPerPageOptions,
  SelectProps,
  isEnabled,
  rtl,
  style,
  ...other
}) => {
  let colSpan;

  if (Component === TableCell || Component === "td") {
    colSpan = colSpanProp || 1000; // col-span over everything
  }
  return (
    <Component className={classes.root} colSpan={colSpan} {...other}>
      <Toolbar className={classes.toolbar} disableGutters>
        <Select
          style={{ width: 62, marginRight: rtl ? null : 10, marginLeft: rtl ? 10 : null }}
          options={rowsPerPageOptions}
          value={rowsPerPage}
          isClearable={false}
          onChange={onChangeRowsPerPage}
          isEnabled={isEnabled}
          itemCount={rowsPerPageOptions.length > 5 ? 5 : rowsPerPageOptions.length}
          rtl={rtl}
        />
        <Typography variant="caption" className={classes.caption}>
          {labelEntries}
        </Typography>
      </Toolbar>
    </Component>
  );
};

NumOfEntries.propTypes = {
  classes: PropTypes.object.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  colSpan: PropTypes.number,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  labelEntries: PropTypes.node,
  onChangeRowsPerPage: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  SelectProps: PropTypes.object,
  isEnabled: PropTypes.bool,
  rtl: PropTypes.bool,
  style: PropTypes.shape({
    root: PropTypes.object,
    toolbar: PropTypes.object,
    labelStyle: PropTypes.object,
  }),
};

NumOfEntries.defaultProps = {
  component: TableCell,
  labelEntries: "Entries",
  isEnabled: true,
  rtl: false,
  rowsPerPageOptions: [5, 10, 25],
};

export default WithThemeMaterial(styles, { name: "NumOfEntries" })(NumOfEntries);
