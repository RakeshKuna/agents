import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import LinearProgress from "../Linear";

describe("<LinearProgress />", () => {
  it("Should mount without error", () => {
    const wrapper = shallow(<LinearProgress value={10} />);
    expect(wrapper).to.have.length(1);
  });

  it("Should show percentage when passed in", () => {
    const wrapper = mount(<LinearProgress value={10} showPercentage />);
    expect(wrapper.find("span").text()).to.equal("10%");
  });

  it("Should hide Percentage", () => {
    const wrapper = mount(<LinearProgress value={10} />);
    expect(wrapper.find("span").length).to.equal(0);
  });

  it("Should show percentage in rtl", () => {
    const wrapper = mount(<LinearProgress value={10} showPercentage rtl />);
    expect(wrapper.find("span").text()).to.equal("%10");
  });

  it("Should not exceed 100%", () => {
    const wrapper = mount(<LinearProgress value={200} showPercentage />);
    expect(wrapper.find("span").text()).to.equal("100%");
  });

  it("Should show custom percentage", () => {
    const wrapper = mount(
      <LinearProgress value={10} showPercentage percentage={value => `${value} percentage`} />
    );
    expect(wrapper.find("span").text()).to.equal("10 percentage");
  });
});
