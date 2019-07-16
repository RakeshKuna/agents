import React, { Component } from "react";
import WithTheme from "../utils/HOC/WithTheme";
import styles from "./styles/style";
import { css } from "../utils";
import Icon from "../Icons/index";
import { propTypesList, defaultProps, themeStyle } from "./notificationUtils";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.closeBtnClick = this.closeBtnClick.bind(this);
    this.state = {
      showNotification: false,
      showCloseIcon: true,
    };
    this.showDelay = null;
    this.hideDelay = null;
  }

  componentDidMount() {
    const { delay, delayShow, delayHide, showCloseIcon, onClose } = this.props;
    clearTimeout(this.showDelay);
    clearTimeout(this.hideDelay);
    if (
      delay === 0 &&
      showCloseIcon &&
      (delayShow === 0 && showCloseIcon) &&
      (delayHide === 0 && showCloseIcon)
    ) {
      this.setState({ showCloseIcon: true, showNotification: true });
    } else {
      this.setState({ showCloseIcon: false });
      const timerShow = delay === 0 ? delayShow : delay;
      this.showDelay = setTimeout(() => {
        this.setState({ showNotification: true });
      }, timerShow);
      const timerHide = delay === 0 ? delayHide : delay * 2;
      this.hideDelay = setTimeout(() => {
        this.setState({ showNotification: false });
        onClose();
      }, timerHide);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.showDelay);
    clearTimeout(this.hideDelay);
  }

  closeBtnClick(e) {
    const { onClose } = this.props;
    this.setState({ showNotification: false });
    onClose(e);
  }

  render() {
    const { id, classes, umClass, umStyle, customIcon, showIcon, placement, children } = this.props;
    const { showNotification, showCloseIcon } = this.state;
    let iconType = "";
    switch (umStyle) {
      case "warning":
        iconType = "alert-circle-outline";
        break;
      case "success":
        iconType = "checkbox-marked-circle-outline";
        break;
      case "error":
        iconType = "alert-outline";
        break;
      default:
        iconType = "alert-circle-outline";
        break;
    }
    return (
      showNotification && (
        <div
          id={id}
          className={css(classes.notification, umClass, classes[umStyle], classes[placement])}
        >
          {showIcon && (
            <div className="notificationIcon">
              {typeof customIcon !== "undefined" ? customIcon : <Icon iconName={iconType} />}
            </div>
          )}
          <div className="contentWrapper">
            {children}
            {showCloseIcon && (
              <button
                type="button"
                href="#"
                className={classes.closeBtn}
                onClick={this.closeBtnClick}
              >
                &times;
              </button>
            )}
          </div>
        </div>
      )
    );
  }
}

Notifications.propTypes = propTypesList;

Notifications.defaultProps = defaultProps;

export default WithTheme(Notifications, styles)(themeStyle);
