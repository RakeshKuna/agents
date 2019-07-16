import React from "react";
import PropTypes from "prop-types";

import WithTheme from "../utils/HOC/WithTheme";
import styles from "./styles/style";
import { css } from "../utils";
import "@mdi/font/css/materialdesignicons.min.css";

const Icon = ({ style, umStyle, iconName, className, classes, theme, ...othersProps }) => (
  <i className={css("mdi", `mdi-${iconName}`, classes.root, className)} {...othersProps} />
);

Icon.propTypes = {
  classes: PropTypes.object.isRequired,
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object,
  umStyle: PropTypes.string,
};

Icon.defaultProps = {
  style: {},
};

export default WithTheme(Icon, styles)();
