const styles = {
  customNext: props => {
    const { nextArrowIconStyle } = props;
    return {
      color: "#c0c0c0",
      fontSize: "60px",
      fontWeight: "bold",
      ...nextArrowIconStyle,
    };
  },
  customClassArrowBottom: {
    color: "#c0c0c0",
    fontSize: "60px",
    top: "auto",
    left: "45%",
    bottom: "0",
    "&:hover": {
      color: "#c0c0c0",
    },
  },
  customClassArrowRight: {
    color: "#c0c0c0",
    fontSize: "60px",
    right: "50px",
    "&:hover": {
      color: "#c0c0c0",
    },
  },

  slickNextRtl: {
    right: "auto !important",
    left: "50px !important",
  },
  slickVerNextRtl: {
    right: "47% !important",
  },
};

export default styles;
