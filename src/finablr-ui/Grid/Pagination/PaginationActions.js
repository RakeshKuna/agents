import React from "react";
import PropTypes from "prop-types";
import IconButton from "../../Button/IconButton";

import WithThemeMaterial from "../../utils/HOC/WithThemeMaterial";
import styles from "../styles/PaginationActions";

const TablePaginationActions = ({
  classes,
  page,
  count,
  rowsPerPage,
  onChangePage,
  style, // eslint-disable-line
  rtl,
}) => {
  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <div className={classes.root}>
      <IconButton
        icon={rtl ? "page-last" : "page-first"}
        onClick={handleFirstPageButtonClick}
        isEnabled={page > 0}
        umStyle="default"
        aria-label="First Page"
      />
      <IconButton
        icon={rtl ? "chevron-right" : "chevron-left"}
        onClick={handleBackButtonClick}
        isEnabled={page > 0}
        umStyle="default"
        aria-label="Previous Page"
      />
      <IconButton
        icon={rtl ? "chevron-left" : "chevron-right"}
        onClick={handleNextButtonClick}
        isEnabled={page < Math.ceil(count / rowsPerPage) - 1}
        umStyle="default"
        aria-label="Next Page"
      />
      <IconButton
        icon={rtl ? "page-first" : "page-last"}
        onClick={handleLastPageButtonClick}
        isEnabled={page < Math.ceil(count / rowsPerPage) - 1}
        umStyle="default"
        aria-label="Last Page"
      />
    </div>
  );
};

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rtl: PropTypes.bool,
  style: PropTypes.object,
};

TablePaginationActions.defaultProps = {
  rtl: false,
};

export default WithThemeMaterial(styles, { name: "PaginationActions" })(TablePaginationActions);
