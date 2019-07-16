import React from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import styles from "./styles/tabsStyle";
import { css } from "../utils";
import WithThemeMaterial from "../utils/HOC/WithThemeMaterial";

const TabsComponent = props => {
  const {
    classes,
    children,
    onChange,
    centered,
    fullWidth,
    indicatorColor,
    scrollable,
    scrollButtons,
    value,
    stepAction,
    umStyle,
    rtl,
    ...otherParams
  } = props;
  let isValueAchieved = false;
  let reactChildern = React.Children.toArray(children);
  if (scrollable && rtl) {
    reactChildern = React.Children.toArray(children).reverse();
  }
  return (
    <div className={css(classes.tabRoot)}>
      <Tabs
        value={value}
        onChange={onChange}
        centered={centered}
        fullWidth={fullWidth}
        indicatorColor={indicatorColor}
        classes={{
          root: classes.root,
          flexContainer: classes.flexContainer,
          centered: classes.centered,
          scrollable: classes.scrollable,
          fixed: classes.fixed,
          indicator: classes.indicator,
          scroller: classes.scroller,
          scrollButtons: classes.scrollButtons,
          scrollButtonsAuto: classes.scrollButtonsAuto,
        }}
        scrollable={scrollable}
        scrollButtons={scrollButtons}
        {...otherParams}
      >
        {reactChildern.map((child, index) => {
          if (typeof child.type === "string") {
            console.log("Finablr-UI: the Tabs component accept a React Element as a child."); //eslint-disable-line
            return null;
          }
          let disabled = child.props.isEnabled === undefined ? false : !child.props.isEnabled;
          if (stepAction) {
            const tabValue = child.props.value ? child.props.value : index;
            disabled = isValueAchieved;
            if (tabValue === value) {
              isValueAchieved = true;
            }
          }
          if (scrollable && rtl && !child.props.value) {
            const childValue = children.length - index - 1;
            return React.cloneElement(child, { umStyle, disabled, rtl, value: childValue });
          }
          return React.cloneElement(child, { umStyle, disabled, rtl });
        })}
      </Tabs>
    </div>
  );
};

TabsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  centered: PropTypes.bool,
  scrollable: PropTypes.bool,
  fullWidth: PropTypes.bool,
  stepAction: PropTypes.bool,
  rtl: PropTypes.bool,
  value: PropTypes.any,
  indicatorColor: PropTypes.oneOf(["primary", "secondary"]),
  scrollButtons: PropTypes.oneOf(["auto", "on", "off"]),
  umStyle: PropTypes.oneOf(["primary", "secondary", "default"]),
};
TabsComponent.defaultProps = {
  centered: false,
  scrollable: false,
  fullWidth: false,
  rtl: false,
  stepAction: false,
  scrollButtons: "auto",
  indicatorColor: "secondary",
};
export default WithThemeMaterial(styles)(TabsComponent);
