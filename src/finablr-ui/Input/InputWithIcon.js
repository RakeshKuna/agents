import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Icon from "../Icons";
import { css } from "../utils";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import styles from "./styles/style";

const InputWithIcon = ({ classes, style, icon, children }) => (
  <Grid container spacing={8} alignItems="flex-end" className={css(classes.GridClass)}>
    <Grid item>
      {typeof icon === "string" ? (
        <Icon
          iconName={icon}
          className={css("mdi-24px")}
          style={{ ...classes.iconDefaultStyle, ...style }}
        />
      ) : (
        icon
      )}
    </Grid>
    <Grid item className={css(classes.GridRightIcon)}>
      {children}
    </Grid>
  </Grid>
);

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
  style: PropTypes.object,
};

export default WithThemeMaterial(styles)(InputWithIcon);
