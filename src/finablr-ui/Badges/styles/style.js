import * as Bootstrap from "bootstrap-jss";
import badgeThemeColors from "./ColorVariance";

const { badge } = Bootstrap.Classes.Badge;

const badgeColors = badgeThemeColors();

const styles = theme => {
  const { style, umStyle } = theme;
  return {
    badgeProp: props => {
      const { type } = props;
      return {
        padding: type === "labelBadge" ? "9px 12px" : "0px",
        borderRadius: type === "labelBadge" ? "4px" : "50%",
        width: type === "labelBadge" ? "" : "24px",
        height: type === "labelBadge" ? "" : "24px",
        ...style,
      };
    },
    badge: {
      ...badge,
      ...badgeColors[umStyle],
      ...style,
    },

    badgeValue: {
      display: "flex",
      justifyContent: "center",
      height: "100%",
      verticalAlign: "middle",
      alignItems: "center",
    },
  };
};

export default styles;
