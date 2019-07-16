import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import Popup from "../index";

const open = true;
const footer = (
  <div>
    <button type="button">cancel</button>
    <button type="button">ok</button>
  </div>
);
describe("<Popup/>", () => {
  it("Should mount without error", () => {
    const wrapper = shallow(
      <Popup id="alert" show={open}>
        <p>Let Google help apps determine location</p>
      </Popup>
    );
    expect(wrapper).to.have.length(1);
  });

  it("Should show title when passed in ", () => {
    const wrapper = mount(
      <Popup id="alert" show={open} title="Alert Popup">
        <div>Alert Popup</div>
      </Popup>
    );
    expect(wrapper).to.have.length(1);
  });

  it("Should show a closeIcon when passed in ", () => {
    const wrapper = mount(
      <Popup id="alert" show={open} showCloseButton title="Alert popup">
        <button type="button" />
      </Popup>
    );
    expect(wrapper).to.have.length(1);
  });

  it("Should show a children when passed in ", () => {
    const wrapper = mount(
      <Popup id="alert" show={open} footer={footer}>
        <div>
          <button type="button">cancel</button>
          <button type="button">ok</button>
        </div>
      </Popup>
    );
    expect(wrapper).to.have.length(1);
  });

  it("button close", () => {
    const callback = sinon.spy();
    const wrapper = mount(
      <Popup id="alert" show={open}>
        <div>
          <button type="button" onClick={callback}>
            cancel
          </button>
        </div>
      </Popup>
    );
    const button = wrapper.find("button");
    button.simulate("click");
    expect(callback.called).to.be.equal(true);
  });

  it("onShow ", () => {
    const callback = sinon.spy();
    mount(
      <Popup id="alert" show={open} onShow={callback}>
        <div>Alert Popup</div>
      </Popup>
    );
    setTimeout(() => {
      expect(callback.called).to.be.equal(true);
    }, 3000);
  });

  it("onHide ", () => {
    const callback = sinon.spy();
    mount(
      <Popup id="alert" show={open} onClose={callback}>
        <div>Alert Popup</div>
      </Popup>
    );
    setTimeout(() => {
      expect(callback.called).to.be.equal(true);
    }, 3000);
  });

  it("disableBackdropClick", () => {
    const callback = sinon.spy();
    const wrapper = mount(
      <Popup id="alert" show={open} footer={footer} onClick={callback}>
        <div>Alert Popup</div>
      </Popup>
    );
    setTimeout(() => {
      const dialog = wrapper.find("#alert > div");
      dialog.simulate("click");
      expect(callback.called).to.be.equal(true);
    }, 3000);
  });

  it("disableEscapeKeyDown ", () => {
    const callback = sinon.spy();
    const wrapper = mount(
      <Popup id="alert" show={open} footer={footer} onKeyDown={callback}>
        <div>Alert Popup</div>
      </Popup>
    );
    setTimeout(() => {
      const dialogESCClose = wrapper.find("#alert > div");
      dialogESCClose.find("#alert > div").simulate("keyDown", { keyCode: 27 });
    }, 3000);
  });
});
