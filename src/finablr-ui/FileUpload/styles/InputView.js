import extendByKey from "../util";

const styles = {
  root: {
    display: "flex",
    flexGrow: 1,
    marginRight: 10,
    marginBottom: 10,
  },
  rootExtended: extendByKey("inputViewRoot"),
  inputBox: {
    flexGrow: 1,
    marginRight: "10px",
    borderBottom: "1px solid rgba(0,0,0,0.42)",
  },
  inputBoxExtended: extendByKey("inputViewInput"),
  labelHover: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  label: {
    paddingTop: "10px",
    display: "block",
    height: "100%",
    boxSizing: "border-box",
    textAlign: "left",
  },
  labelExtended: extendByKey("inputViewLabel"),
  disabled: {
    borderBottom: "1px dotted",
    color: "#ccc",
  },
  disabledExtended: extendByKey("inputViewDisabled"),
  hide: {
    display: "none",
  },
};

export default styles;
