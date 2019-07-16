import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import Badge from "../index";

let mouseCnt = 0;
function badgeOver() {
  mouseCnt += 1;
}

const badgeConfig = {
  umClass: "badge-custom-class",
  type: "notifiyBadge",
  value: "50",
  umStyle: "green",
  style: {
    fontSize: "15px",
  },
};

describe("<Badge />", () => {
  const wrapper = mount(<Badge {...badgeConfig} onFocus={badgeOver} onMouseOver={badgeOver} />);

  it("DOM Length", () => {
    expect(wrapper).to.have.length(1);
  });
  it("DOM Text", () => {
    expect(wrapper.text()).to.be.equal("50");
  });
  it("Addtional class Name check", () => {
    expect(
      wrapper
        .find("span")
        .at(0)
        .hasClass(badgeConfig.umClass)
    ).to.equal(true);
  });
  it("Has two span element", () => {
    expect(wrapper.find("span")).to.have.length(2);
  });

  it("Has property style", () => {
    const containerStyle = wrapper.get(0).props.style;

    expect(containerStyle).to.have.property("fontSize", "15px");
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
});
