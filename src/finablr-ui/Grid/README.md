# Props
### Grid

| Props                      | Type             | Default               | Description                                                                    |
| :------------------------- | :--------------- | :-------------------- | :----------------------------------------------------------------------------- |
| data*                      | array            |                       | array of data to display                                                       |
| columnData*                | array            |                       | table column information, for options [see Column](#column)                    |
| idMapKey*                  | string           |                       | unique identification key in each row                                          |
| hideColumns                | array            |                       | array of column key to hide                                                    |
| groupBy                    | array            |                       | array of column key that needs to group                                        |
| showToolbar                | boolean          | true                  | to show top toolbar                                                            |
| showPagination             | boolean          | true                  | to show pagination                                                             |
| showRowsPerPage            | boolean          | true                  | to show rows per page dropdown                                                 |
| rowsPerPage                | number           | 5                     | rows per page                                                                  |
| rowsPerPageOptions         | array            | [5, 10, 25]           | array of number for rowsPerPage option                                         |
| labels                     | object           | [see labels](#labels) | to change labels inside the grid                                               |
| isSortable                 | boolean          | true                  | to enable sorting                                                              |
| isMultiSort                | boolean          | false                 | to enable multisorting                                                         |
| isEditable                 | boolean          | false                 | to enable cell editing                                                         |
| hasMultiSelect             | boolean          | false                 | to enable multiselection checkbox                                              |
| isDataSetLevel             | boolean          | true                  | to enable sort/filter in dataset level                                         |
| scrollHeight               | number           |                       | table body scroll height                                                       |
| expanderComponent          | function         |                       | component to handle expand rendering                                           |
| toolbarRightComponent      | function         |                       | right side component in toolbar, like export and print icons                   |
| toolbarRightComponentProps | object           |                       | additional props to be send to toolbarRightComponent                           |
| defaultOrdering            | oneOf(asc, desc) |                       | default sort order                                                             |
| defaultSortMethod          | function         |                       | default sort method to override [see default method](#default-sort-method)     |
| defaultFilterMethod        | function         |                       | default filter method to override [see default method](#default-filter-method) |
| onMultiSelect              | function         |                       | callback select/unselect rows, when hasMultiSelect enabled                     |
| onFilter                   | function         |                       | callback after applying the filter                                             |
| onSort                     | function         |                       | callback after sorting applied                                                 |
| onSave                     | function         |                       | callback after saving the editable cell                                        |
| umClass                    | string           |                       | custom class name to override the grid                                         |
| style                      | object           |                       | CSS object to override the style [see style](#style)                           |
| rtl                        | boolean          | false                 | to enable rtl                                                                  |


# Column
```Grid``` component requires ```columnData``` as props, which is an array of objects containing the following properties 

| Name        | Type                                                  | Default | Description                                                                                          |
| :---------- | :---------------------------------------------------- | :------ | :--------------------------------------------------------------------------------------------------- |
| dataMapKey* | string                                                |         | mapping key for dataset                                                                              |
| label*      | string or function                                    |         | label to display in table head                                                                       |
| cellRender  | function                                              |         | custom function to render the cell, if not defined value will used as cell content                   |
| filterable  | boolean                                               |         | to include the column in the filter, if no column has filterable the searchbox will not be displayed |
| isEditable  | boolean                                               |         | to enable edit mode                                                                                  |
| isSortable  | boolean                                               |         | to enable sorting                                                                                    |
| sortMethod  | function                                              |         | custom sort method                                                                                   |
| type        | oneOf(text, numeric, decimal, date, select, checkbox) | text    | input type to show when editing                                                                      |
| options     | array                                                 |         | option array when type is select                                                                     |
| editProps   | object                                                |         | additional props for editable component                                                              |
| isNumeric   | boolean                                               | false   | is data is numeric, if true column will be right aligned                                             |
| width       | string                                                |         | to define the width of the cell                                                                      |

#### Note:
By default grid will create the cell content using mapped value. Use ```cellRender``` when we want more complex HTML inside the cells.
For example,
```js
{
  dataMapKey: "status",
  label: "Status",
  cellRender: row => <Checkbox checked={row["status"]} />,
}
```

# Labels
| Name                  | Type     | Description                                                                       |
| :-------------------- | :------- | :-------------------------------------------------------------------------------- |
| entries               | string   | label for num of entries                                                          |
| noResults             | string   | label for no records found in table body                                          |
| searchPlaceholderText | string   | placeholder text for filter input                                                 |
| displayedRows         | function | ({ from, to, count }) => `${from}-${to} of ${count}`, to format the displayedRows |

# Sorting 
* Sorting enabled by default
* Click column header to enable sort
* We can enable or disable specific column by passing isSortable in column options

# MultiSort
* MultiSorting can be enabled by setting ```isMultiSort=true```, click column header to enable sort
* Sort number will be displayed near the column
* Use Arrow to sort the column by asc and desc
* Clicking already sorted column will reset the sorting

# Filtering
* Filtering will be enabled when atleast a column option have ```filterable=true```

# Editable
* Set ```isEditable=true``` to enable editing
* Double click on the cell to edit
* Outside click after editing the cell will save the edited data
* ```Esc``` keypress will reset the edited data

# Style
| Name         | Type   | Description                                                                   |
| :----------- | :----- | :---------------------------------------------------------------------------- |
| root         | object | CSS object to override the root div style                                     |
| table        | object | CSS object to override the table style                                        |
| tableWrapper | object | CSS object to override the wrapper div of table style                         |
| tableCell    | object | CSS object to override the tablecell, [see TableCell style](#tablecell-style) |
| toolbar      | object | CSS object to override the toolbar, [see Toolbar style](#toolbar-style)       |
| pagination   | object | CSS object to override the toolbar, [see Pagination style](#pagination-style) |

# TableCell style
| Name    | Type   | Description                                                    |
| :------ | :----- | :------------------------------------------------------------- |
| root    | object | CSS object to override the root style                          |
| head    | object | CSS object to override the head ```td``` style                 |
| numeric | object | CSS object to override the ```td```, when tablecell is numeric |

# Toolbar style
| Name            | Type   | Description                                                                                     |
| :-------------- | :----- | :---------------------------------------------------------------------------------------------- |
| root            | object | CSS object to override the root div style                                                       |
| searchContainer | object | CSS object to override the search filter container style including rightComponent               |
| filter          | object | CSS object to override the wrapper div of filter input                                          |
| numOfEntries    | object | CSS object to override the numOfEntries dropdown, [see numOfEntries style](#numofentries-style) |

# NumOfEntries style
| Name       | Type   | Description                                    |
| :--------- | :----- | :--------------------------------------------- |
| root       | object | CSS object to override the root div style      |
| labelStyle | object | CSS object to override the label of pagination |

# Pagination style
| Name              | Type   | Description                                                     |
| :---------------- | :----- | :-------------------------------------------------------------- |
| root              | object | CSS object to override the root div style                       |
| labelStyle        | object | CSS object to override the label of pagination                  |
| PaginationActions | object | CSS object to override the pagination actions (prev, next, etc) |

# Grouping
* Grouping used to group the rows based on the column list
* Grouped columns can not be hidden
* Sorting will be applied only on the first level of grouping

# Default filter method
```js
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
          columnValue = columnValue.toString();
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
```

# Default sort method
```js
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
```

# Default sort method for column
```js
function sortMethod(input1, input2) {
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
}
```

# Usage
```js
import { Grid } from 'finablr-ui';

const gridProps = {
  // column configurations
  columnData: [
    {
      // mapping key in the dataset
      dataMapKey: "name",
      // column(header) label
      label: "Dessert (100g serving)",
      filterable: true,
      isEditable: true,
      isSortable: false,
      // specific width for the column, rest of the columns auto adjusted based on the width
      width: "100px"
    },
    {
      dataMapKey: "calories",
      label: "Calories",
      type: "numeric",
      isNumeric: true,
    },
    {
      dataMapKey: "fat",
      label: "Fat",
      cellRender: row => <Badge type="label" value={row["fat"]} />,
    },
    {
      dataMapKey: "fat",
      label: "Fat",
      isEditable: true,
      type: "select",
      isNumeric: true,
      options: [25, 6, 3.7],
    },
    { dataMapKey: "carbs", label: "Carbs (g)", isNumeric: true },
    { dataMapKey: "protein", label: "Protein (g)", isNumeric: true, type: "checkbox" },
  ],
  data: [],
  toolbarRightComponent: () => {},
  toolbarRightComponentProps: {},
  rowsPerPage: 10,
  idMapKey: "id",
  hasMultiSelect: true,
  isEditable: true,
  isMultiSort: true,
  isSortable: true,
  hideColumns: [],
  groupBy: [],
  expanderComponent: (row) => (
    <div style={{ padding: "20px" }}>
      <em>You can put any component you want here!</em>
    </div>
  ),
  labels: {
    entries: "per page",
    noResults: "No records",
    searchPlaceholderText: "Enter text to search ..",
  },
  showToolbar: false,
  showPagination: false,
  showRowsPerPage: false,
  isDataSetLevel: true,
  rowsPerPageOptions: [10, 50, 100, 500],
  scrollHeight: 300,
  rtl: true,
};

<Grid {...gridProps} />
 ```

# Event Handler

```js

function onMultiSelect(selectedIds) { }
function onFilter() { }
function onSort() { }
function onSave(rowId, columnKey, updatedValue) { }

<Grid {...gridProps} onSave={onSave} />

```