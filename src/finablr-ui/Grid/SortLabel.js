import React from "react";
import PropTypes from "prop-types";
import ButtonBase from "@material-ui/core/ButtonBase";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import Icon from "../Icons";
import StyledBadge from "./SortingBadge";
import { css, ucFirst } from "../utils";
import styles from "./styles/SortLabel";

const TableSortLabel = ({
  active,
  classes,
  className,
  children,
  direction,
  onIconClick,
  showOrderNumber,
  orderNumber,
  rtl,
  ...other
}) => (
  <ButtonBase
    className={css(classes.root, { [classes.active]: active }, className)}
    component="span"
    disableRipple
    {...other}
  >
    {children}
    {active && (
      <StyledBadge
        rtl={rtl}
        onClick={onIconClick}
        value={
          <Icon
            iconName="arrow-down-thick"
            className={css(classes.icon, classes[`iconDirection${ucFirst(direction)}`])}
          />
        }
      />
    )}
    {showOrderNumber && <StyledBadge value={orderNumber} />}
  </ButtonBase>
);

TableSortLabel.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  onIconClick: PropTypes.func,
  direction: PropTypes.oneOf(["asc", "desc"]),
  showOrderNumber: PropTypes.bool,
  orderNumber: PropTypes.number,
  rtl: PropTypes.bool,
};

TableSortLabel.defaultProps = {
  active: false,
  direction: "desc",
  rtl: false,
};

export default WithThemeMaterial(styles, { name: "SortLabel" })(TableSortLabel);
