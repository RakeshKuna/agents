import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import PropTypes from "prop-types";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";
import styles from "./styles/style";
import { css } from "../utils";

const Accordion = props => {
  const {
    classes,
    children,
    defaultExpanded,
    isEnabled,
    expanded,
    onChange,
    collapseProps,
    panelAction,
    panelHeading,
    expandIcon,
    iconButtonProps,
    tabIndex,
    style,
    umPanelClass,
    umHeadingClass,
    umBodyClass,
    umActionClass,
    rtl,
    ...otherParam
  } = props;

  return (
    <ExpansionPanel
      defaultExpanded={defaultExpanded}
      disabled={!isEnabled}
      expanded={expanded}
      onChange={onChange}
      classes={{ root: classes.root, disabled: classes.disabled, expanded: classes.expanded }}
      className={css(classes.rootStyle, umPanelClass)}
      CollapseProps={collapseProps}
      {...otherParam}
    >
      <ExpansionPanelSummary
        expandIcon={expandIcon}
        IconButtonProps={iconButtonProps}
        classes={{
          root: classes.headingRoot,
          disabled: classes.headingDisabled,
          expanded: classes.headingExpanded,
          focused: classes.headingFocused,
          content: classes.headingContent,
          expandIcon: classes.headingExpandIcon,
        }}
        className={css(umHeadingClass)}
        tabIndex={tabIndex}
      >
        {panelHeading}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.bodyRoot }} className={css(umBodyClass)}>
        {children}
      </ExpansionPanelDetails>

      {panelAction && (
        <ExpansionPanelActions
          classes={{ root: classes.actionRoot, action: classes.action }}
          className={css(umActionClass)}
        >
          {panelAction}
        </ExpansionPanelActions>
      )}
    </ExpansionPanel>
  );
};

Accordion.propTypes = {
  classes: PropTypes.object.isRequired,
  defaultExpanded: PropTypes.bool,
  isEnabled: PropTypes.bool,
  expanded: PropTypes.bool,
  rtl: PropTypes.bool,
  style: PropTypes.object,
  collapseProps: PropTypes.object,
  iconButtonProps: PropTypes.object,
  panelAction: PropTypes.node,
  panelHeading: PropTypes.node,
  expandIcon: PropTypes.node,
  onChange: PropTypes.func,
  umPanelClass: PropTypes.string,
  umHeadingClass: PropTypes.string,
  umBodyClass: PropTypes.string,
  umActionClass: PropTypes.string,
  tabIndex: PropTypes.number,
};

Accordion.defaultProps = {
  defaultExpanded: false,
  isEnabled: true,
  rtl: false,
  style: {},
};

export default WithThemeMaterial(styles)(Accordion);
