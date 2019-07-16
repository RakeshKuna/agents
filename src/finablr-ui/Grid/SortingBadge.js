import React from "react";
import PropTypes from "prop-types";
import Badge from "../Badges";

const SortingBadge = ({ rtl, ...props }) => (
  <Badge
    style={{
      marginLeft: rtl ? null : 5,
      marginRight: rtl ? 5 : null,
      backgroundColor: "#FFFFFF",
      color: "#000000",
      border: "2px solid #CCCCCC",
      width: 17,
      height: 17,
    }}
    {...props}
  />
);

SortingBadge.propTypes = {
  rtl: PropTypes.bool,
};

SortingBadge.defaultProps = {
  rtl: false,
};

export default SortingBadge;
