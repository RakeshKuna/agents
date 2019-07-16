import React from "react";
import PropTypes from "prop-types";
import MdToolbar from "@material-ui/core/Toolbar";

import { emptyFunction } from "../utils";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import NumOfEntries from "./Pagination/NumOfEntries";
import Filter from "./Filter";
import styles from "./styles/Toolbar";

const Toolbar = ({
  classes,
  columnData,
  rowsPerPage,
  rowsPerPageOptions,
  onChangeRowsPerPage,
  filterText,
  onChangeFilter,
  labelEntries,
  labelSearchPlaceholder,
  showRowsPerPage,
  rightComponent,
  rightComponentProps,
  isRowsPerPageEnabled,
  style: { filter: filterStyle = {}, numOfEntries: numOfEntriesStyle = {} } = {},
  rtl,
}) => (
  <MdToolbar className={classes.root} disableGutters>
    {showRowsPerPage && (
      <div className={classes.title}>
        <NumOfEntries
          component="div"
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangeRowsPerPage={onChangeRowsPerPage}
          labelEntries={labelEntries}
          isEnabled={isRowsPerPageEnabled}
          style={numOfEntriesStyle}
          rtl={rtl}
        />
      </div>
    )}
    <div className={classes.searchContainer}>
      <Filter
        tableHeader={columnData}
        filterText={filterText}
        onChangeFilter={onChangeFilter}
        placeholder={labelSearchPlaceholder}
        style={filterStyle}
        rtl={rtl}
      />
      {rightComponent(rightComponentProps)}
    </div>
  </MdToolbar>
);

Toolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  columnData: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  labelEntries: PropTypes.node,
  labelSearchPlaceholder: PropTypes.string,
  showRowsPerPage: PropTypes.bool,
  rightComponent: PropTypes.func,
  rightComponentProps: PropTypes.object,
  isRowsPerPageEnabled: PropTypes.bool,
  rtl: PropTypes.bool,
  style: PropTypes.shape({
    root: PropTypes.object,
    searchContainer: PropTypes.object,
    filter: PropTypes.object,
    numOfEntries: PropTypes.shape({
      root: PropTypes.object,
      toolbar: PropTypes.object,
      labelStyle: PropTypes.object,
    }),
  }),
};

Toolbar.defaultProps = {
  showRowsPerPage: true,
  labelEntries: "Entries",
  labelSearchPlaceholder: "Search ..",
  isRowsPerPageEnabled: true,
  rightComponent: emptyFunction,
  rightComponentProps: {},
  rtl: false,
};

export default WithThemeMaterial(styles)(Toolbar);
