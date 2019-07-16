import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";

import { Input, validation, InputWithIcon } from "../index";

const inputProp = {
  type: "freeText",
  label: "RTLCheck",
  rtl: true,
  onChange: sinon.spy(),
  onError: sinon.spy(),
};
const NumericonError = sinon.spy();
const alphaNumericonError = sinon.spy();
const decimalSpy = sinon.spy();
const decimalSpyChange = sinon.spy();
const emailCheck = sinon.spy();
const customRegexCb = sinon.spy();

describe("<Input />", () => {
  const InputWrapper = mount(<Input {...inputProp} />);
  const InputReadOnlyWrapper = mount(<Input isEnabled={false} {...inputProp} />);
  const alphaCheck = mount(<Input {...inputProp} type="alpha" />);
  const numeric = mount(<Input {...inputProp} type="numeric" onError={NumericonError} />);
  const decimal = mount(
    <Input {...inputProp} roundOff={5} decimalChar={1} type="decimal" onChange={decimalSpy} />
  );
  const decimalChar = mount(
    <Input {...inputProp} roundOff={4} decimalChar={1} type="decimal" onChange={decimalSpyChange} />
  );
  const email = mount(<Input {...inputProp} type="email" onError={emailCheck} />);
  const alphaNumeric = mount(
    <Input {...inputProp} type="alphaNumeric" onError={alphaNumericonError} />
  );
  const PasswordWrapper = mount(<Input type="password" />);
  const customregex = mount(
    <Input
      type="freeText"
      regex={/^(?=.*\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$/}
      onError={customRegexCb}
    />
  );
  const requiredCheck = mount(<Input isRequired />);
  const numericCheck = mount(<Input min={4} type="decimal" max={10} />);
  const sinnonCb = sinon.spy();
  const textCheck = mount(<Input minLength={4} type="alpha" maxLength={10} onError={sinnonCb} />);
  const errorState = mount(<Input errorState />);
  const clickEvent = {
    onClick: sinon.spy(),
    onMouseOver: sinon.spy(),
    onFocus: sinon.spy(),
    onBlur: sinon.spy(),
  };
  const eventElememt = mount(<Input {...clickEvent} />);

  it("Input Length", () => {
    expect(InputWrapper.find("input")).to.have.length(1);
  });
  it("password Length", () => {
    expect(PasswordWrapper.find("input[type='password']")).to.have.length(1);
  });
  it("password Icon", () => {
    expect(PasswordWrapper.find("i").hasClass("mdi-eye-off")).to.equal(true);
  });
  it("password click simulate / Icon Click", () => {
    PasswordWrapper.find("i").simulate("click");
    expect(PasswordWrapper.find("i").hasClass("mdi-eye")).to.equal(true);
    expect(PasswordWrapper.find("input[type='text']")).to.have.length(1);
  });
  it("Value Change", () => {
    const input = InputWrapper.find("input");
    input.simulate("change", { target: { value: "Changed" } });
    expect(inputProp.onChange).to.have.property("callCount", 1);
  });
  it("sinon callback", () => {
    const input = InputWrapper.find("input");
    input.simulate("change", { target: { value: "Changed" } });
    expect(inputProp.onChange.firstCall.args[1]).to.be.equal("Changed");
  });
  it("labelCheck", () => {
    const label = InputWrapper.find("label").text();
    expect(label).to.be.equal(inputProp.label);
  });
  it("disabled", () => {
    const disabled = InputReadOnlyWrapper.find("input");
    expect(disabled.props().disabled).to.be.equal(true);
  });
  it("alpha", () => {
    const alpha = alphaCheck.find("input");
    alpha.simulate("change", { target: { value: 123 } });
    alpha.simulate("blur");
    expect(inputProp.onError.firstCall.args[0]).to.be.equal("alpha");
  });
  it("Numeric", () => {
    const numericDOM = numeric.find("input");
    numericDOM.simulate("change", { target: { value: "Unimoni" } });
    numericDOM.simulate("blur");
    expect(NumericonError).to.have.property("callCount", 1);
    expect(NumericonError.firstCall.args[0]).to.be.equal("numeric");
  });
  it("alphaNumeric", () => {
    const alphaNumericDOM = alphaNumeric.find("input");
    alphaNumericDOM.simulate("change", { target: { value: "%@#d" } });
    alphaNumericDOM.simulate("blur");
    expect(alphaNumericonError).to.have.property("callCount", 1);
    expect(alphaNumericonError.firstCall.args[0]).to.be.equal("alphaNumeric");
  });
  it("Decimal", () => {
    const decimalDOM = decimal.find("input");
    decimalDOM.simulate("change", { target: { value: 12.12226 } });
    decimalDOM.simulate("blur");
    expect(decimalSpy).to.have.property("callCount", 2);
    expect(decimalSpy.firstCall.args[1]).to.be.equal(12.12226);
    expect(decimalSpy.lastCall.args[1]).to.be.equal("12.2");
  });
  it("Decimal char", () => {
    const decimalCharDOM = decimalChar.find("input");
    decimalCharDOM.simulate("change", { target: { value: 12.12226 } });
    decimalCharDOM.simulate("blur");
    expect(decimalSpyChange).to.have.property("callCount", 2);
    expect(decimalSpyChange.firstCall.args[1]).to.be.equal(12.12226);
    expect(decimalSpyChange.lastCall.args[1]).to.be.equal("12.1");
  });
  it("email valid", () => {
    const emailDOM = email.find("input");
    emailDOM.simulate("change", { target: { value: "test" } });
    emailDOM.simulate("blur");
    expect(emailCheck).to.have.property("callCount", 1);
    expect(emailCheck.lastCall.args[0]).to.be.equal("email");
  });
  it("custom regex valid", () => {
    const customregexDOM = customregex.find("input");
    customregexDOM.simulate("change", { target: { value: "error" } });
    customregexDOM.simulate("blur");
    expect(customRegexCb).to.have.property("callCount", 1);
    expect(customRegexCb.lastCall.args[0]).to.be.equal("regex");
  });
  it("validation Check", () => {
    const roundOff = validation.roundOffinteger(12.12225, 5, 1);
    expect(roundOff).to.be.equal("12.2");
  });
  it("validation Check decimal check", () => {
    const roundOff = validation.roundOffinteger(12.12225, 4, 1);
    expect(roundOff).to.be.equal("12.1");
  });
  it("isRequired", () => {
    const requiredDom = requiredCheck.find("input");
    expect(requiredDom.props().required).to.be.equal(true);
  });
  it("min", () => {
    const numericDom = numericCheck.find("input");
    expect(numericDom.props().min).to.be.equal(4);
  });
  it("max", () => {
    const numericDom = numericCheck.find("input");
    expect(numericDom.props().max).to.be.equal(10);
  });
  it("minLength", () => {
    const textDom = textCheck.find("input");
    textDom.simulate("change", { target: { value: "min" } });
    textDom.simulate("blur");
    expect(sinnonCb.called).to.be.equal(true);
  });
  it("maxLength", () => {
    const textDom = textCheck.find("input");
    textDom.simulate("change", { target: { value: "max value test input" } });
    textDom.simulate("blur");
    expect(sinnonCb.calledTwice).to.be.equal(true);
  });
  it("errorState", () => {
    const textDom = errorState.find("input").parent();
    expect(textDom.props().className.indexOf("MuiInput-error") > -1).to.be.equal(true);
  });
  it("onClick", () => {
    const textDom = eventElememt.find("input");
    textDom.simulate("click");
    expect(clickEvent.onClick.called).to.be.equal(true);
  });
  it("onMouseOver", () => {
    const textDom = eventElememt.find("input");
    textDom.simulate("mouseOver");
    expect(clickEvent.onMouseOver.called).to.be.equal(true);
  });
  it("onFocus", () => {
    const textDom = eventElememt.find("input");
    textDom.simulate("focus");
    expect(clickEvent.onFocus.called).to.be.equal(true);
  });
  it("onBlur", () => {
    const textDom = eventElememt.find("input");
    textDom.simulate("focus");
    textDom.simulate("blur");
    expect(clickEvent.onBlur.called).to.be.equal(true);
  });
  it("Input with icon", () => {
    const inputWithIcon = mount(
      <InputWithIcon icon="account-circle" style={{ color: "red" }}>
        <Input id="iconInput" placeholder="Icon Component" label="Icon Component" type="freeText" />
      </InputWithIcon>
    );

    expect(inputWithIcon.find("i").hasClass("mdi-account-circle")).to.equal(true);
  });
});
