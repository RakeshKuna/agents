import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import CircularProgress from "../Circular";

describe("<CircularProgress />", () => {
  it("Should mount without error", () => {
    const wrapper = shallow(<CircularProgress value={10} />);
    expect(wrapper).to.have.length(1);
  });

  it("Should show percentage when passed in", () => {
    const wrapper = mount(<CircularProgress value={10} showPercentage />);
    expect(wrapper.find("text").text()).to.equal("10%");
  });

  it("Should hide Percentage", () => {
    const wrapper = mount(<CircularProgress value={10} />);
    expect(wrapper.find("text").length).to.equal(0);
  });

  it("Should show percentage in rtl", () => {
    const wrapper = mount(<CircularProgress value={10} showPercentage rtl />);
    expect(wrapper.find("text").text()).to.equal("%10");
  });

  it("Should not exceed 100%", () => {
    const wrapper = mount(<CircularProgress value={200} showPercentage />);
    expect(wrapper.find("text").text()).to.equal("100%");
  });

  it("Should show custom percentage", () => {
    const wrapper = mount(
      <CircularProgress value={10} showPercentage percentage={value => `${value} percentage`} />
    );
    expect(wrapper.find("text").text()).to.equal("10 percentage");
  });
});
