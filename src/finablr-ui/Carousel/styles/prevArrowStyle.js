const styles = {
  customClassArrowTop: {
    color: "#c0c0c0",
    fontSize: "60px",
    top: "35px",
    left: "45%",
    "&:hover": {
      color: "#c0c0c0",
    },
  },
  customClassArrowLeft: {
    color: "#c0c0c0",
    fontSize: "60px",
    left: "10px",
    "&:hover": {
      color: "#c0c0c0",
    },
  },
  customPrev: props => {
    const { prevArrowIconStyle } = props;
    return {
      color: "#c0c0c0",
      fontSize: "60px",
      fontWeight: "bold",
      cursor: "pointer",
      ...prevArrowIconStyle,
    };
  },
  slickPrevRtl: {
    right: "10px !important",
    left: "0 !important",
  },
  slickVerPrevRtl: {
    right: "47% !important",
  },
};
export default styles;
