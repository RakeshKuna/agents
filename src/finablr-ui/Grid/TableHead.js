import React from "react";
import PropTypes from "prop-types";
import MdTableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { getFirstDefined } from "./Helpers";
import SortLabel from "./SortLabel";
import TableCell from "./TableCell";

const TableHead = ({
  columnData,
  sorted,
  onRequestSort,
  onRequestSortIcon,
  isSortable,
  isMultiSort,
  style,
  rtl,
}) => {
  const createSortHandler = column => event => {
    const sortable = getFirstDefined(column.isSortable, isSortable, false);
    if (sortable) {
      onRequestSort(event, column.dataMapKey);
    }
  };
  const createSortIconHandler = column => event => {
    const sortable = getFirstDefined(column.isSortable, isSortable, false);
    if (sortable) {
      event.preventDefault();
      event.stopPropagation();
      onRequestSortIcon(event, column.dataMapKey);
    }
  };
  return (
    <MdTableHead>
      <TableRow>
        {columnData.map((column, index) => {
          let sort;
          const { dataMapKey, label = null, isNumeric = false, width, cellProps = {} } = column;
          const sortedItemIntex = sorted.findIndex(item => item.id === dataMapKey);
          if (sortedItemIntex !== -1) {
            sort = sorted[sortedItemIntex];
          }
          const sortEnabled = sort !== undefined;
          const cellContent = typeof label === "function" ? label(column) : label;
          return (
            <TableCell
              head
              key={dataMapKey}
              firstCell={index === 0}
              numeric={isNumeric}
              width={width}
              style={style}
              rtl={rtl}
              {...cellProps}
            >
              <SortLabel
                active={sortEnabled}
                direction={sort && sort.order}
                onClick={createSortHandler(column)}
                onIconClick={createSortIconHandler(column)}
                showOrderNumber={sortEnabled && isMultiSort}
                orderNumber={sortedItemIntex + 1}
                rtl={rtl}
              >
                {cellContent}
              </SortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </MdTableHead>
  );
};

TableHead.propTypes = {
  columnData: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onRequestSortIcon: PropTypes.func.isRequired,
  sorted: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, order: PropTypes.string })),
  isSortable: PropTypes.bool,
  isMultiSort: PropTypes.bool,
  style: PropTypes.object,
  rtl: PropTypes.bool,
};

TableHead.defaultProps = {
  isSortable: false,
  isMultiSort: false,
  rtl: false,
};

export default TableHead;
