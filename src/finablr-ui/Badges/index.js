import React from "react";
import PropTypes from "prop-types";
import styles from "./styles/style";
import { css } from "../utils";
import WithTheme from "../utils/HOC/WithTheme";

const Badges = props => {
  const {
    classes,
    umClass,
    onMouseOver,
    value,
    onfocus,
    umStyle,
    type,
    style,
    theme,
    ...otherParam
  } = props;
  return (
    <span
      className={css(umClass, classes.badgeProp, classes.badge)}
      onMouseOver={onMouseOver}
      onFocus={onfocus}
      {...otherParam}
    >
      <span className={css(classes.badgeValue)}>{value}</span>
    </span>
  );
};

Badges.propTypes = {
  classes: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
  style: PropTypes.object,
  theme: PropTypes.object,
  umClass: PropTypes.string,
  type: PropTypes.oneOf(["notifiyBadge", "labelBadge"]),
  umStyle: PropTypes.oneOf([
    "red",
    "green",
    "blue",
    "orange",
    "black",
    "disabled",
    "primary",
    "secondary",
  ]),
  onMouseOver: PropTypes.func,
  onfocus: PropTypes.func,
};

Badges.defaultProps = {
  type: "notifiyBadge",
  umStyle: "primary",
  umClass: "",
  style: {},
};

const themeStyle = {
  umStyle: "primary",
};

export default WithTheme(Badges, styles)(themeStyle);
