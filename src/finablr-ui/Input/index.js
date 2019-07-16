import Input from "./Input";
import InputWithIcon from "./InputWithIcon";
import {
  isAlpha,
  isAlphaNumeric,
  isDecimal,
  isEmail,
  isEmpty,
  isNumeric,
  isTextEqual,
  isVaildByRegex,
  roundOffinteger,
} from "./validation";
import AutoComplete from "./AutoComplete";

const validation = {
  isAlpha,
  isAlphaNumeric,
  isDecimal,
  isEmail,
  isEmpty,
  isNumeric,
  isTextEqual,
  isVaildByRegex,
  roundOffinteger,
};

export { Input, InputWithIcon, validation, AutoComplete };
