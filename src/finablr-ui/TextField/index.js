import React from "react";
import MDTextField from "@material-ui/core/TextField";
import Input from "../Input/Input";

const TextField = props => (
  <MDTextField
    {...props}
    InputProps={{
      inputComponent: Input,
    }}
  />
);

export default TextField;
