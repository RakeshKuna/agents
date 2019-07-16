import * as Bootstrap from "bootstrap-jss";
import BadgeColor from "./BadgeTheme";

const { badgeVariant } = Bootstrap.Mixins;

const badgeThemeColors = () => {
  const BadgeColors = {};
  Object.keys(BadgeColor).forEach(themeColorName => {
    BadgeColors[themeColorName] = badgeVariant(BadgeColor[themeColorName]);
  });
  return BadgeColors;
};

export default badgeThemeColors;
