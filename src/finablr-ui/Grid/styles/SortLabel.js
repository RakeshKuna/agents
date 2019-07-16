import theme from "../../utils/theme";

const styles = {
  root: {
    cursor: "pointer",
    display: "inline-flex",
    justifyContent: "flex-start",
    flexDirection: "inherit",
    alignItems: "center",
    position: "static",
    "&:hover": {
      color: theme.palette.text.primary,
    },
    "&:focus": {
      color: theme.palette.text.primary,
    },
  },
  active: {
    color: theme.palette.text.primary,
    "& $icon": {
      opacity: 1,
    },
  },
  icon: {
    userSelect: "none",
    opacity: 0,
    transition: theme.transitions.create(["opacity", "transform"], {
      duration: theme.transitions.duration.shorter,
    }),
    fontSize: 17,
    width: 17,
    height: 17,
  },
  iconDirectionDesc: {
    transform: "rotate(0deg)",
  },
  iconDirectionAsc: {
    transform: "rotate(180deg)",
  },
};

export default styles;
