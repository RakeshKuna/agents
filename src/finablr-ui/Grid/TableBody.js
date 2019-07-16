import React from "react";
import PropTypes from "prop-types";
import MdTableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";

import { getFirstDefined } from "./Helpers";
import { emptyFunction } from "../utils";
import GroupByIcon from "./GroupByIcon";
import TableCell from "./TableCell";
import EditableCell from "./Editable/Cell";

const getVisibleColCount = columnData => columnData.filter(col => col.show !== false).length;

const TableBody = ({
  columnData,
  data,
  onRowClick,
  onCellClick,
  isSelected,
  isExpanded,
  isEditingOn,
  isEditingNodeClicked,
  isEditable,
  expanderComponent,
  isGroupExpanded,
  onGroupExpanderClick,
  idMapKey,
  labelNoResults,
  onSaveEdit,
  onCancelEdit,
  style,
  rtl,
}) => {
  const createEditHandler = (column, id) => event => {
    const editable = getFirstDefined(column.isEditable, isEditable, false);
    if (editable) {
      onCellClick(event, column, id);
    }
  };

  const makeTableRow = (row, i, path = []) => {
    const { groupID, groupedByPivot = false } = row;
    const nestingPath = path.concat([i]);
    const id = row[idMapKey];
    const groupExpanded = isGroupExpanded(nestingPath);
    const selected = isSelected(id);
    const rowExpanded = isExpanded(id);

    return (
      <React.Fragment key={nestingPath.join("_")}>
        <TableRow hover onClick={event => onRowClick(event, id)} tabIndex={-1} selected={selected}>
          {columnData.map((column, index) => {
            let cellContent;
            let groupByComponent = null;
            let groupByCount = null;
            const {
              dataMapKey,
              cellRender,
              isGrouped = false,
              isNumeric = false,
              width,
              type = "text",
              options: availableOptions,
              editProps = {},
              cellProps = {},
            } = column;

            const cellValue = row[dataMapKey] !== undefined ? row[dataMapKey] : null;
            const isEditOn = id && isEditingOn(id, dataMapKey);
            if (
              (isGrouped && groupID !== dataMapKey) ||
              (dataMapKey === "_selector" && groupedByPivot) ||
              (dataMapKey === "_expander" && groupedByPivot)
            ) {
              cellContent = null;
            } else if (cellRender) {
              cellContent = cellRender(row);
            } else {
              cellContent = cellValue;
            }
            if (groupedByPivot && groupID === dataMapKey) {
              groupByComponent = (
                <GroupByIcon
                  onMouseDown={onGroupExpanderClick(nestingPath, groupExpanded)}
                  disableRipple
                  disableTouchRipple
                  icon={groupExpanded ? "chevron-down" : "chevron-right"}
                />
              );
              groupByCount = ` (${row.subRows.length})`;
            }
            if (isEditOn) {
              cellContent = (
                <EditableCell
                  type={type}
                  value={cellValue}
                  availableOptions={availableOptions}
                  onSaveEdit={onSaveEdit}
                  onCancelEdit={onCancelEdit}
                  editProps={editProps}
                  isEditingNodeClicked={isEditingNodeClicked}
                  rtl={rtl}
                />
              );
            }

            return (
              <TableCell
                firstCell={index === 0}
                onDoubleClick={
                  !groupedByPivot ? createEditHandler(column, id, cellValue) : undefined
                }
                key={dataMapKey}
                numeric={isNumeric}
                width={width}
                rtl={rtl}
                style={style}
                {...cellProps}
              >
                {groupByComponent}
                {cellContent}
                {groupByCount}
              </TableCell>
            );
          })}
        </TableRow>
        {groupExpanded &&
          row.subRows &&
          row.subRows.map((subRow, subIndex) => makeTableRow(subRow, subIndex, nestingPath))}
        {rowExpanded && (
          <TableRow key={`${id}_expanded`}>
            <TableCell colSpan={getVisibleColCount(columnData)}>{expanderComponent(row)}</TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };

  return (
    <MdTableBody>
      {data.length > 0 &&
        data.map((row, i) => {
          const { indexKey } = row;
          const id = indexKey;
          return <React.Fragment key={`${id}_fragment`}>{makeTableRow(row, i)}</React.Fragment>;
        })}
      {data.length === 0 && (
        <TableRow>
          <TableCell colSpan={getVisibleColCount(columnData)}>{labelNoResults}</TableCell>
        </TableRow>
      )}
    </MdTableBody>
  );
};

TableBody.propTypes = {
  columnData: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  idMapKey: PropTypes.string.isRequired,
  isSelected: PropTypes.func,
  isGroupExpanded: PropTypes.func,
  isExpanded: PropTypes.func,
  isEditingOn: PropTypes.func,
  isEditingNodeClicked: PropTypes.func,
  isEditable: PropTypes.bool,
  expanderComponent: PropTypes.func,
  onSaveEdit: PropTypes.func,
  onCancelEdit: PropTypes.func,
  onRowClick: PropTypes.func,
  onCellClick: PropTypes.func,
  onGroupExpanderClick: PropTypes.func,
  labelNoResults: PropTypes.string,
  style: PropTypes.object,
  rtl: PropTypes.bool,
};

TableBody.defaultProps = {
  isSelected: emptyFunction,
  isExpanded: emptyFunction,
  isEditingOn: emptyFunction,
  isEditingNodeClicked: emptyFunction,
  expanderComponent: emptyFunction,
  onSaveEdit: emptyFunction,
  onCancelEdit: emptyFunction,
  onRowClick: emptyFunction,
  onCellClick: emptyFunction,
  onGroupExpanderClick: emptyFunction,
  labelNoResults: "No results found",
  rtl: false,
};

export default TableBody;
