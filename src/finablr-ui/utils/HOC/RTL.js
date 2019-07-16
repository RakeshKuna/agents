import React from "react";
import { JssProvider, createGenerateClassName } from "react-jss";
import { jssPreset } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";

const jss = create({ plugins: [...jssPreset().plugins, rtl({ opt: "in" })] });
const generateClassName = createGenerateClassName();

const RTL = ({ children, ...restProps }) => (
  <JssProvider jss={jss} generateClassName={generateClassName} {...restProps}>
    {children}
  </JssProvider>
);

export default RTL;
