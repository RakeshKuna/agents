const styles = ({
  style: { bottom = 20, right = 20, top = 20, left = 20, ...restStyle } = {},
}) => ({
  notification: {
    position: "fixed",
    color: "#fff",
    width: "386px",
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    overflow: "hidden",
    direction: "ltr",
    textAlign: "left",
    ...restStyle,
    "& *": {
      boxSizing: "border-box",
    },
    "& .contentWrapper": {
      padding: "23px 36px 23px 18px",
      width: "69%",
      position: "relative",
    },
    "& > div": {
      flex: "1 0 auto",
    },
    "& .notificationIcon": {
      width: 80,
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
      flexGrow: 0,
      "& > *": {
        display: "inline",
        alignSelf: "center",
        fontSize: "30px",
      },
    },
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    verticalAlign: "top",
    color: "#000",
    opacity: 0.3,
    borderRadius: "50%",
    border: "1px solid",
    textDecoration: "none",
    boxSizing: "border-box",
    width: "18px",
    height: "18px",
    lineHeight: "18px",
    textAlign: "center",
    fontSize: "19px",
    background: "transparent",
    outline: "none",
    padding: 0,
    cursor: "pointer",
    margin: "18px 18px 18px 0",
  },
  warning: {
    backgroundColor: "#ff9f00",
    "& .notificationIcon": {
      backgroundColor: "#ec9605",
    },
  },
  success: {
    backgroundColor: "#7db343",
    "& .notificationIcon": {
      backgroundColor: "#72a63a",
    },
  },
  error: {
    backgroundColor: "#e53935",
    "& .notificationIcon": {
      backgroundColor: "#d22e2c",
    },
  },
  information: {
    backgroundColor: "#ffffff",
    color: "#444444",
    "& .notificationIcon": {
      backgroundColor: "#ffffff",
    },
  },
  "top-right": {
    top,
    right,
  },
  "bottom-right": {
    bottom,
    right,
  },
  "bottom-left": {
    bottom,
    left,
  },
});

export default styles;
