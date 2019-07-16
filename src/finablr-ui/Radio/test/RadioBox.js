import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import Radio from "../index";

let clickCnt = 0;
function onClick() {
  clickCnt += 1;
}
let changeCnt = 0;
function onChange() {
  changeCnt += 1;
}

const radioConfig = {
  umClass: "radio-custom-class",
  label: "Test",
  umLabelClass: "radio-custom-label",
  style: {
    fontSize: "15px",
  },
};

describe("<Radio />", () => {
  const wrapper = mount(<Radio {...radioConfig} onChange={onChange} onClick={onClick} />);
  const disabledRadio = mount(
    <Radio
      id="radioBrazil"
      checked
      isEnabled={false}
      umStyle="default"
      value="brazil"
      color="default"
      name="radio-button-demo"
      aria-label="Brazil"
    />
  );

  it("DOM Length", () => {
    expect(wrapper).to.have.length(1);
  });

  it("DOM Text", () => {
    expect(wrapper.text()).to.be.equal("Test");
  });

  it("Addtional label class Name check", () => {
    expect(
      wrapper
        .find("span")
        .at(3)
        .hasClass(radioConfig.umLabelClass)
    ).to.equal(true);
  });

  it("Addtional class Name check", () => {
    expect(
      wrapper
        .find("span")
        .at(0)
        .hasClass(radioConfig.umClass)
    ).to.equal(true);
  });

  it("Has an input element", () => {
    expect(wrapper.find("input")).to.have.length(1);
  });

  it("Has property style", () => {
    const containerStyle = wrapper.get(0).props.style;

    expect(containerStyle).to.have.property("fontSize", "15px");
  });

  it("click event Handler", () => {
    wrapper.find("input").simulate("click");
    expect(clickCnt).to.be.equal(1);
  });
  it("change event Handler", () => {
    wrapper.find("input").simulate("change");
    expect(changeCnt).to.be.equal(1);
  });

  it("Disabled", () => {
    expect(disabledRadio.find("input").find({ disabled: true })).to.have.lengthOf(1);
  });
  it("Checked", () => {
    expect(disabledRadio.find("input").find({ checked: true })).to.have.lengthOf(1);
  });
});
