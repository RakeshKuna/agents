import React from "react";
import { expect } from "chai";
import { shallow, mount } from "enzyme";
import sinon from "sinon";
import unwrap from "@material-ui/core/test-utils/unwrap";
import AutoComplete from "../AutoComplete";

const AutoCompleteBase = unwrap(AutoComplete);

const inputProp = {
  data: [
    "search-string",
    "search-suggestion",
    "search-params",
    "search-query-parser",
    "search-issues",
    "search-text-tokenizer",
    "search-prototype.js",
    "search-query-tester",
    "search-nth",
    "search-employee",
  ],
  inputComponentProps: {
    placeholder: "type a",
    type: "alpha",
    label: "Auto complete",
    icon: "keyboard-backspace",
  },
  classes: {},
  onChange: sinon.spy(),
};

const findInputWrapper = wrapperInstance =>
  wrapperInstance
    .dive()
    .find("Jss(Input)")
    .dive()
    .dive()
    .find("Input")
    .dive()
    .dive()
    .find("WithStyles(Input)")
    .dive()
    .dive();

const findPopperWrapper = wrapperInstance =>
  wrapperInstance
    .dive()
    .find("WithStyles(Paper)")
    .dive()
    .dive()
    .find("WithStyles(MenuItem)");

describe("<AutoComplete />", () => {
  const autoCompleteWrapper = shallow(<AutoComplete {...inputProp} />);
  const autoCompleteMountWrapper = mount(<AutoComplete {...inputProp} />);
  const auto = autoCompleteWrapper.props();
  it("Paper Wraper Check", () => {
    expect(auto.classes).to.have.any.keys("paper");
  });

  it("Paper Class Check", () => {
    expect(auto.classes.paper.indexOf("paper")).to.be.greaterThan(-1);
  });

  it("text check", () => {
    expect(autoCompleteMountWrapper.find("label").text()).to.be.equal(
      inputProp.inputComponentProps.label
    );
  });

  it("popper with static data", () => {
    const autoCompletePopperWrapper = shallow(<AutoCompleteBase {...inputProp} />);

    // trigger input change event
    const inputWrapper = findInputWrapper(autoCompletePopperWrapper);
    inputWrapper.find("input").simulate("change", { target: { value: "search-p" } });

    autoCompletePopperWrapper.update(); // re-render wrapper component
    expect(findPopperWrapper(autoCompletePopperWrapper)).to.have.length(2);
  });

  it("popper with async data", () => {
    const asyncAutoCompleteWrapper = shallow(
      <AutoCompleteBase {...inputProp} data={undefined} baseURL="/fakeJson" />
    );

    // stub async request
    const component = asyncAutoCompleteWrapper.instance();
    sinon.stub(component, "dataRequest").resolves(["search-params", "search-prototype.js"]);

    // trigger input change event
    const inputWrapper = findInputWrapper(asyncAutoCompleteWrapper);
    inputWrapper.find("input").simulate("change", { target: { value: "search-p" } });
    setTimeout(() => {
      asyncAutoCompleteWrapper.update(); // re-render wrapper component
      expect(findPopperWrapper(asyncAutoCompleteWrapper)).to.have.length(2);
    });
  });
});
