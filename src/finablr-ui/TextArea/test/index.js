import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import TextArea from "../index";

const inputProps = {
  isRequired: true,
  rows: 5,
  placeholder: "Input text",
  umClass: "custom-class",
  minLength: 2,
  maxLength: 4,
  onChange: sinon.spy(),
};
describe("<TextArea />", () => {
  const textAreaWrapper = mount(<TextArea {...inputProps} />);
  it("Render Check", () => {
    expect(textAreaWrapper.find("textarea")).to.have.length(1);
  });
  it("Required Check", () => {
    expect(textAreaWrapper.find("textarea[required]")).to.have.length(1);
  });
  it("rows count Check", () => {
    expect(textAreaWrapper.find(`textarea[rows=${inputProps.rows}]`)).to.have.length(1);
  });
  it("placeholder Check", () => {
    expect(
      textAreaWrapper.find(`textarea[placeholder="${inputProps.placeholder}"]`)
    ).to.have.length(1);
  });
  it("umClass Check", () => {
    expect(textAreaWrapper.find(`div.${inputProps.umClass}`)).to.have.length(1);
  });
  it("onChange Check", () => {
    const input = textAreaWrapper.find("textarea");
    input.simulate("change", { target: { value: "chan" } });
    input.simulate("blur");
    expect(inputProps.onChange.lastCall.args[0]).to.be.equal("chan");
  });
  it("max Check", () => {
    const input = textAreaWrapper.find("textarea");
    input.simulate("change", { target: { value: "chang" } });
    input.simulate("blur");
    expect(inputProps.onChange.lastCall.args[0]).to.be.equal("chan");
  });
  it("isEnabled Check", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} isEnabled={false} />);
    expect(textAreaWrappermin.find("textarea[disabled]")).to.have.length(1);
  });
  it("name Check", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} name="input-component" />);
    expect(textAreaWrappermin.find("textarea[name='input-component']")).to.have.length(1);
  });
  it("label Check", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} label="input-component" />);
    expect(textAreaWrappermin.find("label")).to.have.length(1);
  });
  it("charText Check", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} charText="cha" />);
    expect(
      textAreaWrappermin
        .find("p")
        .text()
        .indexOf("cha") > -1
    ).to.be.equal(true);
  });
  it("regex and onError", () => {
    const regexError = sinon.spy();
    const textAreaWrappermin = mount(
      <TextArea {...inputProps} regex={/^[a-z0-9]+$/i} onError={regexError} />
    );
    const input = textAreaWrappermin.find("textarea");
    input.simulate("change", { target: { value: "&&" } });
    input.simulate("blur");
    expect(regexError.called).to.be.equal(true);
  });

  it("errorState", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} errorState />);
    expect(
      textAreaWrappermin
        .find("textarea")
        .parent()
        .props()
        .className.indexOf("MuiInput-error") > -1
    ).to.be.equal(true);
  });
  it("showCount", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} showCount={false} />);
    expect(textAreaWrappermin.find("p")).to.have.length(0);
  });
  const clickEv = {
    onClick: sinon.spy(),
    onMouseOver: sinon.spy(),
    onFocus: sinon.spy(),
    onBlur: sinon.spy(),
  };
  it("onClick", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} {...clickEv} />);
    const input = textAreaWrappermin.find("textarea");
    input.simulate("click");
    expect(clickEv.onClick.called).to.be.equal(true);
  });
  it("onMouseOver", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} {...clickEv} />);
    const input = textAreaWrappermin.find("textarea");
    input.simulate("mouseOver");
    expect(clickEv.onMouseOver.called).to.be.equal(true);
  });
  it("onFocus", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} {...clickEv} />);
    const input = textAreaWrappermin.find("textarea");
    input.simulate("focus");
    expect(clickEv.onFocus.called).to.be.equal(true);
  });
  it("onBlur", () => {
    const textAreaWrappermin = mount(<TextArea {...inputProps} {...clickEv} />);
    const input = textAreaWrappermin.find("textarea");
    input.simulate("focus");
    input.simulate("blur");
    expect(clickEv.onBlur.called).to.be.equal(true);
  });
});
