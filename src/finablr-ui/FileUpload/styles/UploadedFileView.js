import extendByKey from "../util";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
  },
  rootExtended: extendByKey("fileListRoot"),
  fileName: {
    flexGrow: 1,
    fontSize: 15,
    color: "#888888",
  },
  fileNameExtended: extendByKey("fileListFileName"),
  circleProgress: {
    marginRight: 10,
  },
  cancelButton: {
    margin: "12px 0px 12px 5px",
    color: "red",
  },
  cancelButtonExtended: extendByKey("fileListCancelButton"),
};

export default styles;
