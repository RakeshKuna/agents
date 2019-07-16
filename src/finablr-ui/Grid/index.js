import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import lodashGroupBy from "lodash/groupBy";
import loadshSet from "lodash/set";
import loadshGet from "lodash/get";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css, emptyFunction } from "../utils";

import Paging from "./Pagination/Paging";
import TableToolbar from "./Toolbar";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import ExpanderIcon from "./ExpanderIcon";
import CheckboxSmall from "./CheckboxSmall";
import styles from "./styles";
import { sortData, sortMethod, paginateData, filterData, getPageRowIndex } from "./Helpers";

class Grid extends React.Component {
  constructor(props) {
    super(props);
    const { data, rowsPerPage, isMultiSort } = props;

    this.state = {
      data,
      sortedData: [],
      rowsPerPage,
      page: 0,
      filterText: "",
      sorted: [],
      selected: [],
      groupExpanded: [],
      expanded: [],
      edited: null,
      allVisibleColumns: [],
      isMultiSort,
    };
  }

  componentDidMount() {
    this.setStateWithData({ ...this.getResolvedData(this.props) }, () => {
      this.setStateWithData({ sortedData: this.getSortedData(this.state) });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setStateWithData({ ...this.getResolvedData(nextProps) }, () => {
        this.setStateWithData({ sortedData: this.getSortedData(this.state) });
      });
    }
  }

  getResolvedData(props) {
    const { groupBy, data, isMultiSort } = props;

    const resolvedData = data.map((row, indexKey) => ({ ...row, indexKey }));

    const groupRecursively = (rows, keys, i = 0) => {
      // This is the last level, just return the rows
      if (i === keys.length) {
        return rows;
      }
      // Group the rows together for this level
      let groupedRows = Object.entries(lodashGroupBy(rows, keys[i])).map(([key, value], i2) => ({
        groupID: keys[i],
        [keys[i]]: key,
        subRows: value,
        nestingLevel: i,
        groupedByPivot: true,
        indexKey: i2,
      }));
      // Recurse into the subRows
      groupedRows = groupedRows.map(rowGroup => {
        const subRows = groupRecursively(rowGroup.subRows, keys, i + 1);
        return {
          ...rowGroup,
          subRows,
        };
      });
      return groupedRows;
    };
    return {
      allVisibleColumns: this.getAllVisibleColumns(props),
      data: groupRecursively(resolvedData, groupBy),
      isMultiSort: groupBy.length > 0 ? false : isMultiSort,
    };
  }

  getAllVisibleColumns = props => {
    const {
      classes,
      idMapKey,
      columnData,
      hasMultiSelect,
      hideColumns,
      groupBy,
      expanderComponent: ExpanderComponent = null,
    } = props;
    let columnsList = [
      ...columnData.filter(
        ({ dataMapKey }) => groupBy.includes(dataMapKey) || !hideColumns.includes(dataMapKey)
      ),
    ];

    columnsList = columnsList.map(({ dataMapKey, ...column }) => ({
      ...column,
      dataMapKey,
      isGrouped: groupBy.includes(dataMapKey),
    }));

    if (ExpanderComponent) {
      const expanderColumn = {
        dataMapKey: "_expander",
        expander: true,
        isEditable: false,
        isSortable: false,
        cellProps: {
          padding: "none",
          className: classes.expanderCell,
        },
        cellRender: row => {
          const expanded = this.isExpanded(row[idMapKey]);
          return (
            <ExpanderIcon
              disableRipple
              disableTouchRipple
              iconStyle={{ fontSize: 17 }}
              onMouseDown={e => this.handleExpandClick(e, row[idMapKey])}
              icon={expanded ? "minus-circle" : "plus-circle"}
            />
          );
        },
      };
      columnsList = [expanderColumn, ...columnsList];
    }
    if (hasMultiSelect) {
      const checkboxColumn = {
        dataMapKey: "_selector",
        selectable: true,
        isEditable: false,
        isSortable: false,
        cellProps: {
          padding: "none",
          className: classes.checkbox,
        },
        label: () => {
          const { selected, sortedData } = this.state;
          const checkboxProps = {
            indeterminate: selected.length > 0 && selected.length !== sortedData.length,
            checked: selected.length === sortedData.length,
            disabled: groupBy && groupBy.length > 0,
            onChange: this.handleSelectAllClick,
          };
          return <CheckboxSmall {...checkboxProps} />;
        },
        cellRender: row => {
          const selected = this.isSelected(row[idMapKey]);
          return (
            <CheckboxSmall
              checked={selected}
              onChange={event => this.handleCheckBoxChange(event, row[idMapKey])}
            />
          );
        },
      };
      columnsList = [checkboxColumn, ...columnsList];
    }

    // place the groupBy column in the order
    const groupByColumns = [];
    groupBy.forEach(groupByColumn => {
      const index = columnsList.findIndex(column => groupByColumn === column.dataMapKey);
      if (index > -1) {
        groupByColumns.push(columnsList[index]);
      }
    });
    const filteredColumns = columnsList.filter(column => !groupBy.includes(column.dataMapKey));

    columnsList = [...groupByColumns, ...filteredColumns];

    // enable/disable sorting based on groupBy
    const hasGrouping = groupBy.length > 0;
    columnsList = columnsList.map(column => {
      let sortingOption = {};
      if (hasGrouping) {
        if (column.dataMapKey === groupBy[0]) {
          sortingOption = { isSortable: true };
        } else {
          sortingOption = { isSortable: false };
        }
      }
      return { ...column, ...sortingOption };
    });

    return columnsList;
  };

  getResolvedState = () => this.state;

  setStateWithData = (state, cb = emptyFunction) => {
    this.setState(prevState => {
      const oldState = prevState;
      const { isDataSetLevel } = this.props;
      let newState;
      if (typeof state === "function") {
        newState = { ...oldState, ...state(oldState) };
      } else {
        newState = { ...oldState, ...state };
      }
      if (
        oldState.filterText !== newState.filterText ||
        oldState.sorted !== newState.sorted ||
        oldState.data !== newState.data
      ) {
        newState.sortedData = this.getSortedData(newState);
      }
      if (!isDataSetLevel && newState.filterText !== "") {
        newState.page = 0;
      }
      if (oldState.page !== newState.page || oldState.sorted !== newState.sorted) {
        newState.groupExpanded = [];
      }

      return {
        ...prevState,
        ...newState,
      };
    }, cb);
  };

  getSortedData = state => {
    const { defaultSortMethod, defaultFilterMethod, isDataSetLevel } = this.props;
    const { page, data, filterText, sorted, allVisibleColumns: columnData, rowsPerPage } = state;
    const { startRow, endRow } = getPageRowIndex(rowsPerPage, page);
    return sortData(
      defaultFilterMethod(columnData, filterText, data, isDataSetLevel, startRow, endRow),
      sorted,
      defaultSortMethod,
      columnData,
      isDataSetLevel,
      startRow,
      endRow
    );
  };

  handleEditSave = value => {
    const { edited } = this.state;
    const { onSave } = this.props;

    const {
      id,
      column: { dataMapKey },
    } = edited;
    onSave(id, dataMapKey, value);
    this.setStateWithData({ edited: null });
  };

  handleGroupExpanderClick = (nestingPath, isExpanded) => () => {
    const { groupExpanded } = this.state;
    let newExpanded = { ...groupExpanded };
    if (isExpanded) {
      newExpanded = loadshSet(newExpanded, nestingPath, false);
    } else {
      newExpanded = loadshSet(newExpanded, nestingPath, {});
    }

    this.setStateWithData({ groupExpanded: newExpanded });
  };

  handleCancelEdit = () => {
    const { edited } = this.state;
    if (edited !== null) {
      this.setStateWithData({ edited: null });
    }
  };

  handleRequestSort = (event, property) => {
    const { onSort } = this.props;
    const { isMultiSort } = this.state;
    if (isMultiSort) {
      this.handleRequestMultiSort(event, property);
    } else {
      this.handleRequestSingleSort(event, property);
    }
    onSort();
  };

  handleRequestSingleSort = (event, property) => {
    let { defaultOrdering: order } = this.props;
    const { sorted } = this.state;
    const sort = sorted.find(item => item.id === property);
    if (sort) {
      order = sort.order === "desc" ? "asc" : "desc";
    }
    this.setStateWithData({ sorted: [{ id: property, order }] });
  };

  handleRequestMultiSort = (event, property) => {
    const { defaultOrdering: order } = this.props;
    const { sorted } = this.state;
    const index = sorted.findIndex(item => item.id === property);
    this.setStateWithData({
      sorted: [...(index === -1 ? sorted : []), { id: property, order }],
    });
  };

  handleRequetSortOrder = (event, property) => {
    const { onSort } = this.props;
    const { sorted } = this.state;
    const index = sorted.findIndex(item => item.id === property);
    if (index === -1) {
      this.setStateWithData({ ...this.state });
    }
    this.setStateWithData(
      {
        sorted: [
          ...sorted.slice(0, index),
          {
            ...sorted[index],
            order: sorted[index].order === "asc" ? "desc" : "asc",
          },
          ...sorted.slice(index + 1),
        ],
      },
      onSort
    );
  };

  handleSelectAllClick = (event, checked) => {
    const { hasMultiSelect, onMultiSelect } = this.props;
    if (!hasMultiSelect) {
      return;
    }
    let selected = [];
    if (checked) {
      const { sortedData } = this.state;
      selected = sortedData.map(n => n.id);
    }
    this.setStateWithData({ selected });
    onMultiSelect(selected);
  };

  handleCheckBoxChange = (event, id) => {
    const { hasMultiSelect, onMultiSelect } = this.props;
    if (!hasMultiSelect) {
      return;
    }
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setStateWithData({ selected: newSelected });
    onMultiSelect(newSelected);
  };

  handleExpandClick = (event, id) => {
    const { expanded } = this.state;
    const expandedIndex = expanded.indexOf(id);
    let newExpanded = [];

    if (expandedIndex === -1) {
      newExpanded = newExpanded.concat(expanded, id);
    } else if (expandedIndex === 0) {
      newExpanded = newExpanded.concat(expanded.slice(1));
    } else if (expandedIndex === expanded.length - 1) {
      newExpanded = newExpanded.concat(expanded.slice(0, -1));
    } else if (expandedIndex > 0) {
      newExpanded = newExpanded.concat(
        expanded.slice(0, expandedIndex),
        expanded.slice(expandedIndex + 1)
      );
    }
    this.setStateWithData({ expanded: newExpanded });
  };

  handleEditClick = (event, column, id) => {
    this.setStateWithData({
      edited: { column, id, node: event.target },
    });
  };

  handleChangePage = (event, page) => {
    const { isDataSetLevel } = this.props;
    let { sorted } = this.state;
    if (!isDataSetLevel) {
      sorted = [];
    }
    this.setStateWithData({ page, sorted });
  };

  handleChangeRowsPerPage = rowsPerPage => {
    this.setStateWithData({ rowsPerPage });
  };

  handleChangeFilter = filterText => {
    const { onFilter } = this.props;
    this.setStateWithData({ filterText }, onFilter);
  };

  isSelected = id => {
    const { selected } = { ...this.state };
    return selected.indexOf(id) !== -1;
  };

  isExpanded = id => {
    const { expanded } = { ...this.state };
    return expanded.indexOf(id) !== -1;
  };

  isGroupExpanded = path => {
    const { groupExpanded } = this.state;
    return loadshGet(groupExpanded, path);
  };

  isEditingOn = (id, dataMapKey) => {
    const { edited } = { ...this.state };
    if (edited === null) {
      return false;
    }
    const { id: idState, column } = edited;
    const { dataMapKey: dataMapKeyState } = column;
    return idState === id && dataMapKeyState === dataMapKey;
  };

  isEditingNodeClicked = event => {
    const { edited } = this.state;
    return edited !== null && edited.node.contains(event.target);
  };

  render() {
    const {
      classes,
      id,
      showToolbar,
      showPagination,
      showRowsPerPage,
      rowsPerPageOptions,
      labels: { entries, noResults, searchPlaceholderText, displayedRows },
      hasMultiSelect,
      isSortable,
      isEditable,
      idMapKey,
      expanderComponent,
      toolbarRightComponent,
      toolbarRightComponentProps,
      isDataSetLevel,
      style: {
        tableCell: tableCellStyle = {},
        toolbar: toolbarStyle = {},
        pagination: paginationStyle = {},
      } = {},
      umClass,
      rtl,
    } = this.props;
    const {
      order,
      orderBy,
      selected,
      filterText,
      sorted,
      sortedData,
      allVisibleColumns: columnData,
      isMultiSort,
    } = this.state;
    let { rowsPerPage, page } = this.state;

    let paginatedData;
    let isRowsPerPageEnabled = true;
    if (isDataSetLevel || filterText === "") {
      paginatedData = paginateData(rowsPerPage, page, sortedData);
    } else {
      paginatedData = sortedData;
      rowsPerPage = sortedData.length > 0 ? sortedData.length : 1;
      page = 0;
      isRowsPerPageEnabled = false;
    }
    const paperProps = {};
    if (rtl) {
      paperProps.dir = "rtl";
    }
    return (
      <Paper id={id} className={css(classes.root, umClass)} {...paperProps}>
        {showToolbar && (
          <TableToolbar
            isRowsPerPageEnabled={isRowsPerPageEnabled}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            filterText={filterText}
            onChangeFilter={this.handleChangeFilter}
            columnData={columnData}
            labelEntries={entries}
            showRowsPerPage={showRowsPerPage}
            labelSearchPlaceholder={searchPlaceholderText}
            rightComponent={toolbarRightComponent}
            rightComponentProps={{
              selected,
              sortedData,
              ...toolbarRightComponentProps,
            }}
            style={toolbarStyle}
            rtl={rtl}
          />
        )}
        <div className={css(classes.tableWrapper)}>
          <Table className={css(classes.table, classes.sticky)} aria-labelledby="tableTitle">
            <TableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              onRequestSortIcon={this.handleRequetSortOrder}
              rowCount={sortedData.length}
              columnData={columnData}
              hasMultiSelect={hasMultiSelect}
              isMultiSort={isMultiSort}
              idMapKey={idMapKey}
              isSortable={isSortable}
              sorted={sorted}
              style={tableCellStyle}
              rtl={rtl}
            />
          </Table>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableBody
              columnData={columnData}
              data={paginatedData}
              isSelected={this.isSelected}
              isGroupExpanded={this.isGroupExpanded}
              isExpanded={this.isExpanded}
              isEditingOn={this.isEditingOn}
              isEditingNodeClicked={this.isEditingNodeClicked}
              isEditable={isEditable}
              onCellClick={this.handleEditClick}
              onGroupExpanderClick={this.handleGroupExpanderClick}
              labelNoResults={noResults}
              hasMultiSelect={hasMultiSelect}
              idMapKey={idMapKey}
              expanderComponent={expanderComponent}
              onSaveEdit={this.handleEditSave}
              onCancelEdit={this.handleCancelEdit}
              style={tableCellStyle}
              rtl={rtl}
            />
          </Table>
        </div>
        {showPagination && (
          <Paging
            component="div"
            count={sortedData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            labelDisplayedRows={displayedRows}
            style={paginationStyle}
            rtl={rtl}
          />
        )}
      </Paper>
    );
  }
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
  idMapKey: PropTypes.string.isRequired,
  hideColumns: PropTypes.array,
  groupBy: PropTypes.array,
  showToolbar: PropTypes.bool,
  showPagination: PropTypes.bool,
  showRowsPerPage: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.shape({
    entries: PropTypes.node,
    noResults: PropTypes.node,
    searchPlaceholderText: PropTypes.string,
    displayedRows: PropTypes.func,
  }),
  isSortable: PropTypes.bool,
  isMultiSort: PropTypes.bool,
  isEditable: PropTypes.bool,
  hasMultiSelect: PropTypes.bool,
  isDataSetLevel: PropTypes.bool,
  rtl: PropTypes.bool,
  scrollHeight: PropTypes.number,
  defaultOrdering: PropTypes.oneOf(["asc", "desc"]),
  defaultSortMethod: PropTypes.func,
  defaultFilterMethod: PropTypes.func,
  expanderComponent: PropTypes.func,
  toolbarRightComponent: PropTypes.func,
  toolbarRightComponentProps: PropTypes.object,
  onMultiSelect: PropTypes.func,
  onFilter: PropTypes.func,
  onSort: PropTypes.func,
  onSave: PropTypes.func,
  style: PropTypes.shape({
    root: PropTypes.object,
    tableWrapper: PropTypes.object,
    table: PropTypes.object,
    tableCell: PropTypes.shape({
      root: PropTypes.object,
      head: PropTypes.object,
      numeric: PropTypes.object,
    }),
    toolbar: PropTypes.shape({
      root: PropTypes.object,
      searchContainer: PropTypes.object,
      filter: PropTypes.object,
      numOfEntries: PropTypes.shape({
        root: PropTypes.object,
        toolbar: PropTypes.object,
        labelStyle: PropTypes.object,
      }),
    }),
    pagination: PropTypes.shape({
      root: PropTypes.object,
      toolbar: PropTypes.object,
      labelStyle: PropTypes.object,
      paginationActions: PropTypes.object,
    }),
  }),
  umClass: PropTypes.string,
};

Grid.defaultProps = {
  hideColumns: [],
  groupBy: [],
  showToolbar: true,
  showPagination: true,
  showRowsPerPage: true,
  rowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 25],
  labels: {
    entries: "Entries",
    noResults: "No results found",
    searchPlaceholderText: "Search ..",
    displayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  },
  isSortable: true,
  isMultiSort: false,
  isEditable: false,
  hasMultiSelect: false,
  isDataSetLevel: true,
  rtl: false,
  defaultOrdering: "asc",
  defaultSortMethod: sortMethod,
  defaultFilterMethod: filterData,
  toolbarRightComponent: emptyFunction,
  toolbarRightComponentProps: {},
  onMultiSelect: emptyFunction,
  onFilter: emptyFunction,
  onSort: emptyFunction,
  onSave: emptyFunction,
};

export default WithThemeMaterial(styles)(Grid);
// React.forwardRef((props, ref) => <GridWrapper {...props} innerRef={ref} />);
