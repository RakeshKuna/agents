import React from "react";
import { expect } from "chai";
import { mount } from "enzyme";
import sinon from "sinon";
import Accordion from "../index";
import Icon from "../../Icons";
import { Button } from "../../Button";

function actionCmpt() {
  return (
    <div>
      <Button size="small">Cancel</Button>
      <Button size="small" color="primary">
        Save
      </Button>
    </div>
  );
}
const handleChange = sinon.spy();

describe("<Accordion />", () => {
  const wrapper = mount(
    <Accordion
      panelHeading={<div>Expansion Panel 1</div>}
      panelAction={actionCmpt()}
      expandIcon={<Icon iconName="chevron-down" />}
      onChange={handleChange("panel1")}
    >
      Lorem ipsum dolor.
    </Accordion>
  );
  const wrapperDisabled = mount(
    <Accordion
      panelHeading={<div>Panel 1</div>}
      panelAction={actionCmpt()}
      expandIcon={<Icon iconName="chevron-down" />}
      iconButtonProps={{ id: "iconButton" }}
      defaultExpanded
      isEnabled={false}
      id="panel1"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion>
  );
  const wrapperExpand = mount(
    <Accordion
      panelHeading={<div>Panel 1</div>}
      panelAction={actionCmpt()}
      expandIcon={<Icon iconName="chevron-down" />}
      iconButtonProps={{ id: "iconButton" }}
      expanded
      id="panel1"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
      non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Accordion>
  );

  it("DOM Length", () => {
    expect(wrapper).to.have.length(1);
  });

  it("Find if Heading is set ", () => {
    expect(
      wrapper
        .find("ButtonBase")
        .at(0)
        .find("div")
        .at(1)
        .text()
    ).to.be.equal("Expansion Panel 1");
  });

  it("Icon is rendered", () => {
    expect(
      wrapper
        .find("ButtonBase")
        .at(0)
        .find("div")
        .at(3)
        .find("Icon")
        .props().iconName
    ).to.equal("chevron-down");
  });
  it("Body is rendered", () => {
    expect(
      wrapper
        .find("ExpansionPanelDetails")
        .find("div")
        .text()
    ).to.be.equal("Lorem ipsum dolor.");
  });
  it("Action button rendered", () => {
    expect(wrapper.find("Jss(Button)").length).to.be.equal(2);
  });
  it("On change", () => {
    wrapper
      .find("ButtonBase")
      .at(0)
      .simulate("click");
    expect(handleChange.called).to.be.equal(true);
  });
  it("Default expanded", () => {
    expect(wrapperExpand.find("ExpansionPanelSummary").find({ expanded: true })).to.have.lengthOf(
      1
    );
    expect(wrapperDisabled.find("ExpansionPanelSummary").find({ expanded: true })).to.have.lengthOf(
      1
    );
  });
  it("Disabled", () => {
    expect(wrapperDisabled.find("ExpansionPanelSummary").find({ disabled: true })).to.have.lengthOf(
      7
    );
  });
});
