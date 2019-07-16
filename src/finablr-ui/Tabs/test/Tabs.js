import { expect } from "chai";
import { mount } from "enzyme";
import React from "react";
import { spy } from "sinon";
import { Tabs, Tab } from "../index";
import Icon from "../../Icons";
import Badges from "../../Badges";

let type1ValueText = "one";
let changeVal = 0;
function handleChangeType1Text(event, value) {
  changeVal += 1;
  type1ValueText = value;
}
const onClickHandler = spy();
describe("<Tabs />", () => {
  const TabType1Wrapper = mount(
    <Tabs value={type1ValueText} umStyle="primary" onChange={handleChangeType1Text}>
      <Tab
        badge={<Badges umStyle="red" type="notifiyBadge" value="45" />}
        value="one"
        label="ITEM 1"
      />
      <Tab value="two" label="ITEM 2" />
      <Tab value="three" label="ITEM 3" />
    </Tabs>
  );
  const TabType2Wrapper = mount(
    <Tabs
      value={0}
      umStyle="default"
      stepAction
      onChange={handleChangeType1Text}
      onClick={onClickHandler}
    >
      <Tab
        badge={<Badges umStyle="red" type="notifiyBadge" value="45" />}
        icon={<Icon iconName="file-excel" />}
      />
      <Tab
        badge={<Badges umStyle="red" type="notifiyBadge" value="45" />}
        label="ITEM 1"
        icon={<Icon iconName="dice-5" />}
      />
      <Tab icon={<Icon iconName="cards-heart" />} />
      <Tab icon={<Icon iconName="camera-enhance" />} disabled />
    </Tabs>
  );
  const TabStepAction = mount(
    <Tabs id="stepTab2" value={0} stepAction umStyle="primary" onChange={handleChangeType1Text}>
      <Tab label="ITEM 1" />
      <Tab label="ITEM 2" />
      <Tab label="ITEM 3" />
    </Tabs>
  );
  const TabScrollable = mount(
    <Tabs
      id="scrollableTab2"
      value={0}
      scrollable
      rtl
      onChange={handleChangeType1Text}
      scrollButtons="on"
    >
      <Tab icon={<Icon iconName="discord" />} />
      <Tab icon={<Icon iconName="floppy" />} />
      <Tab icon={<Icon iconName="cards-heart" />} />
      <Tab icon={<Icon iconName="camera-enhance" />} />
      <Tab icon={<Icon iconName="camera-front-variant" />} />
      <Tab icon={<Icon iconName="chess-queen" />} />
      <Tab icon={<Icon iconName="cloud" />} />
    </Tabs>
  );
  it("TabType1Wrapper Length", () => {
    expect(TabType1Wrapper).to.have.length(1);
  });
  it("TabType2Wrapper Length", () => {
    expect(TabType2Wrapper).to.have.length(1);
  });
  it("TabStepAction Length", () => {
    expect(TabStepAction).to.have.length(1);
  });

  it("Tab rendered", () => {
    expect(TabType2Wrapper.find("button")).to.have.length(4);
  });
  it("Icon rendered", () => {
    expect(TabType2Wrapper.find("i")).to.have.length(4);
  });

  it("Tab Change and tab selected", () => {
    TabType2Wrapper.find("button")
      .at(0)
      .simulate("click");
    TabType2Wrapper.update();
    expect(
      TabType2Wrapper.find("TabCmpt")
        .at(0)
        .find({ selected: true })
    ).to.have.lengthOf(1);

    expect(changeVal).to.be.equal(1);
  });

  it("Badge component in icon tab", () => {
    expect(
      TabType2Wrapper.find("TabCmpt")
        .at(0)
        .find("span")
        .at(0)
        .find("Badges")
    ).to.have.lengthOf(1);
  });

  it("Badge component in Label tab", () => {
    expect(
      TabType1Wrapper.find("TabCmpt")
        .at(0)
        .find("span")
        .at(0)
        .find("Badges")
    ).to.have.lengthOf(1);
  });
  it("Badge component in Label and Icon tab", () => {
    expect(
      TabType2Wrapper.find("TabCmpt")
        .at(1)
        .find("span")
        .at(0)
        .find("Badges")
    ).to.have.lengthOf(1);
    expect(
      TabType2Wrapper.find("TabCmpt")
        .at(1)
        .find("span")
        .at(5)
        .find("Badges")
    ).to.have.lengthOf(0);
  });
  it("Step action tab is disabled", () => {
    expect(
      TabStepAction.find("ButtonBase")
        .find("button")
        .find({ disabled: true })
    ).to.have.lengthOf(2);
  });
  it("Tab Scrollable", () => {
    expect(TabScrollable).to.have.length(1);
  });
});
