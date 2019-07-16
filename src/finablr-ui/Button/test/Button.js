import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import Button from "../Button";
import IconButton from "../IconButton";
import FloatButton from "../FloatButton";
import OutLineButton from "../OutLineButton";
import TextButton from "../TextButton";

let clickCnt = 0;
function buttonOnclick() {
  clickCnt += 1;
}

let mouseCnt = 0;
function buttonOnOver() {
  mouseCnt += 1;
}

const buttonConfig = {
  umClass: "button-custom-class",
  type: "reset",
  style: {
    fontSize: "30px",
  },
};

const atagConfig = {
  href: "http://www.unimoni.com",
};

const newProp = "Updated";

describe("<Button />", () => {
  const wrapper = mount(
    <Button
      {...buttonConfig}
      onClick={buttonOnclick}
      onFocus={buttonOnOver}
      onMouseOver={buttonOnOver}
    >
      Test Label
    </Button>
  );
  const disableDom = mount(
    <Button {...buttonConfig} disabled>
      disabled
    </Button>
  );
  const aTag = mount(
    <Button {...buttonConfig} {...atagConfig}>
      aTag
    </Button>
  );
  const icon = mount(<IconButton icon="delete">aTag</IconButton>);
  it("DOM Length", () => {
    expect(wrapper).to.have.length(1);
  });
  it("DOM Text", () => {
    expect(wrapper.text()).to.be.equal("Test Label");
  });
  it("Addtional class Name check", () => {
    expect(wrapper.find("button").hasClass(buttonConfig.umClass)).to.equal(true);
  });
  it("isEnabled", () => {
    expect(disableDom.find("[disabled]")).to.have.length.greaterThan(0);
  });
  it("Click event Handler", () => {
    wrapper.simulate("click");
    expect(clickCnt).to.be.equal(1);
  });
  it("mouseover event Handler", () => {
    expect(mouseCnt).to.be.equal(0);
    wrapper.simulate("mouseover");
    wrapper.simulate("mouseover");
    expect(mouseCnt).to.be.equal(2);
    wrapper.simulate("mouseover");
    wrapper.simulate("mouseover");
    expect(mouseCnt).to.be.equal(4);
  });
  it("Type Check", () => {
    expect(wrapper.find("button[type='reset']").length).to.be.equal(1);
  });
  it("prop update", () => {
    wrapper.setProps({ children: newProp });
    expect(wrapper.text()).to.be.equal(newProp);
  });
  it("a tag check", () => {
    expect(aTag.find("a").length).to.be.equal(1);
  });
  it("href check", () => {
    expect(aTag.find(`a[href='${atagConfig.href}']`).length).to.be.equal(1);
  });
  it("icon button", () => {
    expect(icon.find("i").hasClass("mdi-delete")).to.equal(true);
  });
  it("isBlock", () => {
    const button = mount(<Button isBlock>Test Label</Button>);
    expect(
      button
        .find("button")
        .props()
        .className.indexOf("fullWidth") > -1
    ).to.equal(true);
  });
  it("Outline button", () => {
    const button = mount(<OutLineButton>Test Label</OutLineButton>);
    expect(
      button
        .find("Button")
        .at(0)
        .props().variant
    ).to.equal("outlined");
  });
  it("Text button", () => {
    const button = mount(<TextButton>Test Label</TextButton>);
    expect(
      button
        .find("Button")
        .at(0)
        .props().variant
    ).to.equal("text");
  });
  it("inputProps", () => {
    const button = mount(<Button inputProps={{ id: "btn" }}>Test Label</Button>);
    expect(
      button
        .find("button")
        .props()
        .id.indexOf("btn") > -1
    ).to.equal(true);
  });
  it("isExtended", () => {
    const iconExtended = mount(
      <FloatButton icon="delete" isExtended>
        aTag
      </FloatButton>
    );
    expect(
      iconExtended
        .find("button")
        .props()
        .className.indexOf("extendedFab") > -1
    ).to.equal(true);
  });
});
