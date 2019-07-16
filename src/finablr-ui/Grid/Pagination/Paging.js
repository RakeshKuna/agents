import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import WithThemeMaterial from "../../utils/HOC/WithThemeMaterial";
import styles from "../styles/Paging";
import PaginationActions from "./PaginationActions";

class Pagination extends React.Component {
  componentDidUpdate() {
    const { count, onChangePage, page, rowsPerPage } = this.props;
    const newLastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
    if (page > newLastPage) {
      onChangePage(null, newLastPage);
    }
  }

  render() {
    const {
      ActionsComponent,
      backIconButtonProps,
      classes,
      colSpan: colSpanProp,
      component: Component,
      count,
      labelDisplayedRows,
      nextIconButtonProps,
      onChangePage,
      page,
      rowsPerPage,
      style: { paginationActions: paginationActionsStyle = {} } = {},
      rtl,
      ...other
    } = this.props;

    let colSpan;

    if (Component === TableCell || Component === "td") {
      colSpan = colSpanProp || 1000; // col-span over everything
    }

    return (
      <Component className={classes.root} colSpan={colSpan} {...other}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.spacer} />
          <Typography variant="caption" className={classes.caption}>
            {labelDisplayedRows({
              from: count === 0 ? 0 : page * rowsPerPage + 1,
              to: Math.min(count, (page + 1) * rowsPerPage),
              count,
              page,
            })}
          </Typography>
          <ActionsComponent
            className={classes.actions}
            backIconButtonProps={backIconButtonProps}
            count={count}
            nextIconButtonProps={nextIconButtonProps}
            onChangePage={onChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            style={paginationActionsStyle}
            rtl={rtl}
          />
        </Toolbar>
      </Component>
    );
  }
}

Pagination.propTypes = {
  ActionsComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  backIconButtonProps: PropTypes.object,
  classes: PropTypes.object.isRequired,
  colSpan: PropTypes.number,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  count: PropTypes.number.isRequired,
  labelDisplayedRows: PropTypes.func,
  nextIconButtonProps: PropTypes.object,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  rtl: PropTypes.bool,
  style: PropTypes.shape({
    root: PropTypes.object,
    toolbar: PropTypes.object,
    labelStyle: PropTypes.object,
    paginationActions: PropTypes.object,
  }),
};

Pagination.defaultProps = {
  ActionsComponent: PaginationActions,
  component: TableCell,
  labelDisplayedRows: ({ from, to, count }) => `${from}-${to} of ${count}`,
  rtl: true,
};

export default WithThemeMaterial(styles, { name: "Paging" })(Pagination);
