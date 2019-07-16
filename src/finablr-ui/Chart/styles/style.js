const styles = {
  legend: {
    cursor: "default",
    listStyle: "none",
    textAlign: "center",
    paddingLeft: 0,
    "& ul": {
      padding: "0",
    },
    "& li": {
      direction: ({ rtl }) => (rtl ? "rtl" : "ltr"),
      display: "inline-block",
      padding: "0 5px",
      fontStyle: "normal",
      fontSize: "12px",
    },
    "& li.hidden": {
      textDecoration: "line-through",
    },
    "&  li span": {
      display: "inline-block",
      height: "15px",
      marginRight: ({ rtl }) => (rtl ? "0" : "10px"),
      marginLeft: ({ rtl }) => (rtl ? "10px" : "0"),
      marginBottom: "3px",
      width: "15px",
      verticalAlign: "middle",
    },
  },
  chartWrapper: {
    display: "flex",
    flexDirection: ({ legendPosition }) => (legendPosition === "top" ? "column-reverse" : "column"),
  },
};

export default styles;
