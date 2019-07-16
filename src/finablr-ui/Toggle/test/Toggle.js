import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import Toggle from "../index";

let clickCnt = 0;
function onClick() {
  clickCnt += 1;
}
let changeCnt = 0;
function onChange() {
  changeCnt += 1;
}

const toggleConfig = {
  umClass: "toggle-custom-class",
  label: "Test",
  umLabelClass: "toggle-custom-label",
  style: {
    fontSize: "15px",
  },
};

describe("<Toggle />", () => {
  const wrapper = mount(<Toggle {...toggleConfig} rtl onChange={onChange} onClick={onClick} />);
  const toggleDisabled = mount(
    <Toggle id="toggleDisabled" isChecked umStyle="default" isEnabled={false} label="DISABLED" />
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
        .at(6)
        .hasClass(toggleConfig.umLabelClass)
    ).to.equal(true);
  });

  it("Addtional class Name check", () => {
    expect(
      wrapper
        .find("span")
        .at(0)
        .hasClass(toggleConfig.umClass)
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
    expect(toggleDisabled.find("input").find({ disabled: true })).to.have.lengthOf(1);
  });
  it("Checked", () => {
    expect(toggleDisabled.find("input").find({ checked: true })).to.have.lengthOf(1);
  });
});
