import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import ToolTipWithArrow from "../ToolTipWithArrow";

describe("<ToolTipWithArrow />", () => {
  it("Should render children when passed in", () => {
    const wrapper = shallow(
      <ToolTipWithArrow id="test-tooltip" content="tooltip title" placement="top">
        <span>Test content</span>
      </ToolTipWithArrow>
    );
    expect(wrapper.contains(<span>Test content</span>)).to.equal(true);
  });
  it("Should call onClick event of a child when passed in", () => {
    const callback = sinon.spy();
    const wrapper = mount(
      <ToolTipWithArrow id="test-tooltip" content="tooltip title" placement="left">
        <button onClick={callback} type="button">
          button
        </button>
      </ToolTipWithArrow>
    );
    const button = wrapper.find("button");
    button.simulate("click");
    expect(callback.called).to.be.equal(true);
  });
  it("Should pass the respective props to material tooltip", () => {
    const handleRequestOpen = sinon.spy();
    const handleClose = sinon.spy();
    const callback = sinon.spy();
    const wrapper = mount(
      <ToolTipWithArrow
        id="test-tooltip"
        content="tooltip title"
        placement="left"
        delay={1000}
        onShow={handleRequestOpen}
        onHide={handleClose}
        toShow="click"
      >
        <button onClick={callback} type="button">
          button
        </button>
      </ToolTipWithArrow>
    );

    const overlayTrigger = wrapper.find("OverlayTrigger");
    overlayTrigger.simulate("click");
    const overlayTriggerProps = overlayTrigger.props();
    expect(handleRequestOpen).to.be.equal(overlayTriggerProps.onEntered);
    expect(handleClose).to.be.equal(overlayTriggerProps.onExited);
  });
});
