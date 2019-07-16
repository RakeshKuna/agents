import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';

import { compose } from "redux";
import { connect } from "react-redux";

import styles from "./styles/style";

const Loader = ({ classes, progress }) => {
  return (
        <div>
        <LinearProgress
          classes={{
            colorPrimary: classes.progressPrimary,
            barColorPrimary: classes.barColorPrimary,
            root: classes.progressRoot,
          }}
        />
        <div className={classes.loaderMask} />
      </div>
  )
};

// const mapStateToProps = ({ loader: { progress } }) => {
//   return {
//     progress,
//   };
// };

// export default compose(
//   connect(mapStateToProps),
//   withStyles(styles),
// )(Loader);

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loader);