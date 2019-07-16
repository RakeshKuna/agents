import PropTypes from "prop-types";

const propTypesList = {
  classes: PropTypes.object.isRequired,
  umStyle: PropTypes.oneOf(["primary", "secondary", "default"]),
  isBlock: PropTypes.bool,
  umClass: PropTypes.string,
  type: PropTypes.oneOf(["reset", "submit", "button", "file"]),
  href: PropTypes.string,
  umSize: PropTypes.oneOf(["small", "medium", "large"]),
  target: PropTypes.string,
  rtl: PropTypes.bool,
  isEnabled: PropTypes.bool,
  inputProps: PropTypes.object,
  style: PropTypes.object,
};

const defaultProps = {
  umStyle: "primary",
  isBlock: false,
  type: "button",
  umSize: "medium",
  isEnabled: true,
  variant: "contained",
  rtl: false,
  inputProps: {},
};

export { propTypesList, defaultProps };
