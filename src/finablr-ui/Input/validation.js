const NumericCheck = /^-?(0|[1-9][0-9]*)$/;
const DecimalCheck = /^-?(0|[1-9]\d*)(\.\d+)?$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const alphaRegex = /^[a-z]+$/i;
const alphaNumericRegex = /^[a-z0-9]+$/i;

const isEmpty = text => text === "";

const isNumeric = text => !NumericCheck.test(text);

const isDecimal = text => !DecimalCheck.test(text);

const isTextEqual = (text, compareWith) => text === compareWith;

const truncDigits = (inputNumber, digits) => {
  const fact = 10 ** digits;
  return Math.floor(inputNumber * fact) / fact;
};

const roundOffinteger = (value, roundoffPos, fixed, roundOffType = "round") => {
  const innerValue = value.toString();
  let finalValue = +innerValue;
  if (innerValue.indexOf(".") > -1) {
    const splitValue = innerValue.split(".");
    let canInc = false;
    let decimalPointValue = splitValue[1];
    decimalPointValue = decimalPointValue.split("").map(n => +n);
    let roundOfFrom;
    switch (roundOffType) {
      case "round":
        roundOfFrom = 4;
        break;
      case "ceil":
        roundOfFrom = 0;
        break;
      default:
        roundOfFrom = 10;
        break;
    }
    const decimalRoundOff = [...decimalPointValue].slice(fixed, roundoffPos);
    let isIncrement = [];
    if (decimalRoundOff.length > 0) {
      isIncrement = decimalRoundOff.map(decimalvalue => roundOfFrom < decimalvalue);
    }
    if (isIncrement.indexOf(true) > -1) canInc = true;
    finalValue = truncDigits(finalValue, fixed);
    if (canInc) {
      finalValue = finalValue * 10 ** fixed + 1;
      finalValue /= 10 ** fixed;
    }
  }
  return finalValue.toString();
};

const isEmail = email => !emailRegex.test(String(email).toLowerCase());

const isAlpha = text => !alphaRegex.test(String(text).toLowerCase());

const isAlphaNumeric = text => !alphaNumericRegex.test(String(text).toLowerCase());

const isVaildByRegex = (text, regex) => !regex.test(text);

export {
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
