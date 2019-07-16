import extendByKey from "../util";

const styles = {
  root: {
    textAlign: "left",
    border: "1px dashed #19ace2",
    borderTop: "none",
    padding: 10,
  },
  rootExtended: extendByKey("fileListContainer"),
};

export default styles;
