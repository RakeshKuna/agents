import React from "react";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import sinon from "sinon";

import ToolTip from "../ToolTip";

describe("<ToolTip />", () => {
  it("Should render children when passed in", () => {
    const wrapper = shallow(
      <ToolTip id="test-tooltip" title="tooltip title" placement="top-left">
        <span>Test content</span>
      </ToolTip>
    );
    expect(wrapper.contains(<span>Test content</span>)).to.equal(true);
  });
  it("Should call onClick event of a child when passed in", () => {
    const callback = sinon.spy();
    const wrapper = mount(
      <ToolTip id="test-tooltip" title="tooltip title" placement="top-left">
        <button onClick={callback} type="button">
          button
        </button>
      </ToolTip>
    );
    const button = wrapper.find("button");
    button.simulate("click");
    expect(callback.called).to.be.equal(true);
  });
  it("Should pass the respective props to material tooltip", () => {
    const handleRequestOpen = sinon.spy();
    const handleClose = sinon.spy();
    const delay = 1000;
    const wrapper = mount(
      <ToolTip
        id="test-tooltip"
        placement="bottom"
        title="Hello World"
        delay={delay}
        onShow={handleRequestOpen}
        onHide={handleClose}
      >
        <span>Hello World</span>
      </ToolTip>
    );
    const mdTooltipProps = wrapper.find("WithStyles(Tooltip)").props();
    expect(handleRequestOpen).to.be.equal(mdTooltipProps.onOpen);
    expect(handleClose).to.be.equal(mdTooltipProps.onClose);
    expect(delay).to.be.equal(mdTooltipProps.enterDelay);
    expect(delay).to.be.equal(mdTooltipProps.leaveDelay);
  });
  it("Should pass the respective props (delay props) to material tooltip", () => {
    const delayShow = 1000;
    const delayHide = 2000;
    const wrapper = mount(
      <ToolTip
        id="test-tooltip"
        placement="bottom"
        title="Hello World"
        delayShow={delayShow}
        delayHide={delayHide}
      >
        <span>Hello World</span>
      </ToolTip>
    );
    const mdTooltipProps = wrapper.find("WithStyles(Tooltip)").props();
    expect(delayShow).to.be.equal(mdTooltipProps.enterDelay);
    expect(delayHide).to.be.equal(mdTooltipProps.leaveDelay);
  });
});
