const styles = {
  slickWrapper: {
    "& .slick-prev:before, .slick-next:before": {
      display: "none",
    },
    "& .slick-slide > div:first-child": {
      margin: ({ margin }) => margin || "0",
    },
  },
  inside: {
    display: "table !important",
    "& li button:before": {
      color: "#fff",
      fontSize: "12px",
    },
    "& li.slick-active button:before ": {
      color: "#fff",
      opacity: 1,
    },
    "&$topLeft": {
      top: "30px",
      textAlign: "left",
    },
    "&$topCenter": {
      top: "30px",
    },
    "&$topRight": {
      top: "30px",
      textAlign: "right",
    },
    "&$bottomLeft": {
      bottom: "30px",
      textAlign: "left",
    },
    "&$bottomCenter": {
      bottom: "30px",
    },
    "&$bottomRight": {
      bottom: "30px",
      textAlign: "right",
    },
    "&$leftCenter": {
      bottom: "25%",
      left: "20px",
      width: "auto",
      "& li ": {
        display: "block",
      },
    },
    "&$rightCenter": {
      bottom: "25%",
      right: "20px",
      width: "auto",
      "& li ": {
        display: "block",
      },
    },
  },
  outside: {
    display: "table !important",
    "& li button:before": {
      fontSize: "12px",
    },
    "&$topLeft": {
      top: "-30px",
      textAlign: "left",
    },
    "&$topCenter": {
      top: "-30px",
    },
    "&$topRight": {
      top: "-30px",
      textAlign: "right",
    },
    "&$bottomLeft": {
      bottom: "-30px",
      textAlign: "left",
    },
    "&$bottomCenter": {
      bottom: "-30px",
    },
    "&$bottomRight": {
      bottom: "-30px",
      textAlign: "right",
    },
    "&$leftCenter": {
      bottom: "25%",
      left: "-20px",
      width: "auto",
      "& li ": {
        display: "block",
      },
    },
    "&$rightCenter": {
      bottom: "25%",
      right: "-20px",
      width: "auto",
      "& li ": {
        display: "block",
      },
    },
  },
  topLeft: {},
  topCenter: {},
  topRight: {},
  bottomLeft: {},
  bottomCenter: {},
  bottomRight: {},
  leftCenter: {},
  rightCenter: {},
};

export default styles;
