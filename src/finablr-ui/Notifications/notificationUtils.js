import PropTypes from "prop-types";
import { emptyFunction } from "../utils";

const propTypesList = {
  id: PropTypes.string,
  classes: PropTypes.object.isRequired,
  umStyle: PropTypes.oneOf(["warning", "success", "error", "information"]).isRequired,
  showCloseIcon: PropTypes.bool,
  customIcon: PropTypes.any,
  umClass: PropTypes.string,
  onClose: PropTypes.func,
  delay: PropTypes.number,
  delayHide: PropTypes.number,
  delayShow: PropTypes.number,
  showIcon: PropTypes.bool,
  placement: PropTypes.oneOf(["top-right", "bottom-right", "bottom-left"]).isRequired,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  id: "",
  showCloseIcon: true,
  delay: 0,
  delayHide: 0,
  delayShow: 0,
  showIcon: true,
  style: { top: 20, left: 20, bottom: 20, right: 20 },
  onClose: emptyFunction,
};

const themeStyle = {
  umStyle: "warning",
};

export { propTypesList, defaultProps, themeStyle };
