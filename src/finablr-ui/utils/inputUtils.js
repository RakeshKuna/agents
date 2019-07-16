import theme from "./theme";

const light = theme.palette.type === "light";

const placeholder = {
  color: "currentColor",
  opacity: light ? 0.42 : 0.5,
};

const placeholderVisible = {
  opacity: light ? 0.42 : 0.5,
};
const bottomLineColor = light
  ? theme.palette.bottomLineColor.light
  : theme.palette.bottomLineColor.main;

export { placeholder, placeholderVisible, bottomLineColor };
