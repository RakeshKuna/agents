import React from "react";
import IconButton from "../Button/IconButton";

const GroupByIcon = props => (
  <IconButton
    umStyle="default"
    style={{
      width: 20,
      height: 20,
      backgroundColor: "#FFFFFF",
      color: "#333333",
      border: "1px solid #CCC",
      marginRight: 5,
    }}
    iconStyle={{
      fontSize: 18,
    }}
    {...props}
  />
);
export default GroupByIcon;
