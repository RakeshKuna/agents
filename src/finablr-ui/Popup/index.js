import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import { css } from "../utils";
import styles from "./styles/style";
import { IconButton } from "../Button";

const Popup = props => {
  const {
    classes,
    umClass,
    umStyle,
    rtl,
    showCloseButton,
    show,
    title,
    children,
    umSize,
    onHide,
    footer,
    popupClasses,
    onShow,
    ...otherParam
  } = props;

  return (
    <Dialog
      maxWidth={umSize}
      open={show}
      onClose={onHide}
      onEntered={onShow}
      className={css(classes.root, umClass)}
      {...otherParam}
    >
      <div className={classes.dialogHeader}>
        <DialogTitle disableTypography classes={{ root: classes.titleRoot }}>
          {title}
        </DialogTitle>
        {showCloseButton && <IconButton umStyle="default" icon="close" onClick={onHide} />}
      </div>
      <DialogContent classes={popupClasses.dialogContent}>
        <DialogContentText component="div" classes={popupClasses.dialogContentText}>
          {children}
        </DialogContentText>
      </DialogContent>
      {footer && <DialogActions classes={popupClasses.dialogActions}>{footer}</DialogActions>}
    </Dialog>
  );
};

Popup.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  showCloseButton: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  footer: PropTypes.node,
  scroll: PropTypes.oneOf(["paper", "body"]),
  umSize: PropTypes.oneOf(["sm", "xs", "md", false]),
  onHide: PropTypes.func,
  rtl: PropTypes.bool,
  umClass: PropTypes.string,
  style: PropTypes.object,
  onShow: PropTypes.func,
  popupClasses: PropTypes.object,
};

Popup.defaultProps = {
  title: "",
  rtl: false,
  umSize: "sm",
  disableEscapeKeyDown: false,
  disableBackdropClick: false,
  popupClasses: {
    dialogActions: {},
    dialogContent: {},
    dialogContentText: {},
  },
};

export default WithThemeMaterial(styles)(Popup);
