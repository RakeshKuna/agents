import extendByKey from "../util";

const styles = {
  root: {
    width: "100%",
  },
  rootExtended: extendByKey("dropRoot"),
  dropZone: {
    background: "white",
    padding: "32px 40px",
    border: "1px dashed #19ace2",
    width: "100%",
    borderRadius: 2,
    userSelect: "none",
    boxSizing: "border-box",
  },
  dropZoneExtended: extendByKey("dropContainer"),
  disabled: {
    border: "1px dotted rgba(0,0,0,0.42)",
    background: "rgba(0, 0, 0, 0.12)",
  },
  disabledExtended: extendByKey("dropDisabled"),
};

export default styles;
