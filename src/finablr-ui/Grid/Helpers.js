const isPropFilterable = headerOptions => headerOptions.filterable === true;

const getFirstDefined = (...args) => {
  for (let i = 0; i < args.length; i += 1) {
    if (typeof args[i] !== "undefined") {
      return args[i];
    }
  }
  return false;
};

const getPageRowIndex = (rowsPerPage, currentPage) => {
  const startRow = currentPage * rowsPerPage;
  const endRow = (currentPage + 1) * rowsPerPage;

  return { startRow, endRow };
};

const orderBy = (arr, funcs, dirs) =>
  arr.sort((rowA, rowB) => {
    for (let i = 0; i < funcs.length; i += 1) {
      const comp = funcs[i];
      const desc = dirs[i] === false || dirs[i] === "desc";
      const sortInt = comp(rowA, rowB);
      if (sortInt) {
        return desc ? -sortInt : sortInt;
      }
    }
    return 0;
  });

const sortMethod = (input1, input2) => {
  let value1 = input1 === null || input1 === undefined ? -Infinity : input1;
  let value2 = input2 === null || input2 === undefined ? -Infinity : input2;
  value1 = typeof value1 === "string" ? value1.toLowerCase() : value1;
  value2 = typeof value2 === "string" ? value2.toLowerCase() : value2;
  if (value1 > value2) {
    return 1;
  }
  if (value1 < value2) {
    return -1;
  }
  return 0;
};

const sortData = (data, sorted, sortFunc, tableHeader, isDataSetLevel, startRow, endRow) => {
  if (!sorted.length) {
    return data;
  }
  const sortMethodsByColumnID = {};

  tableHeader.filter(col => col.sortMethod).forEach(col => {
    sortMethodsByColumnID[col.dataMapKey] = col.sortMethod;
  });
  let dataForSorting = data;
  if (!isDataSetLevel) {
    dataForSorting = data.slice(startRow, endRow);
  }
  let sortedData = orderBy(
    dataForSorting,
    sorted.map(sort => {
      if (sortMethodsByColumnID[sort.id]) {
        return (a, b) => sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id]);
      }
      return (a, b) => sortFunc(a[sort.id], b[sort.id]);
    }),
    sorted.map(d => d.order)
  );
  if (!isDataSetLevel) {
    sortedData = [...data.slice(0, startRow), ...sortedData, ...data.slice(endRow)];
  }

  return sortedData;
};
const filterData = (tableHeader, filterText, data, isDataSetLevel, startRow, endRow) => {
  if (filterText === "") {
    return data;
  }
  let filteredData = data;

  if (!isDataSetLevel) {
    filteredData = data.slice(startRow, endRow);
  }

  filteredData = filteredData.filter(rowData => {
    let isElementIncluded = false;
    let i = 0;

    const elementProps = Object.keys(rowData);
    const elementPropLength = elementProps.length;

    while (!isElementIncluded && i < elementPropLength) {
      const prop = elementProps[i];

      const headerOptions = tableHeader.find(header => header.dataMapKey === prop);
      if (headerOptions && isPropFilterable(headerOptions)) {
        let columnValue = rowData[prop];
        if (typeof headerOptions.onFilter === "function") {
          columnValue = headerOptions.onFilter(filterText, rowData, data);
        }
        if (typeof columnValue !== "string") {
          try {
            columnValue = columnValue.toString();
          } catch (error) {
            columnValue = "";
          }
        }
        columnValue = columnValue.toLowerCase();
        isElementIncluded = columnValue.toLowerCase().includes(filterText.toLowerCase());
      }

      i += 1;
    }

    return isElementIncluded;
  });

  return filteredData;
};

const paginateData = (rowsPerPage, currentPage, data) => {
  let paginatedData = data;

  if (rowsPerPage !== undefined) {
    const { startRow, endRow } = getPageRowIndex(rowsPerPage, currentPage);

    paginatedData = data.slice(startRow, endRow);
  }

  return paginatedData;
};

const findIndexById = (dataSet, idKey, value) => dataSet.findIndex(data => data[idKey] === value);

export {
  sortData,
  sortMethod,
  filterData,
  paginateData,
  getFirstDefined,
  getPageRowIndex,
  findIndexById,
};
