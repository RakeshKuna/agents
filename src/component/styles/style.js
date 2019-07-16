const styles = theme => ({
    progressRoot: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 9999,
    },
    loaderMask: {
      position: "fixed",
      width: "100%",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: "hidden",
      backgroundColor: "rgba(255,255,255,0.8)",
      zIndex: 9998,
    },
    progressPrimary: {
      backgroundColor: "rgba(25, 172, 277, 0.2)",
    },
    barColorPrimary: {
      backgroundColor: "#19ACE3",
    },
  });
  
  export default styles;
  