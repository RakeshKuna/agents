import React from "react";
import PropTypes from "prop-types";
import MdTableCell from "@material-ui/core/TableCell";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css } from "../utils";
import styles from "./styles/TableCell";

const TableCell = ({
  classes,
  head = false,
  firstCell = false,
  numeric = false,
  width,
  style,
  rtl,
  ...cellProps
}) => {
  const { className, ...otherCellProps } = cellProps;
  return (
    <MdTableCell
      numeric={numeric}
      className={css(
        classes.root,
        classes.customRoot,
        { [classes.head]: head },
        { [classes.numeric]: numeric },
        { [classes.firstCell]: firstCell },
        className
      )}
      {...otherCellProps}
    />
  );
};

TableCell.propTypes = {
  classes: PropTypes.object.isRequired,
  head: PropTypes.bool,
  firstCell: PropTypes.bool,
  numeric: PropTypes.bool,
  width: PropTypes.string,
  rtl: PropTypes.bool,
  style: PropTypes.shape({
    root: PropTypes.object,
    head: PropTypes.object,
    numeric: PropTypes.object,
  }),
};

TableCell.defaultProps = {
  head: false,
  firstCell: false,
  numeric: false,
  rtl: false,
};

export default WithThemeMaterial(styles)(TableCell);
