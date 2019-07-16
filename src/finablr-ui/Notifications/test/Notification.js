import React from "react";
import { expect, assert } from "chai";
import { mount } from "enzyme";
import Notification from "../index";
import Icon from "../../Icons";

const notificationConfig = {
  umStyle: "default",
  umClass: "customNotificationClass",
  heading: "I am error notification",
  content: "Lorem ipsum dolor sit amet consectetur adiper scing, elit sed do",
  style: {
    "border-bottom-right-radius": "30px",
  },
};

const onClose = e => {
  console.log("on close e", e); // eslint-disable-line
};

describe("<Notification>", () => {
  const wrapper = mount(
    <Notification
      customIcon={<Icon iconName="file-excel" />}
      placement="top-right"
      onClose={onClose}
      {...notificationConfig}
      rtl
    >
      <h6>I am success notification</h6>
      <p>Notification with delayShow 2000ms</p>
    </Notification>
  );
  const notificationWrapper = mount(
    <Notification umStyle="success" placement="bottom-left" onClose={onClose} showCloseIcon={false}>
      <h6>I am success notification</h6>
      <p>Notification with delayShow 2000ms</p>
    </Notification>
  );
  it("DOM Length", () => {
    expect(wrapper).to.have.length(1);
    expect(notificationWrapper).to.have.length(1);
  });
  it("Heading check", () => {
    assert.typeOf(notificationConfig.heading, "string");
  });
  it("Content check", () => {
    assert.typeOf(notificationConfig.content, "string");
  });
  it("Custom style check", () => {
    assert.typeOf(notificationConfig.style, "object");
  });
  it("Close button check", () => {
    expect(wrapper.find("button")).to.have.length(1);
  });
  const delay = mount(
    <Notification placement="top-right" delay={100} {...notificationConfig}>
      <h6>I am success notification</h6>
      <p>Notification with delayShow 2000ms</p>
    </Notification>
  );
  it("Delay check", () => {
    expect(delay.find("button")).to.have.length(0);
  });
  const delayShow = mount(
    <Notification placement="top-right" delayShow={100} {...notificationConfig} umStyle="error">
      <h6>I am success notification</h6>
      <p>Notification with delayShow 2000ms</p>
    </Notification>
  );
  it("Delay Show check", () => {
    expect(delayShow.find("button")).to.have.length(0);
  });
  const delayHide = mount(
    <Notification placement="top-right" delayHide={100} {...notificationConfig} umStyle="warning">
      <h6>I am success notification</h6>
      <p>Notification with delayShow 2000ms</p>
    </Notification>
  );
  it("Delay Hide check", () => {
    expect(delayHide.find("button")).to.have.length(0);
  });
  const iconHide = mount(
    <Notification placement="top-right" showIcon={false} {...notificationConfig}>
      <h6>I am success notification</h6>
      <p>Notification with delayShow 2000ms</p>
    </Notification>
  );
  it("Icon hide", () => {
    expect(iconHide.find(".notificationIcon")).to.have.length(0);
  });
  const iconShow = mount(
    <Notification placement="top-right" showIcon {...notificationConfig}>
      <h6>I am success notification</h6>
      <p>Notification with delayShow 2000ms</p>
    </Notification>
  );
  it("Icon show", () => {
    expect(iconShow.find(".notificationIcon")).to.have.length(1);
  });
});
